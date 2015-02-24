Club.IndexController = Ember.Controller.extend({
	highValue: 40,
	lowValue: 20,
	selectedPage: 1,
	pageSize: 4,
	filterData: function(selectedData, list, key) {
		var array = [],
			listLength = list.length,
			i;
		if(listLength) {
			for(i = 0; i < listLength; i =  i + 1) {
				array = array.concat(selectedData.filterBy(key, list[i]));
			}
		}
		return array;
	},
	/*
		setpageNumber() will be called once selectedData is set.
		In this function we check the length of the selectedData and set no. of pages.
		Each page will contain 4 data items.
	*/
	setPageNumber: function() {
		var selectedData = this.get('selectedData'),
			pageSize = this.get('pageSize'),
			selectedDataLength = selectedData.length,
			noOfPages;
		if(selectedDataLength % pageSize) {
			noOfPages = Math.floor(selectedDataLength / pageSize) + 1;
		} else {
			noOfPages = Math.floor(selectedDataLength / pageSize);
		}
		this.setProperties({
			'noOfPages': noOfPages,
			'selectedPage': 1
		});
		this.setSelectedPageData();
	}.observes('selectedData'),
	/*
		setSelectedData() function observes change in coutry, position, and age values.
		We set the selectedData based on the filter values.
		Starting from the complete data, we filter the data using country, position and age values. 
	*/
	setSelectedData: function() {
		var data = this.get('data'),
			selectedData = data,
			dataArray = [],
			ageData = [],
			i, selectedObj, age, selectedDataLength;
		//if position or country has default(Select All) then we dont filter the data.
		selectedData = this.filterData(selectedData, this.get('countryValue'), 'nationality');
		selectedData = this.filterData(selectedData, this.get('positionValue'), 'position');
		selectedDataLength = selectedData.length;
		//we check the age for remaining data then pass it to selectedData only if age lies between the range. 
		for(i = 0; i < selectedDataLength; i = i + 1) {
			selectedObj = selectedData[i];
			age = selectedObj.age;
			if(age >= this.get('lowValue') && age <= this.get('highValue')) {
				ageData.push(selectedObj);
			}
		}
		selectedData = ageData;
		this.set('selectedData', selectedData);
	}.observes('countryValue', 'positionValue', 'lowValue', 'highValue'),
	/*
		setSelectedPageData() will be called on change of selectedPage.
		Based on the selectedPage and selectedData, we create selectedPageData.
	*/
	setSelectedPageData: function() {
		var selectedData = this.get('selectedData'),
			selectedDataLength = selectedData.length,
			pageSize = this.get('pageSize'),
			startIndex = pageSize * (this.get('selectedPage') - 1),
			endIndex = Math.min(selectedDataLength, (startIndex + pageSize)),
			selectedPageData = [];
		for(i = startIndex; i < endIndex; i = i + 1) {
			selectedPageData.push(selectedData[i]);
		}
		this.setProperties({
			'startIndex': Math.min(startIndex + 1, endIndex),
			'endIndex': endIndex,
			'selectedDataLength': selectedDataLength,
			'selectedPageData': selectedPageData
		});
	}.observes('selectedPage')
});