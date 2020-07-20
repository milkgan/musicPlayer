(function($, root){
    var duration, frameId, starttime, lastper = 0;
    
    function renderAllTime(allTime) {
        duration = allTime;
        var time = formatTime(allTime);
        $('.all-time').html(time);

    }
    // 转换成分秒时间
    function formatTime(t) {
        var t = Math.round(t);
        // 分
        var m = Math.floor(t / 60);
        // 秒
        var s = t - m * 60;
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;
        return m + ":" + s;

    }

    function start(p) {
        starttime = new Date().getTime();
        cancelAnimationFrame(frameId);
        lastper = p == undefined ? 0 : p;
        function frame() {
            var curtime = new Date().getTime();
        // 注意duration的单位是秒，要将其转换成毫秒
            var per = lastper + (curtime - starttime) / (duration*1000);
            if(per < 1) {
               update(per);
            }else{
                cancelAnimationFrame(frameId);
            }
            frameId = requestAnimationFrame(frame);
            
        }
        frame();
    }

    function update(per) {
        var time = formatTime(per * duration);
        $('.cur-time').html(time);
        var x = (per - 1) * 100;
        $('.pro-top').css({
            transform : 'translateX(' + x + '%)'
        })
    }

    function stop() {
        cancelAnimationFrame(frameId);
        var stoptime = new Date().getTime();
        lastper = lastper + (stoptime - starttime) / (duration*1000);
    }
    root.pro = {
        renderAllTime : renderAllTime,
        start : start,
        stop : stop,
        update : update

    }


})(window.Zepto, window.player || (window.player = {}))