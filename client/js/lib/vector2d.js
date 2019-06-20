class Vector2d {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    plus(other) {
        return new Vector2d(this.x + other.x, this.y + other.y);
    }
    times(factor) {
        return new Vector2d(this.x * factor, this.y * factor);
    }
}
