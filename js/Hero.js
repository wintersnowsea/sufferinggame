class Hero extends GameObject{
    constructor(container,src,x,y,width,height,velX,velY){
        super(container,src,x,y,width,height,velX,velY);
        this.img.style.zIndex = 5;
        this.g=1;
    }
    gravity(){
        this.velY=this.g;
    }
    tick(){
        this.gravity();
        /*주인공의 아래가 블록일경우 중력 효과를 받지않기 위해 velY를 0으로 설정*/
        if(blockArray[this.y+1][this.x].type != 1 &&blockArray[this.y+1][this.x].type != 3){
            this.velY = 0;
        }
        
        this.y+=this.velY;

    
    }

    move(arr){
        //console.log(this.x);
        //console.log(this.y);
        let moveX = this.x+arr[0];
        let moveY = this.y+arr[1];
        if(blockArray[moveY][moveX].type!=0){
            if(blockArray[this.y][this.x].type==2 || blockArray[this.y][this.x].type==4){
                this.y += arr[1];
            }
            this.x += arr[0];
            //console.log(arr[0]);
            //console.log(arr[1]);
        }

        //당근제거 및 하트증가
        for(let i =0;i<carrotArray.length;i++){
            if(this.x == carrotArray[i].x && this.y == carrotArray[i].y){   
                carrotArray[i].img.src = "./images/background3.png";
                carrotArray[i].type = 1;
                carrotArray.splice(i,1);
                heart=new Heart(stage,"./images/heart.png",1+heartArray.length,1,50,50,0,0);
                heartArray.push(heart);
                lastHp++;

            }
        }

        //장애물 하트제거
        for(let a =0; a<roseArray.length; a++){
            
            if(this.x == roseArray[a].x && this.y == roseArray[a].y){   
                if(heartArray.length>0){
                    this.container.removeChild(heartArray[lastHp].img);
                    heartArray.splice(lastHp,1);
                    lastHp--;
                }else if(heartArray.length<=0){
                    loopFlag = false;
                    createGameOver();
                }
            }

        }

        //성공하기
        if(blockArray[this.y][this.x].type==6){
            loopFlag = false;
            createGameSuccess();
        }

        //조명효과
        if(loopFlag){
            for(let i=0;i<blockArray.length;i++){
                for(let j=0;j<blockArray[i].length;j++){
                    /* this, 즉 hero 나를 중심으로 거리가 view(2)보다 가까울때 보이게하는 코드 */
                    if(blockArray[i][j].x > this.x-view && blockArray[i][j].x<this.x+view && blockArray[i][j].y > this.y-view && blockArray[i][j].y<this.y+view){
                        blockArray[i][j].img.style.opacity=0.8;
                    /*가장자리를 보여주기위한 코드*/
                    }else if(i<3 || i==blockArray.length-1){
                        blockArray[i][j].img.style.opacity=1;
                    }else if(j==0 || j==blockArray.length-1){
                        blockArray[i][j].img.style.opacity=1;
                    /*가장가리도 아니고 hero 주변도 아닌 맵은 보이지 않게 한다.*/
                    }else{
                        blockArray[i][j].img.style.opacity=0;
                    }
                }
            }
        }

    }
}