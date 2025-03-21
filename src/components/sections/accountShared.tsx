"use client";

import { useState } from "react";
import DialogActions from "../dialogActionsShared";

type teamProps = {
  name: string;
  id: string;
};

export type accountProps = {
  id: number;
  name: string;
  meta: number;
  balance: number;
  team: teamProps[];
};

const AccountShared = () => {
  const [accounts, setAccounts] = useState<accountProps[]>([
    {
      id: 1,
      name: "Minha conta",
      meta: 1000,
      balance: 500,
      team: [{ name: "Arthur", id: "1" }],
    },
    {
      id: 2,
      name: "Minha segunda conta",
      meta: 1000,
      balance: 500,
      team: [{ name: "Arthur", id: "1" }],
    },
  ]);

  const handleDelete = (id: number) => {
    const newAccounts = accounts.filter((account) => account.id !== id);
    setAccounts(newAccounts);
  };

  const handleCreate = ({ name, meta }: { name: string; meta: number }) => {
    const newAccount = {
      id: accounts.length + 1,
      name: name,
      meta: meta,
      balance: 0,
      team: [],
    };
    setAccounts([...accounts, newAccount]);
  };

  const handleEdit = (
    id: number,
    { name, meta }: { name: string; meta: number }
  ) => {
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
            className="flex w-full justify-between text-white items-center px-4 h-14 rounded-md bg-[#1A1A1A]/80"
          >
            <div className="flex gap-4 items-center">
              <p>{account.name}</p>
            </div>

            <div className="flex items-center gap-6">
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
                  action={() => handleDelete(account.id)}
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
