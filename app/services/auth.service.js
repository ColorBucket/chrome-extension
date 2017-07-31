'use strict';

var AuthService = function() {
	//private
	var _httpService = new HttpService();

	//public
	var Login = function(vm) {

		return _httpService.Request('/login', 'post', vm);
	}

	var authService = {
		login: Login
	}
	return authService;
};
