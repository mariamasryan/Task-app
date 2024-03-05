import { createSelector } from "reselect";

const todoSelector = (state) => state.todo;
export const selectTodosData = createSelector(todoSelector, todo => todo.boards)
