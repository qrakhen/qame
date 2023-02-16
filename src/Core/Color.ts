class Color {
    private __r: number;
    private __g: number;
    private __b: number;
    private __a: number;

    public get r() { return this.__r; }
    public get g() { return this.__g; }
    public get b() { return this.__b; }
    public get a() { return this.__a; }

    public set r(v) { this.__r = Math.min(255, Math.max(0, v)); }
    public set g(v) { this.__g = Math.min(255, Math.max(0, v)); }
    public set b(v) { this.__b = Math.min(255, Math.max(0, v)); }
    public set a(v) { this.__a = Math.min(255, Math.max(0, v)); }

    constructor(
            r: number = 255, 
            g: number = 255, 
            b: number = 255, 
            a: number = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    toHexCode() {
        return "#" + 
            this.r.toString(16) +
            this.g.toString(16) +
            this.b.toString(16) +
            this.a.toString(16);
    }

    clone() {
        return new Color(this.r, this.g, this.b, this.a);
    }
}

export default Color;