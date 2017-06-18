import { Scene } from "./Scene";

export class GameScene extends Scene{

    constructor(){
        super();
        console.log('Game Scene!');
    }

    run(): void {
        console.log('running');
    }

    dispose(){
        console.log('Disposing GameScene');
    }
}