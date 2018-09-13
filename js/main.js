/*wisdom.hu create by 2018/6.12 小郎酒行酒令活动 */

//加载开始音乐和缓存数据
$(window).on('load',function () {
  
})

/* 兼容iOS无法自动播放音效*/
 document.addEventListener("WeixinJSBridgeReady", function () { 
        document.getElementById('audio').play(); 
        // document.getElementById('video').play(); 
    }, false);
var shakeNumber =5; 
$('.game-btn').on('click',function () {
   $(this).parent().css('display','none');
    $("#audio1")[0].play();
     $("#audio2")[0].play();
     shakeNumber = 0;

})
/* 点击出签 */
$('.click-sign').on('click',function () {
    end()
    startinit();

})

// 关闭开启背景音
var audio = $("#audio");
$('.bg-music').on('click',function () {
    if ($('.nomal').hasClass('hide')) {
      $('.nomal').removeClass('hide').parent().addClass('transrota');
      $('.stop').addClass('hide');
      $("#audio")[0].play();
    }else{
      $('.nomal').addClass('hide').parent().removeClass('transrota');
      $('.stop').removeClass('hide');
       $("#audio")[0].pause();
    }
})


// 计算签筒签
var a =1;
function startinit() {
  var timer = null;
  $('.lot-pot').addClass('shake-lot');
  $("#audio")[0].pause();
  $('#audio1')[0].setAttribute('src', 'bgmusic/微信摇一摇.mp3');
  $('#audio1')[0].play(); 
  // document.addEventListener("WeixinJSBridgeReady", function () { 
  //       document.getElementById('audio1').play();  
  //   }, false);

  $('.bg-music').removeClass('transrota');
   var max =0 ;
   var min = 25;
   var result = Math.floor(Math.random()*(max-min+1)+min);
    if (a == 1) {
     timer = setTimeout(function () {
     begin(result);
  },3000);
    a++;  
   }else if (a >1) {
    return false;
   }    
}

function begin(result) {
  var num;
  console.log('这是result:' + result);
    num  = result ;
    $('#mask').css('display','block');
    if ($('#mask').css('display')=='block') {
    $('.light-bg').css('display','none');
    $('.shake-mob').removeClass('ico');
    $("#audio1")[0].pause();
    $('#audio2')[0].setAttribute('src', 'bgmusic/摇一摇结果.mp3');
    $('#audio2')[0].play();
    // document.addEventListener("WeixinJSBridgeReady", function () { 
    //     document.getElementById('audio2').play();  
    // }, false);
    $('.lot-pot').removeClass('shake-lot');
    $('.label').eq(num - 1).css('display','block');
    $('.click-sign').css('display','none');
    $('.mask-btn').addClass('brangk');
  }
  $('.label').eq(num - 1).addClass('showlot');
      
  console.log(num);
  end(num);
}

function end(num) {
  $('.mask-btn').on('click',function () {
    a = 1;
    shakeNumber = 0;
    $('.mask-btn').removeClass('brangk')
    $('.label').eq(num - 1).removeClass('showlot');
    $('.label').eq(num - 1).css('display','none');
    $('#mask').css('display','none');
    $('.click-sign').css('display','block');
    $('.light-bg').css('display','block');
    $('.shake-mob').addClass('ico');
    $('.nomal').removeClass('hide').parent().addClass('transrota');
    $('.stop').addClass('hide');
    $("#audio")[0].play();
     // startinit();
  })
}

// 计算摇晃的弧度
if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion',deviceMotionHandler,false);
  }
  
  /*1、获取加速度信息
    2、通过监听上一步获取到的x, y, z 值在一定时间范围内的变化率，进行设备是否有进行晃动的判断。
    3、而为了防止正常移动的误判，需要给该变化率设置一个合适的临界值。*/
  var SHAKE_THRESHOLD = 4000;
 var last_update = 0;
 var x, y, z, last_x = 0, last_y = 0, last_z = 0;
 function deviceMotionHandler(eventData) {
         var acceleration =eventData.accelerationIncludingGravity;
        var curTime = new Date().getTime();
         if ((curTime-last_update)> 10) {
             var diffTime = curTime -last_update;
             last_update = curTime;
             x = acceleration.x;
             y = acceleration.y;
             z = acceleration.z;
             var speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;
             if (speed > SHAKE_THRESHOLD) {
                  // Do something
                 
                onShake();
             }
             last_x = x;
             last_y = y;
             last_z = z;
         }
 }
 // 节流摇晃
function onShake() { // 摇一摇成功
  shakeNumber++;
  if (shakeNumber == 1) {
     startinit();
  }
 
};


/* 分享功能 */
var baseUrl = 'http://testdmp.zmdtech.com/drinkgame';
var wx_title = '小郎酒行酒令';
var wx_desc = '酒桌小游戏，你敢来挑战吗？';
var wx_link = baseUrl + '/index.html';
var wx_imgUrl = baseUrl + '/img/share-active.png';

var wxJsonData;
var GetConfig = function () {
	$.ajax({
		url: 'http://zmlbnapi.zmdtech.com/mp/shop/auth/jsapiSignature',
		type: 'post',
		data: JSON.stringify({
			url: window.location.href
		}),
		dataType: 'json',
		async: false,
		contentType:'application/json',
		success: function(data) {
			if (data.errorCode == 0) {
				wxJsonData = data.data;
			}
		},
		error: function () {
			
		}
	});
}

GetConfig();

wx.config({
		debug: false,
		appId: wxJsonData.appId,
		timestamp: wxJsonData.timestamp,
		nonceStr: wxJsonData.nonceStr,
		signature: wxJsonData.signature,
		jsApiList: [
			'onMenuShareTimeline',//分享到微信好友
			'onMenuShareAppMessage'//分享到微信朋友圈
		]
	});
/**************************************************** 分享平台 ****************************************************/
wx.ready(function () {
	/**************************************************** 分享到微信朋友圈 ****************************************************/
	wx.onMenuShareTimeline({
		title: wx_title, // 分享标题
		desc: wx_desc, // 分享描述
		link: wx_link, // 分享链接
		imgUrl: wx_imgUrl, // 分享图标
		success: function () {
			// 用户分享成功后执行的回调函数
		},
		cancel: function () {
			// 用户取消分享后执行的回调函数
			
		},
	});


	/**************************************************** 分享到微信好友 ****************************************************/
	wx.onMenuShareAppMessage({
		title: wx_title, // 分享标题
		desc: wx_desc, // 分享描述
		link: wx_link, // 分享链接
		imgUrl: wx_imgUrl, // 分享图标
		type: 'link', // 分享类型,music、video或link，不填默认为link
		success: function () {			
			// 用户分享成功后执行的回调函数
		},
		cancel: function () {
			// 用户取消分享后执行的回调函数
		}
	});


	wx.error(function (res) {
		//layer_msg("温馨提示", res.errMsg, false);
	});

});
