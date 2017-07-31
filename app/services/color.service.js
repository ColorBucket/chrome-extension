'use strict';

var ColorService = function() {
	//private
	var _httpService = new HttpService();

	//public
	var Save = function(vm) {

		return _httpService.Request('/colors', 'post', vm);
	}

	var colorService = {
		save: Save
	}
	return colorService;
};
