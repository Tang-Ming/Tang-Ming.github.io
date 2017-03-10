$(function() {

    // $(function(){
            // 懒加载
             $("img.lazy").lazyload();
             $("img.lazy").lazyload({
                 event : "scroll"
                });
             $("img.lazy").lazyload({
                effect : "fadeIn"
                });
        // })
    var dataJSON = {"data": ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "21.jpg", "22.jpg", "23.jpg", "24.jpg", "25.jpg", "26.jpg", "27.jpg", "28.jpg", "29.jpg", "30.jpg", "32.jpg", "33.jpg", "34.jpg", "35.jpg", "36.jpg", "37.jpg", "38.jpg", "39.jpg","40.jpg", "43.jpg", "44.jpg", "46.jpg", "20.jpg", "19.jpg", "45.jpg", "41.jpg", "42.jpg", "45.jpg", "47.jpg","48.jpg", "49.jpg", "50.jpg","51.jpg", "52.jpg", "53.jpg", "54.jpg", "55.jpg", "56.jpg", "57.jpg", "58.jpg", "59.jpg", "60.jpg","61.jpg", "62.jpg", "63.jpg", "64.jpg", "65.jpg", "66.jpg", "67.jpg" ]};

    var html = "";
    var ary = dataJSON.data;
    ary.sort(function() {
        return 0.5 - Math.random();
    });
    for(var i = 0; i < ary.length; i++) {
        html += '<div class="box"><div class="pic"><img class=" lazy" src="' + ary[i] + '"></div></div>';
    }
    $('#main').append(html);

    // 获取父元素
    var $main = $('#main');
    // 获取子元素
    var $item = $('.box');

    // 获取列数
    function getColumnCount() {
        // 获取父容器的宽度
        var parentWidth = $('html,body').width();
        // 子元素的宽度
        var itemWidth = $item.eq(0).outerWidth();
        // 获取可放列数
        var iCol = Math.floor(parentWidth / itemWidth);
        // 获取属于的宽度
        var space = iCol *　itemWidth;
        $main.css('width', space);

        return iCol;
    }
    // 排列
    function positionAll() {
        // 获取列数
        var iCol = getColumnCount();
		// 保存每列的高度
        var colHeightAry = [];
		// 最小高度和下标
        var minHeight, minIndex;
		// 给所有盒子添加left和top定位
        $('.box').each(function(index) {
            var _this = $(this);
            _this.css('position', 'absolute');
			// 是否是第一排盒子
            if(index < iCol) {
                _this.css('top', 0);
                _this.css('left', index * _this.outerWidth());
                colHeightAry.push(_this.outerHeight());
            } else {
				// 获取高度最小的列
                minHeight = Math.min.apply(null, colHeightAry);
				// 获取高度最小的列的下标
                minIndex = colHeightAry.indexOf(minHeight);
				// 设置当前要放置的盒子的位置
                _this.css('top', minHeight)
                    .css('left', $('.box').eq(minIndex).offset().left - $main.offset().left);
				// 给高度最小的列的高度加上当前盒子的高度
                colHeightAry[minIndex] += _this.outerHeight()
            }
            _this.animate({opacity:1}, 300);
        });
        $main.css('height', Math.max.apply(null, colHeightAry));

    }

    var timer;
    $(window).on('scroll', function() {
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {

            var $last = $('.box').last();
            var scrollTop = $(window).scrollTop() + $(window).height();
            if(scrollTop > $last.offset().top + $last.outerHeight() / 2) {
                for(var i = 0; i < ary.length; i++) {
                    html += '<div class="box"><div class="pic"><img src="' + ary[i] + '"></div></div>';
                }
                $('#main').append(html);
                setTimeout(positionAll, 0);
            }

        }, 100);
    });

    setTimeout(positionAll, 0);

    $(window).on('resize', positionAll);



});
