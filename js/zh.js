var question = {
	target: null,
	hasBind: false,
	init: function() {
		this.target = $('#q_bg_box')

		this.show()
		this.bind()
	},
	show: function() {
		var sex = hnhData.sex;
		if (sex === 'male') {
			$('.q_q1_m').addClass('active')
			$('.q_q1_f').removeClass('active')

		} else {
			$('.q_q1_m').removeClass('active')
			$('.q_q1_f').addClass('active')

		}
	},
	bind: function() {
		if(self.hasBind) return;

		$('.q_an').on('click', function () {
			var self = this;
			$(self).siblings().removeClass('active');
			$(self).addClass('active');
			audio.play('#enter');
			var id = parseInt($('.q_content_active')[0].id.split('Q')[1])+1;
			var answer = $(self).data('id');
			hnhData.answer.push(answer);
			if(id < 7) {
				setTimeout(function(){
					$('.q_content_active').removeClass('q_content_active');
					$('#Q'+id).addClass('q_content_active');
				},300)
			} else {
				page.go2(3);
			}
		});
		this.hasBind = true;

	},
	reset: function() {
		var self = this

		hnhData = JSON.parse(JSON.stringify(hnhDataOri))
		sex.reset()
		runInput.reset()
		self.target
			.find('.q_content_active')
			.removeClass('q_content_active')
			.end()
			.find('.q_content')
			.eq(0)
			.addClass('q_content_active')
			.end()
			.find('.active')
			.removeClass('active')

	}
}
// question.init();

var runInput = {
	hasBind: false,
	init: function(){
		this.bind()
	},
	bind: function(){
		if(this.hasBind) return
		$('#runInput').on('click', function () {
		// $('body').on('click','#runInput',function(){
			var name = $('#inputName').val();
			var age = $('#inputAge').val();
			// 输入验证
			audio.play('#enter');

			if(!name || !age){
				modal.show('名字和年龄都要填过才能领取呦');
			}else if(name.length > 8){
				modal.show('名字不能超过8个字呦');
			}else if(age > 100){
				modal.show('虽然我们也很希望但是年龄不能超过100岁呦');
			}else{
				hnhData.name = name;
				hnhData.age = age;
				page.go2(4);
				creat.init();
			}
		});
		this.hasBind = true;
	},
	reset: function(){
		var self = this

		$('.input_box')
			.find('input')
			.val('')
	}
}
runInput.init();