import DialogActions from "../dialogActionsShared";

const AccountShared = () => {
  return (
    <>
      <div className="self-end">
        <DialogActions name="Criar" />
      </div>

      <div className="flex w-full justify-between text-white items-center px-4 h-14 rounded-md bg-[#1A1A1A]/80">
        <div className="flex gap-4 items-center">
          <p>Depositar</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            <DialogActions name="Editar" />
            <DialogActions name="Excluir" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountShared;
