import { Button, TextField } from "@/components";
import { Context } from "@/ContextApp";
import iconCross from "@assets/icon-cross.svg";
import { useContext, useState } from "react";


export function CreateAndEditBoard({ setOpen, Action }) {
  const { data, setData, select, setSelect } = useContext(Context);
  const [addColumn, setAddColumns] = useState(
    data[select]?.columns && Action === "Editar Tablero"
      ? [...data[select].columns]
      : [{ id: Date.now() }],
  );

  const addNewColumnHandler = () => {
    setAddColumns((prev) => [
      ...prev,
      {
        id: Date.now(),
      },
    ]);
  };

  const removeColumnHandler = (id) => {
    setAddColumns((cols) => cols.filter((item) => item.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const boardName = formData.get("BoardName");
    const columnNames = formData.getAll("ColumnName").filter(Boolean);
    switch (Action) {
      case "Editar Tablero": {
        const columns = columnNames?.map((name, i) => ({
          id: i + 1,
          title: name,
          tasks: data[select]?.columns[i]?.tasks || [],
        }));

        setData((prev) =>
          prev.map((item, index) =>
            index === select
              ? {
                  ...item,
                  title: boardName,
                  columns: columns,
                }
              : item,
          ),
        );
        setSelect(select);
        break;
      }

      case "Crear Nuevo Tablero": {
        const newBoard = {
          id: Date.now(),
          title: boardName,
          columns: columnNames.map((name, i) => ({
            id: i + 1,
            title: name,
            tasks: [],
          })),
        };
        setData([...data, newBoard]);
        setSelect(data?.length);
        break;
      }
      default:
        break;
    }
    if (setOpen) {
      setOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3 className="pb-2 pt-6 text-body-m text-medium-grey">Nombre</h3>
        <TextField
          placeholder="Nombre del Tablero"
          name="BoardName"
          defaultValue={
            data[select]?.title && Action === "Editar Tablero"
              ? data[select]?.title
              : ""
          }
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="pt-6 text-body-m text-medium-grey">Columna</h3>
        {addColumn.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <TextField
              placeholder="Nombre de la Columna"
              name="ColumnName"
              defaultValue={
                item.title && Action === "Editar Tablero" ? item.title : ""
              }
              required
            />
            <button type="button" onClick={() => removeColumnHandler(item.id)}>
              <img src={iconCross} alt="icon cross" />
            </button>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={addNewColumnHandler}
        >
          + Agregar Nueva Columna
        </Button>
      </div>
      <div className="mt-6">
        <Button type="submit" variant="primary" size="sm" isFullWidth>
          {Action}
        </Button>
      </div>
    </form>
  );
}
