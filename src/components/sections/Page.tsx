import { useState } from "react";
import { HomeIcon, HistoryIcon, X } from "lucide-react";

import Header from "@/components/header";
import BillingPopover from "@/components/billingPopover";
import HomeComponent from "@/components/sections/home";
import History from "@/components/sections/history";
import { Button } from "@/components/ui/button";
import { isEnvBrowser, useNuiEvent } from "@/hooks/nui";

export default function Home() {
    const [open, setOpen] = useState(isEnvBrowser());
    const [navigation, setNavigation] = useState("home");

    const handleNavigation = (nav: string) => setNavigation(nav);

    useNuiEvent("toggleScreen", (status: boolean) => {
        console.log("toggleScreen", status);
        setOpen(status);
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

                            <Button variant="destructive">
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
