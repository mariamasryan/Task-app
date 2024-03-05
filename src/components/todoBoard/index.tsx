import React, { useState } from "react";
import styles from "./styles.module.css";
import { Todo } from "../todo";
import { Draggable } from "react-beautiful-dnd";
import { FloatingButton } from "../floatingButton";
import { Board } from "../../features/todoSlice";

type TodoBoardProps = {
  board: Board
  id: string;
}

export const TodoBoard: React.FC<TodoBoardProps> = ({ board, id }) => {
  const [isAddActive, setIsAddActive] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.titleText}>{board.title}</h1>
        <FloatingButton onPress={() => setIsAddActive(!isAddActive)} />
      </div>
      <div className={styles.toggleWrapper}>
        <div className={styles.container}>
          {board.tasks?.map((task, index) => (
            <Draggable
              draggableId={`draggable-${task.id}`}
              index={index}
              key={task.id}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={styles.wrapper}
                >
                  <Todo
                    key={task.id} 
                    boardId={id}
                    task={task}
                    setIsAddActive={setIsAddActive}
                    isAddActive={isAddActive}
                  />

                </div>
              )}
            </Draggable>
          ))}
          {isAddActive && (
            <Todo
              boardId={id}
              isFocused={true}
              setIsAddActive={setIsAddActive}
              isAddActive={isAddActive}
            />
          )}
        </div>
      </div>
    </div>
  );
};
