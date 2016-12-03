/**
 * Created by chenlei on 2016/12/2.
 */
$(function(){
    //请求数据
    renderPage();
    $('[data-toggle="tooltip"]').tooltip();
    $('#example').popover();

})

// 实现搜索功能
$('.pctrl-func-btn').on('click',function(){
    var searchVal = $('.pctrl-func-txt').val();
    // 向后台请求数据
    getAjax(getUrl() + 'admin/posts/search','get',{
        'wd':searchVal
    },function(data){
        console.log(data);
        var dataResults = {results:data};
        getRender('trContent',dataResults,$('.table-striped').find('tbody'));
    })
})

// 添加贴子功能
$('.pctrl-func-add').on('click',function(){

})

// 删除贴子
$('.table-striped').on('click','.del',function(){
    var parentTr = $(this).parent().parent();
    $('.alert-danger').fadeIn(200);
    $('.alert-no').on('click',function(){
        $('.alert-danger').fadeOut(200);
    })
    $('.alert-sure').on('click',function(){
        var postId = parentTr.attr('data-id');
        $('.alert-danger').fadeOut(200);
        getAjax(getUrl() + 'admin/posts/delete/' + postId,'get',{},function(data){
            console.log(data);
            if(data.code == 1) {
                //重新渲染页面
                renderPage();
            }
        });
    })

})

// 封装渲染页面的函数
function renderPage(){
    getAjax(getUrl() + 'admin/posts','get',{
        'pageindex': 1,
        'pagesize': 43
    },function(data) {
        var dataResults = {results:data};
        // 渲染数据
        getRender('trContent',dataResults,$('.table-striped').find('tbody'));
    })
}

// 封装ajax请求的函数
function getAjax(url,type,prama,callback){
    $.ajax({
        url: url,
        type: type,
        data: prama,
        success: function(data){
            callback && callback(data);
        }
    })
}

//封装渲染页面的函数
function getRender(obj,prama,toObj){
    var trContent = template(obj,prama);
    toObj.html(trContent);
}



//实例化编辑器
//建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
var ue = UE.getEditor('editor');
function isFocus(e){
    alert(UE.getEditor('editor').isFocus());
    UE.dom.domUtils.preventDefault(e)
}
function setblur(e){
    UE.getEditor('editor').blur();
    UE.dom.domUtils.preventDefault(e)
}
function insertHtml() {
    var value = prompt('插入html代码', '');
    UE.getEditor('editor').execCommand('insertHtml', value)
}
function createEditor() {
    enableBtn();
    UE.getEditor('editor');
}
function getAllHtml() {
    alert(UE.getEditor('editor').getAllHtml())
}
function getContent() {
    var arr = [];
    arr.push("使用editor.getContent()方法可以获得编辑器的内容");
    arr.push("内容为：");
    arr.push(UE.getEditor('editor').getContent());
    alert(arr.join("\n"));
}
function getPlainTxt() {
    var arr = [];
    arr.push("使用editor.getPlainTxt()方法可以获得编辑器的带格式的纯文本内容");
    arr.push("内容为：");
    arr.push(UE.getEditor('editor').getPlainTxt());
    alert(arr.join('\n'))
}
function setContent(isAppendTo) {
    var arr = [];
    arr.push("使用editor.setContent('欢迎使用ueditor')方法可以设置编辑器的内容");
    UE.getEditor('editor').setContent('欢迎使用ueditor', isAppendTo);
    alert(arr.join("\n"));
}
function setDisabled() {
    UE.getEditor('editor').setDisabled('fullscreen');
    disableBtn("enable");
}

function setEnabled() {
    UE.getEditor('editor').setEnabled();
    enableBtn();
}

function getText() {
    //当你点击按钮时编辑区域已经失去了焦点，如果直接用getText将不会得到内容，所以要在选回来，然后取得内容
    var range = UE.getEditor('editor').selection.getRange();
    range.select();
    var txt = UE.getEditor('editor').selection.getText();
    alert(txt)
}

function getContentTxt() {
    var arr = [];
    arr.push("使用editor.getContentTxt()方法可以获得编辑器的纯文本内容");
    arr.push("编辑器的纯文本内容为：");
    arr.push(UE.getEditor('editor').getContentTxt());
    alert(arr.join("\n"));
}
function hasContent() {
    var arr = [];
    arr.push("使用editor.hasContents()方法判断编辑器里是否有内容");
    arr.push("判断结果为：");
    arr.push(UE.getEditor('editor').hasContents());
    alert(arr.join("\n"));
}
function setFocus() {
    UE.getEditor('editor').focus();
}
function deleteEditor() {
    disableBtn();
    UE.getEditor('editor').destroy();
}
function disableBtn(str) {
    var div = document.getElementById('btns');
    var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
    for (var i = 0, btn; btn = btns[i++];) {
        if (btn.id == str) {
            UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
        } else {
            btn.setAttribute("disabled", "true");
        }
    }
        }
function enableBtn() {
    var div = document.getElementById('btns');
    var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
    for (var i = 0, btn; btn = btns[i++];) {
        UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
    }
}

function getLocalData () {
    alert(UE.getEditor('editor').execCommand( "getlocaldata" ));
}

function clearLocalData () {
    UE.getEditor('editor').execCommand( "clearlocaldata" );
    alert("已清空草稿箱")
}

