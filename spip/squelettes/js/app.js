requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'squelettes/js',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        jquery: 'jquery.3.2.1.min',
        cookie: 'js.cookie'
    }
});
require(['domReady'], function (domReady) {
	domReady(function () {
		require(['jquery','cookie'], function ($, cookie) {
			var decal;
			$(".paragraphe").css("display","none");
			if(cookie.get('menuouvert')=='oui'){
				if($( document ).width() > 800) {
					var offsets = $('#main').offset();
					var left = offsets.left;
					decal = 0;
					if(left <= 300) {
						decal = 300 - left ;
						$("#main").css("left",decal);
					}
					$('#menu_ferme').show();
					$("#nav-collapse").css("left","0");
				}
			}else {
				$('#menu_ferme').hide();
				$("#nav-collapse").css("left","-280px");
			}
			$('#nav-toggle').click(function(e) {
				e.preventDefault();
				cookie.set('menuouvert', 'oui');
				console.log(cookie.get('menuouvert'));
				$("#nav-collapse").css("left","0px");
				var offsets = $('#main').offset();
				var left = offsets.left;
				decal = 0;
				if(left <= 300) {
					decal = 300 - left ;
					$("#main, .logoMDPH").css("left",decal);
				}
				$('#menu_ferme').show(250);
				findInsiders($('#menu_ferme'));
			});
			$('#fermer_menu').click(function(e) {
				e.preventDefault();
				cookie.set('menuouvert', 'non');
				console.log(cookie.get('menuouvert'));
				$("#nav-collapse").css("left","-280px");
				$("#main").css("left",0);
				
				$('#menu_ferme').hide(250);
				findInsiders($('#menu_ferme'));
			});
			$("h2 button").click(function(e) {
				$(this).toggleClass( "active" ).parent().next('div').slideToggle(300);
				if ($(this).hasClass("active")) {
					$(this).css("background-image","url(squelettes/images/fhaut.png)");				
					$(this).attr('aria-expanded','true');
				}
				else {
					$(this).css("background-image","url(squelettes/images/fbas.png)");
					$(this).attr('aria-expanded','false');
				}
				$(".pliage button.btn-collapse-up").show();
			});
			$(".pliage button.btn-collapse-down").click(function(e) { 
				$('.paragraphe').slideDown(300);
				$('.titrepara').css("background-image","url(squelettes/images/fhaut.png)");
				$('.titrepara').attr('aria-expanded','true');
				$('.titrepara').addClass( "active" );
				$(".pliage button.btn-collapse-up").show();
				$(this).hide();
			});
			$(".pliage button.btn-collapse-up").click(function(e) {
				$('.paragraphe').slideUp(300);
				$('.titrepara').css("background-image","url(squelettes/images/fbas.png)");
				$('.titrepara').attr('aria-expanded','false');
				$('.titrepara').removeClass( "active" );
				$(".pliage button.btn-collapse-down").show();
				$(this).hide();	
			});
			/* chatbot 
			var MY_WIT_TOKEN = "HLHDZURUOOM3ONQ6HLH2ULI3K7HXTJVB";
			$("#question_chat").submit(function( event ) {
				event.preventDefault();
				$("#reponse_chat").html("en cours");
				$.ajax({
					url: 'https://api.wit.ai/message',
					data: {
						'q': $("#question").val(),
						'access_token': 'HLHDZURUOOM3ONQ6HLH2ULI3K7HXTJVB'
					},
					dataType: 'json',
					method: 'GET',
					success: function (response) {
						alert(reponse);
						console.log("response", response);
						$("reponse_chat").html(reponse);
					}
				});
			});
			*/
			//focustrap
			var findInsiders = function(elem) {
				var tabbable = elem.find('select, input, textarea, button, a').filter(':visible');
			    var firstTabbable = tabbable.first();
			    var lastTabbable = tabbable.last();
			    /*set focus on first input*/
			    firstTabbable.focus();
				/*redirect last tab to first input*/
			    lastTabbable.on('keydown', function (e) {
			       if ((e.which === 9 && !e.shiftKey)) {
			           e.preventDefault();
			           firstTabbable.focus();
			       }
			    });
				/*redirect first shift+tab to last input*/
			    firstTabbable.on('keydown', function (e) {
			        if ((e.which === 9 && e.shiftKey)) {
			            e.preventDefault();
			            lastTabbable.focus();
			        }
			    });
			    /* allow escape key to close insiders div */
			    elem.on('keyup', function(e){
			      if (e.keyCode === 27 ) {
			        elem.hide();
			      };
			    });
			};
		});
	});
});