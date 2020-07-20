//实现页面渲染 img,背景 + info + like-btn
(function($, root){
    // 渲染歌曲图片
    function renderImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function(){
            $('.img-box img').attr('src', src);
            root.blurImg(img, $('body'))

        }
    }
    // 渲染歌曲信息
    function renderInfo(data) {
        var str = $('<div class="song-name">'+ data.song +'</div><div class="singer-name">'
        + data.singer +'</div><div class="album">' + data.album + '</div>' )
        $('.song-info').html(str);
    }
    // 根据后台传回的数据渲染爱心显示
    function renderIsLike(like) {
        if(like){
            $('.like').addClass('liking');
        }else{
            $('.like').removeClass('liking');
        }
    }

    root.render = function(data) {
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike)
    }
    


})(window.Zepto, window.player || (window.player = {}))