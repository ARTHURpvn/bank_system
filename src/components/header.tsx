import { ChevronLeft, CogIcon, PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Header = ({ name }: { name: string }) => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-between px-12 rounded-md items-center w-[85%] h-[7vh] bg-[linear-gradient(140deg,#093500_0%,#020500_43%)]">
      {name === "home" ? (
        <>
          <h1 className="text-3xl font-bold text-white">
            Contas Compartilhadas
          </h1>
          <Button asChild>
            <Link to="/shared">
              <CogIcon /> Gerenciar
            </Link>
          </Button>
        </>
      ) : name === "dashboard" ? (
        <>
          <Button onClick={handleClickBack} variant="ghost">
            <ChevronLeft /> Voltar
          </Button>
        </>
      ) : (
        <>
          <Button onClick={handleClickBack} variant="ghost">
            <ChevronLeft /> Voltar
          </Button>
          <Button>
            <PlusIcon /> Criar
          </Button>
        </>
      )}
    </div>
  );
};

export default Header;
