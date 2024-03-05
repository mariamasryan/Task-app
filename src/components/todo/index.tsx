import React, { useState, useRef, useEffect } from "react";
import editIcon from "../../assets/icons/editIcon.png";
import deleteIcon from "../../assets/icons/deleteIcon.png";
import saveIcon from "../../assets/icons/saveIcon.png";
import spinner from "../../assets/icons/spinner.png";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { todoActions } from "../../features/config";
import { Task } from "features/todoSlice";

type TodoProps = {
  boardId: string;
  isFocused?: boolean;
  setIsAddActive: (isAddActive: boolean) => void;
  isAddActive: boolean;
  task?: Task;
};

export const Todo: React.FC<TodoProps> = ({
  boardId,
  isFocused,
  setIsAddActive,
  isAddActive,
  task
}) => {
  const [isActive, setIsActive] = useState(isFocused || false);
  const [text, setText] = useState(task?.title || "");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState(task?.completed || false);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.selectionStart = text.length;
    }
  }, [isActive]);

  useEffect(() => {
    if (!task) {
      return;
    }
    dispatch(
      todoActions.setCompletedTask({
        boardId,
        id: task.id,
        taskTitle: task.title,
        completed: isChecked,
      })
    );
  }, [isChecked]);

  const onComplete = () => {
    if (!task) {
      return;
    }
    setIsChecked(!isChecked);
  };

  const onDelete = () => {
    if (task) {
      dispatch(
        todoActions.deleteTask({
          boardId,
          taskId: task.id,
        })
      );
    } else {
      setIsAddActive(!isAddActive);
    }
  };

  const onUpdate = () => {
    if (task) {
      dispatch(
        todoActions.updateTask({
          boardId: boardId,
          task: {
            id: task.id,
            title: text,
            completed: isChecked,
          },
        })
      );
    } else {
      dispatch(
        todoActions.addTask({
          boardId,
          title: text,
          completed: isChecked,
        })
      );
      setIsAddActive(!isAddActive);
    }
  };
  return (
    <>
      <div className={`${styles.container} ${isActive && styles.active}`}>
        <div className={styles.checkbox}>
          <input
            ref={checkboxRef}
            type="checkbox"
            defaultChecked={task?.completed}
            onChange={onComplete}
          />
        </div>
        <div className={styles.header}>
          <div className={styles.textInputWrapper}>
            {isActive ? (
              <input
                type="text"
                ref={inputRef}
                className={styles.textInput}
                value={text}
                onChange={(event) => {
                  setText(event.target.value);
                }}
              />
            ) : (
              <div className={styles.textInput}>{text}</div>
            )}
          </div>
          <div className={styles.actionsWrapper}>
            <div
              className={styles.iconWrapper}
              onClick={() => setIsActive(!isActive)}
            >
              {!isActive ? (
                <img src={editIcon} />
              ) : (
                <img src={saveIcon} onClick={onUpdate} />
              )}
            </div>
            <div className={styles.iconWrapper} onClick={onDelete}>
              <img src={deleteIcon} alt="delete" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
