"use client";

import { HandCoinsIcon, PiggyBankIcon } from "lucide-react";
import { accountProps } from "./accountShared";
import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

const HistoryShared = () => {
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
  }, []);

  // Formatando data
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Sao_Paulo",
    }).format(new Date(dateString));
  };

  return (
    <ScrollArea className="w-full h-full">
      {account?.history?.map((item, index) => (
        <div
          key={index}
          className="flex mb-2 w-full justify-between text-white items-center px-4 h-14 rounded-md bg-[#1A1A1A]/80"
        >
          <div className="flex gap-4 items-center">
            <div
              className={`flex justify-center items-center rounded-md size-8
              ${
                item.type === "Deposito"
                  ? "text-[#2BFF00] bg-[#106000]/40"
                  : "text-[#DC2424] bg-[#DC2424]/20"
              } `}
            >
              {item.type === "Deposito" ? <PiggyBankIcon /> : <HandCoinsIcon />}
            </div>
            <p>{item.type}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="px-2 py-1 bg-[#525252]/40 rounded-md text-[#868686]">
              <p>ID {item.id}</p>
            </div>
            <div className="px-2 py-1 bg-[#525252]/40 rounded-md text-[#868686]">
              {formatDate(item.date as string)}
            </div>
            <div className="w-26 text-end">
              <p
                className={`text-lg font-semibold
                ${
                  item.type === "Deposito" ? "text-[#2BFF00]" : "text-[#DC2424]"
                }
                `}
              >
                {item.type === "Deposito" ? "+" : "-"}
                {item.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};

export default HistoryShared;
