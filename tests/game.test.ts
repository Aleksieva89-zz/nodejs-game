import { expect } from "chai";
import { Game } from "../src/game";
import { describe, it } from "mocha";
import { GameRunner } from "../src/game-runner";

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
});
