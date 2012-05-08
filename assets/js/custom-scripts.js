// JavaScript Document
/* Customise default JQM behaviour */
/* http://jquerymobile.com/demos/1.1.0/docs/api/globalconfig.html */
/* http://jquerymobile.com/demos/1.1.0/docs/api/events.html */
/* http://jquerymobile.com/demos/1.1.0/docs/api/methods.html */
/* http://jquerymobile.com/demos/1.1.0/docs/api/data-attributes.html */
/* http://jquerymobile.com/demos/1.1.0/docs/pages/phonegap.html */

$(document).bind("mobileinit", function () {
    //apply overrides here
    //$.mobile.ajaxEnabled = false;
    //$.mobile.allowCrossDomainPages = true;
    //$.mobile.defaultDialogTransition = 'pop';
     $.mobile.defaultPageTransition = 'none';  //none is best for mobile, cos transition is not too smooth.
    //$.mobile.defaultPageTransition = 'fade';  // Fade is best for desktop

    //Set the delay for touch devices to add the hover and down classes on touch interactions for buttons throughout the framework. Reducing the delay here results in a more responsive feeling ui, but will often result in the downstate being applied during page scrolling.
    $.mobile.buttonMarkup.hoverDelay = 0;

    // Navigation
    $.mobile.page.prototype.options.backBtnText = "Back";
    $.mobile.page.prototype.options.addBackBtn = true;
    $.mobile.page.prototype.options.backBtnTheme = "b";

    $.mobile.loadingMessage = "Thinking..."
    $.mobile.pageLoadErrorMessage = "Sorry, something went wrong. Please try again.";
	
	/*  in PhoneGap apps that must "phone home" by loading assets off a remote server, both the $.support.cors AND $.mobile.allowCrossDomainPages must be set to true.  */
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	
	/*
    // Page  
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

$(document).delegate("#glossary", "pageinit", function () {
	$("#glossary-filter input:radio").bind("change", function (event, ui) {
	   var filterString = $('input:radio[name=filtergroup]:checked').val();
	    //alert("Filtering on " + filterString );
		$(".ui-input-text").val(filterString).keyup();
    });
	
});

$(document).delegate("#key-terms", "pageinit", function () {
    //alert('A page with an ID of "key-terms" was just created by jQuery Mobile!');
    /* Function to expand all or collapse all collabsibles when radio button toggled*/

    //$("#collapsibleGroup input[type='radio']").bind( "change", function(event, ui) {
    $("#collapsibleGroup input[type='radio']").live("change", function (event, ui) {
        //alert("toggle to " + this.value );
        $('.ui-collapsible').trigger(this.value);
    });
});



$(document).bind("pageinit", function () {

    // Function to scroll to top
    $("a[rel='top']").click(function () {

        //$("body").scrollTop(0);
        $.mobile.silentScroll(0);
    });

});


// Orientation - Doesn't seem to work
$(document).bind("orientationchange", function () {
    alert("orientation changed");
    alert(event.orientation);
});