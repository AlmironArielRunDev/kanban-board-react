import {
  CreateAndEditBoard,
  CustomDialog,
  CustomDropdownMenu,
} from "@/components";
import { Context } from "@/ContextApp";
import iconVerticalEllipsis from "@assets/icon-vertical-ellipsis.svg";
import { produce } from "immer";
import { useContext, useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  const { data, setData, select, setSelect } = useContext(Context);

  const onDeleteBoard = () => {
    if (window.confirm("Está seguro que quiero eliminar este tablero?")) {
      console.log('eliminar tablero')
      setData(
        produce(data, (draft) => {
          draft.splice(select, 1);
        }),
      );
      setSelect(0);
    }
  };

  return (
    <header className="flex h-[97px] shrink-0 items-center">
      <div className="flex w-[300px] items-center gap-4 self-stretch border-b border-r border-lines-light pl-8 text-[32px] font-bold">
        Kanban
      </div>
      <div className="flex flex-1 items-center justify-between self-stretch border-b border-lines-light pl-6 pr-6">
        <h2 className="text-heading-xl">Tus Tableros</h2>
        <CustomDropdownMenu
          items={{
            edit: {
              label: "Editar Tablero",
              onClick: data?.length > 0 ? () => setOpen(true) : null,
              isActive: data?.length > 0,
            },
            delete: {
              label: "Eliminar Tablero",
              onClick: data?.length > 0 ? onDeleteBoard : null,
              isActive: data?.length > 0,
            },
          }}
          triggerComponent={() => (
            <button className="flex h-8 w-8 items-center justify-center gap-2 rounded-full text-[14px] font-bold text-main-purple">
              <img src={iconVerticalEllipsis} alt="icono vertical" />
            </button>
          )}
        />
        <CustomDialog
          isOpen={open}
          setOpen={setOpen}
          title="Editar Tablero"
          description="Edite los detalles del tablero aquí."
        >
          <CreateAndEditBoard
            Action="Editar Tablero"
            isOpen={open}
            setOpen={setOpen}
          />
        </CustomDialog>
      </div>
    </header>
  );
}
