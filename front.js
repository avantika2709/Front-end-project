 portfolio__filter = function(btnSelector,itemsSelector,container,inR) {
 	this.btn = $(btnSelector);
 	this.item = $(itemsSelector);
 	this.container = $(container);
 	this.open__filter__bool = true;
 	var boolFilter = true;
 	if($(window).width() > 768){
	 	var marginItem =  (parseInt($('.company__sldier__list').width()) - (parseInt(this.item.eq(0).css('width')) * 3))/2;
	 	if(marginItem < 0){
	 		marginItem = 30;
	 	}
 	}
 	else{
 		boolFilter = false;
 		var marginItem = 40;
 	}

 	this.init = function(){
 		var self = this;
 		var myFilter = localStorage.getItem('filterItem');
 		if(myFilter != "null" && myFilter != null){
	 		localStorage.setItem('filterItem',null);
 			setTimeout(function(){
	 			self.filterBy(myFilter);
	 			$('.active__filter').removeClass('active__filter');
	 			$('.all__team__filter__link').each(function(){
	 				if($(this).attr('data-id') == myFilter){
	 					$(this).parent().addClass('active__filter');
	 				}
	 			})
	 			myFilter = null;
 			},50);
 		}
 		this.filterClick();
 		if($(window).width() < 767){
 			if($('.company__main').length != 0){
		 		this.open__filter__event();
		 		this.close__filter__event();
		 		this.arrow__open();
	 		}
 		}
 	}


 	this.open__filter = function(counter){
 		var self = this;
 		console.log('close');
 		$('.all__team__filter__item').eq(counter).fadeIn();
 		if(counter == $('.all__team__filter__item').length){
 			self.open__filter__bool = false;
 			return 0;
 		}
 		setTimeout(function(){
 			counter++;
 			self.open__filter(counter);
 		},50);
 	}

 	this.open__filter__event = function(){
 		var self  = this;
 		$('.all__team__filter__item').click(function(){
 			if($(this).hasClass('active__filter')){
 			$(this).find('.all__team__filter__item').css('display','inline-block');
	 			if(self.open__filter__bool){
	 				self.open__filter(0);
	 				$('.all__team__filter__list').addClass('open__fitler');
	 			}
 			}
 		});
 	}

 	this.arrow__open = function(){
 		var self = this;
 		$('.all__team__filter__list').click(function(){
				self.open__filter(0);
	 			$('.all__team__filter__list').addClass('open__fitler');
 		});
 	}


 	this.close__filter = function(counter){
 		var self = this;
 		console.log(counter);
 		if(!$('.all__team__filter__item').eq(counter).hasClass('active__filter'))
 			$('.all__team__filter__item').eq(counter).fadeOut();
 		if(counter == -1){
 			self.open__filter__bool = true;
 			return 0;
 		}
 		setTimeout(function(){
 			counter--;
 			self.close__filter(counter);
 		},50);	
 	}

 	this.close__filter__event = function(){
 		var self = this;
 		$('.all__team__filter__item').click(function(){
 			if(!self.open__filter__bool){
 				self.close__filter($('.all__team__filter__item').length - 1);
 				$('.all__team__filter__list').removeClass('open__fitler');
 			}
 		});
 	}

 	this.filterClick = function(){
 		var self = this;
 		self.btn.click(function(e){

 			e.preventDefault();
 			$('.active__filter').removeClass('active__filter');
 			$(this).parent().addClass('active__filter');
 			var filterItem = $(this).attr('data-id');
 			self.filterBy(filterItem);
 		})
 	}

 	this.itemsFilterReset  = function(items){
 		var self = this;
 		$(items).each(function(){
 			$(this).attr('style',$(this).attr('data-position'));
 		})
 	}

 	this.setHieghtContainer = function(container){
 		var self = this;
 		var itemHeight = self.item.css('height');
 		var row = $('.show__items').length;
 		if($(window).width() > 767){
 			row = Math.ceil($('.show__items').length/inR);
 		}
		if(row == 0){
			row = 1;
		}

 		if(boolFilter){
			marginItem =  (parseInt(self.container.width()) - (parseInt(this.item.eq(0).css('width')) * 3))/2;
			boolFilter = false;
		}

 		var newHeight = row*(parseInt(itemHeight) + marginItem);
 		console.log(marginItem,'newHeight');
 		container.css('height',newHeight)
 	}

 	this.filterBy = function(filterBy){
 		var self  = this;
 		var counter = 0;
 		$('.hide__items').removeClass('hide__items');
 		$('.show__items').removeClass('show__items');
 		$('.company__slider__item').addClass('company__slider__item__show');
 		$('.all__team__members__item').addClass('all__team__members__img__container__animate__bg');
 		self.itemsFilterReset(self.item);
 		if(filterBy == -1){
 			// $('.all__team__members__item').show();
 			
 			grid.init();
 			grid1.init();
 			return 0;
 		}
 		self.item.each(function(){
 			var itemId = $(this).attr('data-id').split(' ');
 			if(itemId.indexOf(filterBy) != -1){
 				var itemStyle = self.item.eq(counter).attr('data-position');
 				var myPosition = $(this).attr('style');
 				$(this).attr('style',itemStyle);
 				$(this).addClass('show__items');
 				counter++;
 			}
 			else{
 				$(this).addClass('hide__items');
 			}
 		});
 		$('.hide__items').hide();
 		self.setHieghtContainer(self.container);
 	}


 	this.init();
 }

var PortFilter = false;

 $(document).ready(function(){


 })
