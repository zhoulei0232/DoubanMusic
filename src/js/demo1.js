var value;
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
	url: 'https://api.douban.com/v2/music/search',
	type: 'GET',
	dataType: 'jsonp',
	data: '&q='+value,
	success:function (data){
		mydata=data.musics;
		console.log(data);
		 createDom(mydata);
		}
    });
}
function createDom(mydata){
	var str='';
	for (var j =0 ;j<5;j++){
		var stdata=mydata[j];
		console.log(mydata[j]);
		if(stdata.alt_title ==""){
				str+='<li class="'+stdata.id+'">\
				<img src="'+stdata.image+'" alt="">\
				<p>'+stdata.title+'&nbsp<span>(音乐人)</span></p>\
			</li>';
		}else{
				str+='<li class="'+stdata.id+'">\
				<img src="'+stdata.image+'" alt="">\
				<p>'+stdata.title+'&nbsp<span>其他名称：'+stdata.alt_title+'</span></p>\
				<p><span>表演者：'+stdata.attrs.singer+'</span></p>\
			</li>';
		}
	}
	$('.search-icon').html(str);
}
$('.search-icon').on('click','li',function(){
	console.log($(this).attr('class'));
	window.location.href='demo03.html'+'?&'+$(this).attr('class');
})
$('.inp').on('input',debounce(setinput, 1000, false));
$('.btn').on('click',function(){
	console.log(123);
	var sendtext =$('.inp') .val();
	window.location.href('demo02.html'+'?&'+sendtext+'=0');  
})