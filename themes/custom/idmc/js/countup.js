/**
 * 
 * Use for preprocessing common javascript function on theme
 */
(function ($) {
    Drupal.behaviors.idmc = {
      attach: function (context, settings) {
        
        
        var displacementCounter;
        var checkCounterInView;
        var showIcons;
        var masksCount = 1;
        var masks = document.getElementById("masks").children;
        var isInViewport = function (elem) {
            var bounding = elem.getBoundingClientRect();
            return (
                bounding.top >= 0 &&
                bounding.left >= 0 &&
                bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };

        var startCounter = false;

            var options = {
                      useEasing: true, 
                      useGrouping: true, 
                      separator: ',', 
                      decimal: '.', 
                      suffix:' {{content.field_displacement_unit.0}}'
                    };

                    setTimeout(function(){ 

                    checkCounterInView = function () {
                    if (isInViewport(document.getElementById('counter-container')) && startCounter === false ) {
                     displacementCounter = new CountUp("counter",0, {{content.field_displacement_number.0}}, 1, 4, options);
                     showIcons = setInterval(hideMasks, 3000/masks.length);
                     hideMasks();
                     displacementCounter.start();
                     startCounter= true;
                    }
                    }
                    document.onscroll = checkCounterInView;
                    checkCounterInView();


        }, 1000);

        function hideMasks() {
          masks[masks.length-masksCount].style.opacity = 0;
          masksCount ++;
          if (masksCount >= masks.length+1) {
            console.log("end");

            clearInterval(showIcons);
          }
        }
      }
    };
  })(jQuery);