"use client";

import {
  HandCoinsIcon,
  PiggyBankIcon,
  TrendingUpDown,
  UserRoundIcon,
} from "lucide-react";

import DialogActions from "../dialogActions";
import { useEffect, useState } from "react";
import { accountProps } from "./accountShared";
import ActionsShared from "../actionsShared";

const HomeShared = () => {
  const [account, setAccount] = useState<accountProps>();

  // Função para carregar dados da conta do localStorage
  const loadAccountData = () => {
    const savedNavigation = localStorage.getItem("selectedAccount");
    if (savedNavigation) {
      try {
        setAccount(JSON.parse(savedNavigation));
      } catch (error) {
        console.error("Erro ao analisar a navegação salva:", error);
      }
    }
  };

  // Carregar dados iniciais
  useEffect(() => {
    loadAccountData();

    // Adicionar um event listener para detectar mudanças no localStorage
    window.addEventListener("storage", loadAccountData);
    // Atualizar os valores da conta selecionada para sempre que o componente for montado

    // Função personalizada para detectar mudanças no localStorage
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      // Chamar a implementação original
      originalSetItem.apply(this, [key, value]);

      // Disparar um evento personalizado
      const event = new Event("localStorageChange");
      window.dispatchEvent(event);
    };

    // Adicionar listener para o evento personalizado
    window.addEventListener("localStorageChange", loadAccountData);

    // Limpeza ao desmontar o componente
    return () => {
      window.removeEventListener("storage", loadAccountData);
      window.removeEventListener("localStorageChange", loadAccountData);
      // Restaurar a função original do localStorage
      localStorage.setItem = originalSetItem;
    };
  }, []);

  const historyList = () => {
    const history = account?.history ?? [];
    if (history.length === 0) return [];

    if (history.length === 1) return [{ history: history[0] }];

    const latestHistory = [
      { history: history[history.length - 1] },
      { history: history[history.length - 2] },
    ];

    return latestHistory || [];
  };

  return (
    <div className="w-full justify-between flex overflow-hidden">
      {/* Lado Esquerdo */}
      <div className="flex flex-col w-[35%]">
        <div className="flex flex-col items-center gap-6 p-6 w-full rounded-md h-[62.4vh] bg-[#232323]/60">
          <h1 className="text-3xl font-bold">PARTICIPANTES</h1>

          {/* Participantes */}
          <div className="w-full space-y-2 h-full">
            {account?.team?.map((participant, index) => (
              <div
                key={index}
                className="flex items-center justify-between w-full h-10"
              >
                <div className="flex gap-4 items-center">
                  <div className="flex justify-center items-center rounded-md text-black size-8 bg-white/90">
                    <UserRoundIcon />
                  </div>
                  <p>{participant.name}</p>
                </div>

                <p>{participant.id}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="self-end mt-6 space-x-4">
          <DialogActions name="Remover" />
          <DialogActions name="Adicionar" />
        </div>
      </div>

      {/* Lado Direito */}
      <div className="flex flex-col w-[60%]">
        {/* Arrecadado / Meta */}
        <div className="flex p-6 justify-between w-full h-40 rounded-md bg-[#083200]/80">
          <div className="space-y-4 w-[49%]">
            <p className="text-xl">DINHEIRO ARRECADADO</p>
            <p className="text-4xl font-black">$ {account?.balance}</p>
          </div>
          <div className="space-y-4 w-[49%]">
            <p className="text-xl">META</p>
            <div className="flex gap-2">
              <p className="text-4xl font-black">$ {account?.balance}</p>
              <p className="text-4xl font-black">/</p>
              <p className="text-4xl font-black">$ {account?.meta}</p>
            </div>
          </div>
        </div>

        {/* Depositar / Retirar */}
        <div className="flex justify-between mt-6">
          <ActionsShared type="Depositar" onActionComplete={loadAccountData} />
          <ActionsShared type="Retirar" onActionComplete={loadAccountData} />
        </div>

        {/* Historico */}
        <section className="flex flex-col gap-6 w-full">
          <div className="flex gap-6 items-center my-4">
            <TrendingUpDown />
            <p className="text-2xl">Últimas Transações</p>
          </div>

          {/* Transacoes */}
          <div className="space-y-2">
            {historyList().map((item, index) => (
              <div
                key={index}
                className={`flex w-full justify-between items-center px-4 h-14 rounded-md border ${
                  item.history.type === "Deposito"
                    ? "text-[#2BFF00] bg-[#106000]/20 border-[#106000]/50"
                    : "text-[#DC2424] bg-[#4D0202]/50 border-[#6B0002]/95"
                } `}
              >
                <div className="flex gap-4 items-center">
                  <div
                    className={`flex justify-center items-center size-8 rounded-md`}
                  >
                    {item.history.type === "Deposito" ? (
                      <PiggyBankIcon />
                    ) : (
                      <HandCoinsIcon />
                    )}
                  </div>
                  <p>{item.history.type}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className={`px-2 py-1 rounded-md`}>
                    ID {item.history.id}
                  </div>
                  <div className="w-26 text-end">
                    <p className={`text-lg font-semibold`}>
                      {item.history.type === "Deposito" ? "+" : "-"}
                      {item.history.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeShared;
