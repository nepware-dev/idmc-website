/**
 * 
 * Use for preprocessing common javascript function on theme
 */
(function ($) {
    Drupal.behaviors.idmc = {
      attach: function (context, settings) {

        $('.smoothscroll').click(function(e){
          $('html, body').stop().animate({ scrollTop: $('.tabData').offset().top - 300 }, 500);
          var tabtarget = $('.tabData .panel-title a').attr('href');
          $(tabtarget).collapse('show');
          e.preventDefault();
      });
      }
    };
  })(jQuery);