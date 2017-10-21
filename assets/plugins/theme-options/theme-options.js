/*
 *
 *		THEME-OPTIONS.JS
 *
 */

$(document).ready(function() {
    
	var theme_options_content = ' \
		<h4>Change Theme Options</h4> \
		<a href="#"></a> \
		<br> \
		<h5>Change Color</h5> \
		<div class="colors clearfix"> \
			<a id="default" href="#" data-style="default"></a> \
			<a id="purple" href="#" data-style="purple"></a> \
			<a id="green" href="#" data-style="green"></a> \
		</div><!-- colors --> \
		<h5>Change Layout</h5> \
		<div class="layout clearfix"> \
			<a class="wide" href="#" data-style="wide"><img src="assets/plugins/theme-options/images/wide.png" alt="">Wide</a> \
			<a class="boxed" href="#" data-style="boxed"><img src="assets/plugins/theme-options/images/boxed.png" alt="">Boxed</a> \
		</div><!-- layout --> \
		<div class="boxed-bg"> \
			<h5>Change Bg Color</h5> \
			<div class="patterns clearfix"> \
				<a class="bg-pattern-6" href="#" data-style="bg-pattern-6"></a> \
				<a class="bg-pattern-7" href="#" data-style="bg-pattern-7"></a> \
				<a class="bg-pattern-8" href="#" data-style="bg-pattern-8"></a> \
				<a class="bg-pattern-9" href="#" data-style="bg-pattern-9"></a> \
				<a class="bg-pattern-10" href="#" data-style="bg-pattern-10"></a> \
			</div><!-- pattern --> \
			<h5>Change Bg Pattern</h5> \
			<div class="patterns clearfix"> \
				<a class="bg-pattern-1" href="#" data-style="bg-pattern-1"></a> \
				<a class="bg-pattern-2" href="#" data-style="bg-pattern-2"></a> \
				<a class="bg-pattern-3" href="#" data-style="bg-pattern-3"></a> \
				<a class="bg-pattern-4" href="#" data-style="bg-pattern-4"></a> \
				<a class="bg-pattern-5" href="#" data-style="bg-pattern-5"></a> \
			</div><!-- pattern --> \
		</div><!-- boxed-bg --> \
	\ ';
	
	$("#theme-options").prepend(theme_options_content);
	
	$("#theme-options > a").on("click", function(e) {
        
		e.preventDefault();
		$("#theme-options").toggleClass("open");
		
    });
	
	
	var link = $('link[data-style="styles"]');
	var berlin_colors = $.cookie('berlin_colors'),
		berlin_layout = $.cookie('berlin_layout'),		
		berlin_bg_pattern = $.cookie('berlin_bg_pattern');
		
	if ($.cookie('berlin_layout') == "wide" ){
		$(".boxed-bg").hide();
	} else {
		$(".boxed-bg").show();		
	}
		
	if (!($.cookie('berlin_colors'))) {
		
		$.cookie('berlin_colors', 'default', 365);
		berlin_colors = $.cookie('berlin_colors');
		$('#theme-options .colors a[data-style="'+berlin_colors+'"]');
		
	} else {
		
		link.attr('href','assets/css/alternative-styles/' + berlin_colors + '.css');
		$("#logo img").attr('src','assets/images/logo-' + berlin_colors + '.png');
		$('#theme-options .colors a[data-style="'+berlin_colors+'"]');
		
	};

	if (!($.cookie('berlin_layout'))) {
		
		$.cookie('berlin_layout', 'wide', 365);
		berlin_layout = $.cookie('berlin_layout');
		$("body").addClass(berlin_layout);
		$('#theme-options .layout a[data-style="wide"]');
		
	} else {
		
		if (berlin_layout=="boxed") {
			
			$("body").addClass(berlin_layout);
			$("body").removeClass("wide");
			
		} else { 
		
			$("body").addClass(berlin_layout);
			$("body").removeClass("boxed bg-pattern-1 bg-pattern-2 bg-pattern-3 bg-pattern-4 bg-pattern-5 bg-pattern-6 bg-pattern-7 bg-pattern-8 bg-pattern-9 bg-pattern-10 bg-pattern-11 bg-pattern-12");
			
		};
		
	};

	if ((berlin_layout =="boxed") && $.cookie('berlin_bg_pattern')) {
		
		$("body").removeClass("bg-pattern-1 bg-pattern-2 bg-pattern-3 bg-pattern-4 bg-pattern-5 bg-pattern-6 bg-pattern-7 bg-pattern-8 bg-pattern-9 bg-pattern-10 bg-pattern-11 bg-pattern-12 wide");
		$("body").addClass(berlin_bg_pattern); 
		
	} else { 
	
		if (berlin_layout =="boxed") {
			
			$("body").removeClass("bg-pattern-1 bg-pattern-2 bg-pattern-3 bg-pattern-4 bg-pattern-5 bg-pattern-6 bg-pattern-7 bg-pattern-8 bg-pattern-9 bg-pattern-10 bg-pattern-11 bg-pattern-12");
			
		} else {
			
			$("body").removeClass("bg-pattern-1 bg-pattern-2 bg-pattern-3 bg-pattern-4 bg-pattern-5 bg-pattern-6 bg-pattern-7 bg-pattern-8 bg-pattern-9 bg-pattern-10 bg-pattern-11 bg-pattern-12 boxed");
			
		}
		
	};


	// CHANGE COLOR //
	$('#theme-options .colors a').on('click',function(e) {
		
		var $this = $(this),
			berlin_colors = $this.data('style');
			
		e.preventDefault();
		
		link.attr('href', 'assets/css/alternative-styles/' + berlin_colors + '.css');
		$("#logo img").attr('src', 'assets/images/logo-' + berlin_colors + '.png');
		$.cookie('berlin_colors', berlin_colors, 365);
				
	});

	// BOXED LAYOUT //
	$('#theme-options .layout a.boxed').on('click',function(e) {
		
		e.preventDefault(); 
		
		$("body").addClass("boxed");
		$("body").removeClass("wide");
		$.cookie('berlin_layout', 'boxed', 365);
		
		if ($.cookie('berlin_bg_pattern')) {
			
			var berlin_bg_pattern = $.cookie('berlin_bg_pattern');
			
			$("body").removeClass("bg-pattern-1 bg-pattern-2 bg-pattern-3 bg-pattern-4 bg-pattern-5 bg-pattern-6 bg-pattern-7 bg-pattern-8 bg-pattern-9 bg-pattern-10 bg-pattern-11 bg-pattern-12");
			$("body").addClass(berlin_bg_pattern);
			
		}
		
		document.location.reload();
		
	});

	// WIDE LAYOUT
	$('#theme-options .layout a.wide').on('click',function(e) {
		
		e.preventDefault(); 
		
		$("body").addClass("wide");
		$("body").removeClass("boxed bg-pattern-1 bg-pattern-2 bg-pattern-3 bg-pattern-4 bg-pattern-5 bg-pattern-6 bg-pattern-7 bg-pattern-8 bg-pattern-9 bg-pattern-10 bg-pattern-11 bg-pattern-12");
		$.cookie('berlin_layout', 'wide', 365);
		
		document.location.reload();
		
	});
	
	// CHANGE PATTERNS //
	$('#theme-options .patterns a').on('click',function(e) {
		
		var $this = $(this),
			berlin_bg_pattern = $this.data('style');
			
		e.preventDefault();
			 
		$("body").removeClass("bg-pattern-1 bg-pattern-2 bg-pattern-3 bg-pattern-4 bg-pattern-5 bg-pattern-6 bg-pattern-7 bg-pattern-8 bg-pattern-9 bg-pattern-10 bg-pattern-11 bg-pattern-12 wide");
		$("body").addClass(berlin_bg_pattern);
		$("#theme-options select").val("boxed");
		$.cookie('berlin_bg_pattern', berlin_bg_pattern, 365);
		
	});

});    	