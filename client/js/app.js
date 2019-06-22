window.onload = () => {
    class App {
        constructor(socket) {
            this.setupSocket = () => {
                socket.on("welcome", () => console.log('welcome !'));
        
                socket.on("connect_failed", () => socket.close());
                socket.on("disconnect", () => socket.close());
            }
            this.setupSocket();
            socket.emit('join');
        }
    }
    var app = new App(io());
    
    var keyCodes = new Map([
        [37, "left"],
        [38, "up"],
        [39, "right"],
        [40, "down"],
        [87, "shoot"]
    ]);
    var trackKeys = codes => {
        var pressed = new Map();
        codes.forEach(code => pressed.set(code, false));
        var handler = event => {
            if (codes.get(event.keyCode) !== undefined) {
                var down = event.type === "keydown";
                pressed.set(codes.get(event.keyCode), down);
                event.preventDefault();
            }
        };
        addEventListener("keydown", handler);
        addEventListener("keyup", handler);
        return pressed;
    };
    var keys = trackKeys(keyCodes);

    var player = new Player();
    var boundaries = [];

    boundaries.push(new Boundary(new Vector2d(0, 0), new Vector2d(0, 256)));
    boundaries.push(new Boundary(new Vector2d(0, 0), new Vector2d(256, 0)));
    boundaries.push(new Boundary(new Vector2d(256, 256), new Vector2d(0, 256)));
    boundaries.push(new Boundary(new Vector2d(256, 256), new Vector2d(256, 0)));
    boundaries.push(new Boundary(new Vector2d(64, 64), new Vector2d(192, 64)));
    boundaries.push(new Boundary(new Vector2d(192, 64), new Vector2d(192, 192)));
    boundaries.push(new Boundary(new Vector2d(192, 192), new Vector2d(128, 192)));
    boundaries.push(new Boundary(new Vector2d(128, 192), new Vector2d(128, 128)));
    boundaries.push(new Boundary(new Vector2d(64, 128), new Vector2d(128, 128)));
    boundaries.push(new Boundary(new Vector2d(64, 128), new Vector2d(64, 64)));

    var topDownDisplay = new TopDownDisplay(boundaries);
    var firstPersonDisplay = new FirstPersonDisplay(boundaries);

    var frame = () => {
        player.act(keys, boundaries);
        let view = player.calculView(boundaries);
        topDownDisplay.draw(view);
        firstPersonDisplay.draw(view);
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}