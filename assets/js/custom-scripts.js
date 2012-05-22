// JavaScript Document
/* Customise default JQM behaviour */
/* http://jquerymobile.com/demos/1.1.0/docs/api/globalconfig.html */
/* http://jquerymobile.com/demos/1.1.0/docs/api/events.html */
/* http://jquerymobile.com/demos/1.1.0/docs/api/methods.html */
/* http://jquerymobile.com/demos/1.1.0/docs/api/data-attributes.html */
/* http://jquerymobile.com/demos/1.1.0/docs/pages/phonegap.html */

$(document).bind("mobileinit", function () {
    
	
	//AJAX related config
	//$.mobile.pushStateEnabled = true;
    //$.mobile.ajaxEnabled = false;
    //$.mobile.defaultDialogTransition = 'pop';
    // $.mobile.defaultPageTransition = 'slide';  //none is best for mobile, cos transition is not too smooth.
    $.mobile.defaultPageTransition = 'none';  // Fade is best, because slide doesn't know the best direction to slide unless specified.

    //Set the delay for touch devices to add the hover and down classes on touch interactions for buttons throughout the framework. Reducing the delay here results in a more responsive feeling ui, but will often result in the downstate being applied during page scrolling.
    $.mobile.buttonMarkup.hoverDelay = 0;

    // Navigation
    $.mobile.page.prototype.options.backBtnText = "Back";
    $.mobile.page.prototype.options.addBackBtn = true; // Leave this as true, so it will add a back button if none is specified. Does not add button if explictly set on page header.
    $.mobile.page.prototype.options.backBtnTheme = "a";

    $.mobile.loadingMessage = "Thinking..."
    $.mobile.pageLoadErrorMessage = "Oops! Page not found.";
	
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


/* Glossary filtering */
$(document).delegate("#glossary", "pageinit", function () {
	//	alert('Glossary inited');
	
	$("select").bind("change", function (event, ui) {
	   var filterValue = $("select option:selected").val();
	    //alert("Filtering on " + filterValue );
		$(".ui-input-text").val(filterValue).keyup(); //keyup to refresh filter
    });
	
});

$(document).bind("#quiz", "pageinit", function () {
		alert('Quiz init');
		$('#quiz-container').jquizzy({
	 		questions: init.questions, 
			resultComments: init.resultComments
		});
	
});	

/* Reusable functions on any page */
$(document).bind("pageinit", function () {

    // Function to scroll to top
    $("a[rel='top']").click(function () {
        $.mobile.silentScroll(0);
    });
	
	// Function to toggle all collapsible elements on the page
	/*$("#collapsibleToggle input[type='radio']").bind("change", function (event, ui) {
        $('#collapsibleGroup .ui-collapsible').trigger(this.value);
    });	*/
	
	

});


// Orientation change - Works on iPad
$(document).bind("orientationchange", function () {    
    //alert(event.orientation);
});




/* Device Detection */
/*
 var deviceAgent = navigator.userAgent.toLowerCase();
 var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
 if(agentID.indexOf("iphone")>=0){
  //alert("iphone");
 }
 if(agentID.indexOf("ipod")>=0){
  //alert("ipod");
 }
 if(agentID.indexOf("ipad")>=0){
  //alert("ipad");
 }
 if(agentID.indexOf("android")>=0){
  //alert("android");
 }
 */
