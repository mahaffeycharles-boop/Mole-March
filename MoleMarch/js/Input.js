export class Input {

    constructor(canvas){

        this.canvas = canvas;

        this.keys = new Set();

        this.mouse = {

            x:0,
            y:0,

            left:false,

            right:false

        };

        this.initialize();

    }

    initialize(){

        window.addEventListener("keydown", e=>{

            this.keys.add(e.code);

        });

        window.addEventListener("keyup", e=>{

            this.keys.delete(e.code);

        });

        this.canvas.addEventListener("mousemove", e=>{

            const rect=this.canvas.getBoundingClientRect();

            this.mouse.x=e.clientX-rect.left;
            this.mouse.y=e.clientY-rect.top;

        });

        this.canvas.addEventListener("mousedown", e=>{

            if(e.button===0)
                this.mouse.left=true;

            if(e.button===2)
                this.mouse.right=true;

        });

        window.addEventListener("mouseup", ()=>{

            this.mouse.left=false;
            this.mouse.right=false;

        });

        this.canvas.addEventListener("contextmenu",e=>{

            e.preventDefault();

        });

    }

    pressed(key){

        return this.keys.has(key);

    }

}