import Color from "./Color";
import Vector from "./Vector";

class Camera {
    color: Color;
    position: Vector;
    rotation: Vector;
    projection: Vector;

    constructor() {
        this.color = new Color();
        this.position = new Vector();
        this.rotation = new Vector();
        this.projection = new Vector(720, 420);
    }
}

export default Camera;