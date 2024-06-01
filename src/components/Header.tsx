import { useBoardInfo, useUsers } from "../subscriptions";
import { Avatar } from "./Avatar";
import { Button, CopyButton, IconButton, UnstyledButton } from "./Button";
import styles from "./header.module.css";
import { TextInput } from "./TextInput";
import { useReflect, useUserId } from "../AppState";
import { useEditState } from "../hooks/useEditState";
import { Edit, New, PlusOne, User, Viewing } from "../icons";
import { Popover } from "./Popover";
import { UserMenu } from "./UserMenu";
import { nanoid } from "nanoid";
import { gotoNewBoard } from "../utils/navigation";

export function Header() {
  const users = useUsers();
  const boardInfo = useBoardInfo();
  const userId = useUserId();
  const r = useReflect();
  const isOwner = !!boardInfo && userId === boardInfo.owner;
  const {
    state: { isEditing, value },
    startEditing,
    stopEditing,
    changeValue,
  } = useEditState(isOwner, (v) =>
    r.mutate.updateBoardName({ userId, name: v })
  );

  if (!boardInfo) return null;

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
            color="var(--yellow)"
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
        <CopyButton value={location.href} color="var(--yellow)" />
        <div className={styles.users}>
          {users.map((user) => (
            <Avatar key={user.id} userId={user.id} />
          ))}
        </div>
      </div>
      <div className={styles.otherActions}>
        <Button onClick={() => gotoNewBoard(true)}>
          <New /> Create New Board
        </Button>
        <Button
          id="user-menu-trigger"
          popovertarget="user-menu"
          popovertargetaction="toggle"
        >
          <User />
        </Button>
        <Popover id="user-menu" align="right">
          <UserMenu />
        </Popover>
      </div>
    </div>
  );
}
