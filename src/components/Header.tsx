import { useBoardInfo, useUsers } from "../subscriptions";
import { Avatar } from "./Avatar";
import { Button, CopyButton, IconButton, UnstyledButton } from "./Button";
import styles from "./header.module.css";
import { TextInput } from "./TextInput";
import { useReflect, useUserId } from "../AppState";
import { useEditState } from "../hooks/useEditState";
import { Check, Cog, Edit, New, PlusOne, User, Viewing } from "../icons";
import { Popover } from "./Popover";
import { UserMenu } from "./UserMenu";
import { nanoid } from "nanoid";
import { gotoNewBoard } from "../utils/navigation";
import { Fieldset } from "./Fieldset";

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
          <>
            <IconButton
              id="mode-menu-trigger"
              popovertarget="mode-menu"
              popovertargetaction="toggle"
              color="var(--yellow)"
            >
              <Cog />
            </IconButton>
            <Popover id="mode-menu" align="left">
              <Fieldset legend="Mode">
                <div className={styles.boardSettingsMenu}>
                  <UnstyledButton
                    onClick={() => {
                      r.mutate.setBoardMode({ userId, mode: "editing" });
                    }}
                    aria-selected={boardInfo.mode === "editing"}
                  >
                    <span>
                      <Check />
                    </span>
                    <strong>Write</strong>
                    <small>
                      Submit anything you want to discuss or give kudos to.
                    </small>
                  </UnstyledButton>
                  <UnstyledButton
                    onClick={() => {
                      r.mutate.setBoardMode({ userId, mode: "voting" });
                    }}
                    aria-selected={boardInfo.mode === "voting"}
                  >
                    <span>
                      <Check />
                    </span>
                    <strong>Vote</strong>
                    <small>
                      Vote on the topics you find most important to discuss.
                    </small>
                  </UnstyledButton>
                  <UnstyledButton
                    onClick={() => {
                      r.mutate.setBoardMode({ userId, mode: "viewing" });
                    }}
                    aria-selected={boardInfo.mode === "viewing"}
                  >
                    <span>
                      <Check />
                    </span>
                    <strong>Discuss</strong>
                    <small>View all submitted topics ordered by upvotes.</small>
                  </UnstyledButton>
                </div>
              </Fieldset>
            </Popover>
          </>
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
