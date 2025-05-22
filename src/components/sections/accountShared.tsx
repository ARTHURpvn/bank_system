"use client";

import { useEffect, useState } from "react";
import DialogActions from "../dialogActionsShared";
import { useRouter } from "next/navigation";
import { fetchNui, useNuiEvent } from "@/hooks/nui";

type teamProps = {
  name: string;
  id: number;
};

export type historyProps = {
  type: string;
  value: number;
  date?: string;
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
  const [accounts, setAccounts] = useState<accountProps[]>([]);

  // Buscar contas compartilhadas do backend
  useEffect(() => {
    const getUserInfo = async () => {
      const result = await fetchNui<accountProps[]>("getSharedAccounts", {}, [
        {
          id: 1,
          name: "Test Account",
          meta: 1000,
          balance: 0,
          team: [
            { id: 1, name: "Player 1" },
            { id: 2, name: "Player 2" },
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
        },
      ]);
      setAccounts(result);
    };
    getUserInfo();
  }, []);

  // Atualizar contas em tempo real via evento do backend
  useNuiEvent<accountProps[]>(
    "updateSharedAccounts",
    (data: accountProps[]) => {
      setAccounts(data);
    }
  );

  // Excluir conta compartilhada
  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const updatedAccounts = await fetchNui<accountProps[]>(
        "deleteSharedAccount",
        { id }
      );
      setAccounts(updatedAccounts);
    } catch {
      // fallback visual
      setAccounts((prev) => prev.filter((account) => account.id !== id));
    }
  };

  // Criar nova conta compartilhada
  const handleCreate = async ({
    name,
    meta,
  }: {
    name: string;
    meta: number;
  }) => {
    try {
      const updatedAccounts = await fetchNui<accountProps[]>(
        "createSharedAccount",
        {
          name,
          meta,
        }
      );
      setAccounts(updatedAccounts);
    } catch {
      // fallback visual
      const newAccount: accountProps = {
        id: accounts.length + 1,
        name,
        meta,
        balance: 0,
        team: [],
      };
      setAccounts((prev) => [...prev, newAccount]);
    }
  };

  // Editar conta compartilhada
  const handleEdit = async (
    id: number,
    { name, meta }: { name: string; meta: number },
    e?: React.MouseEvent
  ) => {
    if (e) e.stopPropagation();
    try {
      const updatedAccounts = await fetchNui<accountProps[]>(
        "editSharedAccount",
        {
          id,
          name,
          meta,
        }
      );
      setAccounts(updatedAccounts);
    } catch {
      // fallback visual
      setAccounts((prev) =>
        prev.map((account) =>
          account.id === id ? { ...account, name, meta } : account
        )
      );
    }
  };

  // Selecionar conta compartilhada
  const handleSelect = async (id: number) => {
    const selectedAccount = accounts.find((account) => account.id === id);
    if (selectedAccount) {
      await fetchNui("selectSharedAccount", { id });
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
