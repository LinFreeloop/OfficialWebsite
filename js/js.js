$(document).ready(function(){
    $('.last_li').hover(function(){
        $(this).find('.sub_nav').stop(true,true).slideDown('slow');
        return false;
    },function(){
        $(this).find('.sub_nav').stop(true,true).slideUp('slow');
        return false;
    });
    $('.slide-banner').hover(function(){
        $('.banner-arrows').stop(true,true).fadeIn();
    },function(){
        $('.banner-arrows').stop(true,true).fadeOut();
    });
    $('.about_content_left li').click(function(){
        var oli=$(this)[0];
        var li = parseInt($(".about_content_left li").index(oli));
        var top = 41*li;
        $('.down').stop(true,true).animate({'opacity':'1',height:'39px',top:top+'px'}).animate({opacity:'0'});
        $(this).css("background-color",'#3e7bde');
        $(this).siblings('li').css('background-color','#7fa5e3');
        $('.info').load("aboutUs/"+$(this).attr('name')+".html");
    })
});
