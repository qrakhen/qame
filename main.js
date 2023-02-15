const EVENT_INIT = "init";
const EVENT_STEP = "step";
const EVENT_UPDATE = "update";

class Base {
    constructor() {
        this.enabled = true;
    }

    init() { }
    step() { }
    update() { }
    draw(canvas, camera) { }
}

class Object extends Base {
    constructor(parent = null) {
        super();
        this.components = [];
        this.children = [];
        this.transform = new Transform();
        this.parent = parent;
    }

    attach(component) {
        if (!this.components.includes(component))
            this.components.push(component);
    }

    detach(component) {
        if (this.components.includes(component))
            this.components.splice(this.components.indexOf(component), 1);
    }

    addChild(object) {
        if (!this.children.includes(object)) {
            this.children.push(object);
            object.parent = this;
        }
    }

    emit(name, data = undefined) {
        this.children.forEach(o => { if (o.enabled) o[name](data); });
        this.components.forEach(c => { if (c.enabled) c[name](data); });
    }

    init() {
        this.emit("init");
    }

    step() {
        this.emit("step");
    }

    update() {
        this.emit("update");
    }

    draw(canvas, camera) {
        this.children.forEach(o => { if (o.enabled) o.draw(canvas, camera); });
        this.components.forEach(c => { if (c.enabled) c.draw(canvas, camera); });
    }
}

class Vector {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    clone() {
        return new Vector(this.x, this.y, this.z);
    }
}

class Transform {
    constructor(
            position = new Vector(), 
            rotation = new Vector(), 
            scale = new Vector()) {
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
}

class Component extends Base {
    constructor(object) {
        this.object = object;
    }
}

class Global {
    static init(canvas) {
        Global.objects = [];
        Global.canvas = canvas;
        Global.camera = new Camera();
    }

    static start(stepsPerSecond, targetFps) {
        Global.stepsPerSecond = stepsPerSecond;
        Global.targetFps = targetFps;
        Time.start();
        Global.__step();
        Global.__update();
    }

    static __update() {
        Time.__update();
        const canvas = Global.canvas;
        canvas.fillStyle = Global.camera.color.toString();
        canvas.fillRect(0, 0, canvas.canvas.width, canvas.canvas.height);
        canvas.fillStyle = "#FE1612";
        canvas.fillText(Time.fps, 8, 16);
        Global.objects.forEach(o => { 
            if (o.enabled) {
                o.update(); 
                o.draw(Global.canvas, Global.camera); 
            }
        });
        setTimeout(Global.__update, 1000 / Global.targetFps);
    }

    static __step() {
        Global.objects.forEach(o => { if (o.enabled) o.step(); });
        setTimeout(Global.__step, 1000 / Global.stepsPerSecond);
    }
}

class Time {
    static start() {
        Time.__start = Time.__now;
        Time.__frame = Time.__start;
        Time.__frameCount = 0;
        Time.__lastFpsReset = 0;
        Time.__fps = 0;
        Time.__delta = 0;
    }

    static get __now() {
        return Date.now();
    }

    static __update() {
        const now = Time.__now;
        Time.__delta = now - Time.__frame;
        Time.__frame = now;
        Time.__frameCount++;
        if (now - Time.__lastFpsReset > 1000) {
            Time.__fps = Time.__frameCount;
            Time.__lastFpsReset = now;
            Time.__frameCount = 0;
        }
    }

    static get time() {
        return (Time.__now - Time.__start) * .001;
    }

    static get delta() {
        return Time.__delta;
    }

    static get fps() {
        return Time.__fps;
    }
}

class Camera {
    constructor() {
        this.color = new Color();
        this.position = new Vector();
        this.projection = new Vector(720, 420);
    }
}

class Color {
    constructor(r = 255, g = 255, b = 255, a = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    toString() {
        return "#" + 
            this.r.toString(16) +
            this.g.toString(16) +
            this.b.toString(16) +
            this.a.toString(16);
    }
}

/** TEST */

var renq = {};
renq.Object = Object;
renq.Component = Component;
renq.Global = Global;
renq.Time = Time;
renq.Camera = Camera;
renq.Vector = Vector;
renq.Transform = Transform;
renq.Base = Base;
window.renq = renq;

Global.init(document.getElementById("main").getContext("2d"));
Global.start(20, 144);

class TestObject extends Object {
    constructor(parent) { super(parent); }
    //step() { console.log(Time.__frameCount, Time.fps); }
}

Global.objects.push(new TestObject());