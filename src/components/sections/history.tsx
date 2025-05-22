import { PiggyBankIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchNui, useNuiEvent } from "@/hooks/nui";
import { historyProps } from "./accountShared";

const History = () => {
  const [history, setHistory] = useState<historyProps[]>([]);

  // Buscar histórico do backend ao montar
  useEffect(() => {
    const fetchHistory = async () => {
      const data = await fetchNui<historyProps[]>("getSharedHistory", {}, [
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
      ]);
      setHistory(data);
    };
    fetchHistory();
  }, []);

  // Atualizar histórico em tempo real via evento do backend
  useNuiEvent<historyProps[]>("updateSharedHistory", (data) => {
    setHistory(data);
  });

  return (
    <div className="space-y-2 w-full">
      {history.map((item) => (
        <div
          key={item.id}
          className="flex w-full justify-between text-white items-center px-4 h-14 rounded-md bg-[#1A1A1A]/80 "
        >
          <div className="flex gap-4 items-center">
            <div className="flex justify-center items-center text-[#2BFF00] size-8 bg-[#106000]/40 rounded-md">
              <PiggyBankIcon />
            </div>
            <p>{item.type}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="px-2 py-1 bg-[#525252]/40 rounded-md text-[#868686]">
              {item.date ? new Date(item.date).toLocaleString("pt-BR") : ""}
            </div>
            <div className="w-26 text-end">
              <p
                className={`text-lg font-semibold ${
                  item.type === "Deposito" ? "text-[#2BFF00]" : "text-[#DC2424]"
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
  );
};

export default History;
