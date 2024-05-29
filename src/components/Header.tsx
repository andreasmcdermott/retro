import { useReducer } from "react";
import { useBoardInfo, useClients } from "../subscriptions";
import { Avatar } from "./Avatar";
import { CopyButton, UnstyledButton } from "./Button";
import styles from "./header.module.css";
import { TextInput } from "./TextInput";
import { useReflect } from "../AppState";

const useEditBoardName = () => {
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
        type: "start-editing" | "stop-editing" | "change-name";
        value?: string;
      }
    ) => {
      switch (type) {
        case "start-editing":
          return { ...state, isEditing: true, value };
        case "stop-editing":
          return { ...state, isEditing: false };
        case "change-name":
          r.mutate.setBoardInfo({ name: value });
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
    changeName: (newName: string) =>
      dispatch({ type: "change-name", value: newName }),
  };
};

export function Header() {
  const {
    state: { isEditing, value },
    startEditing,
    stopEditing,
    changeName,
  } = useEditBoardName();
  const otherClients = useClients();
  const boardInfo = useBoardInfo();

  return (
    <div className={styles.header}>
      <div className={styles.boardInfo}>
        {isEditing ? (
          <TextInput
            autoFocus
            value={value}
            onChange={changeName}
            onBlur={stopEditing}
            onEscape={stopEditing}
          />
        ) : (
          <h1 className={styles.boardTitle}>
            <UnstyledButton onClick={() => startEditing(boardInfo.name)}>
              {boardInfo.name}
            </UnstyledButton>
          </h1>
        )}
        <CopyButton value={location.href} color="var(--cyan)" />
      </div>
      <div className={styles.users}>
        {otherClients.map((client) => (
          <Avatar key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
}
