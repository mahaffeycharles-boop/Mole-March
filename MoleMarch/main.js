import { Game } from "./js/Game.js";

window.addEventListener("load", () => {

    const canvas = document.getElementById("game");

    const game = new Game(canvas);

    game.start();

    window.game = game; // temporary for debugging

});