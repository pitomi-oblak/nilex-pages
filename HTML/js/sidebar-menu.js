(function ($) {

  $(document).ready(function () {
    var JA_isLoading = false;
    // fix for old ie
    if (/MSIE\s([\d.]+)/.test(navigator.userAgent) ? new Number(RegExp.$1) < 10 : false) {
      $('html').addClass('old-ie');
    } else if (/constructor/i.test(window.HTMLElement)) {
      $('html').addClass('safari');
    }

    var $wrapper = $('body'),
      $inner = $('.sidebar-wrapper'),
      $toggles = $('.sidebar-toggle'),
      $offcanvas = $('.sidebar-container'),
      $close = $('.sidebar-container .close-sidebar'),
      $btn = null,
      $nav = null,
      direction = 'right',
      $fixed = null;


    // no wrapper, just exit
    if (!$wrapper.length) return;

    // add effect class for nav
    $toggles.each(function () {
      var $this = $(this),
        $nav = $($this.data('nav')),
        effect = $this.data('effect'),
        direction = ($('html').attr('dir') == 'rtl' && $this.data('pos') != 'right') || ($('html').attr('dir') != 'rtl' && $this.data('pos') == 'right') ? 'right' : 'left';
      $nav.addClass(effect).addClass('sidebar-' + direction);

      // move to outside wrapper-content
      var inside_effect = ['sidebar-effect-3', 'sidebar-effect-16', 'sidebar-effect-7', 'sidebar-effect-8', 'sidebar-effect-14'];
      if ($.inArray(effect, inside_effect) == -1) {
        $inner.before($nav);
      } else {
        $inner.prepend($nav);
      }
    });

    $toggles.on('click', function (e) {
      // detect direction

      stopBubble(e);

      if ($wrapper.hasClass('sidebar-open')) {
        oc_hide(e);
        return false;
      }

      $btn = $(this);
      $nav = $($btn.data('nav'));
      if (!$fixed) $fixed = $inner.find('*').filter(function () {
        return $(this).css("position") === 'fixed';
      });
      else $fixed = $fixed.filter(function () {
        return $(this).css("position") === 'fixed';
      }).add($inner.find('.affix'));

      $nav.addClass('sidebar-current');

      direction = ($('html').attr('dir') == 'rtl' && $btn.data('pos') != 'right') || ($('html').attr('dir') != 'rtl' && $btn.data('pos') == 'right') ? 'right' : 'left';

      // add direction class to body
      // $('html').removeClass ('sidebar-left sidebar-right').addClass ('sidebar-' + direction);

      $offcanvas.height($(window).height());

      // disable scroll event
      var events = $(window).data('events');
      if (events && events.scroll && events.scroll.length) {
        // store current handler for scroll
        var handlers = [];
        for (var i = 0; i < events.scroll.length; i++) {
          handlers[i] = events.scroll[i].handler;
        }
        $(window).data('scroll-events', handlers);
        $(window).off('scroll');
      }
      // disable scroll on page
      var scrollTop = ($('html').scrollTop()) ? $('html').scrollTop() : $('body').scrollTop(); // Works for Chrome, Firefox, IE...
      $('html').addClass('noscroll').css('top', -scrollTop).data('top', scrollTop);
      $('.sidebar-container').css('top', scrollTop);

      // // make the fixed element become absolute
      // $fixed.each(function () {
      //   var $this = $(this),
      //     $parent = $this.parent(),
      //     mtop = 0;
      //   // find none static parent
      //   while (!$parent.is($inner) && $parent.css("position") === 'static') $parent = $parent.parent();
      //   mtop = -$parent.offset().top;
      //   $this.css({'position': 'absolute', 'margin-top': mtop});
      // });

      $wrapper.scrollTop(scrollTop);
      // update effect class
      $wrapper[0].className = $.trim($wrapper[0].className.replace(/\s*off\-canvas\-effect\-\d+\s*/g, ' ')) +
        ' ' + $btn.data('effect') + ' ' + 'sidebar-' + direction;

      setTimeout(oc_show, 50);

      return false;
    });
    var oc_show = function () {
      if (JA_isLoading == true) {
        return;
      }
      JA_isLoading = true;
      $wrapper.addClass('sidebar-open');
      $inner.on('click', oc_hide);
      $close.on('click', oc_hide);
      $offcanvas.on('click', handleClick);

      setTimeout(function () {
        JA_isLoading = false;
      }, 200);
    };

    var oc_hide = function () {
      if (JA_isLoading == true) {
        return;
      }
      JA_isLoading = true;

      //remove events
      $inner.off('click', oc_hide);
      $close.off('click', oc_hide);
      $offcanvas.off('click', handleClick);

      //delay for click action
      setTimeout(function () {
        $wrapper.removeClass('sidebar-open');
      }, 100);

      setTimeout(function () {
        $wrapper.removeClass($btn.data('effect')).removeClass('sidebar-' + direction);
        $wrapper.scrollTop(0);
        // enable scroll
        $('html').removeClass('noscroll').css('top', '');
        $('html,body').scrollTop($('html').data('top'));
        $nav.removeClass('sidebar-current');
        // restore fixed elements
        $fixed.css({'position': '', 'margin-top': ''});
        // re-enable scroll
        if ($(window).data('scroll-events')) {
          var handlers = $(window).data('scroll-events');
          for (var i = 0; i < handlers.length; i++) {
            $(window).on('scroll', handlers[i]);
          }
          $(window).data('scroll-events', null);
        }
        JA_isLoading = false;
      }, 700);

      // fix for old ie
      if ($('html').hasClass('old-ie')) {
        var p1 = {}, p2 = {};
        p1['padding-' + direction] = 0;
        p2[direction] = -$('.sidebar-container').width();
        $inner.animate(p1);
        $nav.animate(p2);
      }

    };

    var handleClick = function (e) {
      if (e.target.tagName == 'A') {
        // handle the anchor link
        var arr1 = e.target.href.split('#'),
          arr2 = location.href.split('#');
        if (arr1[0] == arr2[0] && arr1.length > 1 && arr1[1].length) {
          oc_hide();
          setTimeout(function () {
            var anchor = $("a[name='" + arr1[1] + "']");
            if (!anchor.length) anchor = $('#' + arr1[1]);
            $('html,body').animate({scrollTop: anchor.offset().top}, 'slow');
          }, 500);
        }
      }
      stopBubble(e);
      return true;
    };


    // Sidebar menu behaviour
    $deeperLevel = $(".sidebar-container-body ul li.has-dropdown");

    $deeperLevel.each(function () {
      $(this).find('.fa-angle-down').click(function (e) {
        console.log($(this));
        $(this).parents("li").find('.dropdown').slideToggle("slow");
        stopBubble(e);
      });
    });

    var stopBubble = function (e) {
      e.stopPropagation();
    }

    // preload fixed items
    $(window).load(function () {
      setTimeout(function () {
        $fixed = $inner.find('*').filter(function () {
          return $(this).css("position") === 'fixed';
        });
      }, 100);
    });

  });

})(jQuery);
