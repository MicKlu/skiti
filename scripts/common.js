$(function () {
	$("#birthdate").fillDateSelect();
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
		var months = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
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
		for(var i = 1900; i <= thisYear; i++) {
			option = $("<option>");
			option.prop("value", i);
			option.text(i);
			select.append(option);
		}
	}
})