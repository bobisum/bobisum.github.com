jQuery(document).ready(function(e){e.fn.extend({create_slider:function(t){var n={element_count:1,animation_time:500,easing_type:"swing",delay_time:1e3,delay_time_after_stop:200,width:100,autoanimate:false,time_remaining:0,listen:0,support:0,left_link:"",right_link:""};var t=e.extend(n,t);return this.each(function(){function c(){e(this).remove();o=e(">div:first-child",n);o.empty();u=e(">div",n).eq(1);u.clone().insertAfter(a);a=e(">div:last-child",n);t.listen=0;if(t.autoanimate==true){p(t.delay_time,t.animation_time)}}function h(){a.remove();a=e(">div:last-child",n);a.clone().empty().css("width",0+"%").insertBefore(o);o.replaceWith(a.clone());o=e(">div:first-child",n)}function p(){o.delay(t.delay_time).animate({width:"0"},{easing:t.easing_type,duration:t.animTime,step:function(e,n){t.time_remaining=0;t.time_remaining=Math.round(e*t.animation_time/s/20)},complete:c})}function d(){h();o.delay(t.delay_time).animate({width:s+"%"},{easing:t.easing_type,duration:t.animation_time})}function v(){t.listen=1;o.css("width",0+"%").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",c)}function m(){t.listen=1;h();o.width(s+"%").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){t.listen=0})}var n=e(this);var r=e(">div",n);t.width=t.width*(r.length+3);var i=t.width/(r.length+3)/t.element_count;var s=100/(r.length+3);s=s/t.element_count;n.css("margin-left",-i+"%");n.css("width",t.width+"%");r.css("width",s+"%");var o=e(">div:first-child",n);var u=e(">div:nth-child(2)",n);var a=e(">div:last-child",n);o.clone().insertAfter(a);a=e(">div:last-child",n);o.clone().empty().insertBefore(o);o=e(">div:first-child",n);var f=0;var l=function(){var e=["ms","Khtml","O","Moz","Webkit",""];while(e.length)if(e.pop()+"Transition"in document.body.style){t.support=1;return true}t.support=0;return false}();if(t.autoanimate==true){r.removeClass("transitions");p(t.delay_time,t.animation_time);f=n.parent();f.mouseover(function(){o.stop(true,false)}).mouseout(function(){if(t.time_remaining<5){t.time_remaining=400}p(t.delay_time,t.animation_time,t.easing_type)})}if(t.support==1){e(window).load(function(){if(t.autoanimate==false){r=e(">div",n);r.addClass("transitions")}});e(t.left_link).on("click",function(e){e.preventDefault();if(t.listen==1)return;v()});e(t.right_link).on("click",function(e){e.preventDefault();if(t.listen==1)return;m()})}else{e(t.left_link).on("click",function(e){e.preventDefault();p(t.delay_time,t.animation_time,t.easing_type)});e(t.right_link).on("click",function(e){e.preventDefault();d(t.delay_time,t.animation_time,t.easing_type)})}})}})})