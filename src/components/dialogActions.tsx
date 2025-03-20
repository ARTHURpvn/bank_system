"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VariantProps } from "class-variance-authority";
import { HandCoinsIcon, HandshakeIcon, PiggyBankIcon } from "lucide-react";

type valueProps = {
  name: string;
  icon: React.ReactNode;
  variant: VariantProps<typeof Button>["variant"];
};
const DialogActions = ({ name }: { name: string }) => {
  let value: valueProps;

  switch (name) {
    case "Depositar":
      value = {
        name: "Depositar",
        icon: <PiggyBankIcon className="size-8 text-[#2BFF00]" />,
        variant: "green_action",
      };
      break;
    case "Retirar":
      value = {
        name: "Retirar",
        icon: <HandCoinsIcon className="size-8 text-[#DC2424]" />,
        variant: "red_action",
      };
      break;
    case "Transferir":

    default:
      value = {
        name: "Transferir",
        icon: <HandshakeIcon className="size-8 text-white" />,
        variant: "white_action",
      };
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"} variant={value.variant}>
          {value.icon}
          {value.name}
        </Button>
      </DialogTrigger>
      <DialogContent className="fixed z-1000">
        <DialogHeader className="mb-6">
          <DialogTitle className="flex gap-4 justify-center items-center text-3xl">
            {value.icon} {value.name}
          </DialogTitle>
          <DialogDescription className="hidden">
            Depositar dinheiro na Conta
          </DialogDescription>
        </DialogHeader>
        <div className="my-6 space-y-6">
          {value.name === "Transferir" && (
            <div>
              <Label>ID da Pessoa</Label>
              <Input type="number" placeholder="Insira o Valor" min={0} />
            </div>
          )}
          <div>
            <Label>Valor</Label>
            <Input type="number" placeholder="Insira o Valor" min={0} />
          </div>
        </div>
        <DialogFooter className="w-full items-center">
          <Button size={"lg"} variant={value.variant}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogActions;
