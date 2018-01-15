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
      $(".nav_rub_second").css("display","none");
      $("h2 button.titrepara").attr('aria-expanded','false');
			if(cookie.get('menuouvert')=='oui'){
        $(':not(#menu_ferme)').find('select, input, textarea, button, a').attr('aria-hidden','true');
        $('#menu_ferme').find('select, input, textarea, button, a').attr('aria-hidden','false');
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
			} else {
				$('#menu_ferme').hide();
				$("#nav-collapse").css("left","-18.6em");
			}
			$('#nav-toggle').click(function(e) {
				e.preventDefault();
				cookie.set('menuouvert', 'oui');
				console.log(cookie.get('menuouvert'));
				$("#nav-collapse").css("left","0");
				var offsets = $('#main').offset();
				var left = offsets.left;
				decal = 0;
				if(left <= 300) {
					decal = 300 - left ;
					$("#main, .logoMDPH").css("left",decal);
				}
        $('#menu_ferme').show(250);
        $(':not(#menu_ferme)').find('select, input, textarea, button, a').attr('aria-hidden','true');
        $('#menu_ferme').find('select, input, textarea, button, a').attr('aria-hidden','false');
				findInsiders($('#menu_ferme'));
			});
			$('#fermer_menu').click(function(e) {
				e.preventDefault();
				cookie.set('menuouvert', 'non');
				console.log(cookie.get('menuouvert'));
				$("#nav-collapse").css("left","-280px");
				$("#main").css("left",0);
				$('#menu_ferme').hide(250);
        $(':not(#menu_ferme)').find('select, input, textarea, button, a').attr('aria-hidden','false');
        $('#menu_ferme').find('select, input, textarea, button, a').attr('aria-hidden','true');
				findInsiders($('#menu_ferme'));
			});
			$("#main article h2 button").click(function(e) {
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
      $("button.titrerub").click(function(e) {
				$(this).toggleClass( "active" ).next('ul').slideToggle(300);
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
      // on récupère l'ancre
      if (window.location.hash) {
        var ancre=$("h2 button"+window.location.hash);
        ancre.addClass( "active" ).parent().next('div').slideToggle(300);
        ancre.css("background-image","url(squelettes/images/fhaut.png)");
        ancre.attr('aria-expanded','true');
        $(".pliage button.btn-collapse-up").show();
      }
      //Valider les messages par la touche entrée
      $('#message').on('keydown', function(e) {
        if(e.which == 13 && !e.shiftKey) { // KeyCode de la touche entrée
          e.preventDefault();
          $('#form_question').submit();
        }
      });
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
      //fixer fil d'ariane
      var ariane = $("#minifil");
      function scrolled(){
	         var windowHeight = document.body.clientHeight,
		       currentScroll = document.body.scrollTop || document.documentElement.scrollTop;
	         ariane.className = (currentScroll >= windowHeight - ariane.offsetHeight) ? "fixed" : "";
           //console.log(windowHeight+" "+currentScroll+" "+ariane.className+" "+ariane.offsetHeight);
      }
      addEventListener("scroll", scrolled, false);

      //sondage formulaire avis formulaire_avis_utilisateur
      // On ajoute la classe "js" à la liste pour mettre en place par la suite du code CSS uniquement dans le cas où le Javascript est activé
	     $(".avis").addClass("js");
      // On passe chaque note à l'état grisé par défaut
      	$(".avis div.choix").addClass("note-off");
      	// Au survol de chaque note à la souris
      	$(".avis div.choix").mouseover(function() {
      		// On passe les notes supérieures à l'état inactif (par défaut)
      		$(this).nextAll("div").addClass("note-off");
      		// On passe les notes inférieures à l'état actif
      		$(this).prevAll("div").removeClass("note-off");
      		// On passe la note survolée à l'état actif (par défaut)
      		$(this).removeClass("note-off");
      	});
      	// Lorsque l'on sort du sytème de notation à la souris
      	$(".avis").mouseout(function() {
      		// On passe toutes les notes à l'état inactif
      		$(this).children("div").addClass("note-off");
      		// On simule (trigger) un mouseover sur la note cochée s'il y a lieu
      		$(this).find("div input:checked").parent("div").trigger("mouseover");
      	});
        // au clavier
        $(".avis input")
        	// Lorsque le focus est sur un bouton radio
        	.focus(function() {
        		// On passe les notes supérieures à l'état inactif (par défaut)
        		$(this).parent("div").nextAll("div").addClass("note-off");
        		// On passe les notes inférieures à l'état actif
        		$(this).parent("div").prevAll("div").removeClass("note-off");
        		// On passe la note du focus à l'état actif (par défaut)
        		$(this).parent("div").removeClass("note-off");
        	})
        	// Lorsque l'on sort du sytème de notation au clavier
        	.blur(function() {
        		// Si il n'y a pas de case cochée
        		if($(this).parents(".avis").find("div input:checked").length == 0) {
        			// On passe toutes les notes à l'état inactif
        			$(this).parents(".avis").find("div").addClass("note-off");
        		}
        	});
          $(".avis input")
          	// Lorsque le focus est sur un bouton radio
          	.focus(function() {
          		// On supprime les classes de focus
          		$(this).parents(".avis").find("div").removeClass("note-focus");
          		// On applique la classe de focus sur l'item tabulé
          		$(this).parent("div").addClass("note-focus");
          		// [...] cf. code précédent
          	})
          	// Lorsque l'on sort du sytème de notation au clavier
          	.blur(function() {
          		// On supprime les classes de focus
          		$(this).parents(".avis").find("div").removeClass("note-focus");
          		// [...] cf. code précédent
          	})
          	// Lorsque la note est cochée
          	.click(function() {
          		// On supprime les classes de note cochée
          		$(this).parents(".avis").find("div").removeClass("note-checked");
          		// On applique la classe de note cochée sur l'item choisi
          		$(this).parent("div").addClass("note-checked");
          	});
            // On simule un survol souris des boutons cochés par défaut
            $(".avis input:checked").parent("div").trigger("mouseover");
            // On simule un click souris des boutons cochés
            $(".avis input:checked").trigger("click");
            $("#sondage_form h2 button").attr('aria-expanded','false');
            $("#sondage_form h2 button").removeClass("active");
            $("#sondage_form > div").hide();
            $("#sondage_form h2 button").click(function(e) {
              $(this).toggleClass( "active" ).parent().next('div').slideToggle(300);
              if ($(this).hasClass("active")) {
                $(this).css("background-image","url(squelettes/images/fhaut.png)");
                $(this).attr('aria-expanded','true');
              }
              else {
                $(this).css("background-image","url(squelettes/images/fbas.png)");
                $(this).attr('aria-expanded','false');
              }
            });
		});
	});
});
