class Ray {
    constructor(pos, angle) {
        this.pos = pos;
        this.angle = angle;
        this.dir = new Vector2d(Math.cos(angle), Math.sin(angle));

        this.cast = boundary => {
            const x1 = boundary.a.x;
            const y1 = boundary.a.y;
            const x2 = boundary.b.x;
            const y2 = boundary.b.y;
            
            const x3 = this.pos.x;
            const y3 = this.pos.y;
            const x4 = this.pos.x + this.dir.x;
            const y4 = this.pos.y + this.dir.y;

            const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
            if (den === 0) return null;

            const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
            const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

            if (t > 0 && t < 1 && u > 0) {
                return new Vector2d(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
            }
            else return null;

        }
    }
}