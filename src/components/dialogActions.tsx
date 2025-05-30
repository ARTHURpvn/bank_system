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
import {
  HandCoinsIcon,
  HandshakeIcon,
  PiggyBankIcon,
  UserMinusIcon,
  UserPlusIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { accountProps } from "./sections/accountShared";
import { toast } from "sonner";
import { fetchNui, useNuiEvent } from "@/hooks/nui";

type valueProps = {
  name: string;
  icon?: React.ReactNode;
  label: string;
  variant: VariantProps<typeof Button>["variant"];
  size?: VariantProps<typeof Button>["size"];
};

type TeamMember = {
  id: number;
  name: string;
  meta: number;
  balance: number;
};

const DialogActions = ({ name }: { name: string }) => {
  const [account, setAccount] = useState<accountProps | null>(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchNui<accountProps>(
        "getSharedAccounts",
        {},
        {
          id: 1,
          name: "Test Account",
          meta: 1000,
          balance: 0,
          team: [
            { id: 1, name: "Player 1"},
            { id: 2, name: "Player 2"},

          ],
          history: [
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
          ],
        }
      );
      setAccount(data);
    };
    fetchData();
  }, []);

  // Atualizar o estado da conta quando os dados mudarem
  useNuiEvent<accountProps>("updateSharedAccount", (data) => {
    setAccount(data);
  });

  // Função para adicionar uma pessoa ao time
  const handleAddTeamMember = async () => {
    if (!account) return;

    const id = parseInt(inputValue);

    if (isNaN(id) || id <= 0) {
      toast.error("Por favor, insira um ID válido");
      return;
    }

    // Verificar se o ID já existe na equipe
    if (account.team && account.team.some((member) => member.id === id)) {
      toast.error("Um membro com este ID já existe na equipe");
      return;
    }

    // Chama o backend para adicionar o membro
    try {
      const updatedAccount = await fetchNui<accountProps>(
        "addSharedTeamMember",
        {
          accountId: account.id,
          member: {
            id,
            name: `Jogador ${id}`,
            meta: 0,
            balance: 0,
          } as TeamMember,
        }
      );
      if (updatedAccount) setAccount(updatedAccount);
      toast.success(`Jogador ${id} adicionado com sucesso`);
      setInputValue("");
      setOpen(false);
    } catch (error) {
      toast.error(`Erro ao adicionar membro: ${error}`);

    }
  };

  // Função para remover uma pessoa do time
  const handleRemoveTeamMember = async () => {
    if (!account) return;

    const id = parseInt(inputValue);

    if (isNaN(id) || id <= 0) {
      toast.error("Por favor, insira um ID válido");
      return;
    }

    // Verificar se o ID existe na equipe
    if (!account.team || !account.team.some((member) => member.id === id)) {
      toast.error("Nenhum membro com este ID foi encontrado na equipe");
      return;
    }

    // Chama o backend para remover o membro
    try {
      const updatedAccount = await fetchNui<accountProps>(
        "removeSharedTeamMember",
        {
          accountId: account.id,
          memberId: id,
        }
      );
      if (updatedAccount) setAccount(updatedAccount);
      toast.success(`Jogador ${id} removido com sucesso`);
      setInputValue("");
      setOpen(false);
    } catch (error) {
      toast.error(`Erro ao remover membro: ${error}`);
    }
  };

  // Função para lidar com depósitos
  const handleDepositShared = async () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value <= 0) {
      toast.error("Por favor, insira um valor válido");
      return;
    }

    if (!account) return;

    try {
      const updatedAccount = await fetchNui<accountProps>(
        "depositSharedAccount",
        {
          accountId: account.id,
          value,
        }
      );
      if (updatedAccount) setAccount(updatedAccount);
      toast.success(`Depósito de ${value} realizado com sucesso`);
      setInputValue("");
      setOpen(false);
    } catch (error) {
      toast.error(`Erro ao depositar: ${error}`);
    }
  };

  // Função para lidar com retiradas
  const handleWithdrawShared = async () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value <= 0) {
      toast.error("Por favor, insira um valor válido");
      return;
    }

    if (!account) return;

    if (account.balance < value) {
      toast.error("Saldo insuficiente para esta retirada");
      return;
    }

    try {
      const updatedAccount = await fetchNui<accountProps>(
        "withdrawSharedAccount",
        {
          accountId: account.id,
          value,
        }
      );
      if (updatedAccount) setAccount(updatedAccount);
      toast.success(`Retirada de ${value} realizada com sucesso`);
      setInputValue("");
      setOpen(false);
    } catch (error) {
      toast.error(`Erro ao retirar: ${error}`);
    }
  };

  // Escolher a ação com base no nome
  const handleConfirm = () => {
    switch (name) {
      case "Depositar":
        handleDepositShared();
        break;
      case "Retirar":
        handleWithdrawShared();
        break;
      case "Adicionar":
        handleAddTeamMember();
        break;
      case "Remover":
        handleRemoveTeamMember();
        break;
      default:
        // Transferir ou outra ação
        break;
    }
  };

  let value: valueProps;

  switch (name) {
    case "Depositar":
      value = {
        name: "Depositar",
        icon: <PiggyBankIcon className="size-8 text-[#2BFF00]" />,
        label: "Valor",
        variant: "green_action",
      };
      break;
    case "Retirar":
      value = {
        name: "Retirar",
        icon: <HandCoinsIcon className="size-8 text-[#DC2424]" />,
        label: "Valor",
        variant: "red_action",
      };
      break;
    case "Adicionar":
      value = {
        name: "Adicionar",
        icon: <UserPlusIcon className="size-8 text-[#2BFF00]" />,
        label: "ID do Jogador",
        variant: "green_action",
      };
      break;
    case "Remover":
      value = {
        name: "Remover",
        icon: <UserMinusIcon className="size-8 text-[#DC2424]" />,
        label: "ID do Jogador",
        variant: "red_action",
      };
      break;
    default:
      value = {
        name: "Transferir",
        label: "ID do Jogador",
        icon: <HandshakeIcon className="size-8 text-white" />,
        variant: "white_action",
      };
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={value.size ? value.size : "lg"} variant={value.variant}>
          {value.icon}
          {value.name}
        </Button>
      </DialogTrigger>
      <DialogContent className="fixed z-1000">
        <DialogHeader className="mb-6">
          <DialogTitle className="flex gap-4 justify-center items-center text-3xl">
            {value.icon} {value.name}
          </DialogTitle>
          <DialogDescription className="hidden">{value.name}</DialogDescription>
        </DialogHeader>
        <div className="my-6 space-y-6">
          <div>
            <Label>{value.label}</Label>
            <Input
              type={
                name === "Depositar" || name === "Retirar" ? "number" : "text"
              }
              placeholder={`Insira o ${value.label}`}
              min={0}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="w-full items-center">
          <Button size={"lg"} variant={value.variant} onClick={handleConfirm}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogActions;
