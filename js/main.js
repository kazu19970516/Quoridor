(function(){
BOARD_TYPE ={
  'WIDTH':9,
  'HEIGHT':9,
  'WIDTH_WALL':8,
  'HEIGHT_WALL':8,
};
PIECE_TYPE ={
  'EMPTY':0,
  'BLUE':1,
  'YELLOW':2,
  'HEIGHT':3,
  'WIDTH':4,
};
var turn;
var s,piece,victory;
var x1,x2,y1,y2,b1,b2,w1,w2;
var blue_wall,yellow_wall;
board = [];
wall = [];

 var worker = new Worker('js/worker.js');
function work_back(){
  worker.onmessage = function(e){
    var k = e.data
    ai1(k)
  }
  if(blue_wall == 0){
    var root1 = []
    work(wall,b1,b2,w1,w2,1)
    root1 = call()
    ai1(root1)
  }else{
    worker.postMessage({"board":board,"wall":wall,
                        "b1":b1,"b2":b2,"w1":w1,"w2":w2,
                        "turn":turn,"blue_wall":blue_wall,"yellow_wall":yellow_wall})
  }
  //worker.postMessage([board,wall,b1,b2,w1,w2,turn,blue_wall,yellow_wall])
}
//up = 0,down = 1,reight = 2,left = 3,widewall = 4,hightwall = 5
function ai1(k){
  //alert(k[0] + " " + k[1] + " " + k[2])
  //alert("青 "+k[3]+" 黄"+k[4])
    if(k[0] == 0){
      if(turn === PIECE_TYPE.BLUE){
       if(board[b2 - 1][b1] == PIECE_TYPE.YELLOW){
          x2 = b2 - 2;x1 = b1;
      }else{
        x2 = b2 - 1;x1 = b1;
      }
      }else{
       if(board[w2 - 1][w1] == PIECE_TYPE.BLUE){
          y2 = w2 - 2;y1 = w1;
      }else{
        y2 = w2 - 1;y1 = w1;
      }
      }
      update();
    }
    if(k[0] == 1){
      if(turn === PIECE_TYPE.BLUE){
  if(board[b2 + 1][b1] == PIECE_TYPE.YELLOW){
      x2 = b2 + 2;x1 = b1;
  }else{
    x2 = b2 + 1;x1 = b1;
  }
  }else{
   if(board[w2 + 1][w1] == PIECE_TYPE.BLUE){
      y2 = w2 + 2;y1 = w1;
  }else{
    y2 = w2 + 1;y1 = w1;
  }
  }
  update();
    }
    if(k[0] == 2){
      if(turn === PIECE_TYPE.BLUE){
   if(board[b2][b1 + 1] == PIECE_TYPE.YELLOW){
      x2 = b2;x1 = b1 + 2;
  }else{
    x2 = b2;x1 = b1 + 1;
  }
  }else{
   if(board[w2][w1 + 1] == PIECE_TYPE.BLUE){
      y2 = w2;y1 = w1 + 2;
  }else{
    y2 = w2;y1 = w1 + 1;
  }
  }
  update();
    }
    if(k[0] == 3){
      if(turn === PIECE_TYPE.BLUE){
   if(board[b2][b1 - 1] == PIECE_TYPE.YELLOW){
      x2 = b2;x1 = b1 - 2;
  }else{
    x2 = b2;x1 = b1 - 1;
  }
  }else{
   if(board[w2][w1 - 1] == PIECE_TYPE.BLUE){
      y2 = w2;y1 = w1 - 2;
  }else{
    y2 = w2;y1 = w1 - 1;
  }
  }
  update();
    }
  //横壁
  if(k[0] == 4){
    var bestX = k[1]
    var bestY = k[2]
    wall[bestY][bestX] = PIECE_TYPE.WIDTH
    update_wall();
  }
  //縦壁
  if(k[0] == 5){
    var bestX = k[1]
    var bestY = k[2]
    wall[bestY][bestX] = PIECE_TYPE.HEIGHT
    update_wall();
  }
}
//ボタンoff
var enable_button = function(){
  document.getElementById("btn6").disabled="disabled";
}
//ボタンのアクション
document.onkeyup = keyup;
function keyup(event){
	if(victory == 1 || victory == 2 || turn == PIECE_TYPE.BLUE)return false//cpu黄色のターンも動かせない----------
	//up
	if(event.which == 38){
	if(turn === PIECE_TYPE.BLUE){
   if(board[b2 - 1][b1] == PIECE_TYPE.YELLOW){
      x2 = b2 - 2;x1 = b1;
  }else{
    x2 = b2 - 1;x1 = b1;
  }
  }else{
   if(board[w2 - 1][w1] == PIECE_TYPE.BLUE){
      y2 = w2 - 2;y1 = w1;
  }else{
    y2 = w2 - 1;y1 = w1;
  }
  }
  update();
	}
	//down
	if(event.which == 40){
      if(turn === PIECE_TYPE.BLUE){
  if(board[b2 + 1][b1] == PIECE_TYPE.YELLOW){
      x2 = b2 + 2;x1 = b1;
  }else{
    x2 = b2 + 1;x1 = b1;
  }
  }else{
   if(board[w2 + 1][w1] == PIECE_TYPE.BLUE){
      y2 = w2 + 2;y1 = w1;
  }else{
    y2 = w2 + 1;y1 = w1;
  }
  }
  update();
	}
	//right
	if(event.which == 39){
      if(turn === PIECE_TYPE.BLUE){
   if(board[b2][b1 + 1] == PIECE_TYPE.YELLOW){
      x2 = b2;x1 = b1 + 2;
  }else{
    x2 = b2;x1 = b1 + 1;
  }
  }else{
   if(board[w2][w1 + 1] == PIECE_TYPE.BLUE){
      y2 = w2;y1 = w1 + 2;
  }else{
    y2 = w2;y1 = w1 + 1;
  }
  }
  update();
	}
	//left
	if(event.which == 37){
      if(turn === PIECE_TYPE.BLUE){
   if(board[b2][b1 - 1] == PIECE_TYPE.YELLOW){
      x2 = b2;x1 = b1 - 2;
  }else{
    x2 = b2;x1 = b1 - 1;
  }
  }else{
   if(board[w2][w1 - 1] == PIECE_TYPE.BLUE){
      y2 = w2;y1 = w1 - 2;
  }else{
    y2 = w2;y1 = w1 - 1;
  }
  }
  update();
  }
}

//ターンの交代
var shift = function(){
  turn = 3 - turn;
  if(turn == 2) {
    document.getElementById("turn").innerText ="黄色のターン"
    document.getElementById("wall").innerText =yellow_wall;
  }
  else {
    document.getElementById("turn").innerText ="青色のターン"
    document.getElementById("wall").innerText =blue_wall;
  }
};
//gineupボタンが押されたとき
judge_giveup = function(){
	victory = 3 - turn;
	show_result(victory);
	show(piece);
  enable_button();
};
//勝敗が決まっているか判定
var judge = function(){
  for(var i = 1;i < BOARD_TYPE.WIDTH+1;i++){
    if(board[1][i] == PIECE_TYPE.BLUE) victory = PIECE_TYPE.BLUE;
    if(board[9][i] == PIECE_TYPE.YELLOW) victory = PIECE_TYPE.YELLOW;
  }
  if(victory == PIECE_TYPE.BLUE || victory == PIECE_TYPE.YELLOW)return true;
  else return false;
};
//動けるかどうか判定
chk_cell = function(){
  if(turn === PIECE_TYPE.BLUE){
    if(1 > x1 || x1 > 9 || 1 > x2 || x2 > 9) return false;
    if(x2 - b2 === 1){//down
    	if(wall[b2][b1] === PIECE_TYPE.WIDTH || wall[b2][b1 - 1] === PIECE_TYPE.WIDTH) return false;
    }else if(b2 - x2 === 1){//up
      if(wall[b2 - 1][b1] == PIECE_TYPE.WIDTH || wall[b2 - 1][b1 - 1] === PIECE_TYPE.WIDTH) return false;
    }else if(x1 - b1 === 1){//right
      if(wall[b2][b1] == PIECE_TYPE.HEIGHT || wall[b2 - 1][b1] === PIECE_TYPE.HEIGHT) return false;
    }else if(b1 - x1 === 1){//left
      if(wall[b2 - 1][b1 - 1] == PIECE_TYPE.HEIGHT || wall[b2][b1 - 1] === PIECE_TYPE.HEIGHT) return false;
    }else if(x2 - b2 === 2){//down
    	if(wall[b2][b1] === PIECE_TYPE.WIDTH || wall[b2][b1 - 1] === PIECE_TYPE.WIDTH ||
    	   wall[b2 + 1][b1] === PIECE_TYPE.WIDTH || wall[b2 + 1][b1 - 1] === PIECE_TYPE.WIDTH) return false;
    }else if(b2 - x2 === 2){//up
      if(wall[b2 - 1][b1] == PIECE_TYPE.WIDTH || wall[b2 - 1][b1 - 1] === PIECE_TYPE.WIDTH ||
         wall[b2 - 2][b1] == PIECE_TYPE.WIDTH || wall[b2 - 2][b1 - 1] === PIECE_TYPE.WIDTH) return false;
    }else if(x1 - b1 === 2){//right
      if(wall[b2][b1] == PIECE_TYPE.HEIGHT || wall[b2][b1 + 1] === PIECE_TYPE.HEIGHT ||
         wall[b2 - 1][b1 + 1] == PIECE_TYPE.HEIGHT || wall[b2 - 1][b1] === PIECE_TYPE.HEIGHT) return false;
    }else if(b1 - x1 === 2){//left
      if(wall[b2 - 1][b1 - 2] == PIECE_TYPE.HEIGHT || wall[b2 - 1][b1 - 1] === PIECE_TYPE.HEIGHT ||
         wall[b2][b1 - 1] == PIECE_TYPE.HEIGHT || wall[b2][b1 - 2] === PIECE_TYPE.HEIGHT) return false;
    }
  }else{
    if(1 > y1 || y1 > 9 || 1 > y2 || y2 > 9) return false;
    if(y2 - w2 === 1){//down
    	if(wall[w2][w1] === PIECE_TYPE.WIDTH || wall[w2][w1 - 1] === PIECE_TYPE.WIDTH) return false;
    }else if(w2 - y2 === 1){//up
      if(wall[w2 - 1][w1] == PIECE_TYPE.WIDTH || wall[w2 - 1][w1 - 1] === PIECE_TYPE.WIDTH) return false;
    }else if(y1 - w1 === 1){//right
      if(wall[w2][w1] == PIECE_TYPE.HEIGHT || wall[w2 - 1][w1] === PIECE_TYPE.HEIGHT) return false;
    }else if(w1 - y1 === 1){//left
      if(wall[w2 - 1][w1 - 1] == PIECE_TYPE.HEIGHT || wall[w2][w1 - 1] === PIECE_TYPE.HEIGHT) return false;
    }else if(y2 - w2 === 2){//down
    	if(wall[w2][w1] === PIECE_TYPE.WIDTH || wall[w2][w1 - 1] === PIECE_TYPE.WIDTH ||
    	   wall[w2 + 1][w1] === PIECE_TYPE.WIDTH || wall[w2 + 1][w1 - 1] === PIECE_TYPE.WIDTH) return false;
    }else if(w2 - y2 === 2){//up
      if(wall[w2 - 1][w1] == PIECE_TYPE.WIDTH || wall[w2 - 1][w1 - 1] === PIECE_TYPE.WIDTH ||
         wall[w2 - 2][w1] == PIECE_TYPE.WIDTH || wall[w2 - 2][w1 - 1] === PIECE_TYPE.WIDTH) return false;
    }else if(y1 - w1 === 2){//right
      if(wall[w2][w1] == PIECE_TYPE.HEIGHT || wall[w2][w1 + 1] === PIECE_TYPE.HEIGHT ||
         wall[w2 - 1][w1 + 1] == PIECE_TYPE.HEIGHT || wall[w2 - 1][w1] === PIECE_TYPE.HEIGHT) return false;
    }else if(w1 - y1 === 2){//left
      if(wall[w2 - 1][w1 - 2] == PIECE_TYPE.HEIGHT || wall[w2 - 1][w1 - 1] === PIECE_TYPE.HEIGHT ||
         wall[w2][w1 - 1] == PIECE_TYPE.HEIGHT || wall[w2][w1 - 2] === PIECE_TYPE.HEIGHT) return false;
    }
  }
  return true;
}
//動かす
var move = function(){
  if(turn === PIECE_TYPE.BLUE){
    board[x2][x1] = turn;
    board[b2][b1] = PIECE_TYPE.EMPTY;
    b2 = x2;b1 = x1;
  }else{
    board[y2][y1] = turn;
    board[w2][w1] = PIECE_TYPE.EMPTY;
    w2 = y2;w1 = y1;
  }
}
//駒を動かすときのチェック項目と表示とターンの変更
update = function(){
  if(chk_cell()){
    move();
    if(judge()){
      show_result(victory);
    }
    show(piece);
    shift();
    if(turn === PIECE_TYPE.BLUE && victory == null) work_back();//-----------------
  }else{alert("その行動はダメです");}
}
//壁を置くときのチェック項目
update_wall = function(){
  if(turn === PIECE_TYPE.BLUE){
    blue_wall = blue_wall - 1;
  }else{
    yellow_wall = yellow_wall - 1;
  }
  show(piece);
  shift();
  if(turn === PIECE_TYPE.BLUE) work_back();//-------------------
}
//壁を置けるかの判定
chk_wall = function(y,x,HW){
  if(turn === PIECE_TYPE.BLUE){
    if(blue_wall === 0){
      alert("壁を持ってないよ")
      return 0
    }
  }else{
    if(yellow_wall === 0){
    alert("壁を持ってないよ")
      return 0;
    }
  }
  if(HW == 1){
    if(wall[y - 1][x] != PIECE_TYPE.HEIGHT && wall[y + 1][x] != PIECE_TYPE.HEIGHT && wall[y][x] == 0){
     wall[y][x] = PIECE_TYPE.HEIGHT;
    }
    else{
      alert("置けないよ!");
      return 0
    }
  }
  else{
    if(wall[y][x - 1] != PIECE_TYPE.WIDTH && wall[y][x + 1] != PIECE_TYPE.WIDTH && wall[y][x] == 0 ){
     wall[y][x] = PIECE_TYPE.WIDTH;
    }
    else{
    alert("置けないよ!");
      return 0
    }
  }
  if(work(wall,b1,b2,w1,w2,0)){
    update_wall();
    return true
  }
  wall[y][x] = 0;
  return false;
}
//読み込まれたときに実行する
window.onload = function(){
  piece =[document.getElementById("cell"),
         document.getElementById("blue"),
         document.getElementById("yellow"),
         document.getElementById("wall_height"),
         document.getElementById("wall_width")];
  for(var y = 0;y < BOARD_TYPE.HEIGHT + 2;y++){
    board[y] = [];
    for(var x = 0;x < BOARD_TYPE.WIDTH + 2;x++){
      board[y][x] = PIECE_TYPE.EMPTY;
    }
  }
  for(var y = 0;y < BOARD_TYPE.HEIGHT_WALL + 2;y++){
    wall[y] = [];
    for(var x = 0;x < BOARD_TYPE.WIDTH_WALL + 2;x++){
      wall[y][x] = PIECE_TYPE.EMPTY;
    }
  }
  turn = PIECE_TYPE.BLUE;//------------
  board[1][5] = PIECE_TYPE.YELLOW;
  board[9][5] = PIECE_TYPE.BLUE;
  b1 = 5; b2 = 9; w1 = 5; w2 = 1;
  x1 = 5; x2 = 9; y1 = 5; y2 = 1;
  blue_wall = 10; yellow_wall = 10;
  show(piece);
  work_back();//---------------
};
})();
