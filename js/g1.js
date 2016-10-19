var num = -1;
var nums = 0;

var divs = [];
var times = [];
var no_xx = [];
var avg_time = [];

function Watch() {
    var span = document.createElement("sapn");
    span.innerHTML = "0:00.01";
    var ms = 1;
    var s = 0; //用来记录秒,因为需求是从1开始的。
    var m = 0; //用来记录分钟
    var w = setInterval(function() {
        ms++;
        if (ms == 100) {
            s++;
            ms = 0;
        }
        if (s == 60) { //当秒跑到60时，分钟加1，秒钟从0开始。
            m++;
            s = 0;
        }
        if (ms < 10) {
            span.innerHTML = m + ":" + (s < 10 ? "0" + s : s) + ".0" + ms;
        } else if (ms < 100) {
            span.innerHTML = m + ":" + (s < 10 ? "0" + s : s) + "." + ms;
        }
        if (m == 5) {
            clearInterval(w);
        } //到过5分钟时停止
    }, 10); //每1000毫秒即1秒执行一次此函数
    $(".showtime").html(span); //显示到页面上
}

$(".moving").click(function() {
    startGame();
});

$(".replay").click(function() {
    $(".congrats").css("display", "none");
    $(".welcome").css("display", "block");
    $("#bar").css("display", "block");
    $("#bar2").css("display", "block");
    $("#welcome_word").html("Welcome to play again!");
    $(this).hide();
    $(".start_again").show();
    chart();
    //alert(divs.pop());
});

$(".start_again").click(function() {
    $(this).hide();
    $(".moving").show();
    startGame();
});

function change() {
    var xmin = 0;
    var xmax = 1000;
    var ymin = 0;
    var ymax = 640;
    var hmax = 100;
    var hmin = 0;

    var xCoord = Math.floor((Math.random() * xmax) + xmin);
    var yCoord = Math.floor((Math.random() * ymax) + ymin);
    var hCoord = Math.floor((Math.random() * hmax) + hmin);

    var xCoordStr = xCoord.toString() + "px";
    var yCoordStr = yCoord.toString() + "px";
    var hCoordStr = hCoord.toString() + "px";

    var hue = 'rgb(' + (Math.floor(256 * Math.random())) + ',' +
        (Math.floor(256 * Math.random())) + ',' +
        (Math.floor(256 * Math.random())) + ')';

    $(".moving").css({
        "left": xCoordStr,
        "top": yCoordStr,
        "height": hCoordStr,
        "width": hCoordStr,
        "background": hue
    });
}

function startGame() {
    var count = $("input").val();
    if (count <= 0) {
        count = 10;
    }
    $(".moving").css("font-size", 0);
    $(".showtime").css("display", "block");
    $(".welcome").hide();
    $("#bar").css("display", "none");
    $("#bar2").css("display", "none");
    change();
    num += 1;
    if (num == 0) {
        Watch();
    }
    if (num > 0) {
        showWarning("You have clicked " + num + " times!");
    }
    if (num >= count) {
        showSuccess("It is done!");
        $(".moving").hide();
        $(".congrats").css("display", "block");
        $("#time").html($(".showtime").text());
        $("#count").html(count);
        divs.push(parseInt(count));
        m = parseInt($(".showtime").text().substring(0, 2));
        s = parseInt($(".showtime").text().split(":")[1].substring(0, 2));
        ms = parseInt($(".showtime").text().split(".")[1]);
        tt = ms / 100 + s + 60 * m;
        times[nums] = tt;
        $(".showtime").css("display", "none");
        $(".replay").css("display", "block");
        num = -1;
        nums += 1;
        no_xx.push(nums);
        avg_time.push(tt / parseInt(count));
    }
}

function chart() {
    var myChart = echarts.init(document.getElementById('bar'));
    var myChart2 = echarts.init(document.getElementById('bar2'));

    var option = {
        title: {
            text: 'time --- Numbers of Divs'
        },
        xAxis: {
            data: divs
        },
        yAxis: [{}],
        series: [{
            name: 'time',
            type: 'bar',
            color: ['#3398DB'],
            barWidth: '30%',
            data: times,
            animationDelay: function(idx) {
                return idx * 10 + 50;
            }
        }, {
            name: 'time',
            type: 'line',
            data: times,
            animationDelay: function(idx) {
                return idx * 10;
            }
        }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function(idx) {
            return idx * 5;
        }
    };

    var option2 = {
        title: {
            text: 'avg.time --- No.xx'
        },
        xAxis: {
            data: no_xx
        },
        yAxis: [{}],
        series: [{
            name: 'avg.time',
            type: 'bar',
            color: ['#EEEE00'],
            barWidth: '30%',
            data: avg_time,
            animationDelay: function(idx) {
                return idx * 10 + 50;
            }
        }, {
            name: 'avg.time',
            type: 'line',
            data: avg_time,
            animationDelay: function(idx) {
                return idx * 10;
            }
        }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function(idx) {
            return idx * 5;
        }
    };
    myChart.setOption(option);
    myChart2.setOption(option2);
}
