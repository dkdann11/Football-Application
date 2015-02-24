Club.IndexRoute = Ember.Route.extend({
	/*
		We get the data from data.json file and send it to setupCnotroller.
	*/
	model: function(param) {
		return new Ember.RSVP.Promise(function(resolve, reject) {
			Ember.$.getJSON('json/data.json').then(function(data) {
                resolve(data.data);
            });
    	});
	},
	/*
		In setupController() we generate unique array list of country and positions.
	*/
    setupController: function(controller, model) {
    	if(typeof model !== 'undefined') {
    		var modelLength = model.length,
		    	countryList = [],
		    	positionList = [],
		    	countryValue = [],
		    	positionValue = [],
		    	i, obj, country, position, countryObj, positionObj;
	    	for (i = 0; i < modelLength; i = i + 1) {
	    		obj = model[i],
	    		country = obj.nationality,
	    		position = obj.position,
	    		countryObj = {
	    			text: country
	    		};
	    		positionObj = {
	    			text: position
	    		};
	    		//To create unique array list we keep the check for countryList and positionList.
	    		if(!countryList.filterBy('text', country).length) {
	    			countryValue.push(country);
	    			countryList.push(countryObj);
	    		}
	    		if(!positionList.filterBy('text', position).length) {
	    			positionValue.push(position);
	    			positionList.push(positionObj);
	    		}
	    	}
    	} else {
    		alert('error in data');
    	}
    	controller.setProperties({
    		'data': model,
    		'selectedData': model,
    		'countryList': countryList,
    		'positionList': positionList,
    		'countryValue': countryValue,
    		'positionValue': positionValue
    	});
    }
});