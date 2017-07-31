'use strict';

var appState = {
	logged: false
};

function RefreshState() {
	document.getElementById("logout_action").style["display"] = !appState.logged ? "none" : "inherit";
	document.getElementById("login").style["display"] = appState.logged ? "none" : "inherit";
	document.getElementById("add-color").style["display"] = !appState.logged ? "none" : "inherit";
}

function DoLogin() {
	var _authService = new AuthService();

	_authService.login({
		email: document.getElementById('email').value,
		password: document.getElementById('password').value
	}).then(function(response) {
		if(!response.success)
			document.getElementById('message-alert').innerHTML = response.message;

		localStorage.token = response.data.token;
		localStorage.user = JSON.stringify(response.data.user);
		appState.logged = true;
		RefreshState();
	})
	.catch(function(response) {
		document.getElementById('message-alert').innerHTML = "Invalid credentials";
	});
}

function DoLogout() {
	localStorage.clear();
	appState.logged = false;
	RefreshState();
}

function AddColor() {
	var _colorService = new ColorService();
	var vm = {
		hex: document.getElementById('color-hex').value.replace('#', ''),
		user: JSON.parse(localStorage.user)._id
	}

	if(document.getElementById('color-name').value)
		vm.name = document.getElementById('color-name').value;

	if(!vm.hex || !vm.user)
		return false;

	_colorService.save(vm)
		.then(function(response) {
			if(!response.success)
				return document.getElementById('message-alert').innerHTML = response.message;

			return document.getElementById('message-alert').innerHTML = 'Color saved to your bucket!';
		});
}

function PickerChange() {
	document.getElementById('color-hex').value = document.getElementById('hexPicker').value;
}

function HexInputChange() {
	var hexInput = document.getElementById('color-hex');

	if(hexInput.value.length > 0 && hexInput.value.indexOf('#') < 0)
		hexInput.value = '#' + hexInput.value;

	if(hexInput.value.length > 7)
		hexInput.value = hexInput.value.substr(0, 7);

	if(hexInput.value.length == 7)
		document.getElementById('hexPicker').value = hexInput.value;
}

// Bind Events
document.addEventListener('DOMContentLoaded', function() {
	appState.logged = localStorage.token != undefined;
	RefreshState();

  var loginButton = document.getElementById('login_action');
  loginButton.addEventListener('click', DoLogin);

  var logoutButton = document.getElementById('logout_action');
  logoutButton.addEventListener('click', DoLogout);

	var saveButton = document.getElementById('save_action');
  saveButton.addEventListener('click', AddColor);

	var hexPicker = document.getElementById('hexPicker');
  hexPicker.addEventListener('change', PickerChange);

  var colorhexInput = document.getElementById('color-hex');
  colorhexInput.addEventListener('keyup', HexInputChange);
}, false);