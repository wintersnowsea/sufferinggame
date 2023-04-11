let blockWidth=50; //한칸당 너비
let blockHeight=50; //한칸당 높이
let stage;
let blockArray = [];
let carrotArray = [];
let roseArray=[];
let lastHp=-1;
//0:일반 블럭 1:잔디 2:사다리 3:빈 공간 4:사다리끝 5:목숨 6:게임끝 7:아이템 8:장애물1 9:장애물2
let map=[
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,7,9,9,1,1,1,1,1,1,1,1,1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,9,8,9,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,4,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0],
    [0,8,9,1,1,1,1,1,4,1,1,1,4,1,1,1,1,1,1,4,1,1,1,1,1,1,2,1,1,1,0],
    [0,0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,4,1,1,1,1,1,2,1,1,1,2,7,1,1,1,1,1,2,1,1,1,1,1,1,1,1,4,1,0],
    [0,0,2,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0],
    [0,1,2,1,1,1,1,1,4,1,1,1,3,8,8,8,8,3,1,1,1,1,1,1,4,1,1,1,2,1,0],
    [0,0,0,0,0,0,0,0,2,0,0,0,3,0,0,0,0,3,0,0,0,0,0,0,2,0,0,0,0,0,0],
    [0,7,7,7,7,3,1,1,2,1,4,1,3,0,7,1,1,1,1,1,1,1,3,1,2,1,1,1,1,4,0],
    [0,0,0,0,0,3,0,0,0,0,2,0,3,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,2,0],
    [0,4,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,1,2,0],
    [0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0],
    [0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,4,1,1,1,1,1,9,8,9,0,7,1,2,1,7,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,4,1,1,1,1,1,2,1,1,1,1,1,4,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0],
    [0,7,8,9,1,1,1,1,1,2,1,0,3,3,1,1,1,1,1,1,1,2,1,1,1,1,4,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0],
    [0,9,8,9,1,1,1,4,1,1,1,1,1,1,1,1,0,7,1,1,1,4,1,1,1,1,2,1,9,8,0],
    [0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0],
    [0,1,1,3,3,3,1,2,1,1,1,1,1,1,4,1,3,0,8,9,1,2,1,1,1,1,4,9,8,9,0],
    [0,0,0,3,3,3,0,0,0,0,0,0,0,0,2,0,3,0,0,0,0,0,0,0,0,0,2,0,0,0,0],
    [0,7,4,1,1,3,3,3,1,1,1,1,1,1,2,1,1,1,1,9,8,9,3,3,3,3,2,1,1,7,0],
    [0,0,2,0,0,3,3,3,0,0,0,0,0,0,2,0,0,0,0,0,0,0,3,3,3,3,2,0,0,0,0],
    [0,1,2,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,2,1,9,8,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];



function createStage(){
    stage=document.createElement("div");

    stage.style.width=blockWidth*map[0].length+"px" //전체 건축물의 너비
    stage.style.height=blockHeight*map.length+"px" //전체 건축물의 높이
    stage.style.margin="auto";
    stage.style.position="relative";
    stage.style.background="gray";

    document.body.appendChild(stage);
}


//0:일반 블럭 1:잔디 2:사다리 3:빈 공간 4:사다리끝
function createMap(){// Map 나중에 배우는 메모리 저장 장소인데, Array랑 비슷한 다른 저장소
    for(let i=0;i<map.length;i++){
        let arr = [];
        for(let a=0;a<map[i].length;a++){
            let block;
            if(map[i][a]==0){
                //constructor(container,src,x,y,width,height,velX,velY)
                block=new Block(stage,"./images/block2.png",a,i,blockWidth,blockHeight,0,0,0);
            }else if(map[i][a]==2){
                block=new Block(stage,"./images/사다리2.png",a,i,blockWidth,blockHeight,0,0,2);
            }else if(map[i][a]==3){
                block=new Block(stage,"./images/background.png",a,i,blockWidth,blockHeight,0,0,3);
            }else if(map[i][a]==4){
                block=new Block(stage,"./images/사다리끝.png",a,i,blockWidth,blockHeight,0,0,4);
            }else if(map[i][a]==5){
                block=new Block(stage,"./images/background2.png",a,i,blockWidth,blockHeight,0,0,5);
            }else if(map[i][a]==6){
                block=new Block(stage,"./images/end.png",a,i,blockWidth,blockHeight,0,0,6);
            }else if(map[i][a]==7){
                block=new Block(stage,"./images/아이템당근.png",a,i,blockWidth,blockHeight,0,0,7);
                carrotArray.push(block);
            }else if(map[i][a]==8){
                block=new Block(stage,"./images/장애물장미.png",a,i,blockWidth,blockHeight,0,0,8);
                roseArray.push(block);
            }else if(map[i][a]==9){
                block=new Block(stage,"./images/장애물장미줄기.png",a,i,blockWidth,blockHeight,0,0,9);
                roseArray.push(block);
            }else{
                block=new Block(stage,"./images/background3.png",a,i,blockWidth,blockHeight,0,0,1);
            }
            arr.push(block);
        }
        blockArray.push(arr);
    }
}