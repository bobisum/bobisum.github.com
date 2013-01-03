jQuery(document).ready(function ($) {

  $.fn.extend({

    create_slider: function(options){

      var defaults = {
        b_count: 1, 
        animation_time: 500,
        easing_type: 'swing',
        delay_time: 1000,
        delay_time_after_stop: 200,
        width: 100,
        autoanimate: false,
        time_remaining: 0,
        listen: 0,
        support: 0,
        l_left: '',
        l_right: ''
      };

      var options = $.extend(defaults, options);

      return this.each(function(){

        var o = options;

        var a = $(this);
        var b = $('>div', a);
        o.width = o.width*(b.length + 3);
        var margin = o.width/(b.length + 3);
        var b_width = 100/(b.length + 3);
        b_width = b_width/o.b_count;
        a.css('margin-left', -margin +'%');
        a.css('width', o.width + '%');
        b.css('width', b_width + '%');
        var b_first = $('>div:first-child', a);
        var b_second = $('>div:nth-child(2)', a);
        var b_last = $('>div:last-child', a);
        b_first.clone().insertAfter(b_last);
        b_last = $('>div:last-child', a);
        b_first.clone().empty().insertBefore(b_first);
        b_first = $('>div:first-child', a);

        var c = 0;

        var supportsTransitions = (function() {
        var v = ['ms', 'Khtml', 'O', 'Moz', 'Webkit', ''];
        while( v.length )
          if( v.pop() + 'Transition' in document.body.style ){
             o.support = 1;
             console.log("your browser supports transitions"); 
             return true;
          }
            o.support = 0;
            console.log("your browser doesn't support transitions");
            return false;
        })();

        function callback(){
          $(this).remove();
          b_first = $('>div:first-child', a);
          b_first.empty();
          b_second = $('>div', a).eq(1); // or
          // b_second = $('div:nth-child(2)', a);
          b_second.clone().insertAfter(b_last);
          b_last = $('>div:last-child', a);
          o.listen = 0;

          if (o.autoanimate == true){
            move_left(o.delay_time, o.animation_time);
          }
        }

        function callback_right(){
          b_last.remove();
          b_last = $('>div:last-child', a);
          b_last.clone().empty().css('width', 0 + '%').insertBefore(b_first);
          b_first.replaceWith(b_last.clone());
          b_first = $('>div:first-child', a);
        };

        function move_left(){
          b_first.delay(o.delay_time).animate({ width: '0'},{
              easing: o.easing_type,
              duration: o.animTime,
              step: function(now, fx){
                o.time_remaining = 0;
                o.time_remaining = Math.round(((now*o.animation_time)/b_width)/20);
              },
              complete: callback
          });
        }

        function move_right(){
          callback_right();
          b_first.delay(o.delay_time).animate({ width: b_width + '%'},{ //animating the element widht to the desired element width with a delay of 1 sec
              easing: o.easing_type, // the easing used
              duration: o.animation_time // the duration of the animation
          });
        }

        function move_left_css(){
          o.listen = 1;
          b_first.css('width', 0 + '%').bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", callback );
        }

        function move_right_css(){
          o.listen = 1;
          callback_right();
          b_first.width(b_width + '%').bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){ o.listen = 0; });
        }

        if (o.autoanimate == true) {
          b.removeClass('transitions');
          move_left(o.delay_time, o.animation_time); // first time initiating the animation function
          c = a.parent();

          c.mouseover(function() {
            b_first.stop(true,false);
          }).mouseout(function(){
            if (o.time_remaining < 5) {
              o.time_remaining = 400;
            };
              move_left(o.delay_time, o.animation_time, o.easing_type);
          });

        };

        if (o.support == 1) {

          $(window).load(function() {

            if (o.autoanimate == false) {
              b = $('>div', a);
              b.addClass('transitions');
              console.log('added transitions');
            };

          });

          o.l_left.on('click', function(event){
              event.preventDefault();
              if (o.listen == 1) return;
              move_left_css();
          });

          o.l_right.on('click', function(event){
              event.preventDefault();
              if (o.listen == 1) return;
              move_right_css();
          });
        } else {

          console.log('no transitions available');

          o.l_left.on('click', function(event){
            event.preventDefault();
            move_left(o.delay_time, o.animation_time, o.easing_type);
            if ($('>div:animated', a).length > 0) return;     
          });

          o.l_right.on('click', function(event){
            event.preventDefault();
            if ($('>div:animated').length > 0) return;
            move_right(o.delay_time, o.animation_time, o.easing_type);
          });
        };

      });

    }

  });

});