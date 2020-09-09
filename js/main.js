$(function(){
	//解决键盘收起后页面不下沉的bug
	$('input[type="text"], input[type="number"]')
		.blur(function(){
			setTimeout(function(){
				var jFocused = $(':focus');
				//去除掉点击其他input丧失焦点的情况
				if(!jFocused.length){
					window.scroll(0,0);
				}
			})
		})
})

//加载方法
var page_load = {
	ancestor: null, // 大dom
	wrapper: null, // 临时图片存放dom
	target: null, // 显示百分数的dom
	delayTime: 0*1000, // 最少加载完所需时间 // kn todo
	delayed: false, // 是否超过最少加载完所需时间
	imgCount: 0, // 图片总数
	loadedCount: 0, // 已加载完成数
	jAniBlock: null,
	jRunImg: null,
	runImgHref: './img/loading_done.png',
	init: function(){
		this.ancestor = $('#landing_load')
		this.wrapper = $('#img_wrapper')
		this.jAniBlock = $('#loading_animation_block')
		this.jRunImg = $('#loading_run_img')

		this.bind()
	},
	bind: function(){
		var self = this

		this.getImg()
		this.timeout()
	},
	getImg: function(){
		var self = this,
			html = ''

		$('body *')
			.each(function(i){
				var oThis = $(this),
					tagName = 'img',
					src = '',
					handler='onload',
					backgroundImage = oThis.css('backgroundImage').replace('url(','').replace(')','')

				if(oThis[0].tagName == 'IMG' && oThis.attr('src')){
					src = oThis.attr('src')
				}else if(oThis[0].tagName == 'AUDIO' && oThis.attr('src')){
					tagName = 'audio'
					handler = 'oncanplay'
					src = oThis.attr('src')
				}else if(backgroundImage != 'none'){
					src = backgroundImage
				}

				if(!src)return true

				self.imgCount ++
				html += '<'+tagName+' src='+src+' alt="" '+handler+'="page_load.loaded()" onerror="page_load.error(this)" />'
			})

		self.wrapper.html(html)
	},
	timeout: function(){
		var self = this

		setTimeout(function(){
			self.delayed = true

			if(self.loadedCount >= self.imgCount){
				self.loaded()
			}
		}, self.delayTime)
	},
	error: function(e){
		var self = this

		self.loadedCount ++
		self.done()
	},
	loaded: function(){
		var self = this

		self.loadedCount ++
		self.done()
	},
	done: function(){
		var self = this

		if(self.loadedCount >= self.imgCount){
			if(!self.delayed){
				return false
			}

			self.jAniBlock.css('left', '100%')
			self.jRunImg
				.attr('src', self.runImgHref)
				.addClass('done')

			// 播放庆祝音乐
			audio.play('#enter')

			// return; // kn

			setTimeout(function(){
				self.ancestor
					.addClass('hidden')
					.next()
					.addClass('current')

				self.wrapper.remove()
			}, 0.5*1000)
		}else{
			var percent = parseInt(100*self.loadedCount/self.imgCount);

			self.jAniBlock.css('left', percent+'%')
			$('#debugger').html(percent)
		}
	}
}
// page_load.init()

//页面切换方法
var page = {
	prev: 0,
	current: 0,
	page: null,
	track: [],
	init: function(){
		var self = this
		this.page = $('.page')

		this.bind()
		console.log('init');

		//测试用，去到哪页填哪页
		// this.go2(3)
		// setTimeout(function(){
		// 	self.go2(5)
		// }, 2*1000)
	},
	bind: function(){
		var self = this;
	},
	//去特定页
	//第二个参数className为去到目的页后给目的页添加一个特定class，暂时未用到，写上以备不时之需
	go2: function(i, cb){
		var self = this,
			bPrev = i > this.prev ? false : true

		if(i < 0){
			i = 0
		}

		if(i == self.current){
			return false
		}

		this.page
			.removeClass('current')

		$('#page_'+i)
			.addClass('current')

		this.prev = i >= this.current ? this.current : i - 1
		this.current = i

	},
	//上一页
	prev: function(cb){
		var self = this

		this.go2(self.prev, cb)
	},
	//下一页
	next: function(cb){
		var self = this
		this.go2(self.current+1, cb)
	}
}
page.init();

var main = {
	num: 6,
	count: 0,
	eventtxt: {
		'0': {
			txt: '你居然触发了过关格！那就让这个欧气鉴定器来测测你的属性，器来！',
			url: '//player.bilibili.com/player.html?bvid=BV1F54y1m7tW&page=1'
		},
		'6': {
			txt: '今天你参加了点钞比赛，听说只要赢得比赛就能拿到【欧洲玄学大法】。路人A不知为什么一直干扰你，最终你以1张的失误惜败于对手。',
			url: '//player.bilibili.com/player.html?bvid=BV1yk4y1y7uo&page=1'
		},
		'10': {
			txt: '你的对手对你使出了一招【天降正义】，以迅雷不及掩耳之势从你身边掠过。等你回过神时，发现自己脸上挂满了夹子，脸肿得和馒头一样大，只好去医院就医休息一天。',
			url: '//player.bilibili.com/player.html?bvid=BV1Dt4y1S7RC&page=1'
		},
		'12': {
			txt: '某天清晨醒来，你发现自己的头发竟然全部消失了！医生告诉你这是秃头症。伤心之余，你只好购买了医生推荐的植发套餐。',
			url: '//player.bilibili.com/player.html?bvid=BV1Hi4y1u7uL&page=1'
		},
		'8': {
			txt: '买菜结账时，收银员欣喜的告诉你，你获得了友谊天长地久短袖一件。虽然你极力拒绝，但是店员仍旧强行把你和你的朋友套在了一起。',
			url: '//player.bilibili.com/player.html?bvid=BV1Ep4y1e7ce&page=1'
		},
		'2': {
			txt: '公司团建，领导提议玩一个【鞋底撕名牌】的小游戏。面对强壮的你，小姐姐对你抛去了媚眼。你笑了笑，把她的脚抓得更紧了。最后，在她复杂的眼神里，你脱下她的鞋赢得了胜利。',
			url: '//player.bilibili.com/player.html?bvid=BV1Wi4y1u7Bu&page=1'
		},
		'1': {
			txt: '你和妹妹一起参加【顶梁柱】比赛，你决定和妹妹合作一起通关。结果在抱起妹妹时，你的身体感受到一种超负荷的能量，成功闪了腰。你们只好中止比赛，去医院看病。',
			url: '//player.bilibili.com/player.html?bvid=BV1Fy4y1y79T&page=1'
		},
		'3': {
			txt: '朋友买了新款的撕腿毛神器，趁你不备先在你腿上试验了一下。你瞬间痛到两眼发黑，随后从朋友手里夺过神器，把朋友的汗毛撕了下来。听着朋友的惨叫，你慢悠悠的说，“这场游戏，没有赢家。”',
			url: '//player.bilibili.com/player.html?bvid=BV1nK4y1a7t6&page=1'
		},
		'24': {
			txt: '你抽奖中了《神武4真好玩》综艺的嘉宾资格，在兴高采烈的上了节目5分钟，却因为回答过于生硬，在场的工作人员无一能接，最终拍摄中止。',
			url: '//player.bilibili.com/player.html?bvid=BV14A411E7pg&page=1'
		},
		'18': {
			txt: '你参加了一场绘画比赛，却在不知不觉中睡着了。等到醒来的时候，离交卷只剩5分钟了。于是你急中生智，拿出保鲜膜套在画框上，用脸用力的穿过了保鲜膜，成为了冠军！',
			url: '//player.bilibili.com/player.html?bvid=BV1kK4y1a7fn&page=1 '
		},
	},
	event: {
		'1': {
			upper: 2,
			type: ['youxi', 'shijian']
		},
		'2': {
			upper: 2,
			type: ['youxi', 'jiangli']
		},
		'4': {
			upper: 0,
			type: ['shijian']
		},
		'5': {
			upper: 0,
			type: ['chengfa']
		},
		'6': {
			upper: 3,
			type: ['youxi', 'shijian', 'jiangli']
		}

	},
	typeVal: {
		youxi: 1,
		chengfa: 2,
		shijian: 3,
		jiangli: 4
	},
	typeName: {
		youxi: '游戏',
		chengfa: '惩罚',
		shijian: '事件',
		jiangli: '奖励'
	},
	init: function () {
		this.bind();
	},
	bind: function () {
		var self = this;
		$('.home_ctrl').on('click', function () {
			page.go2(1);
			self.initModel();
		});
		$('.model_item').on('click', function () {
			$('.model_item').removeClass('current');
			var $next = $(this).next();
			if ($next.length > 0) {
				$next.addClass('current');
			} else {
				self.closeModel();
			}
		});
		$('.touzi_pause').on('click', function () {
			self.palyTouzi();
		});
		$('.play_btn').on('click', function () {
			var video = document.getElementById('res_video');
			video.play();
			setTimeout(function () {
				$('.video_preview').hide();
			},1000)
		});
		$('.res_icon').on('click', function () {
			if($(this).hasClass('go')){
				self.creatRes();
			}else{
				$('.touzi_pause').show();
				$('.touzi_play').hide();
				page.go2(1);
			}
		});
		$('.jieqian').on('click', function () {
			self.showJieqian();
		});
		$('.close_jieqian').on('click', function () {
			self.closeJieqian();
		});
		$('.share').on('click', function () {
			self.showShare();
		});
		$('.close_share').on('click', function () {
			self.closeShare();
		});
	},
	palyTouzi: function () {
		var self = this;
		$('.touzi_pause').hide();
		$('.touzi_play').show();
		setTimeout(function () {
			if (self.count == 9) {
				self.num = '' + 3;
			}else{
				self.num = '' + (Math.floor(Math.random() * (6 - 1 + 1)) + 1);
			}
			
			if(self.num == '3'){
				$('#res_title').html('扔出 3 点，哇了不起了不起！')
				$('#res_content').html(self.eventtxt['0'].txt);
				// $('.video').attr('src', self.eventtxt['0'].url);
				self.setIframe(self.eventtxt['0'].url);
				$('.res_bg').attr('src', 'image/res_bg2.gif');
				$('.touzi_res_img').attr('src', `image/dian/${self.num}.png`);
				$('.res_box .title').removeClass('fail').addClass('ok');
				$('.res_box_title').attr('src', 'image/perfect.png');
				$('.res_icon_btn').attr('src', 'image/go.png');
				$('.res_icon').removeClass('again').addClass('go');
			} else {
				var typeUpper = self.event[self.num].upper;
				if(typeUpper == 0){
					var type = self.event[self.num].type[0]
				}else {
					var typeIndex = Math.floor(Math.random() * (typeUpper - 1 + 1)) + 1;
					var type = self.event[self.num].type[typeIndex-1];
					
				}
				var eventTxtIndex = '' + (self.typeVal[type] * Number(self.num));
				self.count++;
				$('#res_title').html(`扔出 ${self.num} 点，进入${self.typeName[type]}格`)
				$('#res_content').html(self.eventtxt[eventTxtIndex].txt);
				// $('.video').attr('src', self.eventtxt[eventTxtIndex].url);
				self.setIframe(self.eventtxt[eventTxtIndex].url);
				$('.res_bg').attr('src', 'image/res_bg1.png');
				$('.touzi_res_img').attr('src', `image/dian/${self.num}.png`);
				$('.res_box .title').removeClass('ok').addClass('fail');
				$('.res_box_title').attr('src', 'image/good_job.png');
				$('.res_icon_btn').attr('src', 'image/again.png');
				$('.res_icon').addClass('again').removeClass('go');
				$('.time span').html(10 - self.count);
			}
			page.go2(2)
			// 游戏格 6 2 1 youxi 6, 2, 1
			// 惩罚格 5 chengfa 10
			// 事件格 4 1 6 shijian 12, 3, 18
			// 奖励格 2 6 jiangli 8, 24
		}, 3000)
	},
	setIframe: function (url) {
		var iframe_dom = `<iframe class="video" src="${url}" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>`;
		$('.video_box').html(iframe_dom);
	},
	creatRes: function () {
		var self = this;
		var count = self.count + 1;
		var title, xinyunse, yi, chenghao, liwu, jieqian;
		if( count <= 2){
			title = 'ouqi';
			xinyunse = '白\\蓝\\红';
			yi = '诸事皆宜';
			chenghao = '【欧皇】';
			liwu = '【价值一千万的白无忧熊抱】';
			jieqian = '今天你的欧气已经超越了以往的99%，做事大概率都能心想事成！说不定下一秒刚打开《神武4》的你，就能轻松洗出极品宝宝呢！';
		} else if (count >= 3 && count <= 8) {
			title = 'putong';
			xinyunse = '橙\\青\\紫';
			yi = '升官发财 打帮战 挖宝';
			chenghao = '【亚洲之星】';
			liwu = '【无】';
			jieqian = '虽然今天的你运势不好不坏，但是只要努力终究还是能收获圆满滴。别着急，耐心等待，没准下一秒《神武4》就连换两本高必了~';
		} else if(count >= 9) {
			title = 'xuanxue';
			xinyunse = '黑\\金\\粉';
			yi = '撞桃花 肝日常 抓捕妖怪';
			chenghao = '【非洲酋长】';
			liwu = '【无】';
			jieqian = '虽然你今天的手气有点差，但是身上却隐隐有红线缠绕。没事去《神武4》一些人迹罕见的地图，可能会有意想不到的桃花缘降临哦？';
		}
		$('.title_type').attr('src', `image/${title}.png`);
		$('.xinyunse').html(xinyunse);
		$('.yi').html(yi);
		$('.chenghao').html(chenghao);
		$('.liwu').html(liwu);
		$('.jieqian_txt').html(jieqian);
		page.go2(3);
	},
	showJieqian: function () {
		$('.jieqian_show').show();
		$('.block_bg').show();
	},
	closeJieqian: function () {
		$('.jieqian_show').hide();
		$('.block_bg').hide();
	},
	showShare: function () {
		$('.fenxiang_show').show();
		$('.block_bg').show();
	},
	closeShare: function () {
		$('.fenxiang_show').hide();
		$('.block_bg').hide();
	},
	initModel: function () {
		var hasShowModel = localStorage.getItem('ouhuang_model');
		if(!hasShowModel || hasShowModel != 'show'){
			$('.model_item').removeClass('current');
			$('.model_item').eq(0).addClass('current');
			$('.model').show();
			localStorage.setItem('ouhuang_model','show');
		}
	},
	closeModel: function () {
		$('.model').hide();
	}
}
main.init();

