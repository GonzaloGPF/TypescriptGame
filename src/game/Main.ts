///<reference path='../../node_modules/@types/createjs/index.d.ts' />

require('yuki-createjs');
import GameData from "./GameData";
import { GameScene } from "./scenes/GameScene";
import { MenuScene } from "./scenes/MenuScene";
import { Scene } from "./scenes/Scene";

export class Main {

    canvas: HTMLCanvasElement | null;

    private stage: createjs.Stage;

    screen_width: number;
    screen_height: number;

    currentScene: Scene;
    currentGameStateFunction: any = null;

    constructor() {

        console.log('Game Main Class!');

        let canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas = canvas;
        this.screen_width = canvas.width;
        this.screen_height = canvas.height;

        this.stage = new createjs.Stage(canvas);

        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", this.onTick, this);

        this.changeState(GameData.States.Menu);
    }

    changeState(state: string) {
        let states = GameData.States;
        switch (state) {
            case states.Running:
                this.currentGameStateFunction = this.gameStateRunning;
                break;
            case states.Menu:
                this.currentGameStateFunction = this.gameStateMainMenu;
                break;
            case states.Game:
                this.currentGameStateFunction = this.gameStateGame;
                break;
            case states.GameOver:
                // this.currentGameStateFunction = this.gameStateGameOver;
                break;
        }
    }

    onStateEvent(eventObj: Object) {
        console.log(eventObj)
        // this.changeState(obj.state);
    }

    gameStateMainMenu(tickEvent: createjs.Event) {
        let scene = new MenuScene();
        scene.on(GameData.States.Game, this.onStateEvent, this, true, { state: GameData.States.Game });
        this.stage.addChild(scene);
        this.disposeCurrentScene();
        this.currentScene = scene;
        this.changeState(GameData.States.Running);
    }

    gameStateGame(tickEvent: createjs.Event) {
        let scene = new GameScene();
        scene.on(GameData.States.GameOver, this.onStateEvent, this, true, { state: GameData.States.GameOver });
        this.stage.addChild(scene);
        this.disposeCurrentScene();
        this.currentScene = scene;
        this.changeState(GameData.States.Running);
    }

    gameStateRunning(tickEvent: createjs.Event) {
        if (this.currentScene.run) {
            this.currentScene.run(tickEvent);
        }
    }

    disposeCurrentScene() {
        if (this.currentScene != null) {
            this.stage.removeChild(this.currentScene);
            if (this.currentScene.dispose) {
                this.currentScene.dispose();
            }
            // this.currentScene = null;
        }
    }

    onTick(event: createjs.Event) {
        if (this.currentGameStateFunction != null) {
            this.currentGameStateFunction(event);
        }
        this.stage.update();
    }
}