class TopDownDisplay {
    constructor(boundaries) {
        this.canvas = document.createElement('canvas');
        this.cx = this.canvas.getContext("2d");
        this.canvas.width = 512;
        this.canvas.height = 512;
        this.cx.scale(2, 2)
        document.body.appendChild(this.canvas);

        this.draw = view => {
            this.cx.fillStyle = "#000";
            this.cx.fillRect(0, 0, 256, 256);
            this.cx.strokeStyle = '#fff8';
            this.drawRays(view);
            this.cx.strokeStyle = '#fff';
            this.drawBoundaries();
        }

        this.drawBoundaries = () => boundaries.forEach(boundary => {
            this.cx.beginPath();
            this.cx.moveTo(boundary.a.x, boundary.a.y);
            this.cx.lineTo(boundary.b.x, boundary.b.y);
            this.cx.stroke();
        });

        this.drawRays = view => view.rays.forEach(ray => {
            this.cx.beginPath();
            this.cx.moveTo(ray.a.x, ray.a.y);
            this.cx.lineTo(ray.b.x, ray.b.y);
            this.cx.stroke();
        });
    }
}

class FirstPersonDisplay {
    constructor(data) {
        this.canvas = document.createElement('canvas');
        this.cx = this.canvas.getContext("2d");
        this.canvas.width = 512;
        this.canvas.height = 512;
        this.cx.scale(2, 2)
        document.body.appendChild(this.canvas);

        this.draw = view => {
            this.cx.globalAlpha = 1;
            this.cx.fillStyle = "#000";
            this.cx.fillRect(0, 0, 256, 256);
            this.cx.fillStyle = "#fff";

            const w = 256 / view.viewDist.length;
            for (let i = 0; i < view.viewDist.length; i++) {
                this.cx.globalAlpha = Math.abs(1 - view.viewDist[i]/256);
                let h = 255 - view.viewDist[i];
                this.cx.fillRect(i * w,(256 - h) / 2, w, h);
            }
        }
    }
}