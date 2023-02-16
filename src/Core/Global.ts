import Camera from "./Camera";
import Time from "./Time";
import Objeqt from "./Objeqt";
import Debug from "../Debug";
import World from "./World";

class Global {
    static objects: Array<Objeqt>;
    static ctx: CanvasRenderingContext2D;
    static camera: Camera;
    static world: World;

    static stepsPerSecond: number;
    static targetFps: number;

    static init(ctx) {
        Global.ctx = ctx;
        Global.camera = new Camera();
        Global.world = new World();
    }

    static start(stepsPerSecond: number = 20, targetFps: number = 60) {
        Global.stepsPerSecond = stepsPerSecond;
        Global.targetFps = targetFps;
        Time.start();
        Global.__step();
        Global.__update();
    }

    static __update() {
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

    static __step() {
        Global.world.step();
        setTimeout(Global.__step, 1000 / Global.stepsPerSecond);
    }
}

export default Global;