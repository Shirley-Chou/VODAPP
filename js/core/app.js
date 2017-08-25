(function($, vod){
    //判断页面高度
    vod.pageHeight = function(obj){
        var viewH = $(window).height(),
            pageH = $(document.body).outerHeight(true);
        if(viewH > pageH){
            obj.css('padding-bottom', '0');
            obj.outerHeight(viewH);
        }
        console.log(viewH, pageH)
    };
    //图片懒加载
    vod.imglazyload = function(){
        $("img.lazy").lazyload({
            placeholder : "../images/icon/grey.gif", //用图片提前占位
            effect : "fadeIn", // 载入使用何种效果
            threshold : 300, // 提前开始加载
        });
    };
    //checkbox
    vod.checkStatus = function(obj, cls){
        obj.bind('click', function(){
            $(this).toggleClass(cls);
            if($(this).hasClass(cls)){
                $(this).siblings('input[type="checkbox"]').attr("checked", 'true');
            } else {
                $(this).siblings('input[type="checkbox"]').removeAttr("checked");
            }
        });
    };
    vod.checkIn = function(obj, cls){
        obj.bind('click', function(){
            $(this).siblings('div').toggleClass(cls);
            if($(this).hasClass(cls)){
                $(this).siblings('input[type="checkbox"]').attr("checked", 'true');
            } else {
                $(this).siblings('input[type="checkbox"]').removeAttr("checked");
            }
        });
    };
    //关闭顶部广告
    vod.closeAd = function(){
        $('.index-headerad-close').bind('click', function(){
            $('.index-headerad').fadeOut();
        });
    };
    //回到顶部
    vod.goTop = function(acceleration, time){ //修改参数可调整返回顶部的速度
        acceleration = acceleration || 0.1;
        time = time || 10;
        var speed = 1 + acceleration;

        function getScrollTop(){ //取得滚动条的竖直距离
            return document.documentElement.scrollTop || document.body.scrollTop;
        }

        function setScrollTop(value){ //设置滚动条的竖直距离,实现效果的关键就是在很短的间隔时间内不断地修改滚动条的竖直距离,以实现滚动效果
            document.documentElement.scrollTop = value;
            document.body.scrollTop = value;
        }

        $('.gotop').bind('click', function(){
            var timer = setInterval(function(){
                setScrollTop(Math.floor(getScrollTop() / speed)); //这行代码是关键，取得滚动条竖直距离，除以speed后再给滚动条设置竖直距离
                if(getScrollTop() == 0)
                    clearInterval(timer);
            }, time);
        });
    };
    //子导航烂
    vod.navChannel = function(){
        $('.nav-channelbtn').bind('click', function(){
            $('.nav-channel-icon').toggle();
            $('.nav-channelbox').toggleClass('nav-channel-show');
        });
    };
    //加载更多
    vod.loadmoreAnimate = function(obj){
        obj.bind('click', function(){
            $(this).addClass('vod-list-around');
        });
    };
    vod.toggleCls = function(){
        $('.video-collect').bind('click', function(){
            $(this).toggleClass('video-collect-active');
        });
        $('.video-praise').bind('click', function(){
            $(this).toggleClass('video-praise-active');
        });
    };
    vod.register = function(){
        $('.register-username').blur(function(){
            var username = $(this);
            isUsername(username);
        });
        $('.register-pwd').blur(function(){
            var pwd = $(this);
            isPassWord(pwd);
        });
        $('.register-phone').blur(function(){
            var phone = $(this);
            isPhone(phone);
        });
        $('.vod-popclose').bind('click', function(){
            $('.vod-pop').css({'opacity' : '0', 'z-index' : '-1'});
        });
    }
    //用户名验证
    function isUsername(username){
        var usernameValue = username.val(), unamereg = /^[\u4e00-\u9fa5a-zA-Z0-9_]{5,11}$/, uLen = usernameValue.length;
        if(usernameValue == ""){
            $('.vod-pop').css({'opacity' : '1', 'z-index' : '90'});
            $('.vod-popbox-info').html('账号不能为空！');
            setTimeout(function(){
                $('.vod-pop').css({'opacity' : '0', 'z-index' : '-1'});
            }, 5000);
        } else if(!unamereg.test(usernameValue)){
            $('.vod-pop').css({'opacity' : '1', 'z-index' : '90'});
            $('.vod-popbox-info').html('账号输入有误，请重新输入！');
            setTimeout(function(){
                $('.vod-pop').css({'opacity' : '0', 'z-index' : '-1'});
            }, 5000);
        }
    };
    //密码验证
    function isPassWord(pwd){
        var pwdValue = pwd.val(), pLen = pwdValue.length, usernameValue = $('.register-username').val(),
            pwdroll = /^(?=.*\d)(?=.*[a-z]).{6,16}$/

        if(pwdValue == ""){
            $('.vod-pop').css({'opacity' : '1', 'z-index' : '90'});
            $('.vod-popbox-info').html('密码不能为空！');
            setTimeout(function(){
                $('.vod-pop').css({'opacity' : '0', 'z-index' : '-1'});
            }, 5000);
        } else if(!pwdroll.test(pwdValue)){
            $('.vod-pop').css({'opacity' : '1', 'z-index' : '90'});
            $('.vod-popbox-info').html('密码输入有误，请重新输入！');
            setTimeout(function(){
                $('.vod-pop').css({'opacity' : '0', 'z-index' : '-1'});
            }, 5000);
        } else if(!(pwdValue == "") && pwdValue == usernameValue){
            $('.vod-pop').css({'opacity' : '1', 'z-index' : '90'});
            $('.vod-popbox-info').html('不能与账号一样，请重新输入！');
            setTimeout(function(){
                $('.vod-pop').css({'opacity' : '0', 'z-index' : '-1'});
            }, 5000);
        }
    };
    //手机号
    function isPhone(phone){
        var phoneValue = phone.val(), phonereg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if(phoneValue == ""){
            $('.vod-pop').css({'opacity' : '1', 'z-index' : '90'});
            $('.vod-popbox-info').html('手机号不能为空');
            setTimeout(function(){
                $('.vod-pop').css({'opacity' : '0', 'z-index' : '-1'});
            }, 5000);
        } else if(!phonereg.test(phoneValue)){
            $('.vod-pop').css({'opacity' : '1', 'z-index' : '90'});
            $('.vod-popbox-info').html('请输入正确的手机号码');
            setTimeout(function(){
                $('.vod-pop').css({'opacity' : '0', 'z-index' : '-1'});
            }, 5000);
        }
    };
    //播放记录
    vod.collect = function(){
        $('.collect-choosebtn').bind('click', function(){
            $(this).fadeOut();
            $('.collect-chooseall,.collect-deletebtn,.collect-checkmain').fadeIn();
            $('.collect-list-imgbox').css('margin-left', '0');
        });

        $('.collect-chooseall').bind('click', function(){
            $('.collect-check').each(function(i, e){
                $(e).addClass('collect-checked');
                $(e).siblings('input[type="checkbox"]').attr("checked", 'true');
            });
        });

        $('.collect-check').bind('click', function(){
            $(this).toggleClass('collect-checked');
            if($(this).hasClass('collect-checked')){
                $(this).siblings('input[type="checkbox"]').attr("checked", 'true');
            } else {
                $(this).siblings('input[type="checkbox"]').removeAttr("checked");
            }
        });
    };
    //消息列表
    vod.messageList = function(){
        $('.messagelist-item').each(function(i, e){
            var dateRead = $(e).data('read');
            if(dateRead){
                $(e).addClass('messagelist-read')
            }
        })
    };
}(jQuery, window.app = {}));