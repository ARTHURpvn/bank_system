import { PenIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";

const AccountShared = () => {
  return (
    <>
      <Button variant={"outline"} className="self-end">
        <PlusIcon /> Criar
      </Button>
      <div className="flex w-full justify-between text-white items-center px-4 h-14 rounded-md bg-[#1A1A1A]/80">
        <div className="flex gap-4 items-center">
          <p>Depositar</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            <Button variant={"ghost"}>
              <PenIcon />
            </Button>
            <Button variant={"destructive"}>
              <Trash2Icon />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountShared;
