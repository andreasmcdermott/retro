import { useEffect, useState } from "react";
import { useBoardInfo } from "../subscriptions";
import { Column } from "./Column";
import styles from "./main.module.css";
import { New } from "../icons";
import { Button } from "./Button";

const useLoadingWithTimeout = () => {
  const [timedOut, setTimedOut] = useState(false);
  const boardInfo = useBoardInfo();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTimedOut(true);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const isReady = !!boardInfo || timedOut;
  const is404 = isReady && !boardInfo;

  return [isReady, is404] as const;
};

export function Main() {
  const [isReady, is404] = useLoadingWithTimeout();

  if (!isReady) return null;
  if (is404)
    return (
      <div className={styles.notFound}>
        <p>Seems like your board ID is invalid. Try creating a new board.</p>
        <Button
          onClick={() => {
            location.href = "/";
          }}
        >
          <New /> Create New Board
        </Button>
      </div>
    );

  return (
    <div className={styles.main}>
      <Column id="wins" title="Wins" subTitle="What went well?" />
      <Column
        id="improvements"
        title="Improvements"
        subTitle="What can be improved?"
      />
      <Column id="learnings" title="Learnings" subTitle="What did we learn?" />
      <Column id="questions" title="Questions" subTitle="What is unclear?" />
    </div>
  );
}
