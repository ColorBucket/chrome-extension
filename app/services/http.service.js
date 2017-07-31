'use strict';
var apiUrl = 'http://localhost:3010/api';

var HttpService = function() {
	
	//private

	//public
	var Request = function(route, method, data) {
		var headers = null;
		
		if(localStorage.token)
			headers = {'authorization-token': localStorage.token};

		return axios({
			  method: method,
			  url: apiUrl + route,
			  data: data,
			  headers: headers
			})
			.then(function(response) {
				return response.data;
			});
	}

	var httpService = {
		Request: Request
	}
	return httpService;
};
