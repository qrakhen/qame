import Vector from "./Vector";

class Transform {
    position: Vector;
    rotation: Vector;
    scale: Vector;

    constructor(
            position = Vector.null, 
            rotation = Vector.null, 
            scale = Vector.null) {
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
}

export default Transform;