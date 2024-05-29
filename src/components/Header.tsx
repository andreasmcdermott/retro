import { useBoardInfo, useClients } from "../subscriptions";
import { Avatar } from "./Avatar";
import { CopyButton, IconButton, UnstyledButton } from "./Button";
import styles from "./header.module.css";
import { TextInput } from "./TextInput";
import { useReflect, useUserId } from "../AppState";
import { useEditState } from "../hooks/useEditState";
import { Edit, PlusOne, Viewing } from "../icons";

export function Header() {
  const clients = useClients();
  const boardInfo = useBoardInfo();
  const userId = useUserId();
  const r = useReflect();
  const isOwner = userId === boardInfo.owner;
  const {
    state: { isEditing, value },
    startEditing,
    stopEditing,
    changeValue,
  } = useEditState(isOwner, (v) =>
    r.mutate.updateBoardName({ userId, name: v })
  );

  return (
    <div className={styles.header}>
      <div className={styles.boardInfo}>
        {isEditing ? (
          <TextInput
            autoFocus
            value={value}
            onChange={changeValue}
            onBlur={stopEditing}
            onEscape={stopEditing}
          />
        ) : (
          <h1 className={styles.boardTitle}>
            {isOwner ? (
              <UnstyledButton onClick={() => startEditing(boardInfo.name)}>
                {boardInfo.name}
              </UnstyledButton>
            ) : (
              boardInfo.name
            )}
          </h1>
        )}
        {isOwner && (
          <IconButton
            onClick={() => {
              r.mutate.cycleBoardMode(userId);
            }}
            color="var(--cyan)"
          >
            {boardInfo.mode === "viewing" ? (
              <Viewing />
            ) : boardInfo.mode === "voting" ? (
              <PlusOne />
            ) : (
              <Edit />
            )}
          </IconButton>
        )}
        <CopyButton value={location.href} color="var(--cyan)" />
      </div>
      <div className={styles.users}>
        {clients.map((client) => (
          <Avatar key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
}
