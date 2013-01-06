jQuery(document).ready(function ($) {

  $.fn.extend({

    create_slider: function(options){

      var defaults = {
        element_count: 1, 
        animation_time: 500,
        easing_type: 'swing',
        delay_time: 1000,
        delay_time_after_stop: 200,
        width: 100,
        autoanimate: false,
        time_remaining: 0,
        listen: 0,
        support: 0,
        left_link: '',
        right_link: ''
      };

      var options = $.extend(defaults, options);

      return this.each(function(){

        var slida_animation_handler = $(this);
        var slida_element = $('>div', slida_animation_handler);
        options.width = options.width*(slida_element.length + 3);
        var margin = (options.width/(slida_element.length + 3))/options.element_count;
        var element_width = 100/(slida_element.length + 3);
        element_width = element_width/options.element_count;
        slida_animation_handler.css('margin-left', -margin +'%');
        slida_animation_handler.css('width', options.width + '%');
        slida_element.css('width', element_width + '%');
        var first_element = $('>div:first-child', slida_animation_handler);
        var second_element = $('>div:nth-child(2)', slida_animation_handler);
        var last_element = $('>div:last-child', slida_animation_handler);
        first_element.clone().insertAfter(last_element);
        last_element = $('>div:last-child', slida_animation_handler);
        first_element.clone().empty().insertBefore(first_element);
        first_element = $('>div:first-child', slida_animation_handler);

        var slida_hover_listener = 0;

        var supportsTransitions = (function() {
        var browsers = ['ms', 'Khtml', 'O', 'Moz', 'Webkit', ''];
        while( browsers.length )
          if( browsers.pop() + 'Transition' in document.body.style ){
             options.support = 1;
             return true;
          }
            options.support = 0;
            return false;
        })();

        function callback(){
          $(this).remove();
          first_element = $('>div:first-child', slida_animation_handler);
          first_element.empty();
          second_element = $('>div', slida_animation_handler).eq(1); // or
          // second_element = $('div:nth-child(2)', slida_animation_handler);
          second_element.clone().insertAfter(last_element);
          last_element = $('>div:last-child', slida_animation_handler);
          options.listen = 0;

          if (options.autoanimate == true){
            move_left(options.delay_time, options.animation_time);
          }
        }

        function callback_right(){
          last_element.remove();
          last_element = $('>div:last-child', slida_animation_handler);
          last_element.clone().empty().css('width', 0 + '%').insertBefore(first_element);
          first_element.replaceWith(last_element.clone());
          first_element = $('>div:first-child', slida_animation_handler);
        };

        function move_left(){
          first_element.delay(options.delay_time).animate({ width: '0'},{
              easing: options.easing_type,
              duration: options.animTime,
              step: function(now, fx){
                options.time_remaining = 0;
                options.time_remaining = Math.round(((now*options.animation_time)/element_width)/20);
              },
              complete: callback
          });
        }

        function move_right(){
          callback_right();
          first_element.delay(options.delay_time).animate({ width: element_width + '%'},{
              easing: options.easing_type,
              duration: options.animation_time
          });
        }

        function move_left_css(){
          options.listen = 1;
          first_element.css('width', 0 + '%').bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", callback );
        }

        function move_right_css(){
          options.listen = 1;
          callback_right();
          first_element.width(element_width + '%').bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){ options.listen = 0; });
        }

        if (options.autoanimate == true) {
          slida_element.removeClass('transitions');
          move_left(options.delay_time, options.animation_time);
          slida_hover_listener = slida_animation_handler.parent();

          slida_hover_listener.mouseover(function() {
            first_element.stop(true,false);
          }).mouseout(function(){
            if (options.time_remaining < 5) {
              options.time_remaining = 400;
            };
              move_left(options.delay_time, options.animation_time, options.easing_type);
          });

        };

        if (options.support == 1) {

          $(window).load(function() {

            if (options.autoanimate == false) {
              slida_element = $('>div', slida_animation_handler);
              slida_element.addClass('transitions');
            };

          });

          $(options.left_link).on('click', function(e){
              e.preventDefault();
              if (options.listen == 1) return;
              move_left_css();
          });

          $(options.right_link).on('click', function(e){
              e.preventDefault();
              if (options.listen == 1) return;
              move_right_css();
          });
        } else {

          $(options.left_link).on('click', function(e){
            e.preventDefault();
            // if ($('>div:animated', slida_animation_handler).length > 0) return;
            move_left(options.delay_time, options.animation_time, options.easing_type);
          });

          $(options.right_link).on('click', function(e){
            e.preventDefault();
            // if ($('>div:animated', slida_animation_handler).length > 0) return;
            move_right(options.delay_time, options.animation_time, options.easing_type);
          });
        };

      });

    }

  });

});