"use client";

import BillingPopover from "@/components/billingPopover";
import Header from "@/components/header";
import History from "@/components/sections/history";
import HomeComponent from "@/components/sections/home";
import { Button } from "@/components/ui/button";
import { HistoryIcon, HomeIcon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [navigation, setNavigation] = useState("home");
  const handleNavigation = (navigation: string) => setNavigation(navigation);

  return (
    <div className="flex flex-col mt-[1%] gap-6 items-center">
      <Header name="home" />
      <main className="flex relative z-100 flex-col gap-10 px-12 py-6 rounded-md items-start w-[85%] overflow-hidden h-[86vh] bg-linear-[140deg,#093500_0%,#020500_26%]">
        <span className="absolute -z-10 top-0 right-0 w-full h-full bg-linear-[220deg,rgba(107,0,2,0.50)_0%,rgba(0,0,0,0)_10%]"></span>
        <header className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Image
              src="/zoro.webp"
              alt="Logo"
              width={67}
              height={67}
              className="rounded-md"
            />
            <div className="ml-4">
              <h2 className="font-black text-3xl">SEU NOME</h2>
              <h3 className="text-lg">SEU ID</h3>
            </div>
          </div>

          <nav className="flex gap-6">
            <Button
              variant={navigation == "home" ? "activated" : "default"}
              onClick={() => handleNavigation("home")}
            >
              <HomeIcon />
              Inicio
            </Button>

            <Button
              variant={navigation == "history" ? "activated" : "default"}
              onClick={() => handleNavigation("history")}
            >
              <HistoryIcon />
              Histórico
            </Button>

            <BillingPopover
              navigation={navigation}
              handleNavigation={handleNavigation}
            />

            <Button variant={"destructive"}>
              <X />
            </Button>
          </nav>
        </header>

        {navigation === "home" ? (
          <HomeComponent />
        ) : navigation === "history" ? (
          <History />
        ) : (
          <HomeComponent />
        )}
      </main>
    </div>
  );
}
