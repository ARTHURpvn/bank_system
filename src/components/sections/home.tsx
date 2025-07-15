import { useEffect, useState } from "react";
import {
  CircleDollarSignIcon,
  HandCoinsIcon,
  HandshakeIcon,
  LandmarkIcon,
  PiggyBankIcon,
  TrendingUpDown,
} from "lucide-react";

import ChartComponent from "@/components/chart";
import DialogActions from "@/components/dialogActions";
import { fetchNui, useNuiEvent } from "@/hooks/nui";
import type { historyProps } from "@/components/sections/accountShared"; // sem .tsx

type userInfoProps = {
  name: string;
  id: number;
  money: number;
  bank: number;
  history: historyProps[];
  currency?: string;
};

const HomeComponent = () => {
  const [userInfo, setUserInfo] = useState<userInfoProps>({
    name: "SEU NOME",
    id: 0,
    money: 0,
    bank: 0,
    history: [{ type: "Deposito", value: 0, id: 0 }],
  });

  const [currency, setCurrency] = useState("$");

  useEffect(() => {
    const getUserInfo = async () => {
      const result = await fetchNui<userInfoProps>(
        "getUserInfos",
        {},
        {
          name: "Will Jhon",
          id: 1,
          money: 10000,
          bank: 20000,
          history: [
            { type: "Deposito", value: 220, id: 1 },
            { type: "Transferir", value: 120, id: 2 },
          ],
        }
      );
      if (result.currency) {
        setCurrency(result.currency);
        // @ts-ignore
        window.currency = result.currency;
      }
      setUserInfo(result);
    };
    getUserInfo();
  }, []);

  useNuiEvent<userInfoProps>("updateUserInfos", (data) => {
    setUserInfo(data);
  });

  return (
    <section className="w-full h-full">
      <div className="flex justify-between">
        {/* LADO ESQUERDO */}
        <div>
          <section className="relative w-[450px] h-[280px]">
            <img src="/cartao.png" alt="Logo" className="object-cover" />
          </section>

          <section className="flex justify-between mt-6">
            <div className="w-[48%] space-y-5 bg-[#106000]/20 p-2 h-30 border rounded-md">
              <div className="flex items-center gap-2">
                <CircleDollarSignIcon />
                <p className="text-xl">Bolso</p>
              </div>
              <p className="text-3xl font-bold">
                {currency} {userInfo.money}
              </p>
            </div>

            <div className="w-[48%] space-y-5 bg-[#106000]/20 p-2 h-30 border rounded-md">
              <div className="flex items-center gap-2">
                <LandmarkIcon />
                <p className="text-xl">Banco</p>
              </div>
              <p className="text-3xl font-bold">
                {currency} {userInfo.bank}
              </p>
            </div>
          </section>

          <section className="mt-6 flex gap-4 flex-col">
            <DialogActions name="Depositar" />
            <DialogActions name="Retirar" />
            <DialogActions name="Transferir" />
          </section>
        </div>

        {/* LADO DIREITO */}
        <section className="flex flex-col gap-6 w-[48%] h-[48%]">
          <ChartComponent />

          <div>
            <div className="flex gap-6 items-center my-4">
              <TrendingUpDown />
              <p className="text-2xl">Últimas Transações</p>
            </div>
            <div className="space-y-2">
              {userInfo.history.map((item, index) => (
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
                        }`}
                    >
                      {item.type === "Deposito" ? (
                        <PiggyBankIcon />
                      ) : item.type === "Transferir" ? (
                        <HandCoinsIcon />
                      ) : (
                        <HandshakeIcon />
                      )}
                    </div>
                    <p>{item.type}</p>
                  </div>

                  <div className="flex items-center gap-6">
                    {item.type === "Transferir" && (
                      <div className="px-2 py-1 bg-[#525252]/40 rounded-md text-[#868686]">
                        <p>ID {item.id}</p>
                      </div>
                    )}

                    <div className="w-26 text-end">
                      <p
                        className={`text-lg font-semibold ${
                          item.type === "Deposito"
                            ? "text-[#2BFF00]"
                            : "text-[#DC2424]"
                        }`}
                      >
                        {item.type === "Deposito" ? "+" : "-"}
                        {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default HomeComponent;
