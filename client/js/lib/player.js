class Player {
    constructor() {
        this.pos = new Vector2d(32, 32);
        this.rays = [];
        this.angle = 0;
        for (let i = this.angle - 32; i < this.angle + 32; i++) {
            this.rays.push(new Ray(new Vector2d(this.pos.x, this.pos.y), i * (Math.PI/180)))
        }

        this.moveTo = pos => {
            this.pos = pos;
            this.rays.forEach(ray => ray.pos = pos);
        }

        this.act = (keys, boundaries) => {
            if (keys.get('left') && !keys.get('right')) this.angle -= 3;
            if (keys.get('right') && !keys.get('left')) this.angle += 3;
            if (this.angle > 360) this.angle = 0;
            if (this.angle < 0) this.angle = 360;
            this.rays = [];
            for (let i = this.angle - 32; i < this.angle + 32; i++) {
                this.rays.push(new Ray(new Vector2d(this.pos.x, this.pos.y), i * (Math.PI/180)))
            }

            var move = amt => {
                let obstacle = false;
                var isIntersecting = (p1, p2, p3, p4) => {
                    function CCW(p1, p2, p3) {
                        return (p3.y - p1.y) * (p2.x - p1.x) > (p2.y - p1.y) * (p3.x - p1.x);
                    }
                    return (CCW(p1, p3, p4) != CCW(p2, p3, p4)) && (CCW(p1, p2, p3) != CCW(p1, p2, p4));
                }
                boundaries.forEach(boundary => {
                    if (isIntersecting(
                        boundary.a, boundary.b,
                        this.pos, new Vector2d(this.pos.x + Math.cos(this.angle * (Math.PI/180)) * amt, this.pos.y + Math.sin(this.angle * (Math.PI/180)) * amt)
                    )) obstacle = true;
                });
                if (!obstacle) {
                    this.pos.x += Math.cos(this.angle * (Math.PI/180)) * amt;
                    this.pos.y += Math.sin(this.angle * (Math.PI/180)) * amt;
                }
            }
            if (keys.get('up') && !keys.get('down')) move(1);
            if (keys.get('down') && !keys.get('up')) move(-1);
        }

        this.calculView = boundaries => {
            let rays = [];
            let viewDist = [];
            this.rays.forEach(ray => {
                let closest = null;
                let record = Infinity;
                boundaries.forEach(boundary => {
                    const pt = ray.cast(boundary);
                    if (pt) {
                        let d = Math.hypot(pt.x - this.pos.x, pt.y - this.pos.y);
                        if (d < record) {
                            record = d;
                            closest = pt;
                        }
                    }
                });
                if (closest) {
                    rays.push({a:this.pos, b:closest});
                }
                viewDist.push(record);
            });
            return {
                rays: rays,
                viewDist: viewDist
            };
        }
    }
}