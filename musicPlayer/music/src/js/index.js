var root = window.player;
var dataList;
var len;
var audio = root.audioManager;
var index = root.indexCtrol;
var timer;

// 获取数据
function getData(url) {
    $.ajax({
        type : 'GET',
        url : url,
        success : function(data){
            dataList = data;//将局部变量抛出去
            len = data.length;//将局部变量抛出去
            // root.render(data[0]); 
            // audio.getAudio(data[0].audio);
            // root.pro.renderAllTime(data[0].duration)
            bindEvent();
            bindTouch();
            root.playList.renderList(data);
            $('body').trigger('playchange', 0);
        },
        error : function() {
            console.log("error");
            
        }       
    })
}

//绑定事件
function bindEvent() {
    $('body').on('playchange', function(e, index) {
        audio.getAudio(dataList[index].audio);
        root.render(dataList[index]);
        root.pro.renderAllTime(dataList[index].duration);
        if(audio.status == "play"){
            audio.play();
            rotated(0);
        }
        $('.img-box').attr('data-deg', 0);
        $('.img-box').css({
            'transform' : 'rotateZ(0deg)',
            'transtion' : 'none'
        })
    })
    $('.prev').on('click', function() {
        var i = index.prev();
        $('body').trigger('playchange', i);
        root.pro.start(0);
        if(audio.status == "pause"){
            root.pro.stop();
        }
        
    });
    $('.next').on('click', function() {
        var i = index.next();
        $('body').trigger('playchange', i);
        root.pro.start(0);
        if(audio.status == "pause"){
            root.pro.stop();
        }
    });
    $('.play').on('click', function() {
        if(audio.status == "pause") {
            audio.play();
            root.pro.start();
            var deg = $('.img-box').attr('data-deg');
            rotated(deg);
        }else{
            audio.pause();
            root.pro.stop();
            clearInterval(timer);
        }
        $('.play').toggleClass('playing');
    });
    $('.list').on("click",function(){
        root.playList.show(index);
        
    })
}

// 进度条拖拽控制
function bindTouch() {
    var $spot = $('.spot');
    var bottom = $('.pro-bottom').offset();
    var l = bottom.left;
    var w = bottom.width;
    $spot.on('touchstart', function(){
        root.pro.stop();
    }).on('touchmove', function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w
        if(per >= 0 && per <= 1){
            root.pro.update(per);
        }
    }).on('touchend', function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w
        if(per >= 0 && per <= 1){
            var time = per * dataList[index.index].duration;
            root.pro.start(per);
            audio.playTo(time);
            audio.play();
            audio.status = 'play';
            $('.play').addClass('playing');
        }
    })
}

function rotated(deg) {
    clearInterval(timer);
    // var deg = 0;
    deg = +deg;
    timer = setInterval(function() {
        deg += 2;
        $('.img-box').attr('data-deg', deg);
        $('.img-box').css({
            'transform' : 'rotateZ(' + deg + 'deg)',
            'transtion' : 'all 1s ease-out'
        })
    }, 200);
}

getData('../mock/data.json');




//信息+图片渲染到页面上 render.js 模糊背景gaussBlur.js
//点击按钮 
// 控制索引 indexCtrol.js
//音频的播放与暂停 切歌 audioControl.js
//进度条运动与拖拽 pro.js
//图片旋转
//列表切歌 playlist.js