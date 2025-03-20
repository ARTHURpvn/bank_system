import { PiggyBankIcon } from "lucide-react";

const Historys = () => {
  return (
    <div className="space-y-2 w-full">
      <div className="flex w-full justify-between text-white items-center px-4 h-14 rounded-md bg-[#1A1A1A]/80 ">
        <div className="flex gap-4 items-center">
          <div className="flex justify-center items-center text-[#2BFF00] size-8 bg-[#106000]/40 rounded-md">
            <PiggyBankIcon />
          </div>
          <p>Depositar</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="px-2 py-1 bg-[#525252]/40 rounded-md text-[#868686]">
            19/03/2025 15:25
          </div>
          <div className="w-26 text-end">
            <p className="text-lg font-semibold text-[#2BFF00]">+999999</p>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-between text-white items-center px-4 h-14 rounded-md bg-[#1A1A1A]/80 ">
        <div className="flex gap-4 items-center">
          <div className="flex justify-center items-center text-[#2BFF00] size-8 bg-[#106000]/40 rounded-md">
            <PiggyBankIcon />
          </div>
          <p>Depositar</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="px-2 py-1 bg-[#525252]/40 rounded-md text-[#868686]">
            19/03/2025 15:25
          </div>
          <div className="w-26 text-end">
            <p className="text-lg font-semibold text-[#2BFF00]">+999999</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Historys;
