var creat = {
    hasBind: false,
    hasIn: false,
    init: function () {
        this.bindEvent();
        this.creatNameAge();
    },
    bindEvent: function () {
        var self = this;
        if(self.hasBind){
            return
        };
        $('.show_res_btn').on('click', function () {
            page.go2(5);
        });
        //再跑一次
        $('.run_again_btn').on('click', function () {
            question.reset()
            page.go2(1);
        });
        //了解100run
        $('.to_kown_btn').on('click', function () {
            page.go2(6);
        });
        //回到时光机
        $('.back_btn').on('click', function () {
            self.init();
            page.go2(5);
            self.hasIn = true;
        });
        self.hasBind = true;
    },
    creatNameAge: function () {
        if (hnhData) {
            var name = hnhData.name;
            var sex = hnhData.sex;
            var age = hnhData.age;
            var answer = hnhData.answer;
            var max = this.getMax(answer);
            var img_url_pre = '';
            switch (max.toLowerCase()) {
                case 'a':
                    img_url_pre = '1919';
                    break;
                case 'b':
                    img_url_pre = '1992';
                    break;
                case 'c':
                    img_url_pre = '2019';
                    break;
                case 'd':
                    img_url_pre = '9102';
                    break;
            }
            var img_url = './img/' + img_url_pre + '_' + sex + '.jpg';
            $('#created_img').attr('src', img_url);
            $('#created_img_temp').attr('src', img_url);
            $('.creat_name').html(name);
            $('.run_time').html(Number(age) * 525600);
            this.img();
        } else {
            alert('抱歉，请重试！')
        }

    },
    img: function(){
        var self = this,
            ori_img_wrapper = $('#creat_show_img')[0];

        var shareContent = document.getElementById('creat_img_temp');
        var width = shareContent.offsetWidth;
        var height = shareContent.offsetHeight;
        var canvas = document.createElement("canvas");
        var scale = 2;

        canvas.width = width * scale;
        canvas.height = height * scale;
        canvas.getContext("2d").scale(scale, scale);

        var opts = {
            scale: scale,
            canvas: canvas,
            logging: true,
            width: width,
            height: height
        };

        // Converts canvas to an image
        function convertCanvasToImage(canvas) {
            var image = new Image();
            image.src = canvas.toDataURL("image/png");
            return image;
        }
        html2canvas(shareContent, opts).then(canvas => {
            var context = canvas.getContext('2d');
            var img = Canvas2Image.convertToImage(canvas, canvas.width, canvas.height);

            ori_img_wrapper.appendChild(img);
            $('.creat_show_img_res').addClass('show');
            if(!this.hasIn){
                // page.next();
                $('.creat_txt').addClass('hidden');
                $('.show_res_btn').addClass('show');
            }else{
                this.hasIn = false;
            }

            // $('.print_res_wrap').addClass('hide fadeOut')
        });
    },
    getMax: function (arr) {
        let res = {};
        let maxName, maxNum = 0
        // 遍历数组
        arr.forEach((item) => {
            res[item] ? res[item] += 1 : res[item] = 1
            if (res[item] > maxNum) {
              maxName = item
              maxNum = res[item]
            }
        })
        return maxName
    }
}