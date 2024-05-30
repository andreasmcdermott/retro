import { Reflect } from "@rocicorp/reflect/client";
import { useReflect } from "../AppState";
import {
  UserInfo,
  avatars,
  colors,
  getStoredUserInfo,
  updateStoredUserInfo,
} from "../state/client";
import { ColorButton, UnstyledButton } from "./Button";
import styles from "./userMenu.module.css";
import { M } from "../mutators";
import { TextInput } from "./TextInput";

const updateUserInfo = (r: Reflect<M>, change: Partial<UserInfo>) => {
  const newState = { ...getStoredUserInfo(), ...change };
  updateStoredUserInfo(newState);
  r.mutate.setUserInfo(newState);
};

export function UserMenu() {
  const r = useReflect();

  return (
    <>
      <fieldset className={styles.group}>
        <legend>Name</legend>
        <div style={{ gridColumn: "1 / -1" }}>
          <TextInput
            value={getStoredUserInfo().name}
            onChange={(v) => updateUserInfo(r, { name: v })}
          />
        </div>
      </fieldset>
      <fieldset className={styles.group}>
        <legend>Avatar</legend>
        {avatars.map(([emoji, name]) => (
          <UnstyledButton
            key={name}
            onClick={() => {
              updateUserInfo(r, { avatar: emoji });
            }}
          >
            {emoji}
          </UnstyledButton>
        ))}
      </fieldset>
      <fieldset className={styles.group}>
        <legend>Color</legend>
        {colors.map((color) => (
          <ColorButton
            key={color}
            color={color}
            onClick={() => {
              updateUserInfo(r, { color });
            }}
          />
        ))}
      </fieldset>
    </>
  );
}
