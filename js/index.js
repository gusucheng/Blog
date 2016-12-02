/**
 * Created by chenlei on 2016/11/30.
 */
$(function(){
    /* 获取后台数据 */
    var pNum = 1,
        pSiz = 5;
    getContent(pNum,pSiz);
    //点击下一页，跳转下一页
    $('.next').on('click',function(){
        $('.containerList').html('');
        pNum++;
        getContent(pNum,pSiz);
    })
    // 点击上一页，跳转到上一页
    $('.prev').on('click',function(){
        if(pNum >= 2) {
            $('.containerList').html('');
            pNum--;
            getContent(pNum,pSiz);
        } else {
            $('.pager').find('div').fadeIn(function(){
                setTimeout(function(){
                    $('.pager').find('div').fadeOut();
                },1000)
            })
            return ;
        }
    })

    
})
// 封装ajax函数
function getContent(pIndex,pSize){
    $.ajax({
        url:getUrl()+'posts/getpage',
        data:{
            pageindex:pIndex,
            pagesize:pSize
        },
        success: function(data){
            /* 动态获取事件拼接 */
            var resultsData = {results:data};
            var data = new Date();
            var year = data.getFullYear();
            var month = data.getMonth();
            var week = data.getDay();
            var date = data.getDate();
            var auth = 1;
            month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].slice(month,month+1)
            week = ['Mon','Tues','Wed','Thur','Fri','Sat','Sun'].slice(week-1,week)
            var time = 'Posted by '+ auth +' on ' + week.toString() + ' ' + month.toString() + ' ' + date + ' ' + year;
            var contentHtml = template('content',resultsData);
            $('.container').prepend(contentHtml);
            $('.getTime').html(time);
        }
    })
}



/* 实现鼠标向上滚动效果 */
window.onmousewheel = document.onmousewheel = function(e){
    //滚动到顶部消失
    var scrollTop = window.pageYOffset;
    if(scrollTop < 300) {
        $('.container-fluid').css({
            'backgroundColor':'transparent'
        })
        $('.container-fluid').find('a').css({
            'color':'#fff'
        })
    } else {
        // 向上滚nav栏出现
        if(e.wheelDelta > 0) {
            $('.container-fluid').css({
                'position':'fixed',
                'top':0,
                'left':0,
                'width':'100%',
                'backgroundColor':'rgba(255,255,255,0.8)',
            })
            $('.container-fluid').find('a').css({
                'color':'#333',
            })
        } else {
            //向下滚消失
            $('.container-fluid').css({
                'position':'static',
            })
        }
    }
}
