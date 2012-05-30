// JavaScript Document
/* Customise default JQM behaviour */
/* http://jquerymobile.com/demos/1.1.0/docs/api/globalconfig.html */
/* http://jquerymobile.com/demos/1.1.0/docs/api/events.html */
/* http://jquerymobile.com/demos/1.1.0/docs/api/methods.html */
/* http://jquerymobile.com/demos/1.1.0/docs/api/data-attributes.html */
/* http://jquerymobile.com/demos/1.1.0/docs/pages/phonegap.html */

$(document).bind("mobileinit", function () {
    
	
	//AJAX related config
	$.mobile.pushStateEnabled = true; // when true, the quiz-question page is found without ajax. Otherwise 404.
    //$.mobile.ajaxEnabled = false;
    //$.mobile.defaultDialogTransition = 'pop';
    // $.mobile.defaultPageTransition = 'slide';  //none is best for mobile, cos transition is not too smooth.
    $.mobile.defaultPageTransition = 'none';  // Fade is best, because slide doesn't know the best direction to slide unless specified.

    //Set the delay for touch devices to add the hover and down classes on touch interactions for buttons throughout the framework. Reducing the delay here results in a more responsive feeling ui, but will often result in the downstate being applied during page scrolling.
    $.mobile.buttonMarkup.hoverDelay = 50;  // ms

    // Navigation
    $.mobile.page.prototype.options.backBtnText = "";
    $.mobile.page.prototype.options.addBackBtn = true; // Leave this as true, so it will add a back button if none is specified. Does not add button if explictly set on page header.
    $.mobile.page.prototype.options.backBtnTheme = "b";

    $.mobile.loadingMessage = "Thinking..."
    $.mobile.pageLoadErrorMessage = "Oops! Page not found.";
	
	/*  in PhoneGap apps that must "phone home" by loading assets off a remote server, both the $.support.cors AND $.mobile.allowCrossDomainPages must be set to true.  */
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	




});


/* Glossary filtering */
$(document).delegate("#glossary-full", "pageinit", function () {
	//	alert('Glossary inited');
	
	$("#glossary-filter").bind("change", function (event, ui) {
	   var filterValue = $("#glossary-filter").val();
	    //alert("Filtering on " + filterValue );
		$("input.ui-input-text").val(filterValue).keyup(); //keyup to refresh filter
    });
	
	
	$("#glossary-clear").click(function (event, ui) {
		// First, clear the dropdown
		//$('#glossary-filter option').attr('selected', false);
		$("#glossary-filter").val($("#glossary-filter option:first").val());
		$('#glossary-filter').selectmenu('refresh'); //This is used to update the custom select to reflect the native select element's value
		$("input.ui-input-text").val("").keyup(); //  clear the textboxkeyup to refresh filter
    });
	
});


$(document).delegate("#glossary", "pageinit", function () {	
	$("#select-keyterms").bind("change", function (event, ui) {
		 	var selectValue = $("#select-keyterms").val();
			//alert("Topic selected: " + selectValue);
			$.mobile.changePage( selectValue );
		
		});
	
});


$(document).bind("#quiz", "pageinit", function () {
		/*alert('Quiz init');
		$('#quiz-container').jquizzy({
	 		questions: init.questions, 
			resultComments: init.resultComments
		});
		*/
	
});	

/* Reusable functions on any page */
$(document).bind("pageinit", function () {

    // Function to scroll to top
    $("a[rel='top']").click(function () {
        $.mobile.silentScroll(0);
    });
	
	

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
 
 
 /* Google Analytics */ 
 /*
   var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-31999657-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
*/