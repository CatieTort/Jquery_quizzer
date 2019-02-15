$(document).ready(function() {

    (function startQuiz(){
			this.settings = {
				results: []
			};

			this.loadQuiz = function (){
				$('.panel_one h1').show("drop", 500, function(){
					 $('.start_btn').addClass("started", 500);
				})

				$('.start_btn').on("click", function(){
					showPanel(1)
					listenNext()
				})
			}

			this.showPanel = function (position){
				var current = $('div[data-panel="'+ (position - 1)+'"]');

				//slide out current view
				//hide current container
				current.find('.wrapper').animate({left:"-=100px", opacity: 0}, 500, function(){
					current.addClass("hidden");
					//show the next one
					var next = $('div[data-panel="'+ position +'"]');
					next.removeClass("hidden");
					showNext(next)
					if(position === 5){
						displayAnswers(position)
					}
				})

				this.showNext = function(next){
					var wrapper = next.find('.wrapper');

					wrapper.fadeIn('500', function(){
						manageOptions(next)
					})
				}
			};

			this.manageOptions = function (next){
				var options = next.find('.options');
				var kids = options.find('div');
				var counter = 0;

				kids.each(function (i, el){
					$(el).delay(counter).fadeIn(300);
					counter += 500;
				});

				kids.on('click', function(){
					kids.removeClass('selected');
					next.addClass('valid');
					$(this).addClass('selected');
				})
			};


			this.listenNext = function (){
				$(".next_quest").on("click", function(){
					var next = $(this).data("next");

					if(validateSelection($(this))){
						showPanel(next);
						showProgressAndStore(next);
					}

				})
			}

			this.validateSelection = function($this){
				var parent = $this.parents().eq(1);

				if(parent.hasClass("valid")){
					return true
				}else{
					$(".error").fadeIn("300", function(){
						$(this).delay(1000).fadeOut("300");
					})
					return false
				}
			}

			this.showProgressAndStore = function(panel){
				$(".progress .bar").animate({"width": "+=25%"}, 500);

				var options = $('div[data-panel="'+ (panel - 1) +'"]').find(".options");
				options.find('div').each(function(i, el){
					if($(this).hasClass("selected")){
						settings.results.push($(this).text())
					}
				})
			}

			this.displayAnswers = function(panel){

				console.log("Panel:", panel, "answers:", settings.results)

					settings.results.map(function(i){
						$("ol").append("<li>"+ i +"</li>");
					})
			}

			loadQuiz();
		})()

});
