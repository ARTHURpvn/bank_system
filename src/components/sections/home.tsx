"use client";

import ChartComponent from "@/components/chart";
import DialogActions from "@/components/dialogActions";
import {
  CircleDollarSignIcon,
  LandmarkIcon,
  PiggyBankIcon,
  TrendingUpDown,
} from "lucide-react";
import Image from "next/image";

const HomeComponent = () => {
  return (
    <>
      <section className="w-full h-full">
        <div className="flex justify-between">
          <div>
            <section className="relative w-[450px] h-[280px]">
              <Image
                src="/cartao.png"
                fill
                alt="Logo"
                className="object-cover"
              />
            </section>

            <section className="flex justify-between mt-6">
              <div className="w-[48%] space-y-5 bg-[#106000]/20 p-2 h-30 bg-linear- border rounded-md">
                <div className="flex items-center gap-2">
                  <CircleDollarSignIcon />
                  <p className="text-xl">Bolso</p>
                </div>
                <p className="text-3xl font-bold">$ 999.999.999</p>
              </div>
              <div className="w-[48%] space-y-5 bg-[#106000]/20 p-2 h-30 bg-linear- border rounded-md">
                <div className="flex items-center gap-2">
                  <LandmarkIcon />
                  <p className="text-xl">Banco</p>
                </div>
                <p className="text-3xl font-bold">$ 999</p>
              </div>
            </section>

            <section className="mt-6 flex gap-4 flex-col">
              <DialogActions name="Depositar" />
              <DialogActions name="Retirar" />
              <DialogActions name="Transferir" />
            </section>
          </div>

          <section className="flex flex-col gap-6 w-[48%] h-[48%]">
            <ChartComponent />

            <div>
              <div className="flex gap-6 items-center my-4">
                <TrendingUpDown />
                <p className="text-2xl">Últimas Transações</p>
              </div>
              <div className="space-y-2">
                <div className="flex w-full justify-between text-[#2BFF00] items-center px-4 h-14 rounded-md bg-[#106000]/20 border border-[#106000]/50">
                  <div className="flex gap-4 items-center">
                    <div className="flex justify-center items-center size-8 bg-[#106000]/70 rounded-md">
                      <PiggyBankIcon />
                    </div>
                    <p>Depositar</p>
                  </div>

                  <p className="text-lg font-semibold">+12</p>
                </div>
                <div className="flex w-full justify-between text-[#2BFF00] items-center px-4 h-14 rounded-md bg-[#106000]/20 border border-[#106000]/50">
                  <div className="flex gap-4 items-center">
                    <div className="flex justify-center items-center size-8 bg-[#106000]/70 rounded-md">
                      <PiggyBankIcon />
                    </div>
                    <p>Depositar</p>
                  </div>

                  <p className="text-lg font-semibold">+12</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default HomeComponent;
