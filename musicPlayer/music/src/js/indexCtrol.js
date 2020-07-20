//控制data的索引
(function($, root) {
    function Ctrol() {
        this.index = 0;
    }
    Ctrol.prototype = {
        prev : function() {
            if(this.index == 0){
                this.index = len - 1;
            }else{
                this.index--;
            }
            return this.index;
        },
        next : function() {
            if(this.index == len - 1){
                this.index = 0;
            }else{
                this.index++;
            }
            return this.index;
        }
    }
    root.indexCtrol = new Ctrol();

})(window.Zepto, window.player || (window.player = {}))