import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fetchNui, useNuiEvent } from "@/hooks/nui";
import { ReceiptTextIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface BillingPopoverProps {
  navigation: string;
  handleNavigation: (navigation: string) => void;
}

const BillingPopover = ({
  navigation,
  handleNavigation,
}: BillingPopoverProps) => {
  const [multas, setMultas] = useState<number>(0);

  useEffect(() => {
    const getFines = async () => {
      const response = await fetchNui<number>("getFines", {}, 100);
      setMultas(response);
    };
    getFines();
  }, []);

  // Atualizar multas em tempo real via evento do backend
  useNuiEvent<number>("updateFines", (data) => {
    setMultas(data);
  });

  return (
    <Popover
      open={navigation === "billing"}
      onOpenChange={(open) => handleNavigation(open ? "billing" : "home")}
    >
      <PopoverTrigger asChild>
        <Button variant={navigation === "billing" ? "activated" : "default"}>
          <ReceiptTextIcon />
          Multas
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 z-1000">
        <div className="flex flex-col gap-4 w-full">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Multas</h4>
          </div>
          <div className="grid gap-2">
            <div>
              {multas > 0 ? (
                <div className="flex w-full items-center justify-between">
                  <p>
                    {/* @ts-ignore */}
                    Total: {window.currency}
                    {multas}
                  </p>
                  <Button variant={"green_action"}>Pagar</Button>
                </div>
              ) : (
                <p>Não há multas pendentes</p>
              )}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BillingPopover;
