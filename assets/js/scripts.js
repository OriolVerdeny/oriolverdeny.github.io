$(document).ready(function() {
	'use strict';
	/*-----------------------------------------------------------------------------------*/
	/*	STICKY HEADER
	/*-----------------------------------------------------------------------------------*/
   if($("#search-input").length > 0){
   		var sjs = SimpleJekyllSearch({
       searchInput: document.getElementById('search-input'),
       resultsContainer: document.getElementById('results-container'),
       json: '/search.json'
    });
   }


//  Initializes a sticky navigation bar using the Headhesive.js library.
	if ($(".navbar").length) { // checks if .navbar element exists (if at least one .navbar exists)
		var options = {
			offset: 350, // The navbar becomes sticky after scrolling 350 pixels down.
			offsetSide: 'top', // The sticky effect is triggered when scrolling from the top.
			classes: { // Defines CSS classes applied at different states:
				clone: 'banner--clone fixed', // A cloned navbar is created with these classes.
				stick: 'banner--stick', // Added when the navbar becomes sticky.
				unstick: 'banner--unstick' // Added when the navbar returns to its original position.
			},
			onStick: function() { // Callback function when the navbar becomes sticky.
				$($.SmartMenus.Bootstrap.init); // Calls SmartMenus Bootstrap integration, initializing dropdown menus.
			},
			onUnstick: function() { // Callback function when the navbar becomes unstuck.
				$('.search-dropdown .dropdown-menu').collapse('hide'); // Hides dropdown menus inside .search-dropdown by collapsing them.
			}
		};
		var banner = new Headhesive('.navbar', options); // Creates a new Headhesive instance targeting .navbar using the options defined above.
	}
	/*-----------------------------------------------------------------------------------*/
	/*	HEADER BUTTONS
	/*-----------------------------------------------------------------------------------*/
	var $header_hamburger = $('.hamburger.animate');
	var $header_search = $('.search-dropdown .dropdown-menu');
	var $header_cart = $('.cart-dropdown .dropdown-menu');
	var $navbar_offcanvas = $('.offcanvas-nav');
	var $navbar_offcanvas_toggle = $('[data-toggle="offcanvas-nav"]');
	var $navbar_offcanvas_close = $('.offcanvas-nav-close');
	var $navbar_search_toggle = $('.search-dropdown .collapse-toggle');
	var $navbar_search_close = $(".search-dropdown .dropdown-menu .dropdown-close");
	var $info_offcanvas = $('.offcanvas-info');
	var $info_offcanvas_close = $('.offcanvas-info-close');
	var $info_offcanvas_toggle = $('[data-toggle="offcanvas-info"]');
	$header_hamburger.on("click", function() {
		$header_hamburger.toggleClass("active");
		$header_search.collapse('hide');
	});
	$header_search.on('click', function(e) {
		e.stopPropagation();
	});
	$navbar_search_close.click(function() {
		$header_search.collapse('hide');
	});
	$navbar_search_toggle.on('click', function(e) {
		$navbar_offcanvas.removeClass('open');
		$header_hamburger.removeClass('active');
	});
	$navbar_offcanvas_toggle.on("click", function(e) {
		e.stopPropagation();
		$navbar_offcanvas.toggleClass('open');
	});
	$navbar_offcanvas.on("click", function(e) {
		e.stopPropagation();
	});
	$header_cart.on('click', function(e) {
		e.stopPropagation();
	});
	$navbar_offcanvas_close.on("click", function(e) {
		$navbar_offcanvas.removeClass('open');
		$header_hamburger.removeClass('active');
	});
	$info_offcanvas_toggle.on("click", function(e) {
		e.stopPropagation();
		$info_offcanvas.toggleClass('open');
		$header_search.collapse('hide');
	});
	$info_offcanvas.on("click", function(e) {
		e.stopPropagation();
	});
	$(document).on('click', function() {
		$header_search.collapse('hide');
		$navbar_offcanvas.removeClass('open');
		$info_offcanvas.removeClass('open');
		$header_hamburger.removeClass('active');
	});
	$info_offcanvas_close.on("click", function(e) {
		$info_offcanvas.removeClass('open');
	});
	$('.onepage .navbar li a').on('click', function() {
		$navbar_offcanvas.removeClass('open');
		$header_hamburger.removeClass('active');
	});
	/*-----------------------------------------------------------------------------------*/
	/*	ONEPAGE NAV LINKS
	/*-----------------------------------------------------------------------------------*/
	var empty_a = $('.onepage .navbar ul.navbar-nav a[href="#"]');
	empty_a.on('click', function(e) {
		e.preventDefault();
	});
	/*-----------------------------------------------------------------------------------*/
	/*	ONEPAGE SMOOTH SCROLL
	/*-----------------------------------------------------------------------------------*/
	$(function() {
		setTimeout(function() {
			if (location.hash) {
				window.scrollTo(0, 0);
				var target = location.hash.split('#');
				smoothScrollTo($('#' + target[1]));
			}
		}, 1);
		$('a.scroll[href*="#"]:not([href="#"])').on('click', function() {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				smoothScrollTo($(this.hash));
				return false;
			}
		});
		function smoothScrollTo(target) {
			var target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1500, 'easeInOutExpo');
			}
		}
	});
	/*-----------------------------------------------------------------------------------*/
	/*	BACKGROUND IMAGE
	/*-----------------------------------------------------------------------------------*/
	$(".bg-image").css('background-image', function() {
		var bg = ('url(' + $(this).data("image-src") + ')');
		return bg;
	});
	/*-----------------------------------------------------------------------------------*/
	/*	IMAGE ICON HOVER
	/*-----------------------------------------------------------------------------------*/
	$('.overlay:not(.caption) > a, .overlay:not(.caption) > span, .overlay.caption-overlay > a, .overlay.caption-overlay > span').prepend('<span class="bg"></span>');
	/*-----------------------------------------------------------------------------------*/
	/*	ISOTOPE GRID
	/*-----------------------------------------------------------------------------------*/
	function enableIsotope() {
	  // for each container
	  $('.grid').each( function( i, gridContainer ) {
	    var $gridContainer = $( gridContainer );
	    // init isotope for container
	    var $grid = $gridContainer.find('.isotope').imagesLoaded( function() {
	      $grid.isotope({
	        itemSelector: '.item',
	        layoutMode: 'masonry',
	        percentPosition: true,
	        masonry: {
	            columnWidth: $grid.width() / 12
	        },
			transitionDuration: '0.7s'
	      })
	    });
			$(window).resize(function() {
				$grid.isotope({
					masonry: {
						columnWidth: $grid.width() / 12
					}
				});
			});
			$(window).on("load", function() {
				$grid.isotope({
					masonry: {
						columnWidth: $grid.width() / 12
					}
				});
			});
	    // initi filters for container
	    $gridContainer.find('.isotope-filter').on( 'click', '.button', function() {
	      var filterValue = $( this ).attr('data-filter');
	      $grid.isotope({ filter: filterValue });
	    });
	  });
	    
	  $('.isotope-filter').each( function( i, buttonGroup ) {
	    var $buttonGroup = $( buttonGroup );
	    $buttonGroup.on( 'click', '.button', function() {
	      $buttonGroup.find('.active').removeClass('active');
	      $( this ).addClass('active');
	    });
	  });
	
	};
	enableIsotope();
	/*-----------------------------------------------------------------------------------*/
	/*	OWL CAROUSEL
	/*-----------------------------------------------------------------------------------*/
	$('.basic-slider').each(function() {
		var $bslider = $(this);
		$bslider.owlCarousel({
			items: 1,
			nav: false,
			dots: true,
			dotsEach: true,
			autoHeight: true,
			loop: true,
			margin: $bslider.data("margin")
		});
	});
	$('.carousel').each(function() {
		var $carousel = $(this);
		$carousel.owlCarousel({
			autoHeight: false,
			nav: false,
			dots: $carousel.data("dots"),
			dotsEach: true,
			loop: $carousel.data("loop"),
			margin: $carousel.data("margin"),
			autoplay: $carousel.data("autoplay"),
			autoplayTimeout: $carousel.data("autoplay-timeout"),
			responsive: $carousel.data("responsive")
		});
	});
	/*-----------------------------------------------------------------------------------*/
	/*	OWL SLIDER WITH THUMBNAILS
	/*-----------------------------------------------------------------------------------*/
	var $owlmain = $(".owl-slider-main");
	var $owlnav = $(".owl-slider-nav");
	//var totalslides = 10;
	var syncedSecondary = true;
	$owlmain
		.owlCarousel({
			items: 1,
			nav: false,
			margin: 10,
			autoplay: false,
			dots: false,
			loop: true,
			responsiveRefreshRate: 200
		})
		.on("changed.owl.carousel", syncPosition);
	$owlnav
		.on("initialized.owl.carousel", function() {
			$owlnav
				.find(".owl-item")
				.eq(0)
				.addClass("current");
		})
		.owlCarousel({
			items: 3,
			margin: 10,
			dots: false,
			nav: false,
			smartSpeed: 200,
			slideSpeed: 500,
			slideBy: 3,
			responsiveRefreshRate: 100
		})
		.on("changed.owl.carousel", syncPosition2);
	function syncPosition(el) {
		//if loop is set to false, then you have to uncomment the next line
		//var current = el.item.index;
		//to disable loop, comment this block
		var count = el.item.count - 1;
		var current = Math.round(el.item.index - el.item.count / 2 - 0.5);
		if (current < 0) {
			current = count;
		}
		if (current > count) {
			current = 0;
		}
		//to this
		$owlnav
			.find(".owl-item")
			.removeClass("current")
			.eq(current)
			.addClass("current");
		var onscreen = $owlnav.find(".owl-item.active").length - 1;
		var start = $owlnav
			.find(".owl-item.active")
			.first()
			.index();
		var end = $owlnav
			.find(".owl-item.active")
			.last()
			.index();
		if (current > end) {
			$owlnav.data("owl.carousel").to(current, 100, true);
		}
		if (current < start) {
			$owlnav.data("owl.carousel").to(current - onscreen, 100, true);
		}
	}
	function syncPosition2(el) {
		if (syncedSecondary) {
			var number = el.item.index;
			$owlmain.data("owl.carousel").to(number, 100, true);
		}
	}
	$owlnav.on("click", ".owl-item", function(e) {
		e.preventDefault();
		var number = $(this).index();
		$owlmain.data("owl.carousel").to(number, 300, true);
	});
	/*-----------------------------------------------------------------------------------*/
	/*	LIGHTGALLERY
	/*-----------------------------------------------------------------------------------*/
	function enablelightGallery() {
		var $lg = $('.light-gallery-wrapper');
		$lg.lightGallery({
			thumbnail: false,
			selector: '.lightbox',
			mode: 'lg-fade',
			download: false,
			autoplayControls: false,
			zoom: true,
			fullScreen: false,
			videoMaxWidth: '1000px',
			loop: true,
			hash: false,
			mousewheel: true,
			videojs: true,
			share: false,
			subHtmlSelectorRelative: false,
			getCaptionFromTitleOrAlt: false
		});
	}
	enablelightGallery();
	/*-----------------------------------------------------------------------------------*/
	/*	SLIDER REVOLUTION - library deleted
	/*-----------------------------------------------------------------------------------*/
	
	
	/*-----------------------------------------------------------------------------------*/
	/*	PLYR
	/*-----------------------------------------------------------------------------------*/
	const players = Plyr.setup('.player');
	/*-----------------------------------------------------------------------------------*/
	/*	CIRCLE INFO BOX
	/*-----------------------------------------------------------------------------------*/
	$("#dial1").s8CircleInfoBox({
		autoSlide: false,
		action: "mouseover"
	});
	$("#dial2").s8CircleInfoBox({
		autoSlide: false,
		action: "mouseover"
	});
	/*-----------------------------------------------------------------------------------*/
	/*	PROGRESSBAR
	/*-----------------------------------------------------------------------------------*/
	var $pline = $('.progressbar.line');
	var $pcircle = $('.progressbar.circle');
	$pline.each(function(i) {
		var line = new ProgressBar.Line(this, {
			strokeWidth: 3,
			trailWidth: 3,
			duration: 3000,
			easing: 'easeInOut',
			text: {
				style: {
					color: 'inherit',
					position: 'absolute',
					right: '0',
					top: '-30px',
					padding: 0,
					margin: 0,
					transform: null
				},
				autoStyleContainer: false
			},
			step: function(state, line, attachment) {
				line.setText(Math.round(line.value() * 100) + ' %');
			}
		});
		var value = ($(this).attr('data-value') / 100);
		$pline.waypoint(function() {
			line.animate(value);
		}, {
			offset: "100%"
		})
	});
	$pcircle.each(function(i) {
		var circle = new ProgressBar.SemiCircle(this, {
			strokeWidth: 5,
			trailWidth: 5,
			duration: 2000,
			easing: 'easeInOut',
			step: function(state, circle, attachment) {
				circle.setText(Math.round(circle.value() * 100));
			}
		});
		var value = ($(this).attr('data-value') / 100);
		$pcircle.waypoint(function() {
			circle.animate(value);
		}, {
			offset: "100%"
		})
	});
	/*-----------------------------------------------------------------------------------*/
	/*	COUNTER UP
	/*-----------------------------------------------------------------------------------*/
	$('.counter .value').counterUp({
		delay: 50,
		time: 1000
	});
	/*-----------------------------------------------------------------------------------*/
	/*	COUNTDOWN
	/*-----------------------------------------------------------------------------------*/
	$(".countdown").countdown();
	/*-----------------------------------------------------------------------------------*/
	/*	AOS
	/*-----------------------------------------------------------------------------------*/
	// AOS.init({
    //     easing: 'ease-in-out-sine',
    //     duration: 800,
    //     once: true
    // });
	/*-----------------------------------------------------------------------------------*/
	/*	TOOLTIP & POPOVER
	/*-----------------------------------------------------------------------------------*/
	$('.has-tooltip').tooltip();
	$('.image-tooltip').tooltip({
		html: true,
		container: 'body',
		trigger: 'hover',
		template: '<div class="image-tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
	});
	$('.has-popover').popover({
		trigger: 'focus',
	});
	/*-----------------------------------------------------------------------------------*/
	/*	VIDEO WRAPPER
	/*-----------------------------------------------------------------------------------*/
	$('.video-wrapper video').backgroundVideo({
		$outerWrap: $('.video-wrapper'),
		pauseVideoOnViewLoss: false,
		parallaxOptions: {
			effect: 3
		}
	});
	/*-----------------------------------------------------------------------------------*/
	/*	CONTACT FORM
	/*-----------------------------------------------------------------------------------*/
	function enableContactForm() {
		$('#contact-form').validator({
			disable: false,
			focus: false
		});
	}
	enableContactForm();
	/*-----------------------------------------------------------------------------------*/
	/*	MODAL
	/*-----------------------------------------------------------------------------------*/
	setTimeout(function() {
		$(".modal-popup").modal("show")
	}, 200);
	$('#modal-03').on('shown.bs.modal', function() {
		enableContactForm();
	})
	/*-----------------------------------------------------------------------------------*/
	/*	PAGE LOADING
	/*-----------------------------------------------------------------------------------*/
	$('.page-loading').delay(350).fadeOut('slow');
	$('.page-loading .status').fadeOut('slow');
	/*-----------------------------------------------------------------------------------*/
	/*	IMAGE WRAPPER MOBILE
	/*-----------------------------------------------------------------------------------*/
	if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i)) {
		$('.image-wrapper').addClass('mobile');
	}
	/*-----------------------------------------------------------------------------------*/
	/*	PRICING
	/*-----------------------------------------------------------------------------------*/
	$('.pricing-wrapper').each(function(i, container) {
		var $container = $(container);
		$container.find(".pricing-switcher").on('click', function() {
			$container.find(".pricing-switcher").toggleClass('pricing-switcher-active');
			$container.find(".price").removeClass('price-hidden');
			$container.find(".price").toggleClass('price-show price-hide');
		});
	});


});