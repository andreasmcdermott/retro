import { Reflect } from "@rocicorp/reflect/client";
import { useReflect } from "../AppState";
import { ColorButton, UnstyledButton } from "./Button";
import styles from "./userMenu.module.css";
import { M } from "../mutators";
import { TextInput } from "./TextInput";
import { UserInfo, avatars, colors } from "../state/user";
import { useCurrentUser } from "../subscriptions";
import { Fieldset } from "./Fieldset";

const updateUserInfo = (
  r: Reflect<M>,
  userId: string,
  change: Partial<UserInfo>
) => {
  r.mutate.updateUserState({ id: userId, ...change });
};

export function UserMenu() {
  const r = useReflect();
  const user = useCurrentUser();

  if (!user) return null;

  return (
    <>
      <Fieldset legend="Name">
        <div className={styles.group}>
          <div style={{ gridColumn: "1 / -1" }}>
            <TextInput
              value={user.name}
              onChange={(v) => updateUserInfo(r, user.id, { name: v })}
            />
          </div>
        </div>
      </Fieldset>
      <Fieldset legend="Avatar">
        <div className={styles.group}>
          {avatars.map(([emoji, name]) => (
            <UnstyledButton
              key={name}
              onClick={() => {
                updateUserInfo(r, user.id, { avatar: emoji });
              }}
            >
              {emoji}
            </UnstyledButton>
          ))}
        </div>
      </Fieldset>
      <Fieldset legend="Color">
        <div className={styles.group}>
          {colors.map((color) => (
            <ColorButton
              key={color}
              color={color}
              onClick={() => {
                updateUserInfo(r, user.id, { color });
              }}
            />
          ))}
        </div>
      </Fieldset>
    </>
  );
}
