$(function () {

	// 官网首页banner轮播焦点按钮居中处理
	var lilen = $(".banner-nav").find("li").size();
	var ulwidth = lilen * 11 + (lilen - 1) * 8;
	var winwidth = $(window).width();
	if (winwidth < 960) {
		winwidth = 960;
	}
	var leftpos = parseFloat((winwidth - ulwidth) * 50 / winwidth);
	$(".banner-nav").css("left", leftpos + "%");
	
});

//轮播组件
(function(win){
    win.timerFID='';
    win.slider={
        currentFocusI:0,
        changeingFocus:false,
        navflag:false,
        speed:800,
        init:function(o){
            var that=this;
            that.o=o;
            that.list= o.find('a.banner');
            that.bar = o.find('.banner-bar');
            that.bannerBg = o.find('.banner-bg');
            that.nav= o.find('.banner-nav li');
			that.next = o.find('.banner-arrows .next');
			that.pre = o.find('.banner-arrows .pre');
            that.initlist();
            that.bindNav();
			that.bindNext();
			that.bindPre();
            that.starFocustAm();
            that.bindIEClick();
        },
        bindNav:function(){
            var that=this;
            that.nav.bind('click',function(e){
                var cur = $(e.currentTarget), i=0;
                that.bar.stop();
                that.bar.css({'width': '0'});
                if(that.navflag)return false;
                if(!cur.hasClass('active')){
                    that.navflag=true;
                    //计算当前active 值
                    that.animateOut(that.o.find('.banner-nav li.active').attr('i'));
                    if(cur.attr('i')=='0'){
                        i=that.nav.length-1;
                    }else{
                        i=parseInt(cur.attr('i'))-1;
                    }
                    that.animateIn(i);
                }
            });
        },
		bindNext:function(){
			 var that=this;
            that.next.bind('click',function(e){
                 //计算当前active 值
				var cur = parseInt(that.o.find('.banner-nav li.active').attr('i')), i=0;
                that.bar.stop();
                that.bar.css({'width': '0'});
				that.animateOut(cur);
                that.animateIn(cur);
            });
		},
		bindPre:function(){
			var that=this,i;
            that.pre.bind('click',function(e){
                 //计算当前active 值
				var cur = parseInt(that.o.find('.banner-nav li.active').attr('i')), i=0;
				that.bar.stop();
                that.bar.css({'width': '0'});
				that.animateOut(cur);
				that.animateInP(cur);
                
			
            });
		},
		initlist:function(){
            var that=this;
            //计算当前active 值
            for(i=0;i<that.nav.length;i++){
                that.nav.eq(i).attr('i',i);
            }
        },
        barAnimate:function(callback){
            var that=this;
            that.bar.animate({'width': '100%'}, 7500, 'linear',callback);
        },
		animateInP:function(i){
            var that=this, o,bg,ci;
            that.stopFocusAm();
            if(i ==0){
                o = that.list.eq(that.list.length-1);
                ci=that.list.length-1;
            }else{
                o = that.list.eq(i-1);
                ci= i-1;
            }
            bg = o.attr('data-bg');
            that.changeBg(bg, function () {
                that.nav.removeClass('active');
                that.nav.eq(ci).addClass('active');
                o.find('.banner-img').eq(1).stop(true,true).animate({'left':'0'},that.speed,'easeOutCubic');
                o.find('.banner-img').eq(0).stop(true,true).animate({'left':'0'},that.speed+400,'easeOutCubic',function(){
					 that.currentFocusI = ci;
                    that.changeingFocus = false;
                    that.navflag=false;
                    that.starFocustAm();
				});
                
                o.find('.banner-img').eq(2).stop(true,true).animate({'left':'0','top':'20px','opacity':'0'},that.speed+300,'easeOutCubic').animate({'top':'0px','opacity':'1'},that.speed+400,'easeOutCubic');
				o.find('.banner-img').eq(3).stop(true,true).animate({'left':'20px','top':'20px','opacity':'0'},that.speed+500,'easeOutCubic').animate({'left':'0px','top':'0px','opacity':'1'},that.speed+400,'easeOutCubic');
                o.find('.banner-img').eq(4).stop(true,true).animate({'left':'-20px','top':'20px','opacity':'0'},that.speed+600,'easeOutCubic').animate({'left':'0px','top':'0px','opacity':'1'},that.speed+600,'easeOutCubic');
            });
        },
        animateIn:function(i,arrow){
            var that=this, o,bg,ci;
            that.stopFocusAm();
            if(i ==that.list.length-1){
                o = that.list.eq(0);
                ci=0;
            }else{
                o = that.list.eq(i+1);
                ci= i+1;
            }
            bg = o.attr('data-bg');
            that.changeBg(bg, function () {
                that.nav.removeClass('active');
                that.nav.eq(ci).addClass('active');
                o.find('.banner-img').eq(1).stop(true,true).animate({'left':'0'},that.speed,'easeOutCubic');
                o.find('.banner-img').eq(0).stop(true,true).animate({'left':'0'},that.speed+400,'easeOutCubic',function(){
					 that.currentFocusI = ci;
                    that.changeingFocus = false;
                    that.navflag=false;
                    that.starFocustAm();
				});
				
                o.find('.banner-img').eq(2).stop(true,true).animate({'left':'0','top':'20px','opacity':'0'},that.speed+300,'easeOutCubic').animate({'top':'0px','opacity':'1'},that.speed+400,'easeOutCubic');
				o.find('.banner-img').eq(3).stop(true,true).animate({'left':'20px','top':'20px','opacity':'0'},that.speed+500,'easeOutCubic').animate({'left':'0px','top':'0px','opacity':'1'},that.speed+400,'easeOutCubic');
                o.find('.banner-img').eq(4).stop(true,true).animate({'left':'-20px','top':'20px','opacity':'0'},that.speed+600,'easeOutCubic').animate({'left':'0px','top':'0px','opacity':'1'},that.speed+600,'easeOutCubic');
            });
        },
        animateInNext:function(i){
            var that=this, o,bg,ci;
            that.stopFocusAm();
            if(i ==that.list.length-1){
                o = that.list.eq(0);
                ci=0;
            }else{
                o = that.list.eq(that.currentFocusI+1);
                ci=that.currentFocusI+1;
            }
            bg = o.attr('data-bg');
            that.changeBg(bg, function () {
                that.nav.removeClass('active');
                that.nav.eq(ci).addClass('active');
                o.find('.banner-img').eq(1).stop(true,true).animate({'left':'0'},that.speed,'easeOutCubic');
				o.find('.banner-img').eq(0).stop(true,true).animate({'left':'0'},that.speed+400,'easeOutCubic',function(){
					 that.currentFocusI = ci;
                    that.changeingFocus = false;
                    that.navflag=false;
                    that.starFocustAm();
				});
                
                o.find('.banner-img').eq(2).stop(true,true).animate({'left':'0','top':'20px','opacity':'0'},that.speed+300,'easeOutCubic').animate({'top':'0px','opacity':'1'},that.speed+400,'easeOutCubic');
				o.find('.banner-img').eq(3).stop(true,true).animate({'left':'20px','top':'20px','opacity':'0'},that.speed+500,'easeOutCubic').animate({'left':'0px','top':'0px','opacity':'1'},that.speed+400,'easeOutCubic');
                o.find('.banner-img').eq(4).stop(true,true).animate({'left':'-20px','top':'20px','opacity':'0'},that.speed+600,'easeOutCubic').animate({'left':'0px','top':'0px','opacity':'1'},that.speed+600,'easeOutCubic');
            });
        },
        /**
         * 当前slider 退出动画
         * @param i
         */
        animateOut:function(i,callback){

            var that=this,o=that.list.eq(i);
            o.find('.banner-img').eq(0).stop(true,true).animate({'left':'150%'},that.speed+200,'easeOutCubic',function(){
                o.find('.banner-img').eq(0).css({'left':'-150%'});
                callback&&callback();
            });
            o.find('.banner-img').eq(1).stop(true,true).animate({'left':'150%'},that.speed,'easeOutCubic',function(){
                o.find('.banner-img').eq(1).css({'left':'-150%'});
            });
            o.find('.banner-img').eq(2).stop(true,true).animate({'opacity':'0','top':'20px'},10,'easeOutCubic',function(){
                o.find('.banner-img').eq(2).css({'left':'0px'});
            });
			o.find('.banner-img').eq(3).stop(true,true).animate({'opacity':'0'},that.speed,"easeOutCubic",function(){
				o.find('.banner-img').eq(3).css({'top':'20px','left':'20px'});
			});
            o.find('.banner-img').eq(4).stop(true,true).animate({'opacity':'0'},that.speed,"easeOutCubic",function(){
                o.find('.banner-img').eq(4).css({'top':'20px','left':'-20px'});
            });
        },
        nextSlider:function(){
            var that=this,_slider,i;
            if(that.changeingFocus) return;
            that.changeingFocus = true;
            //判断是否是最后一个
            if(that.currentFocusI==that.list.length-1){
                _slider = that.list.eq(0);
                i=0;
            }else{
                _slider = that.list.eq(that.currentFocusI+1);
                i=that.currentFocusI+1;
            }

            //初始化下个slider img的位置

            _slider.find('.banner-img').stop(false,true);
            _slider.find('.banner-img').css({'left': '-150%'});

            //初始化进度条
            that.barAnimate(function(){
                that.bar.stop();
                that.bar.css({'width': '0'});

                var ci=that.currentFocusI;
                that.animateOut(ci,function(){
                    that.animateInNext(ci);
                });
            });

        },
        changeBg:function(color, callback){
            var that=this;
            that.bannerBg.fadeOut(500, function () {
               $(this).css('background', color).delay(50).fadeIn(500, callback);

            });
        },
        starFocustAm:function(){
            var that=this;
            win.timerFID = setInterval(function(){
               that.nextSlider();
            },100);
        },
        stopFocusAm:function(){
            clearInterval(win.timerFID);
        },
        bindIEClick:function(){
            var that=this;
            /*解决IE6，7链接点击失效问题*/
            if($.browser.msie && ( $.browser.version=='6.0' || $.browser.version=='7.0' ) ) {
                that.list.bind("click",function(){                                        
                    window.location.href = $(this).attr("href");
                    return false;
                });    
            }        
        }
    };

	window.onscroll = function(){
    var t = document.documentElement.scrollTop || document.body.scrollTop;
    if( t >= 350 ) {
        $('.pendant').css("display","inline");
    } else {
        $('.pendant').css('display', 'none');
    }
}
})(window);
//初始化轮播组件
window.slider.init($('.slide-banner'));