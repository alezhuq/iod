"use client";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { createUserResult } from "@/actions";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useSnackbar } from "notistack";

const App = () => {
  const [listItems, setListItems] = useState([
    { id: "1", number: 1, title: "Heinz" },
    { id: "2", number: 2, title: "Hunt's" },
    { id: "3", number: 3, title: "French's" },
    { id: "4", number: 4, title: "Торчин" },
    { id: "5", number: 5, title: "Чумак" },
    { id: "6", number: 6, title: "Hellmann's" },
    { id: "7", number: 7, title: "Muir Glen" },
    { id: "8", number: 8, title: "Королівський смак" },
    { id: "9", number: 9, title: "Руна" },
    { id: "10", number: 10, title: "Simply Heinz" },
    { id: "11", number: 11, title: "Trader Joe's" },
    { id: "12", number: 12, title: "365 Everyday Value" },
  ]);

  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const copyTodos = [...listItems];
    const [reorderTodo] = copyTodos.splice(startIndex, 1);
    copyTodos.splice(endIndex, 0, reorderTodo);
    setListItems(copyTodos);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createUserResult({ userResults: listItems, userName });

      enqueueSnackbar("Ваші відповіді успішно відправлені", {
        variant: "success",
      });
      setLoading(false);
    } catch (error) {
      enqueueSnackbar("Введенні дані не коректні", { variant: "error" });
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "70%",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: 50,
        paddingBottom: 50,
      }}
    >
      <Input
        variant="bordered"
        size="sm"
        className="mb-2 text-black"
        placeholder="Введіть своє ім'я"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul
              className=" flex flex-col"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {listItems.map((elem, index) => {
                return (
                  <Draggable key={elem.id} draggableId={elem.id} index={index}>
                    {(provided) => (
                      <li
                        className="p-3 mb-2 rounded-xl text-black bg-orange-400 text-lg font-bold"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <p className=" flex gap-3">
                          <span> {elem.number}</span>
                          <span> {elem.title}</span>
                        </p>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        color={loading ? "default" : "success"}
        onClick={handleSubmit}
        className="mt-4"
        disabled={loading}
        disableAnimation={loading}
        disableRipple={loading}
      >
        Відправити
      </Button>
    </div>
  );
};

export default App;
