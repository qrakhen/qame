class Base {
    enabled: boolean;

    constructor() {
        this.enabled = true;
    }

    init() { }
    step() { }
    update() { }
    draw(canvas, camera) { }
}

export default Base;