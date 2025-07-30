import { useContext } from "react";
import { Button, Card } from ".";
import { Context } from "@/ContextApp";
import { produce } from "immer";
import { useDroppable } from "@dnd-kit/core";


export function Column(props) {
  const { id: ColumnId, title, tasks } = props;
  const { data, setData, select } = useContext(Context);
  const { setNodeRef } =
    useDroppable({
      id: ColumnId,
      data: { type: "column" },
    });

  const handleAddNewTask = () => {
    const newTask = {
      id: Date.now(),
      title: "Nueva Tarea",
      description: "Descripción",
    };

    const newColumns = data[select]?.columns?.map((column) => {
      if (column.id !== ColumnId) return column;
      return {
        ...column,
        tasks: [...(column.tasks || []), newTask],
      };
    });

    setData((prev) =>
      produce(prev, (draft) => {
        draft[select].columns = newColumns;
      }),
    );
  };

  const handleDeleteColumn = () => {
    if (window.confirm(`Está seguro que desea eliminar esto "${title}"?`)) {
      setData((prev) =>
        produce(prev, (draft) => {
          draft[select].columns = draft[select]?.columns?.filter(
            (column) => column.id !== ColumnId,
          );
        }),
      );
    }
  };

  return (
    <div
      ref={tasks.length === 0 ? setNodeRef : null}
      className="flex w-72 shrink-0 flex-col self-start rounded-lg bg-lines-light px-2 shadow"
    >
      <h2 className="group/column relative top-0 rounded bg-lines-light px-2 py-4 text-heading-s">
        {title} ({tasks?.length})
        <button
          className="absolute bottom-0 right-0 top-0 p-2 text-body-m text-red opacity-0 duration-300 focus:opacity-100 group-hover/column:opacity-100"
          onClick={handleDeleteColumn}
        >
          Eliminar
        </button>
      </h2>
      <div className="mb-5 flex flex-col gap-5 transition-all duration-200 ease-in-out">
        {tasks?.map((_, index) => (
          <Card
            id={tasks[index]?.id}
            key={tasks[index]?.id}
            title={tasks[index]?.title}
            description={tasks[index]?.description}
            columnId={ColumnId}
          />
        ))}
      </div>
      <Button
        variant="buttonForAddTask"
        size="lg"
        isFullWidth={true}
        onClick={handleAddNewTask}
      >
        + Agregar Nueva Tarea
      </Button>
    </div>
  );
}
