var value=location.search.slice(2);
var mydata;
function debounce(func, time, flag) {
            var timer = null;
            var debounced = function () {
                var _this = this;
                var argu = arguments;
                clearTimeout(timer);
                if(flag) {
                    if(!timer) func.apply(_this, argu);
                    timer = setTimeout(function () {
                        timer = null;
                    }, time)
                } else {
                    timer = setTimeout(function () {
                        func.apply(_this, argu);
                    }, time)
                }  
            }
            debounced.cancel = function () {
                clearTimeout(timer);
                timer = null;
            }
            return debounced;
        }
function setinput(e){
	 value = this.value;
	 console.log(value);
	 search(value);
	}
function search(value){
	$.ajax({
	url: 'https://api.douban.com/v2/music/'+value,
	type: 'GET',
	dataType: 'jsonp',
	// data: value,
	success:function (data){
		mydata=data;
		console.log(data);
		 createDom(mydata);
		}
     });
}
function createDom(mydata){
	var str='';
	var ele=mydata.rating.average;
	if(!mydata.attrs.singer){
		mydata.singer ="暂无";
	}
	 	str+=	'<h1>'+mydata.title+'</h1>\
		<div class="left-img">\
			<img src="'+mydata.image+'" alt="">\
			<div><p>更新描述或者封面</p></div>\
			<div><span></span><p>听相似歌曲</p></div>\
		</div>\
		<div class="right-text">\
			<p>又名:'+mydata.alt_title+' </p>\
			<p>表演者: '+mydata.attrs.singer+' </p>\
			<p>介质: '+mydata.attrs.media+'</p>\
			<p>发行时间:'+mydata.attrs.pubdate+' </p>\
			<p>出版者: '+mydata.attrs.publisher+' </p>\
			<p>唱片数:  '+mydata.attrs.discs+'</p>\
		</div>\
		<div class="scorebox">\
			<p>豆瓣评分</p>\
			<p class="score">'+ele+'<span></span></p>\
		</div>\
		<div class="footer">\
			<li><a href="#">想听</a></li>\
			<li><a href="#">听过</a></li>\
			<li><a href="#">在听</a></li>\
			<li>评价:<span></span></li>\
			<li><span></span>写短评</li>\
			<li><span></span>写乐评</li>\
			<li><span></span>添加到豆列</li>\
			<li>分享到<span></span></li>\
		</div>';
   $('.content').html(str);
    ele=-15*(10-parseInt(ele));
	$('.scorebox span').css('background-position','0px '+ele+'px');
}
$('.left-img span').css('background-position','0px -150px' );
search(value);
$('.btn').on('click',function(){
    value =$('.inp').val();
    window.location.href='demo02.html'+'?&'+value+'=0';
})