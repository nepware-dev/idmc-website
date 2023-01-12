/**
 * 
 * Use for preprocessing common javascript function on theme
 */
(function ($) {
    Drupal.behaviors.idmc = {
      attach: function (context, settings) {
        
        if(!$('body').hasClass("attached-idmc")){
            
            $('body').once('idmc').addClass("attached-idmc");

            // Implement parallax effect
            var hero = $('.parallax').first(),
                heroHeight = $('.parallax').first().outerHeight(true);

            $(window).scroll(function() {
                var scrollOffset = $(window).scrollTop();
                if (scrollOffset < heroHeight) {
                    $(hero).css('height', (heroHeight - scrollOffset));
                }
            });

            $('article figure').each(function(){
                var figure = $(this);
                var image = figure.find('img');
                var caption = figure.find('figcaption');

                if(image.length > 0){
                    var imageWidth = image.width();

                    if(caption.length > 0 && imageWidth > 0){
                        caption.css("max-width", imageWidth + 'px');
                    }
                }
            });
        }
          
          // GET URL parameter
          
          function getParameter(theParameter) { 
              var params = window.location.search.substr(1).split('&');

              for (var i = 0; i < params.length; i++) {
                var p=params[i].split('=');
                if (p[0] == theParameter) {
                  return decodeURIComponent(p[1]);
                }
              }
              return false;
            }
          var valueEmail = getParameter("email") ? getParameter("email") : "";
          $("#mce-EMAIL").val(valueEmail);
      }
    };
  })(jQuery);