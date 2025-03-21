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
import { DialogClose } from "@radix-ui/react-dialog";
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
        name: "Criar Conta",
        icon: <PlusIcon />,
        labels: ["Nome da Conta", "Meta"],
        variant: "outline",
      };
      break;
    case "Editar":
      value = {
        name: "Editar Conta",
        icon: <PenIcon />,
        labels: ["Nome da Conta", "Meta"],
        variant: "ghost",
      };
      break;
    case "Excluir":
      value = {
        name: "Deseja Excluir essa Conta?",
        icon: <Trash2Icon />,
        labels: ["ID do Jogador"],
        variant: "destructive",
      };
      break;
    default:
      value = {
        name: "Adicionar",
        icon: <Trash2Icon />,
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
          {name == "Criar" ? name : ""}
        </Button>
      </DialogTrigger>
      <DialogContent className="fixed z-1000">
        <DialogHeader className="mb-6">
          <DialogTitle className="flex gap-4 justify-center items-center text-3xl">
            {value.name}
          </DialogTitle>
          <DialogDescription className="hidden">
            Depositar dinheiro na Conta
          </DialogDescription>
        </DialogHeader>
        <div className="my-6 space-y-6">
          <div className="space-y-4">
            {name != "Excluir" &&
              value.labels?.map((label, index) => (
                <div key={index}>
                  <Label className="text-sm">{label}</Label>
                  <Input
                    placeholder={
                      index == 0 ? "Insira o Nome da conta" : "Insira a Meta"
                    }
                    type={index == 0 ? "text" : "number"}
                  />
                </div>
              ))}
          </div>
        </div>
        <DialogFooter className="w-full items-center">
          {name == "Excluir" && (
            <DialogClose asChild>
              <Button size={"lg"} variant={"ghost"} className="border">
                Cancelar
              </Button>
            </DialogClose>
          )}

          <Button size={"lg"} variant={value.variant == "ghost" ? "outline" : value.variant}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogActions;
