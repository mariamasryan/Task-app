import { useState } from "react";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { todoActions } from "../../features/config";

export const Modal = ({ onClose }) => {
  const [boardTitle, setIsBoardTitle] = useState("");
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  const handleIsDoneBoard = () => {
    dispatch(todoActions.addNewBoard({
      boardTitle: boardTitle,
      isDone: isChecked
    }))
    onClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleIsDoneBoard()
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.closeModal} onClick={onClose} >
          X
        </div>
        <div className={styles.modalInput}>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className={styles.form}
          >
            <input
              type="text"
              value={boardTitle}
              className={styles.text}
              onChange={(e) => {
                setIsBoardTitle(e.target.value);
              }}
              placeholder="Enter list title"
            />

            <div className={styles.isDone}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className={styles.checkbox}
              />
              <span>is done</span>
            </div>

            <button className={styles.done}>
              Create list
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
