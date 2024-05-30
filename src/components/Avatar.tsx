import { ClientState } from "../state/client";
import { useBoardInfo } from "../subscriptions";
import { Popover } from "./Popover";
import styles from "./avatar.module.css";

export function Avatar({ client }: { client: ClientState }) {
  const popoverId = `popover-${client.userId}`;
  const boardInfo = useBoardInfo();

  return (
    <>
      <button
        id={`${popoverId}-trigger`}
        type="button"
        className={styles.avatar}
        style={{
          backgroundColor: client.userInfo.color,
          boxShadow: `0 0 1rem ${client.userInfo.color}`,
        }}
        ref={(node) => {
          if (node) {
            node.setAttribute("popovertarget", popoverId);
            node.setAttribute("popovertargetaction", "toggle");
          }
        }}
      >
        {client.userInfo.avatar}
      </button>
      <Popover id={popoverId} align="center">
        {`${client.userInfo.name}${
          boardInfo?.owner === client.userId ? " (owner)" : ""
        }`}
      </Popover>
    </>
  );
}
