import { Game } from "./game";

export class GameRunner {
  public static startGame(players): void {
    const game = new Game();
    players.forEach(player => {
      game.addPlayer(player);
    });

    let notAWinner;
    do {
      game.roll(Math.floor(Math.random() * 6) + 1);

      if (Math.floor(Math.random() * 10) == 7) {
        notAWinner = game.wrongAnswer();
      } else {
        notAWinner = game.wasCorrectlyAnswered();
      }
    } while (notAWinner);
  }
}

GameRunner.startGame(["Chet", "Pat", "Sue"]);
