"use client";

import HeaderShared from "@/components/sections/headerShared";
import HistoryShared from "@/components/sections/historyShared";
import HomeShared from "@/components/sections/homeShared";
import AccountShared from "@/components/sections/accountShared";
import { useEffect, useState } from "react";
import Header from "@/components/header";

export default function SharedPage() {
  const [navigation, setNavigation] = useState("dashboard");

  useEffect(() => {
    // Carrega a navegação salva
    try {
      const savedNavigation = localStorage.getItem("navigation");
      if (savedNavigation) {
        setNavigation(JSON.parse(savedNavigation));
      }
    } catch (error) {
      console.error("Erro ao carregar dados do localStorage:", error);
    }
  }, []);

  // Função para atualizar a navegação e salvar no localStorage
  const handleNavigation = (nav: string) => {
    setNavigation(nav);
    localStorage.setItem("navigation", JSON.stringify(nav));
  };

  return (
    <div className="flex flex-col mt-[1%] gap-6 items-center">
      <Header name="dashboard" />
      <main className="flex relative z-100 flex-col gap-10 px-12 py-6 rounded-md items-start w-[85%] overflow-hidden h-[86vh] bg-linear-[140deg,#093500_0%,#020500_26%]">
        <HeaderShared
          navigation={navigation}
          handleNavigation={handleNavigation}
        />

        <span className="absolute -z-10 top-0 right-0 w-full h-full bg-linear-[220deg,rgba(107,0,2,0.50)_0%,rgba(0,0,0,0)_10%]"></span>

        {navigation === "dashboard" ? (
          <HomeShared />
        ) : navigation === "history" ? (
          <HistoryShared />
        ) : (
          <AccountShared />
        )}
      </main>
    </div>
  );
}
