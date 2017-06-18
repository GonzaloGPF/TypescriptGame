import { Scene } from "./Scene";

export class MenuScene extends Scene{

    constructor(){
        super();
        console.log('Menu Scene!');
    }

    run(): void {
        console.log('running');
    }

    dispose(){
        console.log('Disposing GameScene');
    }
}