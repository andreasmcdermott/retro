import { useReducer } from "react";
import { useReflect } from "../AppState";

export const useEditState = (
  canEdit: boolean,
  onChange: (value: string) => void
) => {
  const r = useReflect();
  const [state, dispatch] = useReducer(
    (
      state: {
        isEditing: boolean;
        value: string;
      },
      {
        type,
        value = "",
      }: {
        type: "start-editing" | "stop-editing" | "change-value";
        value?: string;
      }
    ) => {
      if (!canEdit) return state;

      switch (type) {
        case "start-editing":
          return { ...state, isEditing: true, value };
        case "stop-editing":
          return { ...state, isEditing: false };
        case "change-value":
          onChange(value);
          return { ...state, isEditing: false };
        default:
          return state;
      }
    },
    { isEditing: false, value: "" }
  );

  return {
    state,
    startEditing: (currName: string) =>
      dispatch({ type: "start-editing", value: currName }),
    stopEditing: () => dispatch({ type: "stop-editing" }),
    changeValue: (newValue: string) =>
      dispatch({ type: "change-value", value: newValue }),
  };
};
