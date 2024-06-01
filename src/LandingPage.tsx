import { Button } from "./components/Button";
import { New } from "./icons";
import { gotoNewBoard } from "./utils/navigation";
import styles from "./landingPage.module.css";

export function LandingPage() {
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
