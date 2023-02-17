import Camera from "./Camera";
import Time from "./Time";
import Objeqt from "./Objeqt";
import Debug from "../Debug";
import World from "./World";
import { Config } from "../Qame";

class Global {
    static objects: Array<Objeqt>;
    static ctx: CanvasRenderingContext2D;
    static camera: Camera;
    static world: World;

    static stepsPerSecond: number;
    static targetFps: number;

    static config: Config

    static init(config) {
        Global.config = config;
        Global.ctx = config.ctx;
        Global.targetFps = config.targetFps;
        Global.stepsPerSecond = config.stepsPerSecond;
        Global.camera = new Camera();
        Global.world = new World();
    }

    static start() {
        Time.start();
        Global.__step();
        Global.__update();
    }

    static pause() {}
    static resume() {}
    static quit() {}

    private static __update() {
        Time.update();
        const ctx = Global.ctx;
        ctx.fillStyle = Global.camera.color.toHexCode();
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (Debug.debugEnabled) {
            ctx.fillStyle = "#FE1612";
            ctx.fillText(Time.fps.toString(), 8, 16);
        }
        Global.world.update();
        Global.world.draw(ctx, Global.camera);
        setTimeout(Global.__update, 1000 / Global.targetFps);
    }

    private static __step() {
        Global.world.step();
        setTimeout(Global.__step, 1000 / Global.stepsPerSecond);
    }
}

export default Global;