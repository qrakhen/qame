import { Component, Base, Transform } from "../Qame";

class Objeqt extends Base {
    components: Component[];
    children: Objeqt[];
    transform: Transform;
    parent?: Objeqt;

    constructor(parent = null) {
        super();
        this.components = [];
        this.children = [];
        this.transform = new Transform();
        this.parent = parent;
    }

    attach(component: Component): void {
        if (!this.components.includes(component))
            this.components.push(component);
    }

    detach(component: Component): void {
        if (this.components.includes(component))
            this.components.splice(this.components.indexOf(component), 1);
    }

    addChild(object: Objeqt): void {
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

export default Objeqt;