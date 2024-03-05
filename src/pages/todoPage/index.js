import {useDispatch, useSelector} from "react-redux";
import {Layout} from "../../components/layout";
import {DragDropContext} from "react-beautiful-dnd";
import {addTaskToSpecificBoard} from "../../features/todoSlice";

export const TodoPage = () => {
  const dispatch = useDispatch();
  
  function onDragEnd(result) {
    dispatch(addTaskToSpecificBoard(result));
  }
  
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd} >
        <Layout/>
      </DragDropContext>
    </>
  );
};
