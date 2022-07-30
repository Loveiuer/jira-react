import { useCallback, useReducer, useState } from "react";

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

interface StateType<T> {
    past: T[];
    present: T;
    future: T[];
}

interface ActionType<T> {
    type: "UNDO" | "REDO" | "SET" | "RESET";
    data?: T;
}

const undoReducer = <T>(state: StateType<T>, action: ActionType<T>) => {
    const { past, present, future } = state;
    switch (action.type) {
        case UNDO:
            if (past.length === 0) return state;

            const previous = past[past.length - 1];
            const newPast = past.slice(0, past.length - 1);
            return {
                past: newPast,
                present: previous,
                future: [present, ...future],
            };

        case REDO:
            if (future.length === 0) return state;

            const next = future[0];
            const newFuture = future.slice(1);

            return {
                past: [...past, present],
                present: next,
                future: newFuture,
            };

        case SET:
            if (action.data === present) {
                return state;
            }
            return {
                past: [...past, present],
                present: action.data,
                future: [],
            };

        case RESET:
            return {
                past: [],
                present: action.data,
                future: [],
            };
    }
};

export const useUndo = <T>(initialPresent: T) => {
    const [state, dispatch] = useReducer(undoReducer, {
        past: [],
        present: initialPresent,
        future: [],
    } as StateType<T>);

    const canUndo = state.past.length !== 0;
    const canRedo = state.future.length !== 0;

    const undo = useCallback(() => {
        dispatch({ type: UNDO });
    }, []);

    const redo = useCallback(() => {
        dispatch({ type: REDO });
    }, []);

    const set = useCallback((newPresent: T) => {
        dispatch({ type: SET, data: newPresent });
    }, []);

    const reset = useCallback((newPresent: T) => {
        dispatch({ type: RESET, data: newPresent });
    }, []);

    return [state, { set, reset, undo, redo, canUndo, canRedo }] as const;
};
