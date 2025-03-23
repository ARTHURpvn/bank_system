"use client";

import { useState, useEffect } from "react";
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

interface DialogActionsProps {
  name: string;
  action: (
    data?: { name?: string; meta?: number },
    e?: React.MouseEvent
  ) => void;
  initialValues?: { name?: string; meta?: number };
  stopPropagation?: boolean;
}

const DialogActions = ({
  name,
  action,
  initialValues,
  stopPropagation = true,
}: DialogActionsProps) => {
  const [formData, setFormData] = useState({
    name: initialValues?.name || "",
    meta: initialValues?.meta || 0,
  });
  const [open, setOpen] = useState(false);
  

  useEffect(() => {
    if (initialValues && open) {
      setFormData({
        name: initialValues.name || "",
        meta: initialValues.meta || 0,
      });
    }
  }, [initialValues, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e: React.MouseEvent) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    action(formData, e);
    setOpen(false);
    setFormData({ name: "", meta: 0 });
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    setOpen(true);
  };

  // Para ações sem formulário como Excluir
  const handleActionWithoutForm = (e: React.MouseEvent) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    action(undefined, e);
    setOpen(false);
  };

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
        labels: [],
        variant: "destructive",
      };
      break;
    case "Adicionar":
      value = {
        name: "Adicionar Participante",
        icon: <PlusIcon />,
        labels: ["ID do Jogador"],
        variant: "outline",
      };
      break;
    case "Remover":
      value = {
        name: "Remover Participante",
        icon: <Trash2Icon />,
        labels: ["ID do Jogador"],
        variant: "destructive",
      };
      break;
    default:
      value = {
        name: "Adicionar",
        icon: <PlusIcon />,
        labels: ["ID do Jogador"],
        variant: "green_action",
      };
      break;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (stopPropagation) {
          // Evita que o evento se propague quando o diálogo é aberto ou fechado
          setTimeout(() => setOpen(newOpen), 0);
        } else {
          setOpen(newOpen);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button size={"sm"} variant={value.variant} onClick={handleButtonClick}>
          {value.icon}
          {name === "Criar" || name === "Adicionar" || name === "Remover"
            ? name
            : ""}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="fixed z-1000"
        onPointerDownOutside={(e) => {
          if (stopPropagation) e.preventDefault();
        }}
      >
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
            {name !== "Excluir" &&
              value.labels?.map((label, index) => (
                <div key={index}>
                  <Label className="text-sm">{label}</Label>
                  <Input
                    name={index === 0 ? "name" : "meta"}
                    placeholder={
                      label.includes("Jogador")
                        ? "Insira o ID do jogador"
                        : index === 0
                        ? "Insira o Nome da conta"
                        : "Insira a Meta"
                    }
                    type={label.includes("Meta") ? "number" : "text"}
                    value={index === 0 ? formData.name : formData.meta.toString()}
                    onChange={handleChange}
                  />
                </div>
              ))}
          </div>
        </div>
        <DialogFooter className="w-full items-center">
          {(name === "Excluir" || name === "Remover") && (
            <DialogClose asChild>
              <Button
                size={"lg"}
                variant={"ghost"}
                className="border"
                onClick={(e) => {
                  if (stopPropagation) e.stopPropagation();
                }}
              >
                Cancelar
              </Button>
            </DialogClose>
          )}

          <Button
            size={"lg"}
            variant={value.variant === "ghost" ? "outline" : value.variant}
            onClick={
              name === "Excluir" ? handleActionWithoutForm : handleSubmit
            }
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogActions;
