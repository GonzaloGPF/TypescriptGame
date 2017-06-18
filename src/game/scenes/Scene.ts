export abstract class Scene extends createjs.Container{
    abstract run(tickEvent?: createjs.Event): void;
    abstract dispose?() : void;
}