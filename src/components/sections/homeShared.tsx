import {
  HandCoinsIcon,
  PiggyBankIcon,
  TrendingUpDown,
  UserRoundIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import DialogActions from "../dialogActions";

const HomeShared = () => {
  return (
    <div className="w-full justify-between flex">
      {/* Lado Esquerdo */}
      <div className="flex flex-col w-[35%]">
        <div className="flex flex-col items-center gap-6 p-6 w-full rounded-md h-[62.4vh] bg-[#232323]/60">
          <h1 className="text-3xl font-bold">PARTICIPANTES</h1>

          {/* Participantes */}
          <div className="w-full space-y-2 h-full">
            <div className="flex items-center justify-between w-full h-10">
              <div className="flex gap-4 items-center">
                <div className="flex justify-center items-center rounded-md text-black size-8 bg-white/90">
                  <UserRoundIcon />
                </div>
                <p>NOME DA PESSOA</p>
              </div>

              <p>ID</p>
            </div>
            <div className="flex items-center justify-between w-full h-10">
              <div className="flex gap-4 items-center">
                <div className="flex justify-center items-center rounded-md text-black size-8 bg-white/90">
                  <UserRoundIcon />
                </div>
                <p>NOME DA PESSOA</p>
              </div>

              <p>ID</p>
            </div>
          </div>
        </div>
        <div className="self-end mt-6 space-x-4">
          <DialogActions name="Remover" />
          <DialogActions name="Adicionar" />

        </div>
      </div>

      {/* Lado Direito */}
      <div className="flex flex-col w-[60%]">
        {/* Arrecadado / Meta */}
        <div className="flex p-6 justify-between w-full h-40 rounded-md bg-[#083200]/80">
          <div className="space-y-4 w-[49%]">
            <p className="text-xl">DINHEIRO ARRECADADO</p>
            <p className="text-4xl font-black">$ 999</p>
          </div>
          <div className="space-y-4 w-[49%]">
            <p className="text-xl">META</p>
            <div className="flex gap-2">
              <p className="text-4xl font-black">$ 999</p>
              <p className="text-4xl font-black">/</p>
              <p className="text-4xl font-black">$ 9.999</p>
            </div>
          </div>
        </div>

        {/* Depositar / Retirar */}
        <div className="flex justify-between mt-6">
          <div className="bg-[#343434]/40 flex flex-col items-center justify-around p-6 w-[48%] h-60 rounded-md">
            <div className="flex items-center gap-6">
              <PiggyBankIcon className="text-[#2BFF00] size-10" />
              <p className="text-3xl font-bold">DEPOSITAR</p>
            </div>

            <Input type="number" placeholder="$ 0,00" min={0} />

            <div className="w-full">
              <Button variant={"deposit_shared"} size={"lg"} className="w-full">
                Depositar
              </Button>
            </div>
          </div>

          <div className="bg-[#343434]/40 flex flex-col items-center justify-around p-6 w-[48%] h-60 rounded-md">
            <div className="flex items-center gap-6">
              <HandCoinsIcon className="text-[#DC2424] size-10" />
              <p className="text-3xl font-bold">RETIRAR</p>
            </div>

            <Input type="number" placeholder="$ 0,00" min={0} />

            <div className="w-full self-">
              <Button
                variant={"withdraw_shared"}
                size={"lg"}
                className="w-full"
              >
                Retirar
              </Button>
            </div>
          </div>
        </div>

        {/* Historico */}
        <section className="flex flex-col gap-6 w-full">
          <div className="flex gap-6 items-center my-4">
            <TrendingUpDown />
            <p className="text-2xl">Últimas Transações</p>
          </div>

          {/* Transacoes */}
          <div className="space-y-2">
            <div className="flex w-full justify-between text-[#2BFF00] items-center px-4 h-14 rounded-md bg-[#106000]/20 border border-[#106000]/50">
              <div className="flex gap-4 items-center">
                <div className="flex justify-center items-center text-[#2BFF00] size-8 bg-[#106000]/40 rounded-md">
                  <PiggyBankIcon />
                </div>
                <p>Depositar</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="px-2 py-1 bg-[#2BFF00]/20 rounded-md">
                  ID 1000
                </div>
                <div className="w-26 text-end">
                  <p className="text-lg font-semibold text-[#2BFF00]">
                    +999999
                  </p>
                </div>
              </div>
            </div>

            <div className="flex w-full justify-between text-[#2BFF00] items-center px-4 h-14 rounded-md bg-[#106000]/20 border border-[#106000]/50">
              <div className="flex gap-4 items-center">
                <div className="flex justify-center items-center text-[#2BFF00] size-8 bg-[#106000]/40 rounded-md">
                  <PiggyBankIcon />
                </div>
                <p>Depositar</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="px-2 py-1 bg-[#2BFF00]/20 rounded-md">
                  ID 1000
                </div>
                <div className="w-26 text-end">
                  <p className="text-lg font-semibold text-[#2BFF00]">
                    +999999
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeShared;
