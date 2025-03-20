import { CogIcon } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="flex justify-between px-12 rounded-md items-center w-[85%] h-[7vh] bg-linear-[140deg,#093500_0%,#020500_43%]">
      <h1 className="text-3xl font-bold">Contas Compartilhadas</h1>
      <Button>
        <CogIcon /> Gerenciar
      </Button>
    </div>
  );
};

export default Header;
