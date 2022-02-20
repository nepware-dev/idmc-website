/**
 * Exposed Filter Module
 * 
 * Use for preprocessing search exposed filters from some screens: /publications, /expert-opinion ...
 */
(function ($) {
  Drupal.behaviors.exposedFilter = {
    attach: function (context, settings) {

      // Set value for hidden input form
      function setFilterValue(form, name, value){
        var formControl = form.find('input[name="'+ name +'[]"][value="'+ value +'"]');

        if (formControl.length == 0){
          form.append('<input type="hidden" name="'+ name +'[]" value="'+value+'"></input>');
        }
      }

      // Change filter item value action
      $(".views-exposed-form .dropdown-filter-item").off("click");
      $(".views-exposed-form .dropdown-filter-item").on("click", function(e){
        e.preventDefault();

        console.log("click");

        var field_name = $(this).attr('data-field-name');
        var field_value = $(this).attr('data-key');
        var field_text = $(this).text();
        var form = $(this).closest("form.views-exposed-form");

        if(form){
          // Set hidden value
          setFilterValue(form, field_name, field_value);

          // Update UI
          var deviceForm = $(this).closest(".idmc-form-search");
          var selectedFilters = deviceForm.find("#selectedFilters");
          if(selectedFilters){
            selectedFilters.find(".filter-terms-label").show();

            // Hide accordion on mobile
            if($(this).hasClass("accordion-sub-item")){
              $(this).closest(".panel-collapse").removeClass("in");
            }

            var selectedFilterName = selectedFilters.find('span[data-field-name="'+ field_name +'"][data-field-value="'+ field_value +'"]');
            if(selectedFilterName.length > 0){
              selectedFilterName.html(field_text+' <i title="Remove" class="fa fa-remove remove-filter-icon"></i>');
            } else {
              var extraClass = $(this).closest(".idmc-form-mobile-search").length > 0 ? ' col-xs-6' : '';
              selectedFilters.append('<span data-field-name="'+ field_name +'" data-field-value="'+ field_value +'" class="filter-term'+ extraClass +'">'+ field_text +' <i title="Remove" class="fa fa-remove remove-filter-icon"></i></span>');
            }
          }
        }
      });

      // Remove filter item value action
      $(".views-exposed-form").off("click", ".remove-filter-icon");
      $(".views-exposed-form").on("click", ".remove-filter-icon", function(){
        var item = $(this).closest('.filter-term');

        var name = item.attr("data-field-name");
        var value = item.attr("data-field-value");
        var form = $(this).closest("form.views-exposed-form");
        var deviceForm = $(this).closest(".idmc-form-search");
        var formControl = form.find('input[name="'+ name +'[]"][value="'+ value +'"]');

        item.remove();

        if(form.length > 0){
          if(formControl){
            formControl.remove();
          }
          //setFilterValue(form, name, "All");
          // Hide selected filters label
          if(deviceForm.length > 0 && deviceForm.find(".filter-term").length == 0){
            deviceForm.find(".filter-terms-label").hide();
          }
        }
      });
    }
  };
})(jQuery);