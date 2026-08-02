export class Game {

    constructor(canvas) {

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.width = canvas.width;
        this.height = canvas.height;

        this.running = false;

        this.lastFrame = 0;

        this.accumulator = 0;

        this.fixedDelta = 1000 / 60;

        this.frames = 0;

        this.fps = 0;

        this.fpsTimer = 0;

        this.debugVisible = false;

        this.elapsed = 0;

        this.gameState = "BOOT";

        this.camera = {

            x: 0,
            y: 0

        };

        this.input = {

            keys: new Set()

        };

        this.initialize();

    }

    initialize() {

        this.registerKeyboard();

        this.setState("READY");

    }

    start() {

        this.running = true;

        requestAnimationFrame(this.loop.bind(this));

    }

    loop(timestamp) {

        if (!this.running) return;

        if (!this.lastFrame)
            this.lastFrame = timestamp;

        let delta = timestamp - this.lastFrame;

        this.lastFrame = timestamp;

        this.accumulator += delta;

        while (this.accumulator >= this.fixedDelta) {

            this.update(this.fixedDelta / 1000);

            this.accumulator -= this.fixedDelta;

        }

        this.render();

        requestAnimationFrame(this.loop.bind(this));

    }

    update(dt) {

        this.elapsed += dt;

        this.frames++;

        this.fpsTimer += dt;

        if (this.fpsTimer >= 1) {

            this.fps = this.frames;

            this.frames = 0;

            this.fpsTimer = 0;

            this.refreshDebug();

        }

    }

    render() {

        const ctx = this.ctx;

        ctx.clearRect(0, 0, this.width, this.height);

        this.drawBackground();

        this.drawGrid();

        this.drawTitle();

    }

    drawBackground() {

        const ctx = this.ctx;

        ctx.fillStyle = "#433321";

        ctx.fillRect(
            0,
            0,
            this.width,
            this.height
        );

        ctx.fillStyle = "#4d3b28";

        for (let y = 0; y < this.height; y += 64) {

            ctx.fillRect(
                0,
                y,
                this.width,
                2
            );

        }

    }

    drawGrid() {

        const ctx = this.ctx;

        ctx.strokeStyle = "rgba(255,255,255,.05)";

        for (let x = 0; x < this.width; x += 32) {

            ctx.beginPath();

            ctx.moveTo(x, 0);

            ctx.lineTo(x, this.height);

            ctx.stroke();

        }

        for (let y = 0; y < this.height; y += 32) {

            ctx.beginPath();

            ctx.moveTo(0, y);

            ctx.lineTo(this.width, y);

            ctx.stroke();

        }

    }

    drawTitle() {

        const ctx = this.ctx;

        ctx.fillStyle = "#ffe8a0";

        ctx.font = "32px Arial";

        ctx.fillText(
            "MOLE MARCH",
            40,
            60
        );

        ctx.font = "18px Arial";

        ctx.fillStyle = "#ffffff";

        ctx.fillText(
            "Engine Bootstrap v0.1.1",
            42,
            92
        );

    }

    registerKeyboard() {

        window.addEventListener("keydown", e => {

            this.input.keys.add(e.code);

            if (e.code === "F3") {

                e.preventDefault();

                this.toggleDebug();

            }

        });

        window.addEventListener("keyup", e => {

            this.input.keys.delete(e.code);

        });

    }

    toggleDebug() {

        this.debugVisible = !this.debugVisible;

        const panel = document.getElementById("debugPanel");

        panel.style.display = this.debugVisible
            ? "block"
            : "none";

    }

    refreshDebug() {

        document.getElementById("fps").textContent =
            this.fps;

        document.getElementById("cameraPosition").textContent =
            `${Math.floor(this.camera.x)} , ${Math.floor(this.camera.y)}`;

        document.getElementById("gameState").textContent =
            this.gameState;

        document.getElementById("moleCount").textContent =
            "0";

        document.getElementById("tilePosition").textContent =
            "--";

    }

    setState(state) {

        this.gameState = state;

        this.refreshDebug();

    }

}