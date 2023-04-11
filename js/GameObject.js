class GameObject{
    constructor(container,src,x,y,width,height,velX,velY){
        this.container = container;
        this.src=src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velX = velX;
        this.velY = velY;
        this.img = document.createElement('img');

        
        this.img.src=this.src;
        this.img.style.position = 'absolute';
        /*움직일때 x또는 y가 1씩 증가 또는 감소하며 width,height값을 곱해 한 블록씩 움직이는 효과를 준다.*/ 
        this.img.style.left = this.x*blockWidth+'px';
        this.img.style.top = this.y*blockHeight+'px';
        this.img.style.width = this.width+'px';
        this.img.style.height = this.height+'px';

        this.container.appendChild(this.img);
    }


    render(){
        this.img.style.left = this.x*blockWidth+'px';
        this.img.style.top = this.y*blockHeight+'px';
    }
}