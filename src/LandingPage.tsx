import { Button } from "./components/Button";
import { New } from "./icons";
import { getLastBoardId, gotoBoard, gotoNewBoard } from "./utils/board";
import styles from "./landingPage.module.css";
import { useEffect, useState } from "react";

export function LandingPage() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const lastBoardId = getLastBoardId();

    if (lastBoardId) gotoBoard(lastBoardId, true);

    setIsReady(true);
  }, []);

  if (!isReady) return false;

  return (
    <div className={styles.container}>
      <p>
        It couldn't be easier to run a retro!
        <br />
        Simply create a new board and share the link with your team!
      </p>
      <div>
        <Button onClick={() => gotoNewBoard()}>
          <New /> Create a new board
        </Button>
      </div>
    </div>
  );
}
