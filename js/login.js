/**
 * Created by chenlei on 2016/12/1.
 */
$(function(){
    /* 点击跳转 */
    var loginContent = $('.loginFail');
    $('.btn').on('click',function(){
        var userName = $('.uName').val();
        var psd = $('.psd').val();
        $.ajax({
            url: getUrl() + 'account/login',
            type: 'post',
            data: {
                username: userName,
                password: psd
            },
            success: function(data){
                if(data.code === 0) {
                    // 判断用户名密码是否正确，不正确提示错误
                    login(data,loginContent);
                } else if (data.code === 1) {
                    login(data,loginContent);
                    // 成功之后跳转页面
                    // 删除密码
                    $('.psd').val('');
                    window.location.href = getUrl() + 'posts';
                }
            }
        })
    })
})
//封装login函数
function login(data,obj){
    obj.html(data.msg);
    obj.fadeIn(function(){
        setTimeout(function(){
            obj.fadeOut();
        },1000);
    });
}