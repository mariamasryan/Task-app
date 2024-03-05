import * as selectors from "./selectors";
import { todoSlice } from "./todoSlice";

export const todoActions = {
    ...todoSlice.actions
}

export const todoSelectors = {
    ...selectors
}

