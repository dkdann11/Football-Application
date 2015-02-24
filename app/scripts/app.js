//createpages will create page based on the number of pages required.
Ember.Handlebars.registerBoundHelper('createPages', function(value, selectedPage, options){
    var noOfPages = Number(value),
    	i, html = '';
	if(noOfPages) {
		html = html + '<div class="page_box prev_page"></div>';
	}
	for(i = 1; i <= noOfPages; i = i + 1) {
		if(selectedPage === i) {
			html = html + '<div class="page_box selected_box">' +  i + '</div>';
		} else {
			html = html + '<div class="page_box">' +  i + '</div>';
		}
	}
	if(noOfPages) {
		html = html + '<div class="page_box next_page"></div>';
	}
	return new Ember.Handlebars.SafeString(html);
});
//playerForm fills the boxes according to player form.
Ember.Handlebars.registerBoundHelper('playerForm', function(player, options){
    var form = player.form,
    	i, html = '';
	for(i = 1; i <= 10; i = i + 1) {
		if(i <= form) {
			html = html + '<div class="form_box filled_box"></div>';
		} else {
			html = html + '<div class="form_box"></div>';
		}
	}
	return new Ember.Handlebars.SafeString(html);
});
var Club = window.Club = Ember.Application.create();
Club.setProperties({
	defaultCountry: 'All Countries',
	defaultPosition: 'All Positions'
});
/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/components/*');
require('scripts/views/*');
require('scripts/router');
