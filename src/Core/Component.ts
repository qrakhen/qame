import Base from "./Base";
import Objeqt from "./Objeqt";

class Component extends Base {
    object: Objeqt;

    constructor(object: Objeqt) {
        super();
        this.object = object;
    }
}

export default Component;
