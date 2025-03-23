"use client";

import { HandCoinsIcon, PiggyBankIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { accountProps } from "./sections/accountShared";

const ActionsShared = ({
  type,
  onActionComplete,
}: {
  type: string;
  onActionComplete?: () => void;
}) => {
  const [account, setAccount] = useState<accountProps>();
  const [amount, setAmount] = useState(0);

  // Função para obter os dados mais atualizados do localStorage
  const getLatestAccountData = () => {
    const savedNavigation = localStorage.getItem("selectedAccount");
    if (savedNavigation) {
      try {
        return JSON.parse(savedNavigation) as accountProps;
      } catch (error) {
        console.error("Erro ao analisar a navegação salva:", error);
      }
    }
    return null;
  };

  useEffect(() => {
    const latestAccount = getLatestAccountData();
    if (latestAccount) {
      setAccount(latestAccount);
    }
  }, []);

  const handleAction = () => {
    if (amount > 0) {
      // Sempre obter os dados mais recentes da conta antes de realizar qualquer operação
      const latestAccount = getLatestAccountData();

      if (!latestAccount) return;

      let updatedAccount;

      if (type === "Depositar") {
        updatedAccount = {
          ...latestAccount,
          balance: latestAccount.balance + amount,
          history: latestAccount.history
            ? [
                ...latestAccount.history,
                {
                  type: "Deposito",
                  value: amount,
                  date: new Date().toISOString(),
                  id: 1,
                },
              ]
            : [
                {
                  type: "Deposito",
                  value: amount,
                  date: new Date().toISOString(),
                  id: 1,
                },
              ],
        };
      } else {
        if (amount > latestAccount.balance) {
          alert("Saldo insuficiente");
          return;
        }

        updatedAccount = {
          ...latestAccount,
          balance:
            latestAccount.balance - amount > latestAccount.balance
              ? 0
              : latestAccount.balance - amount,
          history: latestAccount.history
            ? [
                ...latestAccount.history,
                {
                  type: "Retirada",
                  value: amount,
                  date: new Date().toISOString(),
                  id: 1,
                },
              ]
            : [
                {
                  type: "Retirada",
                  value: amount,
                  date: new Date().toISOString(),
                  id: 1,
                },
              ],
        };
      }

      setAccount(updatedAccount);

      localStorage.setItem("selectedAccount", JSON.stringify(updatedAccount));

      // Resetar o campo de valor após a operação
      setAmount(0);

      // Notificar o componente pai que a ação foi concluída
      if (onActionComplete) {
        onActionComplete();
      }
    }
  };

  return (
    <div className="bg-[#343434]/40 flex flex-col items-center justify-around p-6 w-[48%] h-60 rounded-md">
      <div className="flex items-center gap-6">
        {type === "Depositar" ? (
          <PiggyBankIcon className="text-[#2BFF00] size-10" />
        ) : (
          <HandCoinsIcon className="text-[#DC2424] size-10" />
        )}

        <p className="text-3xl font-bold">{type.toUpperCase()}</p>
      </div>

      <Input
        type="number"
        placeholder="$ 0,00"
        min={0}
        value={amount > 0 ? amount : ""}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <div className="w-full">
        <Button
          variant={type === "Depositar" ? "deposit_shared" : "withdraw_shared"}
          size={"lg"}
          className="w-full"
          onClick={handleAction}
        >
          {type}
        </Button>
      </div>
    </div>
  );
};

export default ActionsShared;
