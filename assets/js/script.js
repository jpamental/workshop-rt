/*global jQuery */


// Typographic scale toggle function
$(document).ready(function(e) {
	// Type scale toggle button
	$(".toggle-scale").click(function(){
		$("html").toggleClass("font-scale-active font-scale-inactive");
		$(this).toggleClass("on off");
	});
	// Type fonts toggle button
	$(".toggle-fonts").click(function(e){
		e.preventDefault();
		if($("html").hasClass("wf-active")) {
			$("html").removeClass("wf-active");
			$("html").addClass("wf-inactive");
			$(this).removeClass("on");
			$(this).addClass("off");
		} else {
			$("html").removeClass("wf-inactive");
			$("html").addClass("wf-active");
			$(this).removeClass("off");
			$(this).addClass("on");
			// reset correction
			$("html").addClass("corrected");
			$(".toggle-font-correction").removeClass("off");
			$(".toggle-font-correction").addClass("on");
		}
	});
	// Type font correction toggle button
	$(".toggle-font-correction").click(function(e){
		e.preventDefault();
		if($("html").hasClass("corrected")) {
			$("html").removeClass("corrected");
			$(this).removeClass("on");
			$(this).addClass("off");
		} else {
			$("html").addClass("corrected");
			$(this).removeClass("off");
			$(this).addClass("on");
		}
	});
	// OTF Features toggle button
	$(".toggle-otf-features").click(function(e){
		e.preventDefault();
		$("html").toggleClass("otf-active otf-inactive");
		$(this).toggleClass("on off");
	});
});

function checkMq() {
	$('body').removeClass('mq-l-desk');
	$('body').removeClass('mq-desk');
	$('body').removeClass('mq-l-tab');
	$('body').removeClass('mq-s-tab');
	$('body').removeClass('mq-phone');
	if(Modernizr.mq('only all and (min-width: 80.0625em)')) {
		$('body').addClass('mq-l-desk');
		resetMenu();
	} else if(Modernizr.mq('only all and (min-width: 58em)')) {
		$('body').addClass('mq-desk');
		resetMenu();
	} else if(Modernizr.mq('only all and (min-width: 44em)')) {
		$('body').addClass('mq-l-tab');
	} else if(Modernizr.mq('only all and (min-width: 25em)')) {
		$('body').addClass('mq-s-tab');
	} else {
		$('body').addClass('mq-phone');
	}
};

$(function() {
    // the call to checkMq here will execute after the document has loaded
    checkMq();

    $(window).resize(function() {
        // the call to checkMq here will execute every time the window is resized
        checkMq();
    });

    // you can add other listeners here click, hover, etc.  
});


$(function() {

	// Only add the toggle class if there are child pages
	$('#nav .menu > li > a + ul').after('<span class="js-toggle-dropdown"><span class="fa fa-large fa-plus-circle"></span></span>');
	$('.js-toggle-dropdown').click(function(e) {
		e.preventDefault();
		$(this).parent().toggleClass('nav-dropdown-expanded');
		$(this).find('span').toggleClass('fa-plus-circle fa-times-circle');
	});

	$('#nav-toggle').click(function(e) {
		e.preventDefault();
		$('#nav .menu').toggleClass('open');
		$('body').toggleClass('nav-open');
		$(this).find('span').toggleClass('fa-bars fa-times-circle');

	});

	$('#nav .menu > li > a').on('mouseenter', function (e) {
    	$(this).parent().addClass('over');
	});
	$('#nav .menu > li > a').on('mouseleave', function (e) {
    	$(this).parent().removeClass('over');
	});
	$('#nav .menu > li > a + ul').on('mouseenter', function (e) {
    	$(this).parent().addClass('over');
	});
	$('#nav .menu > li > a + ul').on('mouseleave', function (e) {
    	$(this).parent().removeClass('over');
	});
});

function resetMenu() {
	$('body').removeClass('nav-open');
	$('#nav .menu').removeClass('open');
	$('#nav .menu li').removeClass('nav-dropdown-expanded');
	$('#nav-toggle span').removeClass('fa-times-circle');
	$('#nav-toggle span').addClass('fa-bars');
	$('.js-toggle-dropdown span').removeClass('fa-times-circle');
	$('.js-toggle-dropdown span').addClass('fa-plus-circle');
}

// Rewritten version for correcting a screen-zoom issue on rotation in iOS
// By @mathias, @cheeaun and @jdalton

(function(doc) {

	var addEvent = 'addEventListener',
		type = 'gesturestart',
		qsa = 'querySelectorAll',
		scales = [1, 1],
		meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

	function fix() {
		meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
		doc.removeEventListener(type, fix, true);
	}

	if ((meta = meta[meta.length - 1]) && addEvent in doc) {
		fix();
		scales = [0.25, 1.6];
		doc[addEvent](type, fix, true);
	}

}(document));