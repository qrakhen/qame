class Time {
    private static __start: number;
    private static __frame: number;
    private static __frameCount: number;
    private static __lastFpsReset: number;
    private static __fps: number;
    private static __delta: number;

    static start() {
        Time.__start = Time.__now;
        Time.__frame = Time.__start;
        Time.__frameCount = 0;
        Time.__lastFpsReset = 0;
        Time.__fps = 0;
        Time.__delta = 0;
    }

    private static get __now() {
        return Date.now();
    }

    static update() {
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

export default Time;