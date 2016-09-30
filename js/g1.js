var num = -1;

function Watch() {
   var span = document.createElement("sapn");
   span.innerHTML = "0:00.01";
   var ms =1;
   var s = 0;//用来记录秒,因为需求是从1开始的。
   var m = 0;//用来记录分钟
   var w = setInterval(function () {
      ms++;
      if(ms==100){
        s++;
        ms =0;
      }

      if (s == 60) {//当秒跑到60时，分钟加1，秒钟从0开始。
          m++;
          s = 0;
      }
      if(ms<10){
        span.innerHTML =  m + ":" + (s < 10 ? "0" + s : s) + ".0" + ms;
      }
      else if(ms < 100){
        span.innerHTML =  m + ":" + (s < 10 ? "0" + s : s) +"."+ ms;
      }
      if (m == 5) { clearInterval(w); } //到过5分钟时停止
    }, 10); //每1000毫秒即1秒执行一次此函数

    $(".showtime").html(span);//显示到页面上
}

$(".moving").click(function(){
  startGame();
});

$(".replay").click(function(){
  $(".congrats").css("display","none");
  $(".welcome").css("display","block");
  $("#welcome_word").html("Welcome to play again!");
  $(this).hide();
  $(".start_again").show();
});

$(".start_again").click(function(){
  $(this).hide();
  $(".moving").show();
  startGame();
});

function change(){
  var xmin = 0;
  var xmax = 1000;
  var ymin = 0;
  var ymax = 640;
  var hmax = 100;
  var hmin = 0;

  var xCoord = Math.floor((Math.random()*xmax)+xmin);
  var yCoord = Math.floor((Math.random()*ymax)+ymin);
  var hCoord = Math.floor((Math.random()*hmax)+hmin);

  var xCoordStr = xCoord.toString() + "px";
  var yCoordStr = yCoord.toString() + "px";
  var hCoordStr = hCoord.toString() + "px";

  var hue = 'rgb(' + (Math.floor(256*Math.random()) ) + ','
                   + (Math.floor(256*Math.random()) ) + ','
                   + (Math.floor(256*Math.random()) ) + ')';

  $(".moving").css({
    "left": xCoordStr,
    "top": yCoordStr,
    "height": hCoordStr,
    "width": hCoordStr,
    "background": hue
  });
}

function startGame(){
  var count = $("input").val();
  if(count <=0){
    count = 10;
  }
  $(".moving").css("font-size",0);
  $(".showtime").css("display","block");
  $(".welcome").hide();
  change();
  num += 1;
  if(num == 0){
    Watch();
  }
  if(num>0){
    showWarning("You have clicked "+num +" times!");
  }
  if(num >= count){
    showSuccess("It is done!");
    $(".moving").hide();
    $(".congrats").css("display","block");
    $("#time").html($(".showtime").text());
    $("#count").html(count);
    $(".showtime").css("display","none");
    $(".replay").css("display","block");
    num = -1;
  }
}
