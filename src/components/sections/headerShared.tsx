"use client";

import { Button } from "@/components/ui/button";
import { HistoryIcon, HomeIcon, ReceiptTextIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchNui, useNuiEvent } from "@/hooks/nui";
import type {accountProps} from "@/components/sections/accountShared.tsx";

interface HeaderProps {
  navigation: string;
  handleNavigation: (navigation: string) => void;
}

const HeaderShared = ({ navigation, handleNavigation }: HeaderProps) => {
  const [account, setAccount] = useState<accountProps | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchNui<accountProps | accountProps[]>(
        "getSharedAccounts",
        {},
        {
          id: 1,
          name: "Test Account",
          meta: 1000,
          balance: 0,
          team: [
            { id: 1, name: "Player 1" },
            { id: 2, name: "Player 2" },
          ],
          history: [
            {
              type: "Deposito",
              value: 220,
              date: new Date().toISOString(),
              id: 1,
            },
            {
              type: "Retirar",
              value: 120,
              date: new Date().toISOString(),
              id: 2,
            },
          ],
        }
      );
      if (Array.isArray(data)) {
        setAccount(data[0]);
      } else {
        setAccount(data);
      }
    };
    fetchData();
  }, []);

  // Atualiza o estado da conta em tempo real via evento do backend
  useNuiEvent<accountProps>("updateSharedAccount", (data) => {
    setAccount(data);
  });

  return (
    <header className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <img
          src="/zoro.webp"
          alt="Logo"
          width={67}
          height={67}
          className="rounded-md"
        />
        <div className="ml-4 ">
          <h2 className="font-bold text-5xl">{account?.name}</h2>
        </div>
      </div>

      <nav className="flex gap-6">
        <Button
          variant={navigation === "dashboard" ? "activated" : "default"}
          onClick={() => handleNavigation("dashboard")}
        >
          <HomeIcon />
          Dashboard
        </Button>

        <Button
          variant={navigation === "history" ? "activated" : "default"}
          onClick={() => handleNavigation("history")}
        >
          <HistoryIcon />
          Histórico
        </Button>
        <Button
          variant={navigation === "account" ? "activated" : "default"}
          onClick={() => handleNavigation("account")}
        >
          <ReceiptTextIcon />
          Contas
        </Button>
        <Button variant={"destructive"}>
          <X />
        </Button>
      </nav>
    </header>
  );
};

export default HeaderShared;
