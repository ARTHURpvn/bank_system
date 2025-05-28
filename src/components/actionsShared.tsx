"use client";

import { HandCoinsIcon, PiggyBankIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { accountProps } from "./sections/accountShared";
import { fetchNui, useNuiEvent } from "@/hooks/nui";

const ActionsShared = ({
  type,
  onActionComplete,
}: {
  type: string;
  onActionComplete?: () => void;
}) => {
  const [account, setAccount] = useState<accountProps>();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchNui<accountProps>("getSharedAccount");
      setAccount(data);
    };
    fetchData();
  }, []);

  // Atualizar o estado da conta quando os dados mudarem
  useNuiEvent<accountProps>("updateSharedAccount", (data) => {
    setAccount(data);
  });

  const handleAction = async () => {
    if (!account || amount <= 0) return;

    try {
      let updatedAccount: accountProps | undefined;

      if (type === "Depositar") {
        updatedAccount = await fetchNui<accountProps>("depositSharedAccount", {
          accountId: account.id,
          amount,
        });
      } else {
        if (amount > account.balance) {
          alert("Saldo insuficiente");
          return;
        }
        updatedAccount = await fetchNui<accountProps>("withdrawSharedAccount", {
          accountId: account.id,
          amount,
        });
      }

      if (updatedAccount) setAccount(updatedAccount);

      setAmount(0);

      if (onActionComplete) {
        onActionComplete();
      }
    } catch (error) {
      alert("Erro ao realizar a operação." + "\n" + error);
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
