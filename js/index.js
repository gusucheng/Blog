/**
 * Created by chenlei on 2016/11/30.
 */
/* 获取后台数据 */
$.ajax({
    url:getUrl()+'posts/getpage',
    data:{
        pageindex:1,
        pagesize:5
    },
    success: function(data){
        var resultsData = {results:data};
        console.log(resultsData);
    }
})