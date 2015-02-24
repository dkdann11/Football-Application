Club.IndexView = Ember.View.extend({
	templateName: 'index',
	classNames: ['container'],
	didInsertElement: function() {
		if (!this.$() || this.state === 'preRender' || this.state === 'destroyed') {
            return;
        }
		var obj = this.get('controller').getProperties('countryList', 'positionList');
		this.initializeDropDown('.country_list', obj.countryList, Club.get('defaultCountry'));
		this.initializeDropDown('.position_list', obj.positionList, Club.get('defaultPosition'));
		this.initializeSlider('.age_slider', 20, 40);
		this.resizeHandler();
		//$(window).bind('resize', $.proxy(this.resizeHandler, this));
	},
	click: function(event) {
		var elem = $(event.target),
			controller = this.get('controller'),
			selectedPage = controller.get('selectedPage'),
			noOfPages = this.get('controller.noOfPages');
		//on click of pages/next/prev we set selectedpage property of controller. 
		if(elem.hasClass('page_box')) {
			if(elem.hasClass('prev_page')) {
				if(selectedPage > 1) {
					selectedPage = selectedPage - 1;
				}
			} else if(elem.hasClass('next_page')) {
				if(selectedPage < noOfPages) {
					selectedPage = selectedPage + 1;
				}
			} else {
				selectedPage = Number(elem.text());
			}
			controller.set('selectedPage', selectedPage);
		}
	},
	willDestroyElement: function() {
		//$(window).unbind('resize');
	},
	/*
		DropdownSelect will called when user changes country or position dropdown value.
		In this function we set country/position values of the controller.
	*/
	dropdownSelect: function(div) {
		var controller = this.get('controller'),
			elem = this.$(div).eq(0),
			value = elem.multipleSelect('getSelects');
		if(elem.hasClass('country_list')) {
			controller.set('countryValue', value);
		} else if(elem.hasClass('position_list')) {
			controller.set('positionValue', value);
		}
	},
	/*
		In intializeDropDown() we initialize dropdown using a library.
		We pass the div and data for dropdown creation.
	*/
	initializeDropDown: function(div, data, selectAllText) {
		this.$(div).multipleSelect({
			selectAll: true,
			selectAllText: selectAllText,
			width: 170,
			height: 40,
			onClick: $.proxy(this.dropdownSelect, this, div),
			onCheckAll: $.proxy(this.dropdownSelect, this, div),
			onUncheckAll: $.proxy(this.dropdownSelect, this, div)
		});
	},
	/*
		In initializeSlider() we create an age slider usign jqueryUI slider.
	*/
	initializeSlider: function(div) {
		var obj = this.get('controller').getProperties('lowValue', 'highValue'),
			minValue = obj.lowValue,
			maxValue = obj.highValue;
		this.$(div).slider({
			range: true,
			min: minValue,
			max: maxValue,
			values: [minValue, maxValue],
			slide: $.proxy(this.onSlide, this)
		});
	},
	/*
		onSlide() function will be caaled whenever user changes age slider values.
		In this function we get the low and high values of a slider and set controller properties.
	*/
	onSlide: function(event, ui) {
		var values = ui.values,
			lowValue = values[0],
			highValue = values[1];
		this.get('controller').setProperties({
			'lowValue': lowValue,
			'highValue': highValue
		});
	},
	/*
		resizeHandler() detects the size of the available space for plyer bio.
		According to available space we set number of players per page.
	*/
	resizeHandler: function() {
		var contentHeight = this.$('.content').height(),
			boxHeight = this.$('.info_box').height(),
			pageSize = Math.floor(contentHeight/(boxHeight + 15)),
			controller = this.get('controller');
		if(controller.get('pageSize') !== pageSize) {
			controller.set('pageSize', pageSize);
			controller.setPageNumber();
		}
	}
});