import { useState } from "react";
import { HomeIcon, HistoryIcon, X } from "lucide-react";
import Header from "@/components/header";
import BillingPopover from "@/components/billingPopover";
import HomeComponent from "@/components/sections/home";
import History from "@/components/sections/history";
import { Button } from "@/components/ui/button";
import { isEnvBrowser, useNuiEvent, fetchNui } from "@/hooks/nui";
import type { historyProps } from "./accountShared";

type userInfoProps = {
  name: string;
  id: number;
  money: number;
  bank: number;
  history: historyProps[];
  currency?: string;
};

export default function Home() {
  const [open, setOpen] = useState(isEnvBrowser());
  const [navigation, setNavigation] = useState("home");
  const [userInfo, setUserInfo] = useState<userInfoProps>({
    name: "SEU NOME",
    id: 0,
    money: 0,
    bank: 0,
    history: [{ type: "Deposito", value: 0, id: 0 }],
  });

  const handleNavigation = (nav: string) => setNavigation(nav);

  useNuiEvent("toggleScreen", (status: boolean) => {
    setOpen(status);
  });

  const closeScreen = () => {
    setOpen(false);
    fetchNui("closeScreen", null).catch(console.log);
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeScreen();
    }
  });

  useNuiEvent<userInfoProps>("updateUserInfos", (data) => {
    setUserInfo(data);
  });

  return (
    open && (
      <div className="flex flex-col mt-[1%] gap-6 items-center">
        <Header name="home" />

        <main className="flex relative z-100 flex-col gap-10 px-12 py-6 rounded-md items-start w-[85%] overflow-hidden h-[86vh] bg-[linear-gradient(140deg,#093500_0%,#020500_26%)]">
          <span className="absolute -z-10 top-0 right-0 w-full h-full bg-[linear-gradient(220deg,rgba(107,0,2,0.5)_0%,rgba(0,0,0,0)_10%)]" />

          <header className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <img
                src="./zoro.webp"
                alt="Logo"
                width={67}
                height={67}
                className="rounded-md"
              />
              <div className="ml-4 text-white">
                <h2 className="font-black text-3xl">{userInfo.name}</h2>
                <h3 className="text-lg">{userInfo.id}</h3>
              </div>
            </div>

            <nav className="flex gap-6">
              <Button
                variant={navigation === "home" ? "activated" : "default"}
                onClick={() => handleNavigation("home")}
              >
                <HomeIcon />
                Início
              </Button>

              <Button
                variant={navigation === "history" ? "activated" : "default"}
                onClick={() => handleNavigation("history")}
              >
                <HistoryIcon />
                Histórico
              </Button>

              <BillingPopover
                navigation={navigation}
                handleNavigation={handleNavigation}
              />

              <Button variant="destructive" onClick={() => closeScreen()}>
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
    )
  );
}
