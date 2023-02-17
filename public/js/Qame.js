(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Base = /** @class */ (function () {
    function Base() {
        this.enabled = true;
    }
    Base.prototype.init = function () { };
    Base.prototype.step = function () { };
    Base.prototype.update = function () { };
    Base.prototype.draw = function (canvas, camera) { };
    return Base;
}());
exports.default = Base;

},{}],2:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Color_1 = __importDefault(require("./Color"));
var Vector_1 = __importDefault(require("./Vector"));
var Camera = /** @class */ (function () {
    function Camera() {
        this.color = new Color_1.default();
        this.position = new Vector_1.default();
        this.rotation = new Vector_1.default();
        this.projection = new Vector_1.default(720, 420);
    }
    return Camera;
}());
exports.default = Camera;

},{"./Color":3,"./Vector":9}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Color = /** @class */ (function () {
    function Color(r, g, b, a) {
        if (r === void 0) { r = 255; }
        if (g === void 0) { g = 255; }
        if (b === void 0) { b = 255; }
        if (a === void 0) { a = 255; }
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    Object.defineProperty(Color.prototype, "r", {
        get: function () { return this.__r; },
        set: function (v) { this.__r = Math.min(255, Math.max(0, v)); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "g", {
        get: function () { return this.__g; },
        set: function (v) { this.__g = Math.min(255, Math.max(0, v)); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "b", {
        get: function () { return this.__b; },
        set: function (v) { this.__b = Math.min(255, Math.max(0, v)); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "a", {
        get: function () { return this.__a; },
        set: function (v) { this.__a = Math.min(255, Math.max(0, v)); },
        enumerable: false,
        configurable: true
    });
    Color.prototype.toHexCode = function () {
        return "#" +
            this.r.toString(16) +
            this.g.toString(16) +
            this.b.toString(16) +
            this.a.toString(16);
    };
    Color.prototype.clone = function () {
        return new Color(this.r, this.g, this.b, this.a);
    };
    return Color;
}());
exports.default = Color;

},{}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Base_1 = __importDefault(require("./Base"));
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component(object) {
        var _this = _super.call(this) || this;
        _this.object = object;
        return _this;
    }
    return Component;
}(Base_1.default));
exports.default = Component;

},{"./Base":1}],5:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Camera_1 = __importDefault(require("./Camera"));
var Time_1 = __importDefault(require("./Time"));
var Debug_1 = __importDefault(require("../Debug"));
var World_1 = __importDefault(require("./World"));
var Global = /** @class */ (function () {
    function Global() {
    }
    Global.init = function (config) {
        Global.config = config;
        Global.ctx = config.ctx;
        Global.targetFps = config.targetFps;
        Global.stepsPerSecond = config.stepsPerSecond;
        Global.camera = new Camera_1.default();
        Global.world = new World_1.default();
    };
    Global.start = function () {
        Time_1.default.start();
        Global.__step();
        Global.__update();
    };
    Global.pause = function () { };
    Global.resume = function () { };
    Global.quit = function () { };
    Global.__update = function () {
        Time_1.default.update();
        var ctx = Global.ctx;
        ctx.fillStyle = Global.camera.color.toHexCode();
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (Debug_1.default.debugEnabled) {
            ctx.fillStyle = "#FE1612";
            ctx.fillText(Time_1.default.fps.toString(), 8, 16);
        }
        Global.world.update();
        Global.world.draw(ctx, Global.camera);
        setTimeout(Global.__update, 1000 / Global.targetFps);
    };
    Global.__step = function () {
        Global.world.step();
        setTimeout(Global.__step, 1000 / Global.stepsPerSecond);
    };
    return Global;
}());
exports.default = Global;

},{"../Debug":11,"./Camera":2,"./Time":7,"./World":10}],6:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Qame_1 = require("../Qame");
var Objeqt = /** @class */ (function (_super) {
    __extends(Objeqt, _super);
    function Objeqt(parent) {
        if (parent === void 0) { parent = null; }
        var _this = _super.call(this) || this;
        _this.components = [];
        _this.children = [];
        _this.transform = new Qame_1.Transform();
        _this.parent = parent;
        return _this;
    }
    Objeqt.prototype.attach = function (component) {
        if (!this.components.includes(component))
            this.components.push(component);
    };
    Objeqt.prototype.detach = function (component) {
        if (this.components.includes(component))
            this.components.splice(this.components.indexOf(component), 1);
    };
    Objeqt.prototype.addChild = function (object) {
        if (!this.children.includes(object)) {
            this.children.push(object);
            object.parent = this;
        }
    };
    Objeqt.prototype.emit = function (name, data) {
        if (data === void 0) { data = undefined; }
        this.children.forEach(function (o) { if (o.enabled)
            o[name](data); });
        this.components.forEach(function (c) { if (c.enabled)
            c[name](data); });
    };
    Objeqt.prototype.init = function () {
        this.emit("init");
    };
    Objeqt.prototype.step = function () {
        this.emit("step");
    };
    Objeqt.prototype.update = function () {
        this.emit("update");
    };
    Objeqt.prototype.draw = function (canvas, camera) {
        this.children.forEach(function (o) { if (o.enabled)
            o.draw(canvas, camera); });
        this.components.forEach(function (c) { if (c.enabled)
            c.draw(canvas, camera); });
    };
    return Objeqt;
}(Qame_1.Base));
exports.default = Objeqt;

},{"../Qame":12}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Time = /** @class */ (function () {
    function Time() {
    }
    Time.start = function () {
        Time.__start = Time.__now;
        Time.__frame = Time.__start;
        Time.__frameCount = 0;
        Time.__lastFpsReset = 0;
        Time.__fps = 0;
        Time.__delta = 0;
    };
    Object.defineProperty(Time, "__now", {
        get: function () {
            return Date.now();
        },
        enumerable: false,
        configurable: true
    });
    Time.update = function () {
        var now = Time.__now;
        Time.__delta = now - Time.__frame;
        Time.__frame = now;
        Time.__frameCount++;
        if (now - Time.__lastFpsReset > 1000) {
            Time.__fps = Time.__frameCount;
            Time.__lastFpsReset = now;
            Time.__frameCount = 0;
        }
    };
    Object.defineProperty(Time, "time", {
        get: function () {
            return (Time.__now - Time.__start) * .001;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Time, "delta", {
        get: function () {
            return Time.__delta;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Time, "fps", {
        get: function () {
            return Time.__fps;
        },
        enumerable: false,
        configurable: true
    });
    return Time;
}());
exports.default = Time;

},{}],8:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Vector_1 = __importDefault(require("./Vector"));
var Transform = /** @class */ (function () {
    function Transform(position, rotation, scale) {
        if (position === void 0) { position = Vector_1.default.null; }
        if (rotation === void 0) { rotation = Vector_1.default.null; }
        if (scale === void 0) { scale = Vector_1.default.null; }
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
    return Transform;
}());
exports.default = Transform;

},{"./Vector":9}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector = /** @class */ (function () {
    function Vector(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vector.prototype.clone = function () {
        return new Vector(this.x, this.y, this.z);
    };
    Object.defineProperty(Vector, "null", {
        get: function () {
            return new Vector();
        },
        enumerable: false,
        configurable: true
    });
    return Vector;
}());
exports.default = Vector;

},{}],10:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Qame_1 = require("../Qame");
var World = /** @class */ (function (_super) {
    __extends(World, _super);
    function World() {
        return _super.call(this, null) || this;
    }
    World.prototype.attach = function (component) {
        throw new Error("can not attach components on world root");
    };
    World.prototype.detach = function (component) {
        throw new Error("can not detach components on world root");
    };
    World.prototype.addChild = function (object) {
        if (!this.children.includes(object)) {
            this.children.push(object);
            object.parent = this;
        }
    };
    World.prototype.emit = function (name, data) {
        if (data === void 0) { data = undefined; }
        this.children.forEach(function (o) { if (o.enabled)
            o[name](data); });
    };
    World.prototype.init = function () {
        this.emit("init");
    };
    World.prototype.step = function () {
        this.emit("step");
    };
    World.prototype.update = function () {
        this.emit("update");
    };
    World.prototype.draw = function (canvas, camera) {
        this.children.forEach(function (o) { if (o.enabled)
            o.draw(canvas, camera); });
    };
    return World;
}(Qame_1.Objeqt));
exports.default = World;

},{"../Qame":12}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Debug = /** @class */ (function () {
    function Debug() {
    }
    Debug.debugEnabled = true;
    Debug.showFps = true;
    Debug.devMode = true;
    return Debug;
}());
exports.default = Debug;

},{}],12:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = exports.Base = exports.Transform = exports.Vector = exports.Camera = exports.Time = exports.Global = exports.Component = exports.Objeqt = exports.quit = exports.resume = exports.pause = exports.start = exports.init = exports.DEFAULT_CONFIG = exports.MODE_3D = exports.MODE_2D = void 0;
var Base_1 = __importDefault(require("./Core/Base"));
exports.Base = Base_1.default;
var Vector_1 = __importDefault(require("./Core/Vector"));
exports.Vector = Vector_1.default;
var Transform_1 = __importDefault(require("./Core/Transform"));
exports.Transform = Transform_1.default;
var Objeqt_1 = __importDefault(require("./Core/Objeqt"));
exports.Objeqt = Objeqt_1.default;
var Component_1 = __importDefault(require("./Core/Component"));
exports.Component = Component_1.default;
var Global_1 = __importDefault(require("./Core/Global"));
exports.Global = Global_1.default;
var Time_1 = __importDefault(require("./Core/Time"));
exports.Time = Time_1.default;
var Camera_1 = __importDefault(require("./Core/Camera"));
exports.Camera = Camera_1.default;
var World_1 = __importDefault(require("./Core/World"));
exports.World = World_1.default;
window.Qame = {
    Objeqt: Objeqt_1.default,
    Component: Component_1.default,
    Global: Global_1.default,
    Time: Time_1.default,
    Camera: Camera_1.default,
    Vector: Vector_1.default,
    Transform: Transform_1.default,
    Base: Base_1.default,
    World: World_1.default
};
exports.MODE_2D = '2d';
exports.MODE_3D = '3d';
exports.DEFAULT_CONFIG = {
    targetFps: 100,
    stepsPerSecond: 20,
    name: 'new game',
    mode: exports.MODE_2D,
    ctx: null
};
function init(canvasId, config) {
    if (config === void 0) { config = undefined; }
    if (!config)
        config = exports.DEFAULT_CONFIG;
    config.ctx = document
        .getElementById(canvasId)
        .getContext(config.mode);
    Global_1.default.init(config);
}
exports.init = init;
function start() {
    Global_1.default.start();
}
exports.start = start;
function pause() {
    Global_1.default.pause();
}
exports.pause = pause;
function resume() {
    Global_1.default.resume();
}
exports.resume = resume;
function quit() {
    Global_1.default.quit();
}
exports.quit = quit;

},{"./Core/Base":1,"./Core/Camera":2,"./Core/Component":4,"./Core/Global":5,"./Core/Objeqt":6,"./Core/Time":7,"./Core/Transform":8,"./Core/Vector":9,"./Core/World":10}]},{},[12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIm91dC9Db3JlL0Jhc2UuanMiLCJvdXQvQ29yZS9DYW1lcmEuanMiLCJvdXQvQ29yZS9Db2xvci5qcyIsIm91dC9Db3JlL0NvbXBvbmVudC5qcyIsIm91dC9Db3JlL0dsb2JhbC5qcyIsIm91dC9Db3JlL09iamVxdC5qcyIsIm91dC9Db3JlL1RpbWUuanMiLCJvdXQvQ29yZS9UcmFuc2Zvcm0uanMiLCJvdXQvQ29yZS9WZWN0b3IuanMiLCJvdXQvQ29yZS9Xb3JsZC5qcyIsIm91dC9EZWJ1Zy5qcyIsIm91dC9RYW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIEJhc2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBCYXNlKCkge1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBCYXNlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkgeyB9O1xyXG4gICAgQmFzZS5wcm90b3R5cGUuc3RlcCA9IGZ1bmN0aW9uICgpIHsgfTtcclxuICAgIEJhc2UucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHsgfTtcclxuICAgIEJhc2UucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbiAoY2FudmFzLCBjYW1lcmEpIHsgfTtcclxuICAgIHJldHVybiBCYXNlO1xyXG59KCkpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBCYXNlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgQ29sb3JfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Db2xvclwiKSk7XHJcbnZhciBWZWN0b3JfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9WZWN0b3JcIikpO1xyXG52YXIgQ2FtZXJhID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQ2FtZXJhKCkge1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSBuZXcgQ29sb3JfMS5kZWZhdWx0KCk7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBWZWN0b3JfMS5kZWZhdWx0KCk7XHJcbiAgICAgICAgdGhpcy5yb3RhdGlvbiA9IG5ldyBWZWN0b3JfMS5kZWZhdWx0KCk7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0aW9uID0gbmV3IFZlY3Rvcl8xLmRlZmF1bHQoNzIwLCA0MjApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIENhbWVyYTtcclxufSgpKTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gQ2FtZXJhO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgQ29sb3IgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBDb2xvcihyLCBnLCBiLCBhKSB7XHJcbiAgICAgICAgaWYgKHIgPT09IHZvaWQgMCkgeyByID0gMjU1OyB9XHJcbiAgICAgICAgaWYgKGcgPT09IHZvaWQgMCkgeyBnID0gMjU1OyB9XHJcbiAgICAgICAgaWYgKGIgPT09IHZvaWQgMCkgeyBiID0gMjU1OyB9XHJcbiAgICAgICAgaWYgKGEgPT09IHZvaWQgMCkgeyBhID0gMjU1OyB9XHJcbiAgICAgICAgdGhpcy5yID0gcjtcclxuICAgICAgICB0aGlzLmcgPSBnO1xyXG4gICAgICAgIHRoaXMuYiA9IGI7XHJcbiAgICAgICAgdGhpcy5hID0gYTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb2xvci5wcm90b3R5cGUsIFwiclwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9fcjsgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7IHRoaXMuX19yID0gTWF0aC5taW4oMjU1LCBNYXRoLm1heCgwLCB2KSk7IH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb2xvci5wcm90b3R5cGUsIFwiZ1wiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9fZzsgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7IHRoaXMuX19nID0gTWF0aC5taW4oMjU1LCBNYXRoLm1heCgwLCB2KSk7IH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb2xvci5wcm90b3R5cGUsIFwiYlwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9fYjsgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7IHRoaXMuX19iID0gTWF0aC5taW4oMjU1LCBNYXRoLm1heCgwLCB2KSk7IH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb2xvci5wcm90b3R5cGUsIFwiYVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9fYTsgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7IHRoaXMuX19hID0gTWF0aC5taW4oMjU1LCBNYXRoLm1heCgwLCB2KSk7IH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIENvbG9yLnByb3RvdHlwZS50b0hleENvZGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiI1wiICtcclxuICAgICAgICAgICAgdGhpcy5yLnRvU3RyaW5nKDE2KSArXHJcbiAgICAgICAgICAgIHRoaXMuZy50b1N0cmluZygxNikgK1xyXG4gICAgICAgICAgICB0aGlzLmIudG9TdHJpbmcoMTYpICtcclxuICAgICAgICAgICAgdGhpcy5hLnRvU3RyaW5nKDE2KTtcclxuICAgIH07XHJcbiAgICBDb2xvci5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDb2xvcih0aGlzLnIsIHRoaXMuZywgdGhpcy5iLCB0aGlzLmEpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBDb2xvcjtcclxufSgpKTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gQ29sb3I7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgQmFzZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0Jhc2VcIikpO1xyXG52YXIgQ29tcG9uZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKENvbXBvbmVudCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIENvbXBvbmVudChvYmplY3QpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLm9iamVjdCA9IG9iamVjdDtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQ29tcG9uZW50O1xyXG59KEJhc2VfMS5kZWZhdWx0KSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IENvbXBvbmVudDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIENhbWVyYV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0NhbWVyYVwiKSk7XHJcbnZhciBUaW1lXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vVGltZVwiKSk7XHJcbnZhciBEZWJ1Z18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9EZWJ1Z1wiKSk7XHJcbnZhciBXb3JsZF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1dvcmxkXCIpKTtcclxudmFyIEdsb2JhbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEdsb2JhbCgpIHtcclxuICAgIH1cclxuICAgIEdsb2JhbC5pbml0ID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgICAgIEdsb2JhbC5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgR2xvYmFsLmN0eCA9IGNvbmZpZy5jdHg7XHJcbiAgICAgICAgR2xvYmFsLnRhcmdldEZwcyA9IGNvbmZpZy50YXJnZXRGcHM7XHJcbiAgICAgICAgR2xvYmFsLnN0ZXBzUGVyU2Vjb25kID0gY29uZmlnLnN0ZXBzUGVyU2Vjb25kO1xyXG4gICAgICAgIEdsb2JhbC5jYW1lcmEgPSBuZXcgQ2FtZXJhXzEuZGVmYXVsdCgpO1xyXG4gICAgICAgIEdsb2JhbC53b3JsZCA9IG5ldyBXb3JsZF8xLmRlZmF1bHQoKTtcclxuICAgIH07XHJcbiAgICBHbG9iYWwuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgVGltZV8xLmRlZmF1bHQuc3RhcnQoKTtcclxuICAgICAgICBHbG9iYWwuX19zdGVwKCk7XHJcbiAgICAgICAgR2xvYmFsLl9fdXBkYXRlKCk7XHJcbiAgICB9O1xyXG4gICAgR2xvYmFsLnBhdXNlID0gZnVuY3Rpb24gKCkgeyB9O1xyXG4gICAgR2xvYmFsLnJlc3VtZSA9IGZ1bmN0aW9uICgpIHsgfTtcclxuICAgIEdsb2JhbC5xdWl0ID0gZnVuY3Rpb24gKCkgeyB9O1xyXG4gICAgR2xvYmFsLl9fdXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFRpbWVfMS5kZWZhdWx0LnVwZGF0ZSgpO1xyXG4gICAgICAgIHZhciBjdHggPSBHbG9iYWwuY3R4O1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBHbG9iYWwuY2FtZXJhLmNvbG9yLnRvSGV4Q29kZSgpO1xyXG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjdHguY2FudmFzLndpZHRoLCBjdHguY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgaWYgKERlYnVnXzEuZGVmYXVsdC5kZWJ1Z0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI0ZFMTYxMlwiO1xyXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoVGltZV8xLmRlZmF1bHQuZnBzLnRvU3RyaW5nKCksIDgsIDE2KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLndvcmxkLnVwZGF0ZSgpO1xyXG4gICAgICAgIEdsb2JhbC53b3JsZC5kcmF3KGN0eCwgR2xvYmFsLmNhbWVyYSk7XHJcbiAgICAgICAgc2V0VGltZW91dChHbG9iYWwuX191cGRhdGUsIDEwMDAgLyBHbG9iYWwudGFyZ2V0RnBzKTtcclxuICAgIH07XHJcbiAgICBHbG9iYWwuX19zdGVwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIEdsb2JhbC53b3JsZC5zdGVwKCk7XHJcbiAgICAgICAgc2V0VGltZW91dChHbG9iYWwuX19zdGVwLCAxMDAwIC8gR2xvYmFsLnN0ZXBzUGVyU2Vjb25kKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gR2xvYmFsO1xyXG59KCkpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBHbG9iYWw7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgUWFtZV8xID0gcmVxdWlyZShcIi4uL1FhbWVcIik7XHJcbnZhciBPYmplcXQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoT2JqZXF0LCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gT2JqZXF0KHBhcmVudCkge1xyXG4gICAgICAgIGlmIChwYXJlbnQgPT09IHZvaWQgMCkgeyBwYXJlbnQgPSBudWxsOyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5jb21wb25lbnRzID0gW107XHJcbiAgICAgICAgX3RoaXMuY2hpbGRyZW4gPSBbXTtcclxuICAgICAgICBfdGhpcy50cmFuc2Zvcm0gPSBuZXcgUWFtZV8xLlRyYW5zZm9ybSgpO1xyXG4gICAgICAgIF90aGlzLnBhcmVudCA9IHBhcmVudDtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBPYmplcXQucHJvdG90eXBlLmF0dGFjaCA9IGZ1bmN0aW9uIChjb21wb25lbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY29tcG9uZW50cy5pbmNsdWRlcyhjb21wb25lbnQpKVxyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xyXG4gICAgfTtcclxuICAgIE9iamVxdC5wcm90b3R5cGUuZGV0YWNoID0gZnVuY3Rpb24gKGNvbXBvbmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudHMuaW5jbHVkZXMoY29tcG9uZW50KSlcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLnNwbGljZSh0aGlzLmNvbXBvbmVudHMuaW5kZXhPZihjb21wb25lbnQpLCAxKTtcclxuICAgIH07XHJcbiAgICBPYmplcXQucHJvdG90eXBlLmFkZENoaWxkID0gZnVuY3Rpb24gKG9iamVjdCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jaGlsZHJlbi5pbmNsdWRlcyhvYmplY3QpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChvYmplY3QpO1xyXG4gICAgICAgICAgICBvYmplY3QucGFyZW50ID0gdGhpcztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgT2JqZXF0LnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKG5hbWUsIGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YSA9PT0gdm9pZCAwKSB7IGRhdGEgPSB1bmRlZmluZWQ7IH1cclxuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKG8pIHsgaWYgKG8uZW5hYmxlZClcclxuICAgICAgICAgICAgb1tuYW1lXShkYXRhKTsgfSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRzLmZvckVhY2goZnVuY3Rpb24gKGMpIHsgaWYgKGMuZW5hYmxlZClcclxuICAgICAgICAgICAgY1tuYW1lXShkYXRhKTsgfSk7XHJcbiAgICB9O1xyXG4gICAgT2JqZXF0LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZW1pdChcImluaXRcIik7XHJcbiAgICB9O1xyXG4gICAgT2JqZXF0LnByb3RvdHlwZS5zdGVwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZW1pdChcInN0ZXBcIik7XHJcbiAgICB9O1xyXG4gICAgT2JqZXF0LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5lbWl0KFwidXBkYXRlXCIpO1xyXG4gICAgfTtcclxuICAgIE9iamVxdC5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uIChjYW52YXMsIGNhbWVyYSkge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAobykgeyBpZiAoby5lbmFibGVkKVxyXG4gICAgICAgICAgICBvLmRyYXcoY2FudmFzLCBjYW1lcmEpOyB9KTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudHMuZm9yRWFjaChmdW5jdGlvbiAoYykgeyBpZiAoYy5lbmFibGVkKVxyXG4gICAgICAgICAgICBjLmRyYXcoY2FudmFzLCBjYW1lcmEpOyB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gT2JqZXF0O1xyXG59KFFhbWVfMS5CYXNlKSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IE9iamVxdDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIFRpbWUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBUaW1lKCkge1xyXG4gICAgfVxyXG4gICAgVGltZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBUaW1lLl9fc3RhcnQgPSBUaW1lLl9fbm93O1xyXG4gICAgICAgIFRpbWUuX19mcmFtZSA9IFRpbWUuX19zdGFydDtcclxuICAgICAgICBUaW1lLl9fZnJhbWVDb3VudCA9IDA7XHJcbiAgICAgICAgVGltZS5fX2xhc3RGcHNSZXNldCA9IDA7XHJcbiAgICAgICAgVGltZS5fX2ZwcyA9IDA7XHJcbiAgICAgICAgVGltZS5fX2RlbHRhID0gMDtcclxuICAgIH07XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGltZSwgXCJfX25vd1wiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRlLm5vdygpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIFRpbWUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBub3cgPSBUaW1lLl9fbm93O1xyXG4gICAgICAgIFRpbWUuX19kZWx0YSA9IG5vdyAtIFRpbWUuX19mcmFtZTtcclxuICAgICAgICBUaW1lLl9fZnJhbWUgPSBub3c7XHJcbiAgICAgICAgVGltZS5fX2ZyYW1lQ291bnQrKztcclxuICAgICAgICBpZiAobm93IC0gVGltZS5fX2xhc3RGcHNSZXNldCA+IDEwMDApIHtcclxuICAgICAgICAgICAgVGltZS5fX2ZwcyA9IFRpbWUuX19mcmFtZUNvdW50O1xyXG4gICAgICAgICAgICBUaW1lLl9fbGFzdEZwc1Jlc2V0ID0gbm93O1xyXG4gICAgICAgICAgICBUaW1lLl9fZnJhbWVDb3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW1lLCBcInRpbWVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFRpbWUuX19ub3cgLSBUaW1lLl9fc3RhcnQpICogLjAwMTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGltZSwgXCJkZWx0YVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBUaW1lLl9fZGVsdGE7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbWUsIFwiZnBzXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRpbWUuX19mcHM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIFRpbWU7XHJcbn0oKSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFRpbWU7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBWZWN0b3JfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9WZWN0b3JcIikpO1xyXG52YXIgVHJhbnNmb3JtID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gVHJhbnNmb3JtKHBvc2l0aW9uLCByb3RhdGlvbiwgc2NhbGUpIHtcclxuICAgICAgICBpZiAocG9zaXRpb24gPT09IHZvaWQgMCkgeyBwb3NpdGlvbiA9IFZlY3Rvcl8xLmRlZmF1bHQubnVsbDsgfVxyXG4gICAgICAgIGlmIChyb3RhdGlvbiA9PT0gdm9pZCAwKSB7IHJvdGF0aW9uID0gVmVjdG9yXzEuZGVmYXVsdC5udWxsOyB9XHJcbiAgICAgICAgaWYgKHNjYWxlID09PSB2b2lkIDApIHsgc2NhbGUgPSBWZWN0b3JfMS5kZWZhdWx0Lm51bGw7IH1cclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5yb3RhdGlvbiA9IHJvdGF0aW9uO1xyXG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcclxuICAgIH1cclxuICAgIHJldHVybiBUcmFuc2Zvcm07XHJcbn0oKSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFRyYW5zZm9ybTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIFZlY3RvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFZlY3Rvcih4LCB5LCB6KSB7XHJcbiAgICAgICAgaWYgKHggPT09IHZvaWQgMCkgeyB4ID0gMDsgfVxyXG4gICAgICAgIGlmICh5ID09PSB2b2lkIDApIHsgeSA9IDA7IH1cclxuICAgICAgICBpZiAoeiA9PT0gdm9pZCAwKSB7IHogPSAwOyB9XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMueiA9IHo7XHJcbiAgICB9XHJcbiAgICBWZWN0b3IucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCwgdGhpcy55LCB0aGlzLnopO1xyXG4gICAgfTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWZWN0b3IsIFwibnVsbFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIFZlY3RvcjtcclxufSgpKTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gVmVjdG9yO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIFFhbWVfMSA9IHJlcXVpcmUoXCIuLi9RYW1lXCIpO1xyXG52YXIgV29ybGQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoV29ybGQsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBXb3JsZCgpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgbnVsbCkgfHwgdGhpcztcclxuICAgIH1cclxuICAgIFdvcmxkLnByb3RvdHlwZS5hdHRhY2ggPSBmdW5jdGlvbiAoY29tcG9uZW50KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FuIG5vdCBhdHRhY2ggY29tcG9uZW50cyBvbiB3b3JsZCByb290XCIpO1xyXG4gICAgfTtcclxuICAgIFdvcmxkLnByb3RvdHlwZS5kZXRhY2ggPSBmdW5jdGlvbiAoY29tcG9uZW50KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FuIG5vdCBkZXRhY2ggY29tcG9uZW50cyBvbiB3b3JsZCByb290XCIpO1xyXG4gICAgfTtcclxuICAgIFdvcmxkLnByb3RvdHlwZS5hZGRDaGlsZCA9IGZ1bmN0aW9uIChvYmplY3QpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hpbGRyZW4uaW5jbHVkZXMob2JqZWN0KSkge1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gob2JqZWN0KTtcclxuICAgICAgICAgICAgb2JqZWN0LnBhcmVudCA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFdvcmxkLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKG5hbWUsIGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YSA9PT0gdm9pZCAwKSB7IGRhdGEgPSB1bmRlZmluZWQ7IH1cclxuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKG8pIHsgaWYgKG8uZW5hYmxlZClcclxuICAgICAgICAgICAgb1tuYW1lXShkYXRhKTsgfSk7XHJcbiAgICB9O1xyXG4gICAgV29ybGQucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5lbWl0KFwiaW5pdFwiKTtcclxuICAgIH07XHJcbiAgICBXb3JsZC5wcm90b3R5cGUuc3RlcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmVtaXQoXCJzdGVwXCIpO1xyXG4gICAgfTtcclxuICAgIFdvcmxkLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5lbWl0KFwidXBkYXRlXCIpO1xyXG4gICAgfTtcclxuICAgIFdvcmxkLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24gKGNhbnZhcywgY2FtZXJhKSB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChvKSB7IGlmIChvLmVuYWJsZWQpXHJcbiAgICAgICAgICAgIG8uZHJhdyhjYW52YXMsIGNhbWVyYSk7IH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBXb3JsZDtcclxufShRYW1lXzEuT2JqZXF0KSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFdvcmxkO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgRGVidWcgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBEZWJ1ZygpIHtcclxuICAgIH1cclxuICAgIERlYnVnLmRlYnVnRW5hYmxlZCA9IHRydWU7XHJcbiAgICBEZWJ1Zy5zaG93RnBzID0gdHJ1ZTtcclxuICAgIERlYnVnLmRldk1vZGUgPSB0cnVlO1xyXG4gICAgcmV0dXJuIERlYnVnO1xyXG59KCkpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBEZWJ1ZztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5Xb3JsZCA9IGV4cG9ydHMuQmFzZSA9IGV4cG9ydHMuVHJhbnNmb3JtID0gZXhwb3J0cy5WZWN0b3IgPSBleHBvcnRzLkNhbWVyYSA9IGV4cG9ydHMuVGltZSA9IGV4cG9ydHMuR2xvYmFsID0gZXhwb3J0cy5Db21wb25lbnQgPSBleHBvcnRzLk9iamVxdCA9IGV4cG9ydHMucXVpdCA9IGV4cG9ydHMucmVzdW1lID0gZXhwb3J0cy5wYXVzZSA9IGV4cG9ydHMuc3RhcnQgPSBleHBvcnRzLmluaXQgPSBleHBvcnRzLkRFRkFVTFRfQ09ORklHID0gZXhwb3J0cy5NT0RFXzNEID0gZXhwb3J0cy5NT0RFXzJEID0gdm9pZCAwO1xyXG52YXIgQmFzZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0NvcmUvQmFzZVwiKSk7XHJcbmV4cG9ydHMuQmFzZSA9IEJhc2VfMS5kZWZhdWx0O1xyXG52YXIgVmVjdG9yXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vQ29yZS9WZWN0b3JcIikpO1xyXG5leHBvcnRzLlZlY3RvciA9IFZlY3Rvcl8xLmRlZmF1bHQ7XHJcbnZhciBUcmFuc2Zvcm1fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Db3JlL1RyYW5zZm9ybVwiKSk7XHJcbmV4cG9ydHMuVHJhbnNmb3JtID0gVHJhbnNmb3JtXzEuZGVmYXVsdDtcclxudmFyIE9iamVxdF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0NvcmUvT2JqZXF0XCIpKTtcclxuZXhwb3J0cy5PYmplcXQgPSBPYmplcXRfMS5kZWZhdWx0O1xyXG52YXIgQ29tcG9uZW50XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vQ29yZS9Db21wb25lbnRcIikpO1xyXG5leHBvcnRzLkNvbXBvbmVudCA9IENvbXBvbmVudF8xLmRlZmF1bHQ7XHJcbnZhciBHbG9iYWxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Db3JlL0dsb2JhbFwiKSk7XHJcbmV4cG9ydHMuR2xvYmFsID0gR2xvYmFsXzEuZGVmYXVsdDtcclxudmFyIFRpbWVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Db3JlL1RpbWVcIikpO1xyXG5leHBvcnRzLlRpbWUgPSBUaW1lXzEuZGVmYXVsdDtcclxudmFyIENhbWVyYV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0NvcmUvQ2FtZXJhXCIpKTtcclxuZXhwb3J0cy5DYW1lcmEgPSBDYW1lcmFfMS5kZWZhdWx0O1xyXG52YXIgV29ybGRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Db3JlL1dvcmxkXCIpKTtcclxuZXhwb3J0cy5Xb3JsZCA9IFdvcmxkXzEuZGVmYXVsdDtcclxud2luZG93LlFhbWUgPSB7XHJcbiAgICBPYmplcXQ6IE9iamVxdF8xLmRlZmF1bHQsXHJcbiAgICBDb21wb25lbnQ6IENvbXBvbmVudF8xLmRlZmF1bHQsXHJcbiAgICBHbG9iYWw6IEdsb2JhbF8xLmRlZmF1bHQsXHJcbiAgICBUaW1lOiBUaW1lXzEuZGVmYXVsdCxcclxuICAgIENhbWVyYTogQ2FtZXJhXzEuZGVmYXVsdCxcclxuICAgIFZlY3RvcjogVmVjdG9yXzEuZGVmYXVsdCxcclxuICAgIFRyYW5zZm9ybTogVHJhbnNmb3JtXzEuZGVmYXVsdCxcclxuICAgIEJhc2U6IEJhc2VfMS5kZWZhdWx0LFxyXG4gICAgV29ybGQ6IFdvcmxkXzEuZGVmYXVsdFxyXG59O1xyXG5leHBvcnRzLk1PREVfMkQgPSAnMmQnO1xyXG5leHBvcnRzLk1PREVfM0QgPSAnM2QnO1xyXG5leHBvcnRzLkRFRkFVTFRfQ09ORklHID0ge1xyXG4gICAgdGFyZ2V0RnBzOiAxMDAsXHJcbiAgICBzdGVwc1BlclNlY29uZDogMjAsXHJcbiAgICBuYW1lOiAnbmV3IGdhbWUnLFxyXG4gICAgbW9kZTogZXhwb3J0cy5NT0RFXzJELFxyXG4gICAgY3R4OiBudWxsXHJcbn07XHJcbmZ1bmN0aW9uIGluaXQoY2FudmFzSWQsIGNvbmZpZykge1xyXG4gICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHVuZGVmaW5lZDsgfVxyXG4gICAgaWYgKCFjb25maWcpXHJcbiAgICAgICAgY29uZmlnID0gZXhwb3J0cy5ERUZBVUxUX0NPTkZJRztcclxuICAgIGNvbmZpZy5jdHggPSBkb2N1bWVudFxyXG4gICAgICAgIC5nZXRFbGVtZW50QnlJZChjYW52YXNJZClcclxuICAgICAgICAuZ2V0Q29udGV4dChjb25maWcubW9kZSk7XHJcbiAgICBHbG9iYWxfMS5kZWZhdWx0LmluaXQoY29uZmlnKTtcclxufVxyXG5leHBvcnRzLmluaXQgPSBpbml0O1xyXG5mdW5jdGlvbiBzdGFydCgpIHtcclxuICAgIEdsb2JhbF8xLmRlZmF1bHQuc3RhcnQoKTtcclxufVxyXG5leHBvcnRzLnN0YXJ0ID0gc3RhcnQ7XHJcbmZ1bmN0aW9uIHBhdXNlKCkge1xyXG4gICAgR2xvYmFsXzEuZGVmYXVsdC5wYXVzZSgpO1xyXG59XHJcbmV4cG9ydHMucGF1c2UgPSBwYXVzZTtcclxuZnVuY3Rpb24gcmVzdW1lKCkge1xyXG4gICAgR2xvYmFsXzEuZGVmYXVsdC5yZXN1bWUoKTtcclxufVxyXG5leHBvcnRzLnJlc3VtZSA9IHJlc3VtZTtcclxuZnVuY3Rpb24gcXVpdCgpIHtcclxuICAgIEdsb2JhbF8xLmRlZmF1bHQucXVpdCgpO1xyXG59XHJcbmV4cG9ydHMucXVpdCA9IHF1aXQ7XHJcbiJdfQ==
