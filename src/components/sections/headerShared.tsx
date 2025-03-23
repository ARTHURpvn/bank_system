"use client";

import { Button } from "@/components/ui/button";
import { HistoryIcon, HomeIcon, ReceiptTextIcon, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { accountProps } from "./accountShared";

interface HeaderProps {
  navigation: string;
  handleNavigation: (navigation: string) => void;
}

const HeaderShared = ({ navigation, handleNavigation }: HeaderProps) => {
  const [account, setAccount] = useState<accountProps>();
  useEffect(() => {
    const handleStorageChange = () => {
      const savedNavigation = localStorage.getItem("selectedAccount");

      if (savedNavigation) {
        setAccount(JSON.parse(savedNavigation));
      }
    };
    handleStorageChange();
  }, [handleNavigation]);

  useEffect(() => {
    const savedNavigation = localStorage.getItem("navigation");
    if (savedNavigation) {
      try {
        const parsedNavigation = JSON.parse(savedNavigation);
        if (parsedNavigation) {
          handleNavigation(parsedNavigation);
        }
      } catch (error) {
        console.error("Erro ao analisar a navegação salva:", error);
      }
    }
  }, [handleNavigation]);

  return (
    <header className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <Image
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
