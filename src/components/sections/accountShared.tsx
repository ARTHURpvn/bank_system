"use client";

import { useEffect, useState } from "react";
import DialogActions from "../dialogActionsShared";
import { useRouter } from "next/navigation";

type teamProps = {
  name: string;
  id: number;
};

type historyProps = {
  type: string;
  value: number;
  date: string;
  id: number;
};

export type accountProps = {
  id: number;
  name: string;
  meta: number;
  balance: number;
  team: teamProps[];
  history?: historyProps[];
};

const AccountShared = () => {
  const router = useRouter();
  const [accounts, setAccounts] = useState<accountProps[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("accounts");
        return saved ? JSON.parse(saved) : [];
      } catch (error) {
        console.error("Erro ao carregar contas:", error);
        return [];
      }
    }
    return [];
  });

  const handleDelete = (id: number, e: React.MouseEvent) => {
    // Impedir propagação do evento para o elemento pai
    e.stopPropagation();

    const newAccounts = accounts.filter((account) => account.id !== id);
    setAccounts(newAccounts);
    localStorage.setItem("accounts", JSON.stringify(newAccounts));
  };

  const handleCreate = ({ name, meta }: { name: string; meta: number }) => {
    const newAccount = {
      id: accounts.length + 1,
      name: name,
      meta: meta,
      balance: 0,
      team: [],
    };
    const updatedAccounts = [...accounts, newAccount];
    setAccounts(updatedAccounts);
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
  };

  const handleEdit = (
    id: number,
    { name, meta }: { name: string; meta: number },
    e?: React.MouseEvent
  ) => {
    if (e) {
      e.stopPropagation();
    }

    const newAccounts = accounts.map((account) => {
      if (account.id === id) {
        return {
          ...account,
          name: name,
          meta: meta,
        };
      }
      return account;
    });

    setAccounts(newAccounts);
    localStorage.setItem("accounts", JSON.stringify(newAccounts));
    if (id === accounts[0].id) {
      localStorage.setItem("selectedAccount", JSON.stringify(newAccounts[0]));
    }
  };

  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  const handleSelect = (id: number) => {
    const selectedAccount = accounts.find((account) => account.id === id);
    if (selectedAccount) {
      localStorage.setItem("selectedAccount", JSON.stringify(selectedAccount));
      localStorage.setItem("navigation", JSON.stringify("dashboard"));

      // Atualiza a navegação e redireciona
      router.push("/shared");
    }
  };

  return (
    <>
      <div className="self-end">
        <DialogActions
          name="Criar"
          action={(data) =>
            handleCreate({
              name: data?.name || "",
              meta: data?.meta || 0,
            })
          }
        />
      </div>
      <div className="space-y-2 w-full">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="flex w-full justify-between text-white items-center px-4 h-14 rounded-md bg-[#1A1A1A]/80 cursor-pointer"
            onClick={() => handleSelect(account.id)}
          >
            <div className="flex gap-4 items-center">
              <p>{account.name}</p>
            </div>

            <div
              className="flex items-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex gap-2">
                <DialogActions
                  name="Editar"
                  initialValues={{ name: account.name, meta: account.meta }}
                  action={(data) =>
                    handleEdit(account.id, {
                      name: data?.name || account.name,
                      meta: data?.meta || account.meta,
                    })
                  }
                />
                <DialogActions
                  name="Excluir"
                  action={(data, e) => handleDelete(account.id, e!)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AccountShared;
