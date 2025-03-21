import { ChevronLeft, CogIcon, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header = ({ name }: { name: string }) => {
  const router = useRouter();
  const handleClickBack = () => {
    router.back();
  };
  return (
    <div className="flex justify-between px-12 rounded-md items-center w-[85%] h-[7vh] bg-linear-[140deg,#093500_0%,#020500_43%]">
      {name == "home" ? (
        <>
          <h1 className="text-3xl font-bold">Contas Compartilhadas</h1>
          <Button asChild>
            <Link href="/shared">
              <CogIcon /> Gerenciar
            </Link>
          </Button>
        </>
      ) : name == "dashboard" ? (
        <>
          <Button onClick={handleClickBack} variant={"ghost"}>
            <ChevronLeft /> Voltar
          </Button>
        </>
      ) : (
        <>
          <Button onClick={handleClickBack} variant={"ghost"}>
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
