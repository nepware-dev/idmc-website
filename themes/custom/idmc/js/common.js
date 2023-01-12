jQuery(function(){
  function fakeCollapseForOurService(){
    var tabContent = '#tab_service_' + this.id;
    // jQuery('#tab_service_1').hide();
    // jQuery('#tab_service_2').hide();
    // jQuery('#tab_service_3').hide();
    // jQuery('#tab_service_4').hide();
    jQuery('#tab_service_1').collapse('hide');
    jQuery('#tab_service_2').collapse('hide');
    jQuery('#tab_service_3').collapse('hide');
    jQuery('#tab_service_4').collapse('hide');
  //   jQuery(tabContent).collapse('toggle');

    if (!jQuery(tabContent).is(":visible")) {
      jQuery(tabContent).collapse('show');
    }
  }

	jQuery('a.our-key-service-item').click(fakeCollapseForOurService);
  jQuery('a.our-arrow-service-item').click(fakeCollapseForOurService);
  
// Add select 2 to country dropdown select
  jQuery('#select2c').select2({placeholder: 'Country profiles'});
  
  // Add menu background while scroll 
  jQuery(window).scroll(function() {
        var scrollOffset = jQuery(window).scrollTop();
        if (scrollOffset>50)
          jQuery('header#navbar').addClass('bg-main-nav');
        else
          jQuery('header#navbar').removeClass('bg-main-nav');
    });
  
  // Add menu background while scroll 

        var scrollOffset = jQuery(window).scrollTop();
        if (scrollOffset>50)
          jQuery('header#navbar').addClass('bg-main-nav');
        else
          jQuery('header#navbar').removeClass('bg-main-nav');

  
  // about us h1 styling
  //jQuery('body.path-frontpage .idmc-leading').first().css('paddingTop','50px');
  //jQuery('body.path-frontpage .idmc-leading h1.block-title-lvl-1').first().css('marginTop','0px');
  //jQuery('body.path-frontpage .idmc-leading h1.block-title-lvl-1').first().css('paddingTop','0px');

  //  link

  jQuery('a.more-link-arrow').addClass('readmoremenu').removeClass('more-link-arrow');
  
  jQuery('ul.dropdown-menu > li.expanded > a').addClass('readmoremenu');
  

  jQuery('ul.dropdown-menu > li.expanded > a').append('<div class="fake-caret-container visible-xs"></div><span class="caret"></span>');

  // Menu on mobile (level 1)
/*
  jQuery('ul.menu--main > li.dropdown > a > span.caret').click(function(e){
      e.preventDefault();
      var $el = jQuery(this).parent().next();
      $el.css("height", "auto");
      var height = $el.outerHeight();

      if(jQuery(this).parent().parent().hasClass('open')){
        
        console.log('open '+$el.css("height"));
        $el.css("height", "0");

        $el.stop().animate({
               "height": height
            }, 300);
        
        $el.css("height", "auto");
        //console.log($el.css("height")); 
      }
      else{
        $el.css("display", "block");
        console.log('!open '+$el.css("height"));  
        $el.stop().animate({
               "height": 0
            }, 300);
          //$el.css("display", "none");
          $el.css("height", "auto");
          //console.log($el.css("height"));   
      }
    
      return false;
  });
*/
  function caretExpandChilds(e){
    e.preventDefault();
    //jQuery(this).parents("li.dropdown").addClass('open');
    jQuery(this).parent().parent().toggleClass('open');
    var $el = jQuery(this).parent().next();
    $el.css("height", "auto");
    var height = $el.outerHeight();

    if(jQuery(this).parent().parent().hasClass('open')){
      
      //console.log('open '+$el.css("height"));
      $el.css("height", "0");

      $el.stop().animate({
             "height": height
          }, 300);
      
      $el.css("height", "auto");
      //console.log($el.css("height")); 
    }
    else{
      $el.css("display", "block");
      //console.log('!open '+$el.css("height"));  
      $el.stop().animate({
             "height": 0
          }, 300);
        //$el.css("display", "none");
        $el.css("height", "auto");
        //console.log($el.css("height"));   
    }
  
    return false;
  }

  //submenu
   jQuery('ul.menu--main li.dropdown.expanded ul.dropdown-menu > li.expanded > a > span.caret').click(caretExpandChilds);

  jQuery('ul.menu--main li.dropdown.expanded ul.dropdown-menu > li.expanded > a > div.fake-caret-container').click(caretExpandChilds);

  
  // Add mobile warning to global database page
  jQuery('<div class="visible-xs alert alert-warning m-2">Please note graphics and interactive tools are easier to view and explore on desktop. </div>').insertAfter(".page-node-type-database-page .database-page .nav-tabs");
  
  /*
   * NO longer using
  jQuery('ul.menu--main li.dropdown.expanded ul.dropdown-menu > li.expanded > a.readmoremenu').click(function(e){

      if (jQuery(window).width() > 767) {
        return false;
      }

      e.preventDefault();
      jQuery(this).parents("li.dropdown").addClass('open');
      jQuery(this).parent().toggleClass('open');
      
      var $el = jQuery(this).next();
      $el.css("height", "auto");
      var height = $el.outerHeight();

      if(jQuery(this).parent().hasClass('open')){
        
        //console.log('open '+$el.css("height"));
        $el.css("height", "0");

        $el.stop().animate({
               "height": height
            }, 300);
        
        $el.css("height", "auto");
        //console.log($el.css("height")); 
      }
      else{
        $el.css("display", "block");
        //console.log('!open '+$el.css("height"));  
        $el.stop().animate({
               "height": 0
            }, 300);
          //$el.css("display", "none");
          $el.css("height", "auto");
          //console.log($el.css("height"));   
      }
    
      return false;
  });
  */

  // Flexible Text Block
  //jQuery('div.text-block-text.hasimg').parent(':before').height(jQuery('div.text-block-text.hasimg').outerHeight(true));
  //jQuery('div.text-block-text.hasimg').parent().height(jQuery('div.text-block-text.hasimg').outerHeight(true));
  //console.log(jQuery('div.text-block-text.hasimg').parent().height());

jQuery(document).ready(function () {
	var size_li = jQuery("#publicationstags .field--item");
	var showMax = 10;
	
	function hideextra(){

			size_li.each(function(ind, el) {
				if (ind < showMax) {
					jQuery(el).show()
				} else { jQuery(el).hide();}
				jQuery('#loadMore').show();
				jQuery('#showLess').hide();
			});
		
	}
	function showall(){
		size_li.each(function(ind, el) {
				jQuery(el).show();
				jQuery('#loadMore').hide();
				jQuery('#showLess').show();
			});
		}
		jQuery('#loadMore').click(function (e) {
				e.preventDefault();
				showall();

			});
			jQuery('#showLess').click(function (e) {
				e.preventDefault();
				hideextra();

			});
	console.log(size_li.length, showMax, (size_li <=showMax));
			if (size_li.length <= showMax) {
				jQuery("#showhidetags").hide();
			} else {hideextra();}
});
});
