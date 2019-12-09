var parent = []
var par = []
root = []
var short_blue
var short_yellow

function call_short(turn){
  if(turn == 2)return short_yellow
  else return short_blue
}
function find(sy,sx,s,n,wall){
  var k = (sy-1) * n + (sx-1);
     //down
     if(sy < n){
       if(par[k + n] > par[k] && wall[sy][sx] != 4 && wall[sy][sx-1] != 4){
          par[k + n] = s;
          find(sy+1,sx,s+1,n,wall)
       }
     }
     //up
     if(sy - 1 > 0){
       if(par[k - n] > par[k] && wall[sy-1][sx] != 4 && wall[sy-1][sx-1] != 4){
         par[k - n] = s;
         find(sy-1,sx,s+1,n,wall)
       }
     }
     //left
     if(sx - 1 > 0){
       if(par[k - 1] > par[k] && wall[sy-1][sx-1] != 3 && wall[sy][sx-1] != 3){
         par[k - 1] = s;
         find(sy,sx-1,s+1,n,wall)
       }
     }
     //right
     if(sx < n){
       if(par[k + 1] > par[k] && wall[sy-1][sx] != 3 && wall[sy][sx] != 3){
         par[k + 1] = s;
         find(sy,sx+1,s+1,n,wall)
       }
     }
     return 0;
}
function make_same(n,start){
  for(var i = 0;i < n;i++){
    for(var j = 0;j < n;j++){
      var k = i * n + j;
      if(find_root(parent[k]) == find_root(parent[start])) par[k] = 99;
      else par[k] = -1;//関係ない場所
    }
  }
}
function find_short(turn,k){
  var short = 99;
  var goal
  var x = 0;
  if(turn == 2) x = 72;
  for(var i = 0;i < 9;i++){
    if(par[i + x] < short && par[i + x] > 0){
      short = par[i + x];
      goal = i + x
    }
  }
  if(k == 0) return goal
  else return short
}
//up = 0,down = 1,reight = 2,left = 3
function ans_root(start,goal){
  var here = goal;
  var sy = Math.floor((goal / 9)) + 1;
  var sx = (goal % 9) + 1;
  while(true){
    //console.log(sy + " " + sx + " " + goal + " " + par[57])
    if(par[here] == 0)break;
    if(par[here] - 1 == par[here - 9] && wall[sy-1][sx] != 4 && wall[sy-1][sx-1] != 4){
      here = here - 9;
      sy = sy - 1;
      root.unshift(1)
    }
    else if(par[here] - 1 == par[here + 9] && wall[sy][sx] != 4 && wall[sy][sx-1] != 4){
      here = here + 9;
      sy = sy + 1;
      root.unshift(0)
    }
    else if(par[here] - 1 == par[here - 1] && wall[sy-1][sx-1] != 3 && wall[sy][sx-1] != 3){
      here = here - 1;
      sx = sx - 1
      root.unshift(2)
    }
    else if(par[here] - 1 == par[here + 1] && wall[sy-1][sx] != 3 && wall[sy][sx] != 3){
      here = here + 1;
      sx = sx + 1
      root.unshift(3)
    }
  }
}
function call(){
  //if(root[0] == null) root[0] = 1
  return root
}
function emp(){
  root = []
}
function make_root_ans(n,sy,sx,wall,turn,yy,xx){
  var root_ans = []
  var i = 0;
  var start = (sy-1) * n + (sx-1);
  var teki = (yy-1) * n + (xx-1);
  emp();
  var start_parent = find_root(parent[start])
  make_same(n,start);
  par[start] = 0;
  //par[teki] = 100;
  find(sy,sx,1,n,wall);
  var ans = find_short(turn,0)
  ans_root(start,ans)
  return root;
}
function make_root(n,sy,sx,wall,turn){
  var start = (sy-1) * n + (sx-1);
  var start_parent = find_root(parent[start])
  make_same(n,start);
  par[start] = 0;
  find(sy,sx,1,n,wall);
  var ans = find_short(turn,1)
  return ans;
}

function init(n) {
    for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
        var k = i * n + j
        parent[k] = k
    }
    }
}
function find_root(k) {
    while (parent[k] != k) k = parent[k]
    return k
}

function reg(k1, k2) {
    var p1 = find_root(k1)
    var p2 = find_root(k2)
    if (p1 == p2) return
    else {
    parent[p2] = p1
    }
}

function print_pat(pat, n) {
    for (var i = 0; i < n; i++) {
    s = ""
    for (var j = 0; j < n; j++) {
        s += pat[i * n + j]
    }
    puts(s)
    }
}

function work(wall,b1,b2,w1,w2,a) {
    var n = 9
    var blue = (b2-1) * n + (b1-1);
    var yellow = (w2-1) * n + (w1-1);
    init(n)
    for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
        var k = i * n + j
        if (i > 0) {//up
        var kk = (i - 1) * n + j;
        if (wall[i][j] != 4 && wall[i][j+1] != 4) reg(k, kk)
        }
        if (i < n - 1) {//down
        var kk = (i + 1) * n + j;
        if (wall[i+1][j] != 4 && wall[i+1][j+1] != 4) reg(k, kk)
        }
        if (j > 0) {//left
        var kk = i * n + (j - 1);
        if (wall[i][j] != 3 && wall[i+1][j] != 3) reg(k, kk)
        }
        if (j < n - 1) {//right
        var kk = i * n + (j + 1);
        if (wall[i][j+1] != 3 && wall[i+1][j+1] != 3) reg(k, kk)
        }
    }
    }
    for(var i = 0;i < n;i++){
      if(find_root(parent[i]) == find_root(parent[blue])){
        if(find_root(parent[i + 72]) == find_root(parent[yellow])){
          if(a == 0){
            //yellowがcpuとする
            short_yellow = make_root(n,w2,w1,wall,2)
            //blueがcpuのとき
            short_blue = make_root(n,b2,b1,wall,1)
            //alert(short_blue + "青" + short_yellow + "黄")
          }else{
            if(a == 2)make_root_ans(n,b2,b1,wall,1,w2,w1)
            else if(a == 3)make_root_ans(n,w2,w1,wall,2,b2,b1)
          }
          return true;
        }
      }
    }
    return false;
}
