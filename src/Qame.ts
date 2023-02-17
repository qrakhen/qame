import Base from './Core/Base';
import Vector from './Core/Vector';
import Transform from './Core/Transform';
import Objeqt from './Core/Objeqt';
import Component from './Core/Component';
import Global from './Core/Global';
import Time from './Core/Time';
import Camera from './Core/Camera';
import World from './Core/World';

declare global {
    interface Window { Qame: any }
}

window.Qame = {
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

export const MODE_2D = '2d';
export const MODE_3D = '3d';

export interface Config {
    targetFps: number;
    stepsPerSecond: number;
    name: string;
    mode: string;
    ctx: RenderingContext | null;
}

export const DEFAULT_CONFIG = {
    targetFps: 100,
    stepsPerSecond: 20,
    name: 'new game',
    mode: MODE_2D,
    ctx: null
};

export function init(
        canvasId: string,
        config: Config = undefined) {
    if (!config)
        config = DEFAULT_CONFIG;
    config.ctx = (<HTMLCanvasElement>document
        .getElementById(canvasId))
        .getContext(config.mode);
    Global.init(config);
}

export function start() {
    Global.start();
}

export function pause() {
    Global.pause();
}

export function resume() {
    Global.resume();
}

export function quit() {
    Global.quit();
}

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
}