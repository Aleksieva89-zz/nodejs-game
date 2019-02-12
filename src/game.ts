import { isPropertyAccessOrQualifiedName } from "typescript";

export class Game {
  private players: Array<string> = [];
  private places: Array<number> = [];
  private purses: Array<number> = [];
  private inPenaltyBox: Array<boolean> = [];
  private currentPlayer: number = 0;
  private isGettingOutOfPenaltyBox: boolean = false;

  private popQuestions: Array<string> = [];
  private scienceQuestions: Array<string> = [];
  private sportsQuestions: Array<string> = [];
  private rockQuestions: Array<string> = [];

  constructor() {
    for (let i = 0; i < 50; i++) {
      this.popQuestions.push("Pop Question " + i);
      this.scienceQuestions.push("Science Question " + i);
      this.sportsQuestions.push("Sports Question " + i);
      this.rockQuestions.push(this.createRockQuestion(i));
    }
  }

  public getCurrentPlayer(): number {
    return this.currentPlayer;
  }

  public getInPenaltyBox(): Array<boolean> {
    return this.inPenaltyBox;
  }

  public getPurses(): Array<number> {
    return this.purses;
  }

  public getPlaces(): Array<number> {
    return this.places;
  }

  public getPlayers(): Array<string> {
    return this.players;
  }

  public addPlayer(name: string): boolean {
    this.players.push(name);
    this.places[this.howManyPlayers() - 1] = 0;
    this.purses[this.howManyPlayers() - 1] = 0;
    this.inPenaltyBox[this.howManyPlayers() - 1] = false;

    console.log(name + " was added");
    console.log("They are player number " + this.players.length);

    return true;
  }

  public roll(roll: number) {
    console.log(this.players[this.currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);

    if (this.isCurrentPlayerInPenaltyBox()) {
      const isRollOdd = roll % 2 != 0;
      const negation = isRollOdd ? "" : "not";
      console.log(
        this.players[this.currentPlayer] +
          " is " +
          negation +
          " getting out of the penalty box"
      );
      this.isGettingOutOfPenaltyBox = isRollOdd;

      if (isRollOdd) {
        this.updateCurrentPlayersPlaceAndAskQuestion(roll);
      }
    } else {
      this.updateCurrentPlayersPlaceAndAskQuestion(roll);
    }
  }

  public wrongAnswer(): boolean {
    console.log("Question was incorrectly answered");
    console.log(
      this.players[this.currentPlayer] + " was sent to the penalty box"
    );
    this.inPenaltyBox[this.currentPlayer] = true;

    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
    return true;
  }

  public wasCorrectlyAnswered(): boolean {
    if (this.isCurrentPlayerInPenaltyBox()) {
      if (this.isGettingOutOfPenaltyBox) {
        return this.playerDidAnswerQuestion();
      } else {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
        return false;
      }
    } else {
      return this.playerDidAnswerQuestion();
    }
  }

  private playerDidAnswerQuestion(): boolean {
    console.log("Answer was correct!!!!");

    this.purses[this.currentPlayer] += 1;
    console.log(
      this.players[this.currentPlayer] +
        " now has " +
        this.purses[this.currentPlayer] +
        " Gold Coins."
    );

    var winner = this.didPlayerWin();

    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

    return winner;
  }

  private updateCurrentPlayersPlaceAndAskQuestion(roll: number): void {
    const newPlace = this.places[this.currentPlayer] + roll;
    this.places[this.currentPlayer] = newPlace > 11 ? newPlace - 12 : newPlace;

    console.log(
      this.players[this.currentPlayer] +
        "'s new location is " +
        this.places[this.currentPlayer]
    );

    console.log("The category is " + this.currentCategory());
    this.askQuestion();
  }

  private askQuestion(): void {
    switch (this.currentCategory()) {
      case "Pop":
        console.log(this.popQuestions.shift());
        break;
      case "Science":
        console.log(this.scienceQuestions.shift());
        break;
      case "Sports":
        console.log(this.sportsQuestions.shift());
        break;
      case "Rock":
        console.log(this.rockQuestions.shift());
        break;
    }
  }

  private createRockQuestion(index: number): string {
    return "Rock Question " + index;
  }

  private currentCategory(): string {
    switch (this.places[this.currentPlayer] % 4) {
      case 0:
        return "Pop";
      case 1:
        return "Science";
      case 2:
        return "Sports";
      case 3:
        return "Rock";
    }
  }

  private didPlayerWin(): boolean {
    return this.purses[this.currentPlayer] != 6;
  }

  private howManyPlayers(): number {
    return this.players.length;
  }

  private isCurrentPlayerInPenaltyBox(): boolean {
    return this.inPenaltyBox[this.currentPlayer];
  }
}
