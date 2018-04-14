"use strict";

$(function () {
	$("#birthdate").fillDateSelect();
	$("#birthdate").selectDefaultDate();
})

$.fn.extend({
	fillDateSelect: function() {
		$(this).each(function () {
			$(this).find("select").each(function () {
				var select = $(this);
				if(/day/.test(select.prop("name")))
					select.fillDaysSelect();
				if(/month/.test(select.prop("name")))
					select.fillMonthSelect();
				if(/year/.test(select.prop("name")))
					select.fillYearSelect();
			})
		})
	},
	fillDaysSelect: function () {
		var select = $(this);
		var option;
		for(var i = 0; i < 31; i++) {
			option = $("<option>");
			option.prop("value", i + 1);
			option.text(i + 1);
			select.append(option);
		}
	},
	fillMonthSelect: function () {
		var select = $(this);
		var months = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
		var option;
		for(var i = 0; i < 12; i++) {
			option = $("<option>");
			option.prop("value", i + 1);
			option.text(months[i]);
			select.append(option);
		}
	},
	fillYearSelect: function () {
		var select = $(this);
		var option; 
		var thisYear = new Date().getFullYear();
		for(var i = 1970; i <= thisYear; i++) {
			option = $("<option>");
			option.prop("value", i);
			option.text(i);
			select.append(option);
		}
	},
	selectDefaultDate: function () {
		var birthdateDiv = $(this);
		var defaultDate = birthdateDiv.data("default-date");
		if(!defaultDate)
			return;
		var selects = birthdateDiv.find("select");
		var daySelect = selects.eq(0);
		var monthSelect = selects.eq(1);
		var yearSelect = selects.eq(2);
		
		defaultDate = defaultDate.split(".");
		var day = parseInt(defaultDate[0]);
		var month = parseInt(defaultDate[1]);
		var year = parseInt(defaultDate[2]);
		
		daySelect.val(day);
		monthSelect.val(month);
		yearSelect.val(year);
	}
});

function setCookie(key, value, expires, path, domain, maxAge) {
	var cookieString = key + "=" + value;
	if(expires) {
		var date = new Date();
		date.setTime(date.getTime() + expires * 1000);
		expires = date.toUTCString();		
		cookieString += ";expires=" + expires;
	}
	if(path)
		cookieString += ";path=" + path;
	if(domain)
		cookieString += ";domain=" + domain;
	if(maxAge)
		cookieString += ";max-age=" + maxAge;
	document.cookie = cookieString;
}

function getCookie(key) {
	var cookies = document.cookie.split("; ");
	for(var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i].split("=");
		if(cookie[0] == key)
			return cookie[1];
	}
}

function deleteCookie(key) {
	setCookie(key, "", -1);
}

function getQueryString() {
	var qsObject = {};
	var pairs = location.search.substr(1).split("&");
	for(var i = 0; i < pairs.length; i++) {
		var pair = pairs[i].split("=");
		qsObject[pair[0]] = pair[1];
	}
	return qsObject;
}
