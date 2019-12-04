var show_result = function(victory){
  if(victory == PIECE_TYPE.BLUE) alert("緑色の勝ちです");
  else alert("黄色の勝ちです")
}

var show = function(piece){
  var b = document.getElementById("board");
  while(b.firstChild){
    b.removeChild(b.firstChild);
  }
   for(var y = 1;y <= BOARD_TYPE.HEIGHT_WALL;y++){
    for(var x = 1;x <= BOARD_TYPE.WIDTH_WALL;x++){
      var s = piece[wall[y][x]].cloneNode(true);
      s.style.left = ((x - 1) * 40)+"px";
      s.style.top = ((y - 1) * 40)+"px";
      b.appendChild(s);
    }
  }
  for(var y = 1;y <= BOARD_TYPE.HEIGHT;y++){
    for(var x = 1;x <= BOARD_TYPE.WIDTH;x++){
      var c = piece[board[y][x]].cloneNode(true);
      c.style.left = ((x - 1) * 40)+"px";
      c.style.top = ((y - 1) * 40)+"px";
      b.appendChild(c);
    }
  }
  return true
}
