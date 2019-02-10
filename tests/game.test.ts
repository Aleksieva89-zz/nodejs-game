import { expect } from "chai";
import { Game } from "../src/game";
import { describe, it } from "mocha";
import { GameRunner } from "../src/game-runner";
import { getEmitHelpers } from "typescript";

describe("The test environment", () => {
  it("Test add player players content", () => {
    const game = new Game();
    game.addPlayer("Test player");

    const players = game.getPlayers();
    expect(players.length).equals(1);
    expect(players[0]).equals("Test player");

    game.addPlayer("Test player 2");

    expect(players.length).equals(2);
    expect(players[1]).equals("Test player 2");
  });

  it("Test add player places content", () => {
    const game = new Game();
    game.addPlayer("Test player");

    const places = game.getPlaces();
    expect(places.length).equals(1);
    expect(places[0]).equals(0);
  });

  it("Test add player purses content", () => {
    const game = new Game();
    game.addPlayer("Test player");

    const purses = game.getPurses();
    expect(purses.length).equals(1);
    expect(purses[0]).equals(0);
  });

  it("Test add player penalty box content", () => {
    const game = new Game();
    game.addPlayer("Test player");

    const penaltyBox = game.getInPenaltyBox();
    expect(penaltyBox.length).equals(1);
    expect(penaltyBox[0]).equals(false);
  });

  it("should access game", function() {
    expect(GameRunner).to.not.be.undefined;
  });

  it("Test wasCorrectlyAnswered player not in penalty box", function() {
    const game = new Game();
    game.addPlayer("Test player");
    game.addPlayer("Test player 2");

    expect(game.getCurrentPlayer()).equals(0);

    expect(game.wasCorrectlyAnswered()).equals(false);
    expect(game.getPurses()[0]).equals(1);
    expect(game.getPurses()[1]).equals(0);
    expect(game.getCurrentPlayer()).equals(1);

    expect(game.wasCorrectlyAnswered()).equals(false);
    expect(game.getPurses()[0]).equals(1);
    expect(game.getPurses()[1]).equals(1);
    expect(game.getCurrentPlayer()).equals(0);
  });

  it("Test wasCorrectlyAnswered player in penalty box and not geting out", function() {
    const game = new Game();
    game.addPlayer("Test player");
    game.addPlayer("Test player 2");

    game.wrongAnswer();

    expect(game.getCurrentPlayer()).equals(1);

    expect(game.wasCorrectlyAnswered()).equals(false);

    expect(game.getCurrentPlayer()).equals(0);

    expect(game.wasCorrectlyAnswered()).equals(false);
  });

  it("Test wasCorrectlyAnswered player in penalty box and geting out", function() {
    const game = new Game();
    game.addPlayer("Test player");

    game.wrongAnswer();

    game.roll(1);

    expect(game.wasCorrectlyAnswered()).equals(false);
    expect(game.getPurses()[0]).equals(1);

    expect(game.wasCorrectlyAnswered()).equals(false);
    expect(game.wasCorrectlyAnswered()).equals(false);
    expect(game.wasCorrectlyAnswered()).equals(false);
    expect(game.wasCorrectlyAnswered()).equals(false);
    expect(game.wasCorrectlyAnswered()).equals(true);
  });
});
