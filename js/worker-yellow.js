var node_wall = []
var node_board = []
var n = 9;
var SEARCH_LEVEL = 2
var x,y,wx,wy,blue,yellow;
var shortB
var shortY
var k = 0
importScripts("wall.js")
//評価する
function eval(b1,b2,w1,w2,turn,blue,yellow){
  shortB = call_short(1)
  shortY = call_short(2)
  //var x = Math.floor(Math.random()*2) + 1
  if(shortY == 0){
      return 100
  }else if(blue + 2 < yellow){
    return shortB - shortY - yellow
  }else{
    return shortB - shortY
  } //変更点--------------------
  //return call_short(2) - call_short(1) + (yellow - blue)
  //return Math.floor(Math.random()*100)
}
function evalChild(turn,child,value,type,k,j,i,bestX,bestY,alpha,beta){
  //alert(child + " " + value + " " + beta + " " + alpha)
  if(turn == 1){//^^^^^^^^^^^^^^^^^
    if(child <= value){
      value = child;
      beta = value;
      type = k
      bestX = j;
      bestY = i;
    }
  }else{
    if(child >= value){
      value = child;
      alpha = value;
      type = k
      bestX = j;
      bestY = i;
    }
  }
  return [value,type,bestX,bestY,alpha,beta]
}
function callBeforWall(turn,i,j){
  node_wall[i][j] = 0
}
//1つ前の盤面に戻す
function callBeforBoard(type,b1,b2,w1,w2,turn){
  //type = 1:up 2:down 3:left 4:right
  if(turn == 1){
    x = b1;
    y = b2
  }else{
    x = w1;
    y = w2;
  }
  if(type == 1){
    node_board[y][x] = 0;
    node_board[y+1][x] = turn;
  }
  if(type == 2){
    node_board[y][x] = 0;
    node_board[y-1][x] = turn;
  }
  if(type == 3){
    node_board[y][x] = 0;
    node_board[y][x+1] = turn;
  }
  if(type == 4){
    node_board[y][x] = 0;
    node_board[y][x-1] = turn;
  }
}
//全通り動かす
function miniMax(b1,b2,w1,w2,turn,blue,yellow,alpha,beta,level){
  var value;
  var child;
  var type;
  var bestX;
  var bestY;
  var a = [];
  if(level == 0){
    return eval(b1,b2,w1,w2,turn,blue,yellow)
    //return 0;
  }//黄色がAIとする場合
  if(turn == 1){//----------------------------
    value = 9999;
  }else{
    value = -9999
  }

  if(turn == 1){
    if(b2 - 1 > 0){
      if(node_board[b2-1][b1] != 2 && node_wall[b2-1][b1] != 4 && node_wall[b2-1][b1-1] != 4){
        node_board[b2][b1] = 0;
        node_board[b2-1][b1] = turn;
        work(node_wall,b1,b2,w1,w2,0)
        child = miniMax(b1,b2-1,w1,w2,3-turn,blue,yellow,alpha,beta,level-1)
        a = evalChild(turn,child,value,type,0,99,99,bestX,bestY,alpha,beta)
        value = a[0]
        type = a[1]
        alpha = a[4]
        beta = a[5]
        if(value < alpha){
          callBeforBoard(1,b1,b2-1,w1,w2,turn);
          return value;
        }
        callBeforBoard(1,b1,b2-1,w1,w2,turn);
      }else if(b2 - 2 > 0 && node_board[b2-1][b1] == 2 && node_wall[b2-2][b1] != 4 && node_wall[b2-2][b1-1] != 4 && node_wall[b2-1][b1] != 4 && node_wall[b2-1][b1-1] != 4){
        node_board[b2][b1] = 0;
        node_board[b2-2][b1] = turn;
        work(node_wall,b1,b2,w1,w2,0)
        child = miniMax(b1,b2-2,w1,w2,3-turn,blue,yellow,alpha,beta,level-1)
        a = evalChild(turn,child,value,type,0,99,99,bestX,bestY,alpha,beta)
        value = a[0]
        type = a[1]
        alpha = a[4]
        beta = a[5]
        if(value < alpha){
          callBeforBoard(1,b1,b2-2,w1,w2,turn);
          return value;
        }
        callBeforBoard(1,b1,b2-2,w1,w2,turn);
      }
    }
    //down
    if(b2 < n){
      if(node_board[b2+1][b1] != 2 && node_wall[b2][b1] != 4 && node_wall[b2][b1-1] != 4){
        node_board[b2][b1] = 0;
        node_board[b2+1][b1] = turn;
        work(node_wall,b1,b2,w1,w2,0)
        child = miniMax(b1,b2+1,w1,w2,3-turn,blue,yellow,alpha,beta,level-1)
        a = evalChild(turn,child,value,type,1,99,99,bestX,bestY,alpha,beta)
        value = a[0]
        type = a[1]
        alpha = a[4]
        beta = a[5]
        if(value < alpha){
          callBeforBoard(2,b1,b2+1,w1,w2,turn);
          return value;
        }
        callBeforBoard(2,b1,b2+1,w1,w2,turn);
      }else if(b2 + 1 < n && node_board[b2+1][b1] == 2 && node_wall[b2+1][b1] != 4 && node_wall[b2+1][b1-1] != 4 && node_wall[b2][b1] != 4 && node_wall[b2][b1-1] != 4){
        node_board[b2][b1] = 0;
        node_board[b2+2][b1] = turn;
        work(node_wall,b1,b2,w1,w2,0)
        child = miniMax(b1,b2+2,w1,w2,3-turn,blue,yellow,alpha,beta,level-1)
        a = evalChild(turn,child,value,type,1,99,99,bestX,bestY,alpha,beta)
        value = a[0]
        type = a[1]
        alpha = a[4]
        beta = a[5]
        if(value < alpha){
          callBeforBoard(2,b1,b2+2,w1,w2,turn);
          return value;
        }
        callBeforBoard(2,b1,b2+2,w1,w2,turn);
      }
    }
    //left
    if(b1 - 1 > 0){
      if(node_board[b2][b1-1] != 2 && node_wall[b2-1][b1-1] != 3 && node_wall[b2][b1-1] != 3){
        node_board[b2][b1] = 0;
        node_board[b2][b1-1] = turn;
        work(node_wall,b1,b2,w1,w2,0)
        child = miniMax(b1-1,b2,w1,w2,3-turn,blue,yellow,alpha,beta,level-1)
        a = evalChild(turn,child,value,type,3,99,99,bestX,bestY,alpha,beta)
        value = a[0]
        type = a[1]
        alpha = a[4]
        beta = a[5]
        if(value < alpha){
          callBeforBoard(3,b1-1,b2,w1,w2,turn);
          return value;
        }
        callBeforBoard(3,b1-1,b2,w1,w2,turn);
      }
    }else if(b1 - 2 > 0 && node_board[b2][b1-1] == 2 && node_wall[b2-1][b1-2] != 3 && node_wall[b2-1][b1-2] != 3 && node_wall[b2-1][b1-1] != 3 && node_wall[b2][b1-1] != 3){
      node_board[b2][b1] = 0;
      node_board[b2][b1-2] = turn;
      work(node_wall,b1,b2,w1,w2,0)
      child = miniMax(b1-2,b2,w1,w2,3-turn,blue,yellow,alpha,beta,level-1)
      a = evalChild(turn,child,value,type,3,99,99,bestX,bestY,alpha,beta)
      value = a[0]
      type = a[1]
      alpha = a[4]
      beta = a[5]
      if(value < alpha){
        callBeforBoard(3,b1-2,b2,w1,w2,turn);
        return value;
      }
      callBeforBoard(3,b1-2,b2,w1,w2,turn);
    }
    //right
    if(b1 < n){
      if(node_board[b2][b1+1] != 2 && node_wall[b2-1][b1] != 3 && node_wall[b2][b1] != 3){
        node_board[b2][b1] = 0;
        node_board[b2][b1+1] = turn;
        work(node_wall,b1,b2,w1,w2,0)
        child = miniMax(b1+1,b2,w1,w2,3-turn,blue,yellow,alpha,beta,level-1)
        a = evalChild(turn,child,value,type,2,99,99,bestX,bestY,alpha,beta)
        value = a[0]
        type = a[1]
        alpha = a[4]
        beta = a[5]
        if(value < alpha){
          callBeforBoard(4,b1+1,b2,w1,w2,turn);
          return value;
        }
        callBeforBoard(4,b1+1,b2,w1,w2,turn);
      }else if(b1 + 1 < n && node_board[b2][b1+1] == 2 && node_wall[b2-1][b1+1] != 3 && node_wall[b2][b1+1] != 3 && node_wall[b2-1][b1] != 3 && node_wall[b2][b1] != 3){
        node_board[b2][b1] = 0;
        node_board[b2][b1+2] = turn;
        work(node_wall,b1,b2,w1,w2,0)
        child = miniMax(b1+2,b2,w1,w2,3-turn,blue,yellow,alpha,beta,level-1)
        a = evalChild(turn,child,value,type,2,99,99,bestX,bestY,alpha,beta)
        value = a[0]
        type = a[1]
        alpha = a[4]
        beta = a[5]
        if(value < alpha){
          callBeforBoard(4,b1+2,b2,w1,w2,turn);
          return value;
        }
        callBeforBoard(4,b1+2,b2,w1,w2,turn);
      }
      if(blue >= 0){//縦の壁
        for(var i = 1;i < n;i++){
          for(var j = 1;j < n;j++){
            if(node_wall[i - 1][j] != 3 && node_wall[i + 1][j] != 3 && node_wall[i][j] == 0){
              node_wall[i][j] = 3;
              if(work(node_wall,b1,b2,w1,w2,0)){
                  child = miniMax(b1,b2,w1,w2,3-turn,blue-1,yellow,alpha,beta,level-1)
                  a = evalChild(turn,child,value,type,5,j,i,bestX,bestY,alpha,beta)
                  value = a[0]
                  type = a[1]
                  bestX = a[2]
                  bestY = a[3]
                  alpha = a[4]
                  beta = a[5]
                  if(value < alpha){
                    callBeforWall(turn,i,j)
                    return value;
                  }
                  callBeforWall(turn,i,j)
              }else{
                node_wall[i][j] = 0;
              }
            }
            if(node_wall[i][j-1] != 4 && node_wall[i][j+1] != 4 && node_wall[i][j] == 0){
              node_wall[i][j] = 4;
              if(work(node_wall,b1,b2,w1,w2,0)){
                  child = miniMax(b1,b2,w1,w2,3-turn,blue-1,yellow,alpha,beta,level-1)
                  a = evalChild(turn,child,value,type,4,j,i,bestX,bestY,alpha,beta)
                  value = a[0]
                  type = a[1]
                  bestX = a[2]
                  bestY = a[3]
                  alpha = a[4]
                  beta = a[5]
                  if(value < alpha){
                    callBeforWall(turn,i,j)
                    return value;
                  }
                  callBeforWall(turn,i,j)
              }else{
                node_wall[i][j] = 0;
              }
            }
          }
        }
      }
    }
  }else{
    //up
    if(w2 - 1 > 0){
      if(node_board[w2-1][w1] != 1 && node_wall[w2-1][w1] != 4 && node_wall[w2-1][w1-1] != 4){
        node_board[w2][w1] = 0;
        node_board[w2-1][w1] = turn;
        work(node_wall,b1,b2,w1,w2,0)
        child = miniMax(b1,b2,w1,w2-1,3-turn,blue,yellow,alpha,beta,level-1)
        a = evalChild(turn,child,value,type,0,99,99,bestX,bestY,alpha,beta)
        value = a[0]
        type = a[1]
        alpha = a[4]
        beta = a[5]
        if(value < alpha){
          callBeforBoard(1,b1,b2,w1,w2-1,turn);
          return value;
        }
        callBeforBoard(1,b1,b2,w1,w2-1,turn);
      }else if(w2 - 2 > 0 && node_board[w2-1][w1] == 1 && node_wall[w2-2][w1] != 4 && node_wall[w2-2][w1-1] != 4 && node_wall[w2-1][w1] != 4 && node_wall[w2-1][w1-1] != 4){
        node_board[w2][w1] = 0;
        node_board[w2-2][w1] = turn;
        work(node_wall,b1,b2,w1,w2,0)
        child = miniMax(b1,b2,w1,w2-2,3-turn,blue,yellow,alpha,beta,level-1)
        a = evalChild(turn,child,value,type,0,99,99,bestX,bestY,alpha,beta)
        value = a[0]
        type = a[1]
        alpha = a[4]
        beta = a[5]
        if(value < alpha){
          callBeforBoard(1,b1,b2,w1,w2-2,turn);
          return value;
        }
        callBeforBoard(1,b1,b2,w1,w2-2,turn);
      }
    }
    //right
    if(w1 < n){
      if(node_board[w2][w1+1] != 1 && node_wall[w2-1][w1] != 3 && node_wall[w2][w1] != 3){
        node_board[w2][w1] = 0;
        node_board[w2][w1+1] = turn;
        work(node_wall,b1,b2,w1,w2,0)
        child = miniMax(b1,b2,w1+1,w2,3-turn,blue,yellow,alpha,beta,level-1)
        a = evalChild(turn,child,value,type,2,99,99,bestX,bestY,alpha,beta)
        value = a[0]
        type = a[1]
        alpha = a[4]
        beta = a[5]
        if(value < alpha){
          callBeforBoard(4,b1,b2,w1+1,w2,turn);
          return value;
        }
        callBeforBoard(4,b1,b2,w1+1,w2,turn);
      }else if(w1 + 1 < n && node_board[w2][w1+1] == 1 && node_wall[w2-1][w1+1] != 3 && node_wall[w2][w1+1] != 3 && node_wall[w2-1][w1] != 3 && node_wall[w2][w1] != 3){
        node_board[w2][w1] = 0;
        node_board[w2][w1+2] = turn;
        work(node_wall,b1,b2,w1,w2,0)
        child = miniMax(b1,b2,w1+2,w2,3-turn,blue,yellow,alpha,beta,level-1)
        a = evalChild(turn,child,value,type,2,99,99,bestX,bestY,alpha,beta)
        value = a[0]
        type = a[1]
        alpha = a[4]
        beta = a[5]
        if(value < alpha){
          callBeforBoard(4,b1,b2,w1+2,w2,turn);
          return value;
        }
        callBeforBoard(4,b1,b2,w1+2,w2,turn);
      }
    }
    //left
    if(w1 - 1 > 0){
      if(node_board[w2][w1-1] != 1 && node_wall[w2-1][w1-1] != 3 && node_wall[w2][w1-1] != 3){
        node_board[w2][w1] = 0;
        node_board[w2][w1-1] = turn;
        work(node_wall,b1,b2,w1,w2,0)
        child = miniMax(b1,b2,w1-1,w2,3-turn,blue,yellow,alpha,beta,level-1)
        a = evalChild(turn,child,value,type,3,99,99,bestX,bestY,alpha,beta)
        value = a[0]
        type = a[1]
        alpha = a[4]
        beta = a[5]
        if(value < alpha){
          callBeforBoard(3,b1,b2,w1-1,w2,turn);
          return value;
        }
        callBeforBoard(3,b1,b2,w1-1,w2,turn);
      }else if(w1 - 2 > 0 && node_board[w2][w1-1] == 1 && node_wall[w2-1][w1-2] != 3 && node_wall[w2][w1-2] != 3 && node_wall[w2-1][w1-1] != 3 && node_wall[w2][w1-1] != 3){
        node_board[w2][w1] = 0;
        node_board[w2][w1-2] = turn;
        work(node_wall,b1,b2,w1,w2,0)
        child = miniMax(b1,b2,w1-2,w2,3-turn,blue,yellow,alpha,beta,level-1)
        a = evalChild(turn,child,value,type,3,99,99,bestX,bestY,alpha,beta)
        value = a[0]
        type = a[1]
        alpha = a[4]
        beta = a[5]
        if(value < alpha){
          callBeforBoard(3,b1,b2,w1-2,w2,turn);
          return value;
        }
        callBeforBoard(3,b1,b2,w1-2,w2,turn);
      }
    }
    if(yellow >= 0){//縦の壁
      for(var i = 1;i < n;i++){
        for(var j = 1;j < n;j++){
          if(node_wall[i - 1][j] != 3 && node_wall[i + 1][j] != 3 && node_wall[i][j] == 0){
            node_wall[i][j] = 3;
            if(work(node_wall,b1,b2,w1,w2,0)){
                child = miniMax(b1,b2,w1,w2,3-turn,blue,yellow-1,alpha,beta,level-1)
                a = evalChild(turn,child,value,type,5,j,i,bestX,bestY,alpha,beta)
                value = a[0]
                type = a[1]
                bestX = a[2]
                bestY = a[3]
                alpha = a[4]
                beta = a[5]
                if(value < alpha){
                  callBeforWall(turn,i,j)
                  return value;
                }
                callBeforWall(turn,i,j)
            }else{
              node_wall[i][j] = 0;
            }
          }
          if(node_wall[i][j-1] != 4 && node_wall[i][j+1] != 4 && node_wall[i][j] == 0){
            node_wall[i][j] = 4;
            if(work(node_wall,b1,b2,w1,w2,0)){
                child = miniMax(b1,b2,w1,w2,3-turn,blue,yellow-1,alpha,beta,level-1)
                a = evalChild(turn,child,value,type,4,j,i,bestX,bestY,alpha,beta)
                value = a[0]
                type = a[1]
                bestX = a[2]
                bestY = a[3]
                alpha = a[4]
                beta = a[5]
                if(value < alpha){
                  callBeforWall(turn,i,j)
                  return value;
                }
                callBeforWall(turn,i,j)
            }else{
              node_wall[i][j] = 0;
            }
          }
        }
      }
    }
    if(w2 < n){
      if(node_board[w2+1][w1] != 1 && node_wall[w2][w1] != 4 && node_wall[w2][w1-1] != 4){
        node_board[w2][w1] = 0;;
        node_board[w2+1][w1] = turn;
        work(node_wall,b1,b2,w1,w2,0)
        child = miniMax(b1,b2,w1,w2+1,3-turn,blue,yellow,alpha,beta,level-1)
        a = evalChild(turn,child,value,type,1,99,99,bestX,bestY,alpha,beta)
        value = a[0]
        type = a[1]
        alpha = a[4]
        beta = a[5]
        if(value < alpha){
          callBeforBoard(2,b1,b2,w1,w2+1,turn);
          return value;
        }
        callBeforBoard(2,b1,b2,w1,w2+1,turn);
      }else if(w2 + 1 < n && node_board[w2+1][w1] == 1 && node_wall[w2+1][w1] != 4 && node_wall[w2+1][w1-1] != 4 && node_wall[w2][w1] != 4 && node_wall[w2][w1-1] != 4){
        node_board[w2][w1] = 0;
        node_board[w2+2][w1] = turn;
        work(node_wall,b1,b2,w1,w2,0)
        child = miniMax(b1,b2,w1,w2+2,3-turn,blue,yellow,alpha,beta,level-1)
        a = evalChild(turn,child,value,type,1,99,99,bestX,bestY,alpha,beta)
        value = a[0]
        type = a[1]
        alpha = a[4]
        beta = a[5]
        if(value < alpha){
          callBeforBoard(2,b1,b2,w1,w2+2,turn);
          return value;
        }
        callBeforBoard(2,b1,b2,w1,w2+2,turn);
      }
    }
  }
  if(level == SEARCH_LEVEL){
    //操作を返す
    return [type,bestX,bestY,shortB,shortY]
  }else{
    return value;
  }
}
onmessage = function(event){
  var data = event.data
  node_board = data.board
  node_wall = data.wall
  b1 = data.b1;
  b2 = data.b2;
  w1 = data.w1;
  w2 = data.w2;
  turn = data.turn;
  blue = data.blue_wall;
  yellow = data.yellow_wall;
  var result = miniMax(b1,b2,w1,w2,turn,blue,yellow,-9999,9999,SEARCH_LEVEL);
  postMessage(result)
}
