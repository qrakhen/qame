import { Component, Objeqt, Transform } from "../Qame";

class World extends Objeqt {
    constructor() {
        super(null);
    }

    attach(component: Component): void {
        throw new Error("can not attach components on world root");
    }

    detach(component: Component): void {
        throw new Error("can not detach components on world root");
    }

    addChild(object: Objeqt): void {
        if (!this.children.includes(object)) {
            this.children.push(object);
            object.parent = this;
        }
    }

    emit(name, data = undefined) {
        this.children.forEach(o => { if (o.enabled) o[name](data); });
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
    }
}

export default World;