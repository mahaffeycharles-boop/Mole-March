import { Input } from "./Input.js";

export class Game{

    constructor(canvas){

        this.canvas=canvas;

        this.ctx=canvas.getContext("2d");

        this.input=new Input(canvas);

        this.running=false;

        this.lastFrame=0;

        this.delta=0;

        this.fps=0;

        this.frames=0;

        this.timer=0;

        this.debug=false;

        this.camera={

            x:0,
            y:0

        };

        this.world={

            width:2000,
            height:1200

        };

        this.bindKeys();

        this.updateDebug();

    }

    bindKeys(){

        window.addEventListener("keydown",e=>{

            if(e.code==="F3"){

                e.preventDefault();

                this.debug=!this.debug;

                document.getElementById("debugPanel").style.display=
                    this.debug?"block":"none";

            }

        });

    }

    start(){

        this.running=true;

        requestAnimationFrame(this.loop.bind(this));

    }

    loop(timestamp){

        if(!this.lastFrame)
            this.lastFrame=timestamp;

        this.delta=(timestamp-this.lastFrame)/1000;

        this.lastFrame=timestamp;

        this.update(this.delta);

        this.render();

        requestAnimationFrame(this.loop.bind(this));

    }

    update(dt){

        if(this.input.pressed("ArrowLeft"))
            this.camera.x-=300*dt;

        if(this.input.pressed("ArrowRight"))
            this.camera.x+=300*dt;

        if(this.input.pressed("ArrowUp"))
            this.camera.y-=300*dt;

        if(this.input.pressed("ArrowDown"))
            this.camera.y+=300*dt;

        this.camera.x=Math.max(
            0,
            Math.min(this.camera.x,this.world.width-this.canvas.width)
        );

        this.camera.y=Math.max(
            0,
            Math.min(this.camera.y,this.world.height-this.canvas.height)
        );

        this.frames++;

        this.timer+=dt;

        if(this.timer>=1){

            this.fps=this.frames;

            this.frames=0;

            this.timer=0;

            this.updateDebug();

        }

    }

    render(){

        const ctx=this.ctx;

        ctx.fillStyle="#3d2f22";

        ctx.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        this.drawGrid();

        this.drawOrigin();

    }

    drawGrid(){

        const ctx=this.ctx;

        ctx.strokeStyle="rgba(255,255,255,.08)";

        const tile=32;

        const startX=Math.floor(this.camera.x/tile)*tile;

        const startY=Math.floor(this.camera.y/tile)*tile;

        for(let x=startX;x<=this.camera.x+this.canvas.width;x+=tile){

            ctx.beginPath();

            ctx.moveTo(x-this.camera.x,0);

            ctx.lineTo(x-this.camera.x,this.canvas.height);

            ctx.stroke();

        }

        for(let y=startY;y<=this.camera.y+this.canvas.height;y+=tile){

            ctx.beginPath();

            ctx.moveTo(0,y-this.camera.y);

            ctx.lineTo(this.canvas.width,y-this.camera.y);

            ctx.stroke();

        }

    }

    drawOrigin(){

        const ctx=this.ctx;

        ctx.fillStyle="#ffd84d";

        ctx.beginPath();

        ctx.arc(
            -this.camera.x,
            -this.camera.y,
            6,
            0,
            Math.PI*2
        );

        ctx.fill();

    }

    updateDebug(){

        document.getElementById("fps").textContent=this.fps;

        document.getElementById("cameraPosition").textContent=

            `${Math.floor(this.camera.x)}, ${Math.floor(this.camera.y)}`;

        document.getElementById("moleCount").textContent="0";

        document.getElementById("tilePosition").textContent=

            `${Math.floor(this.input.mouse.x/32)}, ${Math.floor(this.input.mouse.y/32)}`;

        document.getElementById("gameState").textContent="ENGINE";

    }

}