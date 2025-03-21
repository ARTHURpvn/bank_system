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
import { PenIcon, PlusIcon, Trash2Icon } from "lucide-react";

type valueProps = {
  name: string;
  icon?: React.ReactNode;
  labels?: string[];
  variant: VariantProps<typeof Button>["variant"];
  size?: VariantProps<typeof Button>["size"];
};
const DialogActions = ({ name }: { name: string }) => {
  let value: valueProps;

  switch (name) {
    case "Criar":
      value = {
        name: "Criar Conta Compartilhada",
        icon: <PlusIcon className="size-8 text-[#2BFF00]" />,
        labels: ["Nome da Conta", "Meta"],
        variant: "green_action",
      };
      break;
    case "Editar":
      value = {
        name: "Retirar",
        icon: <PenIcon className="size-8 text-[#DC2424]" />,
        labels: ["Nome da Conta", "Meta"],
        variant: "red_action",
      };
      break;
    case "Excluir":
      value = {
        name: "Adicionar",
        icon: <Trash2Icon className="size-8 text-[#DC2424]" />,
        labels: ["ID do Jogador"],
        variant: "green_action",
      };
      break;
    default:
      value = {
        name: "Adicionar",
        icon: <Trash2Icon className="size-8 text-[#DC2424]" />,
        labels: ["ID do Jogador"],
        variant: "green_action",
      };
      break;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={value.variant}>
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
          <div>
            {name != "Excluir" ? (
              value.labels?.map((label, index) => (
                <div key={index}>
                  <Label className="text-sm">{label}</Label>
                  <Input placeholder={label} className="mt-2" />
                </div>
              ))
            ) : (
              <div>
                <p>Deseja Excluir essa Conta?</p>
                <p>Essa ação não poderá ser desfeita</p>
              </div>
            )}
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
