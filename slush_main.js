function viewport(){
	viewport = document.querySelector("meta[name=viewport]");
	if (window.matchMedia("(orientation: landscape)").matches) {
		viewport.setAttribute('content', 'width=1024');
	} else {
		viewport.setAttribute('content', 'width=device-width');
	}
}
viewport();




/*(function (e) {
	e.fn.countdown = function (t, n) {
	function i() {
		eventDate = Date.parse(r.date) / 1e3;
		currentDate = Math.floor(e.now() / 1e3);
		if (eventDate <= currentDate) {
			n.call(this);
			clearInterval(interval)
		}
		seconds = eventDate - currentDate;
		days = Math.floor(seconds / 86400);
		seconds -= days * 60 * 60 * 24;
		hours = Math.floor(seconds / 3600);
		seconds -= hours * 60 * 60;
		minutes = Math.floor(seconds / 60);
		seconds -= minutes * 60;
		days == 1 ? thisEl.find(".timeRefDays").text("day") : thisEl.find(".timeRefDays").text("days");
		hours == 1 ? thisEl.find(".timeRefHours").text("hour") : thisEl.find(".timeRefHours").text("hours");
		minutes == 1 ? thisEl.find(".timeRefMinutes").text("minute") : thisEl.find(".timeRefMinutes").text("minutes");
		seconds == 1 ? thisEl.find(".timeRefSeconds").text("second") : thisEl.find(".timeRefSeconds").text("seconds");
		if (r["format"] == "on") {
			days = String(days).length >= 2 ? days : "0" + days;
			hours = String(hours).length >= 2 ? hours : "0" + hours;
			minutes = String(minutes).length >= 2 ? minutes : "0" + minutes;
			seconds = String(seconds).length >= 2 ? seconds : "0" + seconds
		}
		if (!isNaN(eventDate)) {
			thisEl.find(".days").text(days);
			thisEl.find(".hours").text(hours);
			thisEl.find(".minutes").text(minutes);
			thisEl.find(".seconds").text(seconds)
		} else {
			alert("Invalid date. Example: 30 Tuesday 2013 15:50:00");
			clearInterval(interval)
		}
	}
	thisEl = e(this);
	var r = {
		date: null,
		format: null
	};
	t && e.extend(r, t);
	i();
	interval = setInterval(i, 1e3)
	}
	})(jQuery);
	$(document).ready(function () {
	function e() {
		var e = new Date;
		e.setDate(e.getDate() + 60);
		dd = e.getDate();
		mm = e.getMonth() + 1;
		y = e.getFullYear();
		futureFormattedDate = mm + "/" + dd + "/" + y;
		return futureFormattedDate
	}
	$("#countdown").countdown({
		date: "15 June 2014 00:00:00", // Change this to your desired date to countdown to
		format: "on"
	});
});*/

// Fix for Google Map modal
var map;
var latlng;
$(window).resize(function() {
    if ($(".maploader").children().length > 0)
        if (map)
	        google.maps.event.trigger(map, 'resize');
});

$(document).ready(function(){

	var darkareas;
	var darkpos = new Array();
	var darkheight = new Array();

	function darklight(){
		if($(window).width() > 815){
			var paintBlack = false;
			for(var i=0;darkpos.length > i;i++){
				var itempos = (window.pageYOffset+$(window).height())-120;
				if(itempos >= darkpos[i] && itempos < darkheight[i]){
					paintBlack = true;
					if($('body').hasClass("dark")){
					} else {
						$('body').addClass("dark");
						console.log("dark")
					}
				}
			}
			if(paintBlack == false){
				if($('body').hasClass("dark")){
					$('body').removeClass("dark");
					console.log("light")
				}
			}
		
			/*var parallax = $(document).find('.parallax');
			for(var i=0;parallax.length > i;i++){
				$(parallax[i]).css("top",Math.ceil(window.pageYOffset/$(parallax[i]).attr("rel")));
			}*/
		}
	}

	function findDarkAreas(){
		darkareas = $(document).find("section.dark");
		for(var i=0;darkareas.length > i;i++){
			var position = $(darkareas[i]).position();
			if(position.top == 0){
				darkpos.push(-200);
			} else {
				darkpos.push(position.top-50);
			}
			darkheight.push(position.top+$(darkareas[i]).height()-50);
		}
		console.log(darkareas);
	}
	
	function viewport(){
		viewport = document.querySelector("meta[name=viewport]");
		if (window.matchMedia("(orientation: landscape)").matches) {
			viewport.setAttribute('content', 'width=1024');
		} else {
			viewport.setAttribute('content', 'width=device-width');
		}
	}

	if ($(".places-group").length>0){
		$('.places-group').slick({
		  infinite: false,
		  slidesToShow: 4,
		  slidesToScroll: 4,
		  slide: ".single-place",
		  draggable: false,
		  responsive: [
		    {
		      breakpoint: 1024,
		      settings: {
		        slidesToShow: 3,
		        slidesToScroll: 3,
		        infinite: true,
		      }
		    },
		    {
		      breakpoint: 600,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2,
				draggable: true
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1,
				draggable: true
		      }
		    }
		  ]
		});
	}

	if ($(".gallery-carousel").length>0){
		$('.gallery-carousel').slick({
		});
	}

	$('.places-group .modal').on('show.bs.modal', function (e) {
	    var mapobj = $(this).find('.maploader');
	    var args = {
			zoom		: 13,
			center		: new google.maps.LatLng($(this).find('.coordinates').attr('data-lat'), $(this).find('.coordinates').attr('data-lng')),
			styles: [{featureType:"landscape",stylers:[{saturation:-100},{lightness:65},{visibility:"on"}]},{featureType:"poi",stylers:[{saturation:-100},{lightness:51},{visibility:"simplified"}]},{featureType:"road.highway",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"road.arterial",stylers:[{saturation:-100},{lightness:30},{visibility:"on"}]},{featureType:"road.local",stylers:[{saturation:-100},{lightness:40},{visibility:"on"}]},{featureType:"transit",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"administrative.province",stylers:[{visibility:"off"}]/**/},{featureType:"administrative.locality",stylers:[{visibility:"off"}]},{featureType:"administrative.neighborhood",stylers:[{visibility:"on"}]/**/},{featureType:"water",elementType:"labels",stylers:[{visibility:"on"},{lightness:-25},{saturation:-100}]},{featureType:"water",elementType:"geometry",stylers:[{hue:"#ffff00"},{lightness:0},{saturation:-97}]}],
			mapTypeId	: google.maps.MapTypeId.ROADMAP,
		};       	
		map = new google.maps.Map(mapobj[0], args);
		latlng = new google.maps.LatLng( $(this).find('.coordinates').attr('data-lat'), $(this).find('.coordinates').attr('data-lng') );
		var marker = new google.maps.Marker({
			position	: latlng,
			map			: map
		});
		google.maps.event.addListenerOnce(map, 'idle', function(){
		    $(window).resize();
		    map.setCenter(latlng);
		});
	});

	$('a.favorite').on('click', function(e){

		e.preventDefault();
		//$.cookie.json = true;

		// Get current item's id.
		var id = $(this).attr('id').trim();

		// Get cookie.
		var cookiesvar = $.cookie('favorite-places');

		// If cookie not defined, create it.
		if (typeof cookiesvar == 'undefined') {

			// Set cookie.
			$.cookie('favorite-places', id, {expires: 365, path: '/'});

			// Change label.
			$(this).html("Undo favorite");

		} else {

			// Split cookie into array.
			var id_array = cookiesvar.split(",");

			// Item not currently exists.
			if (id_array.indexOf(id) === -1) {


				// Add to array.
				id_array.push(id);

				// Set cookie.
				$.cookie('favorite-places', id_array.join(","), {expires: 365, path: '/'});

				// Change label.
				$(this).html("Undo favorite");

			} else {

				// Remove item from cookie.
				id_array.splice($.inArray(id, id_array), 1);

				// Save cookie.
				$.cookie('favorite-places', id_array.join(","), {expires: 365, path: '/'});

				// Change label.
				$(this).html("Add to favorite");

			}

		}

		// Update favorite list.
		refresh_favorites();

	});

	/**
	 * Update favorite status on dialog open.
	 */
	$(".single-place a[data-toggle='modal']").click(function(e) {

		// Get item id.
		var id = $(this).parent().attr("data-place-id").trim();

		var cookiesvar = $.cookie('favorite-places');

		// If cookie not defined, create it.
		if (typeof cookiesvar != 'undefined') {

			// Get ids.
			var id_array = cookiesvar.split(",");

			// If id is in list, change button label.
			if (id_array.indexOf(id) == -1) {
				$($(this).attr("data-target") + " .favorite").html("Add to favorite");
			} else {
				$($(this).attr("data-target") + " .favorite").html("Undo favorite");
			}

		}


	});

	$('.categories li').click(function(e){

		cat = $(this).attr('class');
		$(".category").show();
		$(".places-group").show();
		$(".category:not(."+cat+")").hide();
		$(".places-group:not(."+cat+")").hide();
		$(".places-group").unslick();
		$(".marker").removeClass("selected");
		$(".marker."+cat).addClass("selected");

		// Refresh favorites, if favorite tab selected.
		if ($(e.target).hasClass("favorite")) {
			refresh_favorites();
		}

		// Update map markers.
		if (map.markers) {

			// Remove all current markers.
			for(i=0; i<map.markers.length; i++) {
			    map.markers[i].setMap(null);
			}			

		}

		// Render map again.
		render_map($("#map_canvas"));

		// Change tab color.
		$(".categories li").removeClass("selected-item");
		$(e.target).addClass("selected-item");

	});


	$(".showall").click(function(e){
		e.preventDefault();
		$(".marker").removeClass("selected");
		$(".category").show();
		$(".places-group").show();
		$(".places-group").slick({
		  infinite: false,
		  slidesToShow: 4,
		  slidesToScroll: 4,
		  slide: ".single-place",
		  draggable: false,
		});
		$(".showall").hide();
		for(i=0; i<map.markers.length; i++){
		    map.markers[i].setMap(null);
		}
		render_map($("#map_canvas"));

		
	});

	function refresh_favorites() {

		// Get cookie.
		var cookiesvar = $.cookie('favorite-places');

		// Hide all items.
		$(".favorite .single-place").hide();
		$(".favorite .marker").removeClass("selected");

		// Cookie not found!
		if (typeof cookiesvar != 'undefined') {

			// Split cookie into array.
			var id_array = cookiesvar.split(",");

			for (i in id_array) {

				console.log(id_array[i]);

				// Show given item.
				$(".favorite div.single-place[data-place-id=" + id_array[i] + "]").show();
				$(".favorite div.single-place[data-place-id=" + id_array[i] + "] .marker").addClass("selected");

			}

		}

		if ($(".favorite .single-place:visible").length > 0) {				
			$(".favorite .js-no-favorites-label").addClass("hide");
		} else {
			$(".favorite .js-no-favorites-label").removeClass("hide");
		}

	}

	function render_map( $el ) {

		// var
		$markers = $(document).find('.marker:not(.selected)');
		$spotmarkers = $(document).find('.marker.selected');

		// vars
		var args = {
			zoom		: 13,
			center		: new google.maps.LatLng(60.1631,24.9359),
			styles: [{featureType:"landscape",stylers:[{saturation:-100},{lightness:65},{visibility:"on"}]},{featureType:"poi",stylers:[{saturation:-100},{lightness:51},{visibility:"simplified"}]},{featureType:"road.highway",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"road.arterial",stylers:[{saturation:-100},{lightness:30},{visibility:"on"}]},{featureType:"road.local",stylers:[{saturation:-100},{lightness:40},{visibility:"on"}]},{featureType:"transit",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"administrative.province",stylers:[{visibility:"off"}]/**/},{featureType:"administrative.locality",stylers:[{visibility:"off"}]},{featureType:"administrative.neighborhood",stylers:[{visibility:"on"}]/**/},{featureType:"water",elementType:"labels",stylers:[{visibility:"on"},{lightness:-25},{saturation:-100}]},{featureType:"water",elementType:"geometry",stylers:[{hue:"#ffff00"},{lightness:0},{saturation:-97}]}],
			mapTypeId	: google.maps.MapTypeId.ROADMAP,
			scrollwheel: false
		};

		// create map	        	
		map = new google.maps.Map( $el[0], args);

		// add a markers reference
		map.markers = [];

		// add markers
		$markers.each(function(){
	    	add_marker( $(this), map, 'black' );
		});
		$spotmarkers.each(function(){
			add_marker( $(this), map, 'red' );
		})

		// add slush marker
		var slush_latlng = new google.maps.LatLng(60.167168,24.932662);

		// create marker
		slush_marker = new google.maps.Marker({
			position	: slush_latlng,
			map			: map,
			icon: 'http://slush2014.evermade.fi/wp-content/themes/slush2014/assets/img/gmap-slush-logo.png',
		});

		// add to array
		map.markers.push( slush_marker );

		// center map
		center_map( map );
	}

	function add_marker( $marker, map, color ) {
		// var
		var latlng = new google.maps.LatLng( $marker.attr('data-lat'), $marker.attr('data-lng') );

		// create marker
		marker = new google.maps.Marker({
			position	: latlng,
			map			: map,
			icon		: "/wp-content/themes/slush2014/assets/img/marker-" + color + ".png"
		});

		// add to array
		map.markers.push( marker );

		// if marker contains HTML, add it to an infoWindow
		if( $marker.html() )
		{
			// create info window
			var infowindow = new google.maps.InfoWindow({
				content		: $marker.html()
			});

			// show info window when marker is clicked
			google.maps.event.addListener(marker, 'click', function() {
				if (window.openInfoWindow) {
					window.openInfoWindow.close();
				}
				window.openInfoWindow = infowindow;
				infowindow.open( map, this );
			});
		}

	}

	function center_map( map ) {

		// vars
		var bounds = new google.maps.LatLngBounds();

		// loop through all markers and create bounds
		$.each( map.markers, function( i, marker ){
			var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );
			bounds.extend( latlng );
		});

		// only 1 marker?
		if( map.markers.length == 1 )
		{
			// set center of map
		    map.setCenter( bounds.getCenter() );
		    map.setZoom( 13 );
		}
		else
		{
			// fit to bounds
			map.fitBounds( bounds );
		}
	}
	$('#map_canvas').each(function(){
		render_map($(this));
	});

	$(window).on("orientationchange",function(){
  		viewport();
	});
	
	if($('.single-item').length > 0){
		$('.single-item').slick({
		  arrows: false,
		  dots: true
		});
	}

	$('.responsive').slick({
	  dots: false,
	  infinite: false,
	  speed: 300,
	  slidesToShow: 4,
	  slidesToScroll: 0,
	  responsive: [
	    {
	      breakpoint: 500,
	      settings: {
	        dots: true,
	        infinite: true,
	        slidesToShow: 1,
	        slidesToScroll: 1
	      }
	    }
	  ]
	});


	/*document.onkeydown = checkKey;

	function checkKey(e) {
	
	    e = e || window.event;
	
	    if (e.keyCode == '38') {
	        $("html, body").animate({ scrollTop: window.pageYOffset-$(window).height() },500);
	    }
	    else if (e.keyCode == '40') {
	        $("html, body").animate({ scrollTop: window.pageYOffset+$(window).height() },500);
	    }
	}
	*/
	$('.fullheight').css( 'min-height', $(window).height() );
	$('.fullheightmax').css( 'max-height', $(window).height() );
	$('.fullwidth').css( 'min-width', $(window).width() );

	/*$('.section3 .speaker').css( 'min-height', $(window).height() );*/

	function msieversion() {
	        var ua = window.navigator.userAgent;
	        var msie = ua.indexOf("MSIE ");
	
	        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || !!navigator.userAgent.match("HTC_One")){
	            $('section.quotesection .container').each(function(){
	            	var height = $(this).parent().height()-$(this).height();
	            	$(this).css("margin-top", height/2);
	            });
	        } else {
	            //alert('otherbrowser');
	        }
	
	   return false;
	}

	msieversion();

	$(document).on("click","img.down",function(){
		var currentposition = window.pageYOffset;
		$("html, body").animate({ scrollTop: currentposition+$(window).height() },500);
	})


	if($('.slideshow').length > 0){
		$('.slideshow').after('<div class="slideshowpager">').cycle({ 
    		pager:  '.slideshowpager' 
		});
	}

	// FANCY
	var slideoutareas;
	var slideoutpos = new Array();
	var slideoutheight = new Array();
	var slideopen = new Array();

	function findSlideOuts(){
		slideoutareas = $(document).find(".slideout");
		for(var i=0;slideoutareas.length > i;i++){
			slideoutpos.push($(window).height()*i);
			slideopen.push(true);
			/*var position = $(slideoutareas[i]).position();
			if(position.top == 0){
				slideoutpos.push(0);
			} else {
				slideoutpos.push($(window).height()*i);
			}*/
			slideoutheight.push(($(window).height()*i)+$(window).height());
		}
		for (var i = slideoutareas.length - 1; i >= 0; i--) {
			$(slideoutareas[i]).css("z-index",20-i);
		};
	}

	if($('#meuskommevideo').length > 0){
		var vidwidth = 1280;
		var vidheight = 720;
		var realwidth = $(window).width()*0.8;
		var marginleft = ($(window).width()-realwidth)/2;
		var ratio = vidwidth/realwidth;
		var realheight = 720/ratio;
		var margintop = ($(window).height()-realheight)/2;
		$('#meuskommevideo').css("width",realwidth+"px");
		$('#meuskommevideo').css("height",realheight+"px");
		$('.videobackground').css("left",marginleft+"px");
		$('.videobackground').css("top",margintop+"px");
		
	}

	$(document).on("click",".closevideopopup,.videoshadow",function(){
		$('.videobackground,.videoshadow').fadeOut();
		$("#meuskommevideo_html5_api").get(0).pause();
	})

	$(document).on("click",".meuskommeplay",function(){
		$('.videobackground,.videoshadow').fadeIn();
		$("#meuskommevideo_html5_api").get(0).play();
	})

	//findSlideOuts();

	var slideouts = $('.slideout');
	$('body').css("height",slideouts.length*$(window).height());

	var changing = false;

	function activeSlideOuts(){
		for(var i=0;slideoutpos.length > i;i++){
			//console.log(Math.ceil((Number(darkpos[i])+Number(darkheight[i]))));
			if(window.pageYOffset >= slideoutpos[i]){
				if(window.pageYOffset >= slideoutpos[i]+100){
					var calculatedposition = slideoutpos[i+1];
					var item = slideoutareas[i];
					if(slideopen[i] == true){
						$(slideoutareas[i]).animate({
							top: -$(window).height()
						}, 1000, function() {
							$(item).css({position: "static", top: '0'});
							$('html, body').scrollTop(calculatedposition);
							unlock();
						});
					}
					slideopen[i] = false;
				}
			} else {
			}
		}
	}

	if($('.fullscreenvid').length){
		whenVideoOnScreen();
	}
	
	scrollposition = window.pageYOffset;
	var slideouts = true;
	var fixed = false;
	function runloop(){
		if($(window).width() > 568){
			if($('.horizontalnavigation').length > 0){
				subNavigationScroll();
			}
		}
		// News page Pagination ----------------------------------
		newspaginationShowMore();

		// Companies page Pagination() -------------------
		if($('.ajaxloadinstant').length > 0){
			ajaxLoadMore();
		}

		if($('.fullscreenvid').length){
			whenVideoOnScreen();
		}

		if($('img.down').length > 0){
			hideDownIfTickets();
		}
		//darklight();
		
		/*// NAVIGATION SCROLL STARTS HEREEE ----------------------------------
		scrollposition = window.pageYOffset;
		if(window.pageYOffset > 0){
			$('header').addClass("dark");
		} else {
			$('header').removeClass("dark");
			$('header').css("top","0")
		}
		if(window.pageYOffset > 0){
			if(window.pageYOffset > $('section.tickets').offset().top){
				$('header').css("top",window.pageYOffset)
				if(fixed == false){
					$('header').hide()
					$('header').slideDown();
					fixed = true;
				}
			} else {
				fixed=false;
				if(window.pageYOffset > $('header').height()){
					$('ul#menu-header-menu').css("opacity","1");
				}
				if(window.pageYOffset < $('header').offset().top){
					$('header').css("top",window.pageYOffset)
				}
				if(scrollposition > window.pageYOffset){
				} else {
					if(window.pageYOffset > $('header').offset().top+$('header').height()){
						$('header').css("top",window.pageYOffset-$('header').height())
					}
				}
			}
		}
		if(window.pageYOffset < 0){
			$('header').css('top','0');
		}
		scrollposition = window.pageYOffset;
		if($('.fullscreenvid').length){
			whenVideoOnScreen();
		}*/
	}

	function hideDownIfTickets(){
		if(window.pageYOffset+2 > $('section.tickets').offset().top){
			$('img.down').fadeOut();
		}
		if(window.pageYOffset > 10){
			$('p.moreabout').fadeOut();
		}
	}


	function unlock(){
		if(window.pageYOffset < scrollposition){
			slideouts = false;
			for (var i = slideoutareas.length - 1; i >= 0; i--) {
				$(slideoutareas[i]).css({position: "static", top: '0'});
			};
		}

		if(window.pageYOffset >= slideoutheight[slideoutheight.length]){
			slideouts = false;
			for (var i = slideoutareas.length - 1; i >= 0; i--) {
				$(slideoutareas[i]).css({position: "static", top: '0'});
			};	
		}
	}

	var containerWidth = $('.somefooter .container').width();
	$('.facebookhere').html('<iframe src="//www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2FSlushHQ&amp;width='+containerWidth+'px&amp;height=300&amp;colorscheme=light&amp;show_faces=true&amp;header=false&amp;stream=false&amp;show_border=false&amp;appId=604426109596483" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:'+containerWidth+'px; height:300px;" allowTransparency="true"></iframe>');

	if($('.frontpagecounter').length){
		$( ".frontpagecounter" ).load("/pitchcounter.php",function(){
			//if($('.frontpagecounter .ticketsleft').html() == "-1"){
			//	$('.frontpagecounter').hide();
			//} else {
				var timenow = Date.now();
				setInterval(function() {
					convertToTimeString($('.frontpagecounter .timeleft').html(),timenow);
				}, 1000);
			//}
		});
	}

	function convertToTimeString(time,timenow){
		var timepassed = Math.floor((Date.now()-timenow)/1000);
		var timeleft = time-timepassed;
		var secondsleft = timeleft;
		var minutesleft = Math.floor(timeleft/60);
		var hoursleft = Math.floor(minutesleft/60);
		var daysleft = Math.floor(hoursleft/24);
		secondsleft = secondsleft-(minutesleft*60);
		minutesleft = minutesleft-(hoursleft*60);
		hoursleft = hoursleft-(daysleft*24);
		$('.frontpagecounter .timer').html(daysleft + "d " + hoursleft+"h "+minutesleft+"m "+secondsleft+"s")
	}

	if($('.fullscreenvid').length){
		if($(window).width() > 1040){
			$('.fullscreenvid').videoBG({
				position:"absolute",
				autoplay:0,
				mp4:'/wp-content/themes/slush2014/assets/video/slush_export_2.mp4',
				ogv:'/wp-content/themes/slush2014/assets/video/Slush_Teaser_1_saittiversio.oggtheora.ogv',
				webm:'/wp-content/themes/slush2014/assets/video/Slush_Teaser_1_saittiversio.webmhd.webm',
				opacity:1
			});
		
			//$('.videoBG video')[0].pause();
			checkVideMute();
			$('.videoBG').hide();
			$('.videoBG').fadeIn("slow");
			$('.fullscreenvidsection .textcontainer').addClass("lighten");
		
			$(document).on("click",".playvideo",function(){
				$(this).hide();
				/*var ticketspos = $('.playvideo').parent().prev().offset();
				$("html, body").animate({ scrollTop: ticketspos.top },1);*/
				$('.videoBG').show();
				$('.videoBG video')[0].play();
			})
		} else {
			$('.fullscreenvid').hide();
		}
	}

	var videostatus = false;
	
	function whenVideoOnScreen(){
		if($(window).width() > 1040){
			var vidposition = $('.fullscreenvid').offset();
			if((window.pageYOffset+($('.fullscreenvid').height()/2)) > vidposition.top && window.pageYOffset < vidposition.top+$('.fullscreenvid').height()){
				if(videostatus == false){
					console.log("video on");
					$('.playvideo').hide();
					$('.videoBG').show();
					$('.videoBG video')[0].play();
					videostatus = true;
				}
			} else {
				if(videostatus == true){
					console.log("video off");
					$('.playvideo').show();
					$('.videoBG').hide();
					$('.videoBG video')[0].pause();
					videostatus = false;
				}
			}
		}
	}

	function checkVideMute(){
		if($('.mutebutton').hasClass("muted")){
			$(".videoBG video").prop('muted', true);
		} else {
			$(".videoBG video").prop('muted', false);
		}
	}

	$(document).on("click",".mutebutton",function(){
		$(".mutebutton").toggleClass("muted");
		checkVideMute();
	})


	$(document).on("click",".hidepopup,.popupshadow",function(){
		closepopup();
	})

	$(document).on("click",".popup",function(event){
		if($(event.currentTarget).hasClass("register") == true){
			openregister($(event.currentTarget).attr("rel"));
		}
	})

	function closepopup(){
		$('.popupshadow').fadeOut();
		$('.popupcontainer').fadeOut();
		//$('.popupcontainer').fadeOut();
		$('.popupcontainer').removeClass("open");
	}
	function openpopup(){
		$('.popupshadow').fadeIn();
		$('.popupcontainer .inner,.popupcontainer .hidepopup').hide();
		$('.popupcontainer').scrollTop(0);
		$('.popupcontainer').fadeIn();
		//$('.popupcontainer').fadeIn();
		$('.popupcontainer').addClass("open");
	}

	if($('.slideshowwithnames').length > 0){
		var bigcycle = $('.slideshowwithnames');
	
		bigcycle.cycle({
			after: function (curr, next, opts) {
				$('.bigslider ul.names .selected').removeClass("selected");
				$('.bigslider ul.names li:nth-child('+(opts.currSlide+1)+')').addClass("selected")
			},
			timeout: 8000
		});
	}

	$(document).on("click",".changeslide",function(event){
		$('.slideshowwithnames').cycle("pause");
		$('.bigslider ul.names .selected').removeClass("selected");
		$('.slideshowwithnames').cycle(Number($(event.currentTarget).attr("rel")));
		$(event.currentTarget).addClass("selected");
	})

	function resizeIframe(obj) {
		obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
	}

	// Responsive nav
	$(document).on('click','.menu-toggle', function(){
			$( "nav.navigation" ).css("height",$(window).height()+100);
			$( "nav.navigation" ).slideToggle();
	});

	if(window.location.hash){
		if(window.location.hash == "#register-media"){
			openregister("/register/media-registration/");
		}
		if(window.location.hash == "#register-investors"){
			openregister("/register/investor/");
		}
		if(window.location.hash == "#register-companies"){
			openregister("/register/company/");
		}
		if(window.location.hash == "#register-attendees"){
			openregister("/register/early-bird-tickets/");
		}
	}

	$(document).on("click",".websiteblock",function(){
		$('body').removeClass("sidebaropen");
		$('body').removeClass("sidebarinfoopen");
	})

	function openregister(passurl){
		openpopup();
		$( ".popupcontainer .inner" ).load( passurl+" section.page",function(){
			$('.popupcontainer .inner,.popupcontainer .hidepopup').fadeIn();
		});
	}

	function newspaginationShowMore(){
		if($('.paging-navigation .next').length > 0){
			$('.nomorenews').hide();
			$('.loadinganimation').fadeIn("slow");
			var bottomofscreen = window.pageYOffset+$(window).height()+500;
			var pagOffset = $('.paging-navigation').offset();
			var paginationPosition = pagOffset.top;
			if(bottomofscreen > paginationPosition){
				var loadurl = $('a.next').attr("href");
				loadurl = loadurl.replace("http://slush2014.evermade.fi", "");
				console.log(loadurl);
				var morenews = $('#morenews.nothing');
				$( "#morenews.nothing" ).load( loadurl+" .newslisting",function(){
					$('.loadinganimation').hide();
					$(morenews).find(".item").hide();
					$(morenews).find(".item").fadeIn("slow");
				});
				$( "#morenews.nothing" ).removeClass("nothing");
				$('.paging-navigation').remove();
			}
		} else {
			if($('.paging-navigation .prev').length > 0){
				$('.nomorenews').fadeIn("slow");
			}
		}
	}

	function ajaxLoadMore(){
		if($('.ajaxloadinstant').length > 0){
		
    //starts
    	$('.loadinganimation').fadeIn("slow");
			var bottomofscreen = window.pageYOffset+$(window).height()+500;
			var loader = $('.ajaxloadinstant');
			var pagOffset = $(loader).offset();
			
      if(bottomofscreen > pagOffset.top){
				var rel = $(loader).attr("rel");
				var target = $($(loader).attr("target"));
				var href = $(loader).attr("href");
				console.log(href);
				$(loader).remove();
				
      //loaded
        $(target).load(href+" "+rel,function(){
					$('.loadinganimation').hide();
					var newcompanies = $(target).find(".item");
					if($(newcompanies).length > 0){
						$(target).find(".item").appendTo(rel).hide().fadeIn("slow");
						$(target).find(".item").remove();
					} else {
						$('.loadmorehere').remove();
					}
				});
			}
		}
	}

	$('article.article,article.default').find("img").removeAttr("width").removeAttr("height");

	/*

	var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
	var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

	if(isSafari || isChrome){
		if($(window).width() > 1024){
			if( 'devicePixelRatio' in window && window.devicePixelRatio == 2 ){

			} else {
				if($('.snowflakes').length){
					var pos1y = 0;
					setInterval(function(){
						if(window.pageYOffset < $(window).height()){
							pos1y = pos1y+4;
							var amount1 = "-"+pos1y+"px "+pos1y*3+"px ";
							var multiplier = pos1y*2;
							var amount2 = "-"+multiplier+"px "+multiplier*3+"px ";
							$('.snowflakes').css("background-position",amount1)
							$('.snowflakes-top').css("background-position",amount2)
						}
					}, 30);
				}
			}
		}
	}

	*/

	window.onscroll = runloop;

	if($('.horizontalnavigation').length > 0){
		var originalSubPos = $('.horizontalnavigation').offset().top;
	}
	function subNavigationScroll(){
		var subnav = $('.horizontalnavigation');
		if(window.pageYOffset > originalSubPos){
			$(subnav).addClass("slidedown");
			$('body').addClass("slidedown");
		} else {
			$(subnav).removeClass("slidedown");
			$('body').removeClass("slidedown");
		}
	}

	/*var $container = $('.newslisting');
	// initialize
	$container.masonry({
	  columnWidth: 0,
	  itemSelector: '.item'
	});*/

	if($('#loadnewshere').length > 0){
		$( "#loadnewshere" ).load( "/news/ section.news" );
	}

	$(".ball-speakers a.readmore").click(function(event){
		event.preventDefault();
		var $desc = $(this).parent().parent().find($(".desc"))
		$(this).toggle();
		$desc.toggle();
		var clicklocation = event.pageX;
		if ($(window).width() < 500) {
			$desc.find($(".arrow")).css("margin-left", clicklocation);
		}
	})
	$(".ball-speakers a.closethis").click(function(event){
		event.preventDefault();
		$(this).parent().parent().toggle();
		$(this).parent().parent().parent().find($("a.readmore")).toggle();
	})

	$('ul.nav li:last-child,.rightsidenav a,.menufloater').click(function(event){
		event.preventDefault();
		openSideNavigation();
	});

	$(document).on("click",".closenav",function(){
		openSideNavigation();
	})

	$(document).on("click","ul.artistspicker li a",function(event){
		event.preventDefault();
		$('ul.artistspicker li.selected').removeClass("selected");
		$(event.currentTarget).parent().addClass("selected");
		$('table.artistschedule tr').hide();
		$($(event.currentTarget).attr("rel")).fadeIn();
	})

	function openSideNavigationInfo(){
		$('body').toggleClass("sidebaropen");
		$('body').toggleClass("sidebarinfoopen");
	}

	function openSideNavigation(){
		if($('body').hasClass("sidebaropen") && $('body').hasClass("sidebarinfoopen")){
			$('body').removeClass("sidebarinfoopen");
		}
		$('body').toggleClass("sidebaropen");
	}

	function closeSideNavigation(){
		$('nav.sidenavigation').css("width","0");
		$('ul.nav').css("right",45);
	}

	function startLink(link){
		window.location.href = link;
	}

	function okForFade(etarget){
		if($(etarget).attr("href") == "#menu" || $(etarget).attr("href") == "#close" || $(etarget).parents(".js-no-fade").length > 0) {
			return false;
		} else if($(etarget).attr("href") == "#register"){
			if($('body').hasClass("sidebaropen")){
				openSideNavigation();
			}
			var ticketspos = $('section.tickets').offset();
			$("html, body").animate({ scrollTop: ticketspos.top },3000);
			return false;
		} else if($(etarget).attr("href") != "" && $(etarget).attr("href").indexOf("mailto:") > -1){
			return false;
		}
		if($(etarget).hasClass("nolink")){
			return false;
		}
		return true;
	}

	if($(window).width() > 1024){
		//$( ".website" ).css("opacity",1);
	}
	$("body").on("click","a", function(e){
		if(okForFade(e.currentTarget)){
			var link = $(e.currentTarget).attr("href");
			if($(e.currentTarget).attr("target") != "_blank"){
				if(link != "#"){
					repositionNav();
					e.preventDefault();
					if($(window).width() > 1024){
						$('body').addClass("fadeout");
					}
					setTimeout(startLink(link), 500);
				}
			}
		}
	})

	function repositionNav(){
		if(window.pageYOffset > 0){
			$('header.nav').css("position","absolute");
			if(window.pageYOffset > 72){
				var minus = window.pageYOffset-72;
				$('header.nav').css("top",minus);
			}
			$( "header.nav" ).animate({
				top: window.pageYOffset
			}, 500);
		}
	}

	$(".view-all-cities").click(function(event){
		$("section.section6 .overlay-for-events").fadeIn(200);
		$("section.section6 .view-all-cities").toggle(230);
		$("section.section6 .events").fadeIn();
		$("section.section6 .close-all-cities").toggle();
	})
	$(".close-all-cities").click(function(event){
		$("section.section6 .events").fadeOut(200);
		$("section.section6 .overlay-for-events").fadeOut(230);
		$("section.section6 .view-all-cities").toggle();
		$("section.section6 .close-all-cities").toggle();
	})

	$(document).on("click",".listing .item.moreinfo",function(event){
		event.preventDefault();
		var targetElement = $(event.currentTarget);
		loadProfile(event.currentTarget);
		openSideNavigationInfo();
	});

	$(document).on("click",".popright",function(event){
		event.preventDefault();
		$('.innerinfo').html("");
		$('.innerinfo').hide();
		$('.innerinfo').load($(event.target).attr("rel")+" .loadthis",function(){
			$('.innerinfo').show();
			history.pushState('', '', $(event.target).attr("rel"));
		});
		openSideNavigationInfo();
	});

	if($('.singlejob').length > 0){
		var contents = $('.loadthis').html();
		$('.website').hide();
		$('.website').load("/jobs .website",function(){
			$('.website .website').unwrap();
			$('.website').css("opacity","1");
			$('.website').show();
			$('.innerinfo').html(contents);
			$('.innerinfo').show();
			openSideNavigationInfo();
		});

	}

	$(document).on("click",".item.satellite",function(event){
		$(event.currentTarget).addClass("open");
	})

	$(document).on("click",".button.sidepopup",function(event){
		openSideNavigationInfo();
	})

	function loadProfile(targetElement){
		$('.innerinfo').html($(targetElement).html());
		$('.innerinfo .hidden').removeClass("hidden");
		$('.innerinfo p').removeAttr("style");
		if($('.innerinfo pre')){
			$('.innerinfo .fulldescription').html($('.innerinfo pre').html());
		}
		$('.innerinfo').prepend("<div class='closenav'></div>");
	}

	function fitvideo(){
		var videos = $('iframe');
		for (var i = videos.length - 1; i >= 0; i--) {
			$( "<div class='videocontainer videocontainer"+i+"'></div>" ).insertBefore(videos[i]);
			$(videos[i]).prependTo(".videocontainer"+i);
		};
		
		$(".videocontainer").fitVids();
	}

	fitvideo();



	/* When agenda table cell is hovered, highlight times on the first column. */
	$(".js-hover-time").hover(

		function(e) {


			// Get start time.
			var startTime = parseInt($(this).attr("data-start-time"));
			var endTime = parseInt($(this).attr("data-end-time"));

			// Get parent table.
			var table = $(this).parents(".table--agenda");

			// Hightlight numbers.
			for (var i = startTime; i <= endTime; i++)
			{
				var cell = table.find("td[data-time='"+i+"']");
				cell.addClass("time-highlight");
			}
		},
		function() {
			var table = $(this).parents(".table--agenda");
			table.find("td.column-1").removeClass("time-highlight");				
		}
	);
/*

	if($('section.divided').length > 0){
		var elements = $('section.divided');
		for (var i = elements.length - 1; i >= 0; i--) {
			if($(elements[i]).find(".columnright").height() > $(elements[i]).find(".columnleft").height()){
				alert($(elements[i]).find(".columnleft").height());
			} else {

			}
		};
	}

	*/
	//console.log("Navigation");
	//$(".horizontalnavigation a").append("<br />partners");
	

});

	// EXTERNAL SCRIPTSSSSSSSS
	// Google Analytics
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-24886654-1']);
	_gaq.push(['_trackPageview']);
	(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();

	// AdRoll
	adroll_adv_id = "7QMLBRZ6BZAVJKNAAA5E34";
	adroll_pix_id = "X7ULH5EQXZF7VICOB2Z2T7";
	(function () {
	var oldonload = window.onload;
	window.onload = function(){
	__adroll_loaded=true;
	var scr = document.createElement("script");
	var host = (("https:" == document.location.protocol) ? "https://s.adroll.com" : "http://a.adroll.com");
	scr.setAttribute('async', 'true');
	scr.type = "text/javascript";
	scr.src = host + "/j/roundtrip.js";
	((document.getElementsByTagName('head') || [null])[0] ||
	document.getElementsByTagName('script')[0].parentNode).appendChild(scr);
	if(oldonload){oldonload()}};
	}());

	// Fruitflan
	(function(){var ff=document.createElement('script');ff.type='text/javascript';ff.async=true;ff.src=('https:'==document.location.protocol?'https':'http')+'://lb.fruitflan.com/statjs/sst-254-602976515/stat.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(ff,s);})();


	// Smartly
	(function() {
	window.smartly = window.smartly || {q:[], m:['conversion','event','attr']};
	var f = function(m){smartly[m]=function(){smartly.q.push({m:m,a:arguments});};};for(i=0;i<smartly.m.length;i++){f(smartly.m[i]);};
	var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
	s.src = 'https://tag.smartly.io/52653adc3890fc3f5100a608.js';
	var h = document.getElementsByTagName('script')[0]; h.parentNode.insertBefore(s, h);
	})();
  	smartly.conversion('5397bf9958e7ab8c2e8b5ab8', '#CONVERSION_VALUE#', '#CURRENCY_CODE#');


	//webfont
	WebFontConfig = { fontdeck: { id: '39720' } };
	(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
	'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
	})();

	//facebook
	(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=79269551698";
	fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	if(screen.width < 560 && window.orientation == 0){
	viewport = document.querySelector("meta[name=viewport]");
	viewport.setAttribute('content', 'width=400');
	var elem = document.getElementById("sitckyfooter");
	elem.setAttribute("style","width: 400px;");
	}

