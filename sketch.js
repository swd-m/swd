//}
let pg;


//----ゲーム全体に関わる部分 ----------------------------------------------
function updatePosition(entity){
  entity.x += entity.vx;
  entity.y += entity.vy;
}

//プレイヤー用
function createPlayer(){
  return{
    
    x: 200,
    y: 300,
    vx: 0,
    vy: 0
  }
}

function applyGravity(entity){
  entity.vy+=0.15;
}

function applyJump(entity){
  entity.vy+=-5;
}

 

function drawPlayer(entity){
  //strokeWeight(1);
  //stroke(200);
  //line(entity.x, entity.y, entity.x+10, entity.y+10);
  //line(0, entity.y, entity.x, entity.y);
  
  // 魚
  noStroke(255);
  fill("#ffffe0")
  
  //stroke(200, 0, 0);
  drawFish(entity.x-15, entity.y, 50); 
  
  noStroke(255);
  fill(0)
  ellipse(entity.x+10, entity.y-5, 5, 5);
  //image(img,entity.x, entity.y, width, height);
}

function drawFish(ox, oy, r) {
  push();
  translate(ox, oy);

  beginShape();
  for (let theta = 0; theta < 360; theta++) {
    let x = r * cos(theta) - r * pow(sin(theta), 2) / sqrt(2);
    let y = r * cos(theta) * sin(theta);

    vertex(x, y);
  }
  endShape(CLOSE);

  pop();
}


function playerIsAlive(entity){
  return entity.y<600;
}

//ブロック用
function createBlock(y,vy,vx){
  return{
    x: 900,
    y,//?
    vx,
    vy,
  };
}

function drawBlock(entity){
  noStroke();
  fill("#add8e6");

  let time = frameCount * 0.2;
  let transformValue = 5 * sin(time);
  let width = 80 + transformValue;
  let height = 80 - transformValue;

  
  ellipse(entity.x, entity.y, width, height);
  //rect(entity.x, entity.y, 80, 80);
}

function blockIsAlive(entity){
  return -100 < entity.x;
}



function entitiesAreColliding(
  entityA,
  entityB,
  collisionXDistance,
  collisionYDistance
){
  let currentXDistance = abs(entityA.x - entityB.x); // 現在のx距離
  if (collisionXDistance <= currentXDistance) return false;

  let currentYDistance = abs(entityA.y - entityB.y); // 現在のy距離
  if (collisionYDistance <= currentYDistance) return false;

  return true;
}




let times=0;

function count(){
  
  times=millis()/1000;
  times=int(times);
  
}
function nani(){
  
  switch (gameState) {
    case "play":
      // プレイ中の状態ならプレイヤーをジャンプさせる
      noStroke();
      fill(255);
      rectMode(CENTER);
      rect(width/10,height/10,150,80,10);
      fill(0);
      textSize(50);
      text(times+"m",width/10,height/10,width/10,height/10);
      break;
    case "gameover":
      // ゲームオーバー状態ならリセット
      
      break;
  }
  
  
}


let player;//player変数
let blocks;
let gameState;
let countTime;




//----setup/draw 他 ------------------------------------------------------


//上下作成。追加
function addBlockPair(){
  let y=random(-100,100);
  let vy=random(-1.5,1.5);
  let g=random(0,300);
  let k=random(-1,0);
  let l=random(0,1);
  let vx=random(-1,1);
  //let r=random(0,20);
  blocks.push(createBlock(y,vy+l,-2));
  blocks.push(createBlock(y+g,vy+k,-2+vx));
}



//
function drawGameoverScreen(){
  background(0,192);
  fill("#ff0000");
  textSize(64);
  textAlign(CENTER, CENTER); // 横に中央揃え ＆ 縦にも中央揃え
  text("GAME OVER", width / 2, height / 2); // 画面中央にテキスト表示
}
/** ゲームの初期化・リセット */
function resetGame() {
  // 状態をリセット
  gameState="play";

  player=createPlayer();
  blocks=[];
  time=0;
  
  
}



/** ゲームの更新 */
function updateGame() {


  // ゲームオーバーなら更新しない
  if(gameState==="gameover") return;

  if (frameCount % 70 === 1) addBlockPair(blocks); // 一定間隔で追加
  blocks = blocks.filter(blockIsAlive); // 生きているブロックだけ残す
  
  

  // 全エンティティの位置を更新
  updatePosition(player);
  for (let block of blocks) updatePosition(block);
  applyGravity(player)

  

  // プレイヤーが死んでいたらゲームオーバー
  if (!playerIsAlive(player)) gameState = "gameover";

  for(let block of blocks){
    if(entitiesAreColliding(player,block,20+40,20+40)){
      gameState="gameover";
      break;
    }
  }
}

/** ゲームの描画 */
function drawGame() {
  
  

  background("#191970");//黒
  drawPlayer(player);//描く
  for (let block of blocks) drawBlock(block);
  
 

  count();
  nani();

  // ゲームオーバーならそれ用の画面を表示
  if(gameState==="gameover") drawGameoverScreen();
  
}

/** マウスボタンが押されたときのゲームへの影響 */
function onMousePress() {
  switch(gameState){
    case "play":

      applyJump(player);
      break;
    case "gameover":
      resetGame();
      //nani();
      break;

  }
  
}





function setup() {


  

  createCanvas(800, 600); // 800 x 600 ピクセル。今回このサイズでやっていきます
  rectMode(CENTER); //四角形の基準点を中心に変更
  
   
  //player = createPlayer();
  //block=createBlock(300);//中央に配置
  //blocks=[];
  //（ここに初期化処理が入る）
  resetGame();

}

function draw() {
  
  
  
  //ブロックの追加、削除
  //if(frameCount % 120===1) addBlockPair(blocks);// 一定間隔で追加
  //blocks=blocks.filter(blockIsAlive); // 生きているブロックだけ残す


  //（ここにデータ操作処理が入る）
  //updatePosition(player);//位置
  //for(let block of blocks) updatePosition(block);
  //updatePosition(block);
  //applyGravity(player);//重力

  //background("#210062");//黒
  //drawPlayer(player);//描く
  //for (let block of blocks) drawBlock(block);
  //drawBlock(block);
  
  updateGame();
  
  drawGame();
  
}

function mousePressed(){
  //（ここにマウスボタンを押したときの処理が入る）
  //applyJump(player);//ジャンプ
  onMousePress();
}