(function() {
    var src_images = 'images/';
    var images = ['' + src_images + 'safe_image.png','' + src_images + 'safe_image_1.png', '' + src_images + 'safe_image_2.png', '' + src_images + 'safe_image_3.png', '' + src_images + 'safe_image_4.png', '' + src_images + 'safe_image_4.png'];
    var html = '<div class="slider-wrap">' +
        '<div class="slider" id="slider">' +
        '<div class="holder animate">' +
        '</div>' +
        '</div>' +
        '</div>';
    $('.content').append(html);
    // Append all images to slider
    var length_images = images.length;
    for (var i = 0; i < length_images; i++) {
        $('.holder').append('<div class="slide-wrapper"><div class="slide"><img class="slide-image animate" src="' + images[i] + '"></div></div>');
    }
    // update width holder
    $('.holder').css({ width: length_images + '00%' });
    percentWidthEachItem = 50 / length_images;
    $('.slide-wrapper').css({ width: percentWidthEachItem + '%' });
    // responsive
    width = ($('.holder').width() / 20);
    $('.holder').css('transform', 'translate3d(-' + width + 'px,0,0)');
    // end responsive
    $('#bxTabBtnList').remove();
    $('#bxTabBtnBottomList').remove();
    var slider = {
        el: {
            slider: $('#slider'),
            holder: $('.holder')
        },
        slideWidth: $('#slider').width(),
        itemSlideWidth: $('#slider .slide-wrapper:eq(0) .slide').width(),
        touchstartx: undefined,
        touchmovex: undefined,
        movex: undefined,
        index: 1,
        width_final_end: 0,
        width_final_move: 0,
        init: function() {
            this.width_final_end = this.slideWidth / 4;
            this.bindUIEvents();
        },
        bindUIEvents: function() {
            this.el.holder.on('touchstart', function(event) {
                slider.start(event);
            });
            this.el.holder.on('touchmove', function(event) {
                slider.move(event);
            });
            this.el.holder.on('touchend', function(event) {
                slider.end(event);
            });
        },
        start: function(event) {
            this.touchstartx = event.originalEvent.touches[0].pageX;
            $('.animate').removeClass('animate');
        },
        move: function(event) {
            this.touchmovex = event.originalEvent.touches[0].pageX;
            if (this.index == 0) {
                this.movex = (this.touchmovex - this.touchstartx) + (this.itemSlideWidth / 2);
                this.el.holder.css('transform', 'translate3d(' + this.movex + 'px,0,0)');
            } else if (this.index == length_images - 1) {
                this.movex = ((this.index * this.slideWidth) / 4) + (this.touchstartx - this.touchmovex) + ((this.index - 1) * this.itemSlideWidth / 2);
                if (this.movex < 0) {
                    this.el.holder.css('transform', 'translate3d(' + Math.abs(this.movex) + 'px,0,0)');
                } else {
                    this.el.holder.css('transform', 'translate3d(-' + this.movex + 'px,0,0)');
                }
            } else {
                if (this.index == 1) {
                    this.width_final_move = 0;
                } else {
                    this.width_final_move = (this.index - 1) * this.itemSlideWidth / 2;
                }
                this.movex = ((this.index * this.slideWidth) / 4) + (this.touchstartx - this.touchmovex);
                if (Math.abs(this.touchmovex - this.touchstartx) > (((this.index * this.slideWidth) / 4) + this.width_final_move) && (this.touchmovex > this.touchstartx)) {
                    this.el.holder.css('transform', 'translate3d(' + Math.abs(this.movex + this.width_final_move) + 'px,0,0)');
                } else {
                    this.el.holder.css('transform', 'translate3d(-' + (this.movex + this.width_final_move) + 'px,0,0)');
                }
            }
        },
        end: function(event) {
            var absMove = Math.abs(((this.index * this.slideWidth) / 4) - this.movex);
            if (absMove > this.slideWidth / 4) {
                if (this.index != 0 && this.index != length_images - 1) {
                    if (this.movex > ((this.index * this.slideWidth) / 4) && this.index < length_images - 1) {
                        this.index++;
                    } else if (this.movex < ((this.index * this.slideWidth) / 4) && this.index > 0) {
                        this.index--;
                    }
                } else if (this.index == 0) {
                    if (this.movex < 0) {
                        var tmovex = Math.abs(this.movex);
                        if (tmovex > ((this.index * this.slideWidth) / 4) && this.index < length_images - 1) {
                            this.index++;
                        }
                    }
                } else {
                    if (this.movex < ((this.index * this.slideWidth) / 4) + ((this.index - 1) * this.itemSlideWidth / 2) && this.index > 0) {
                        this.index--;
                    }
                }
            }
            if (this.index == 0) {
                width = (this.itemSlideWidth / 2);
                this.el.holder.addClass('animate').css('transform', 'translate3d(' + width + 'px,0,0)');
            } else {
                if (this.index == 1) {
                    this.width_final_end = 0;
                } else {
                    this.width_final_end = (this.index - 1) * this.itemSlideWidth / 2;
                }
                this.translate3d_width_old = this.translate3d_width;
                width = ((this.index * this.slideWidth) / 4);
                this.el.holder.addClass('animate').css('transform', 'translate3d(-' + (width + this.width_final_end) + 'px,0,0)');
            }
            if (this.index == 1) {
                this.width_final_end = width;
            } else {
                this.width_final_end = this.itemSlideWidth;
            }
        }
    };
    slider.init();
    // set default tabContent jqTabGan active
    $('.tabContent.jqTabGan').siblings().removeClass('selected');
    $('.tabContent.jqTabGan').addClass('selected');
    // update width screen after resize
    $(this).on('resize', function(e) {
        slider.slideWidth = $('#slider').width();
        slider.itemSlideWidth = $('#slider .slide-wrapper:eq(0)').width();
        slider.el.holder.trigger('touchend');
    })
})();
