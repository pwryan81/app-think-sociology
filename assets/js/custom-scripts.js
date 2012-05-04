// JavaScript Document

/* Customise default JQM behaviour */
/* http://jquerymobile.com/demos/1.1.0/docs/api/globalconfig.html */


$(document).bind("mobileinit", function(){
  //apply overrides here
  //$.mobile.ajaxEnabled = false;
  //$.mobile.allowCrossDomainPages = true;
  
  //$.mobile.defaultDialogTransition = 'pop';
  $.mobile.defaultPageTransition = 'none';  //none, fade, slide, pop

   //Set the delay for touch devices to add the hover and down classes on touch interactions for buttons throughout the framework. Reducing the delay here results in a more responsive feeling ui, but will often result in the downstate being applied during page scrolling.
	 $.mobile.buttonMarkup.hoverDelay = 0;
  
   // Navigation

    $.mobile.page.prototype.options.backBtnText = "Back";
    $.mobile.page.prototype.options.addBackBtn      = true;
    $.mobile.page.prototype.options.backBtnTheme    = "b";

	
	
    // Page  
	/*
    $.mobile.page.prototype.options.headerTheme = "b";  // Page header only
    $.mobile.page.prototype.options.contentTheme = "b";
    $.mobile.page.prototype.options.footerTheme = "b";

    // Listviews
	$.mobile.listview.prototype.options.filterPlaceholder = "Filter list";
    $.mobile.listview.prototype.options.headerTheme = "b";  // Header for nested lists
    $.mobile.listview.prototype.options.theme           = "b";  // List items / content
    $.mobile.listview.prototype.options.dividerTheme    = "b";  // List divider

    $.mobile.listview.prototype.options.splitTheme   = "b";
    $.mobile.listview.prototype.options.countTheme   = "b";
    $.mobile.listview.prototype.options.filterTheme = "b";
    $.mobile.listview.prototype.options.filterPlaceholder = "Filter data...";
	*/
	
	
  
});


$(document).ready(function(){ 
  
/* Function to expand all or collapse all collabsibles when radio button toggled*/
	$("#collapsibleGroup input[type='radio']").bind( "change", function(event, ui) {
		//alert("toggle");
		$('.ui-collapsible').trigger(this.value);
	});
	
	/*
	// Function to scroll to top
	*/
	$("a.scrollToTop").click(function(){
	  //alert("Scrolling to top");
    $("body").scrollTop(0);
  });
	
});