import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface Board {
  id: string;
  title: string;
  isInitial: boolean;  
  tasks: Task[];
  done: boolean,
  isOriginal: boolean
}

export interface TodoState {
  boards: Board[];
}

const initialState: TodoState = {
  boards: [
    {
      id: uuidv4(),
      title: "My Tasks",
      isInitial: true,
      tasks: [],
      done: false,
      isOriginal: false
    }
  ],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addNewBoard: (state, action: PayloadAction<{ boardTitle: string; isDone: boolean }>) => {
      const { boardTitle, isDone } = action.payload;
      return {
        ...state,
        boards: state.boards.concat({
          id: uuidv4(),
          title: boardTitle,
          isInitial: false,
          tasks: [],
          done: isDone,
          isOriginal: false
        }),
      };
    },
    setCompletedTask: (
      state,
      action: PayloadAction<{ boardId: string; id: string; taskTitle: string; completed: boolean }>
    ) => {
      const { boardId, id, taskTitle, completed } = action.payload;
      const board = state.boards.find(board => board.id === boardId);
      const doneBoard = state.boards.find(board => board.done);    
      if (board) {
        const taskIndex = board.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
          const updatedTasks = [...board.tasks];
          updatedTasks[taskIndex] = {
            ...updatedTasks[taskIndex],
            completed: completed
          };
          board.tasks = updatedTasks;
          board.isOriginal = true
          // move task to done board or delete from there
          if (completed && doneBoard) {
            const taskToMove = board.tasks.splice(taskIndex, 1)[0];
            doneBoard.tasks.push(taskToMove);
          } else {
            const taskToMove = doneBoard?.tasks.find(task => task.id === id);
              if(doneBoard && taskToMove){
                doneBoard.tasks = doneBoard.tasks.filter(task => task.id !== id);
                const originalBoard = state.boards.find(item => item.isInitial)
                originalBoard?.tasks.push(taskToMove);
              }
            
          }
        }
      }
    },
    
    addTaskToDoneBoardOrDeleteFromThere: (
      state,
      action: PayloadAction<{
        boardId: string;
        id: string;
        taskTitle: string;
        completed: boolean;
      }>
    ) => {
      const { boardId, id, taskTitle, completed } = action.payload;
      const board = state.boards.find((item) => item.id === boardId);
      const doneBoard = state.boards.find((item) => item.done)

      if (board) {
        const task = board.tasks.find((task) => task.id === id);
        if (task) {
          if (completed) {
         
            if (doneBoard) {
              doneBoard.tasks.push(task);
              board.tasks = board.tasks.filter((item) => item.id !== id);
            }
          } else {
           
            if (doneBoard) {
              board.tasks.push(task);
              doneBoard.tasks = board.tasks.filter((item) => item.id !== id);
            }
          }
        }
      }
    },

    deleteTask: (state, action: PayloadAction<{ boardId: string; taskId: string }>) => {
      const { boardId, taskId } = action.payload;
      return {
        ...state,
        boards: state.boards.map((item) =>
          item.id === boardId
            ? {
              ...item,
              tasks: item.tasks.filter((item) => item.id !== taskId),
            }
            : item
        ),
      };
    },

    updateTask: (state, action: PayloadAction<{ boardId: string; task: Task }>) => {
      const { boardId, task } = action.payload;
      const board = state.boards.find((board) => board.id === boardId)

      if (board) {
        board.tasks.forEach((elem) => {
          if (elem.id === task.id) {
            elem.title = task.title;
            elem.completed = task.completed;
          }
        });
      }
    },

    addTask: (state, action: PayloadAction<{ boardId: string; title: string, completed: boolean }>) => {
      const { boardId, title, completed } = action.payload;
      return {
        ...state,
        boards: state.boards.map((item) =>
          item.id === boardId
            ? {
              ...item,
              tasks: item.tasks.concat({
                id: uuidv4(),
                completed: completed,
                title: title,
              }),
            }
            : item
        ),
      };
    },

    addTaskToSpecificBoard: (state, action: PayloadAction<any>) => {
      const { source, destination, draggableId } = action.payload;
      const destinationBoardId = destination.droppableId.substring(destination.droppableId.indexOf('-') + 1);
      const sourceBoardId = source.droppableId.substring(source.droppableId.indexOf('-') + 1);
      const taskId = draggableId.substring(draggableId.indexOf('-') + 1);
      const board = state.boards.find((item) => item.id === sourceBoardId);
      const task = board?.tasks.find((task) => task.id === taskId);
      return {
        ...state,
        boards: state.boards.map((item) =>
          item.id === sourceBoardId
            ? {
              ...item,
              tasks: item.tasks.filter((task) => task.id !== taskId),
            }
            : item.id === destinationBoardId
              ? {
                ...item,
                tasks: item.tasks.concat(task as Task),
              }
              : item
        ),
      };
    },
  },
});

export const {
  setCompletedTask,
  deleteTask,
  updateTask,
  addTask,
  addTaskToSpecificBoard,
  addNewBoard,
  addTaskToDoneBoardOrDeleteFromThere
} = todoSlice.actions;

export default todoSlice.reducer;