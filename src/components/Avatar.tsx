import { useBoardInfo, useUser } from "../subscriptions";
import { Popover } from "./Popover";
import styles from "./avatar.module.css";

export function Avatar({ userId }: { userId: string }) {
  const user = useUser(userId);
  const popoverId = `popover-${userId}`;
  const boardInfo = useBoardInfo();

  if (!user) return null;

  return (
    <>
      <button
        id={`${popoverId}-trigger`}
        type="button"
        className={styles.avatar}
        style={{
          backgroundColor: user.color,
          boxShadow: `0 0 1rem ${user.color}`,
        }}
        ref={(node) => {
          if (node) {
            node.setAttribute("popovertarget", popoverId);
            node.setAttribute("popovertargetaction", "toggle");
          }
        }}
      >
        {user.avatar}
      </button>
      <Popover id={popoverId} align="center">
        {`${user.name}${boardInfo?.owner === user.id ? " (owner)" : ""}`}
      </Popover>
    </>
  );
}
