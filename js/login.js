/**
 * Created by chenlei on 2016/12/1.
 */
$(function(){
    /* �����ת */
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
                    // �ж��û��������Ƿ���ȷ������ȷ��ʾ����
                    login(data,loginContent);
                } else if (data.code === 1) {
                    login(data,loginContent);
                    // �ɹ�֮����תҳ��
                    // ɾ������
                    $('.psd').val('');
                    window.location.href = getUrl() + 'posts';
                }
            }
        })
    })
})
//��װlogin����
function login(data,obj){
    obj.html(data.msg);
    obj.fadeIn(function(){
        setTimeout(function(){
            obj.fadeOut();
        },1000);
    });
}