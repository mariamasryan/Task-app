import { useState } from "react";
import { TodoBoard } from "../todoBoard";
import { useSelector } from "react-redux";
import { todoSelectors } from "../../features/config";
import styles from "./styles.module.css";
import { Droppable } from "react-beautiful-dnd";
import { Modal } from "../modal";

export const Layout = () => {
  const boards = useSelector(todoSelectors.selectTodosData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleisModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Task App</h1>
        <div className={styles.container}>
          <div className={styles.navigation}>
            <span className={styles.newList} onClick={handleisModalOpen}>
              + New list
            </span>
          </div>
          <div className={styles.content}>
            {boards.map((board) => {
              return (
                <Droppable droppableId={`droppable-${board.id}`} key={board.id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        snapshot={snapshot}
                        className={styles.wrapper}
                      >
                        <TodoBoard board={board} id={board.id} />
                      </div>
                    );
                  }}
                </Droppable>
              );
            })}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
};
