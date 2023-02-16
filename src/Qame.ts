import Base from './Core/Base';
import Vector from './Core/Vector';
import Transform from './Core/Transform';
import Objeqt from './Core/Objeqt';
import Component from './Core/Component';
import Global from './Core/Global';
import Time from './Core/Time';
import Camera from './Core/Camera';
import World from './Core/World';

/*
interface kQame {
    Objeqt: Objeqt,
    Component: Component,
    Global: Global,
    Time: Time,
    Camera: Camera, 
    Vector: Vector, 
    Transform: Transform,
    Base: Base, 
    World: World, 
}
*/

export {
    Objeqt,
    Component,
    Global,
    Time,
    Camera,
    Vector,
    Transform,
    Base,
    World
};

const Qame = {
    Objeqt: Objeqt,
    Component: Component,
    Global: Global,
    Time: Time,
    Camera: Camera,
    Vector: Vector,
    Transform: Transform,
    Base: Base,
    World: World
};

/*
export { Qame };

declare global {
    interface Window { Qame }
}*/

declare global {
    interface Window {
        Qame: Qame
    };
}

window.Qame = window.Qame || undefined;

/** TEST */
import $ from "jquery";
$(document).on('ready', () => {
    Global.init((<HTMLCanvasElement>document.getElementById("main")).getContext("2d"));
    Global.start();
});