'use strict';
// please do not delete the 'use strict' line above

const button1 = document.getElementById("color-button"); //Change colorボタンのリファレンス
button1.addEventListener('click', changeColor); //buttonがクリックされた時changeColorを呼び出す

const button2 = document.getElementById("button-to-typingGame");
button2.addEventListener('click', newWindow); //別ウィンドウでタイピングゲームを開く

const button3 = document.getElementById("gravity-button");
button3.addEventListener('click', gravity); //buttonがクリックされた時gravityを呼び出す

const button4 = document.getElementById("big-title-button");
button4.addEventListener('click', titleSizeChangeToBigger); //buttonがクリックされた時サイズを大きくする

const button5 = document.getElementById("small-title-button");
button5.addEventListener('click', titleSizeChangeToSmaller); //buttonがクリックされた時サイズを小さく

const title = document.getElementById("title"); //titleのリファレンス

const img1 = document.getElementById("img1"); //img1のリファレンス

const sushi = document.getElementById("sushiClick");
const divSushi = document.getElementById("divSushi");
sushi.addEventListener('click', displaySushi);

/* 寿司を表示 */
function displaySushi() {
  const num = document.getElementById("sushi").value;
  let str = "";
  for (let i = 1; i <= num; i++) {
    if (i % 10 === 0) {
      str += "🍵";
    } else {
      str += "🍣";
    }
  }
  document.getElementById("display").innerText = str;
}

/* ボタンの位置情報(初期値) */
let position1 = button1.getBoundingClientRect();
let position2 = button2.getBoundingClientRect();
let position3 = button3.getBoundingClientRect();
let position4 = img1.getBoundingClientRect();

/* ボタンの位置座標(初期値) ボタンの左と上の座標*/
const positionObj = {
  button1: [position1.left, position1.top],
  button2: [position2.left, position2.top],
  button3: [position3.left, position3.top],
  img1: [position4.left, position4.top]
};

const heightOfBody = document.body.clientHeight; //bodyタグの縦幅
const heightOfButton = button1.clientHeight; //ボタンの縦幅

/* 新しいウインドウで開く */
function newWindow() {
  console.log('%c"Typing game" button clicked!\n' + Date(), "color:green;"); 
  window.open("https://a-tani-tmc.github.io/TypingGame/");
}

/* 色を変更する */
function changeColor() {
  console.log('%c"Change color" button clicked!\n' + Date(), "color:blue;"); 
  document.body.style.backgroundColor = randomColor(); //bodyの背景をランダムな色に変える
  button1.style.color = randomColor(); //ボタン内のフォント色をランダムな色に変える
  button1.style.backgroundColor = randomColor(); //ボタン背景色をランダムな色に変える
  button1.style.textShadow = "1px 1px 1px black"; //文字に影をつける

  button2.style.color = randomColor(); //ボタン内のフォント色をランダムな色に変える
  button2.style.backgroundColor = randomColor(); //ボタン背景色をランダムな色に変える
  button2.style.textShadow = "1px 1px 1px black"; //文字に影をつける

  button3.style.color = randomColor(); //ボタン内のフォント色をランダムな色に変える
  button3.style.backgroundColor = randomColor(); //ボタン背景色をランダムな色に変える
  button3.style.textShadow = "1px 1px 1px black"; //文字に影をつける

  title.style.color = randomColor();
  divSushi.style.backgroundColor = randomColor();
}

/* ランダムな色を設定する関数 */
function randomColor() {
  const color = { //色情報を格納
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
    a: (Math.floor(Math.random() * 1001) / 1000).toFixed(3) //透過度
  };

  const randomColor = "rgb(" + color.r + ", " + color.g + ", " + color.b + ", " + color.a + ")"; //色情報セット
  return randomColor;
}

/* ボタンに重力がかかったように振舞わせる処理 */
function gravity() {
  console.log('%c"Gravity" button clicked!\n' + Date(), "color:red;"); 
  /* 絶対座標 */
  button1.style.position = 'absolute';
  button2.style.position = 'absolute';
  button3.style.position = 'absolute';

  let dy = 1; //上下に移動させる量（初期値）

  /* 決められた時間毎に処理を実行 */
  setInterval(() => {
    if (positionObj.button1[1] < heightOfBody - heightOfButton && dy > 0) { //ボタンの位置が画面最下端より上にある時かつ、ボタンが降下している時
      dy = Math.abs(dy); //下方向への移動
      dy += 0.02; //落下するに連れて加速
    } else if (positionObj.button1[1] > heightOfBody - heightOfButton && dy > 0) { //ボタンの位置が画面最下端に到達した時
      dy = -1 * Math.abs(dy); //上方向への移動
    } else if (positionObj.button1[1] < 0 && dy < 0) { //ボタンの位置が画面最上端に到達した時
      dy = Math.abs(dy); //下方向への移動
    } else { //ボタンの位置が画面最上端より下にある時かつ、ボタンが上昇している時
      dy = -1 * Math.abs(dy); //上方向への移動
      dy += 0.04; //上昇するに連れて減速
    }
    move1(dy); //button1の座標更新
    move2(dy); //button2の座標更新
    move3(dy); //button3の座標更新
    move4(dy); //img1の座標更新
  }, 5); //5ms毎に実行
}

/* 座標更新 */
function move1(dy) {
  button1.style.left = positionObj.button1[0] + "px";
  positionObj.button1[1] += dy;
  button1.style.top = positionObj.button1[1] + "px";
}
function move2(dy) {
  button2.style.left = positionObj.button2[0] + "px";
  positionObj.button2[1] += dy;
  button2.style.top = positionObj.button2[1] + "px";
}
function move3(dy) {
  button3.style.left = positionObj.button3[0] + "px";
  positionObj.button3[1] += dy;
  button3.style.top = positionObj.button3[1] + "px";
}
let leftPosition = positionObj.img1[0];
function move4(dy) {
  leftPosition -= 0.35; //少しずつ横移動（時間がたてば画面外に撤収）
  img1.style.left = leftPosition + "px";
  positionObj.img1[1] += dy * 2;
  img1.style.top = positionObj.img1[1] + "px";
}

/* titleの文字サイズを大きくする */
function titleSizeChangeToBigger() {
  console.log('%c"タイトルサイズ：大" button clicked!\n' + Date(), "color:orange;"); 
  const sizeChangeRatio = 1.05; //サイズ変更の度合い　この値でかける

  /* titleのフォントサイズ取得 */
  const fontSize = parseFloat(window.getComputedStyle(title, null).getPropertyValue('font-size')); //styleを取得

  title.style.fontSize = fontSize * sizeChangeRatio + "px"; //サイズを大きくする

  /* サイズによって表示を変える */
  if (fontSize > 39) {
    title.innerText = "ボタンと重なってもうてるで・・・🥺（関西風🐯）";
  } else if (fontSize > 28) {
    title.innerText = "ちょっと大きすぎやわ・・・🥺（関西風🐯）";
  } else if (fontSize < 16) { } //何もしない（現状維持）
  else {
    title.innerText = "各ボタンをクリックしてみてください！";
  }
}

/* titleの文字サイズを小さくする */
function titleSizeChangeToSmaller() {
  console.log('%c"タイトルサイズ：小" button clicked!\n' + Date(), "color:purple;"); 
  const sizeChangeRatio = 1.05; //サイズ変更の度合い　この値で割る
  const title = document.getElementById("title");

  /* titleのフォントサイズ取得 */
  const fontSize = parseFloat(window.getComputedStyle(title, null).getPropertyValue('font-size')); //styleを取得
  title.style.fontSize = fontSize / sizeChangeRatio + "px"; //サイズを小さくする

  /* サイズによって表示を変える */
  if (fontSize <= 11) {
    title.innerText = "小さくて見えへんわ・・・🥺（関西風🐯）";
  } else if (fontSize < 16) {
    title.innerText = "ちょっと小さすぎやわ・・・🥺（関西風🐯）";
  } else if (fontSize > 39) { } //何もしない（現状維持）
  else {
    title.innerText = "各ボタンをクリックしてみてください！";
  }
}