class GameStart extends GameObject{
    constructor(container,src,x,y,width,height,velX,velY){
        super(container,src,x,y,width,height,velX,velY);
        this.img.style.zIndex = 7;
    }

}