//播放，暂停，获取到歌曲资源
(function($, root){
    function AudioManager() {
        // 创建了一个音频对象
        this.audio = new Audio();
        // 默认状态是暂停
        this.status = 'pause';      
    }
        AudioManager.prototype = {
            play : function() {
                this.audio.play();
                this.status = 'play';
            },
            pause : function() {
                this.audio.pause();
                this.status = 'pause';
            },
            getAudio : function(src) {
                this.audio.src = src;
                this.audio.load();
            },
            playTo : function(time) {
                this.audio.currentTime = time;
            }
    }
    root.audioManager = new AudioManager();

})(window.Zepto, window.player || (window.player = {}))