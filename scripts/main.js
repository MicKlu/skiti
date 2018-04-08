"use strict";

var timers = {};

$(function () {
	$("#friend-send-invite").click(ajaxSendInvite);
	$("#friend-cancel-invite").click(ajaxCancelInvite);
	$("#friend-accept").click(ajaxAcceptInvite);
	$("#friend-reject").click(ajaxRejectInvite);
	$("#friend-delete").click(ajaxDeleteFriend);
	$(window).on("resize", normalizeProfileImages);
	$(window).on("resize", galleryResize);
	normalizeProfileImages();
	$(".profile-image-wrapper").addGallery();
})

function showRegisterAlert() {
	if(getCookie("register-error")) {
		$("#register-error").show();
		deleteCookie("register-error");
	}
}

function showLoginAlert() {
	if(getCookie("login-error")) {
		$("#login-error").show();
		deleteCookie("login-error");
	}
}

function ajaxSendInvite() {
	var profileId = $(this).data("id");
	$.ajax("common.php?action=friend_send_invite", {
		method: "post",
		dataType: "json",
		data: {
			"friend-id": profileId
		},
		success: function (data) {
			if(!data.success)
				return;
			
			$("#friend-send-invite").hide();
			$("#friend-delete").hide();
			$("#friend-cancel-invite").show();
		}
	});
}

function ajaxCancelInvite() {
	var profileId = $(this).data("id");
	$.ajax("common.php?action=friend_cancel_invite", {
		method: "post",
		dataType: "json",
		data: {
			"friend-id": profileId
		},
		success: function (data) {
			if(!data.success)
				return;
			
			$("#friend-send-invite").show();
			$("#friend-delete").hide();
			$("#friend-cancel-invite").hide();
		}
	});
}

function ajaxAcceptInvite() {
	var profileId = $(this).data("id");
	$.ajax("common.php?action=friend_accept_invite", {
		method: "post",
		dataType: "json",
		data: {
			"friend-id": profileId
		},
		success: function (data) {
			if(!data.success)
				return;
			
			$("#friend-send-invite").hide();
			$("#friend-delete").show();
			$("#friend-cancel-invite").hide();
			$("#friend-accept").hide();
			$("#friend-reject").hide();
		}
	});
}

function ajaxRejectInvite() {
	var profileId = $(this).data("id");
	$.ajax("common.php?action=friend_reject_invite", {
		method: "post",
		dataType: "json",
		data: {
			"friend-id": profileId
		},
		success: function (data) {
			if(!data.success)
				return;
			
			$("#friend-send-invite").show();
			$("#friend-delete").hide();
			$("#friend-cancel-invite").hide();
			$("#friend-accept").hide();
			$("#friend-reject").hide();
		}
	});
}

function ajaxDeleteFriend() {
	var profileId = $(this).data("id");
	$.ajax("common.php?action=friend_delete", {
		method: "post",
		dataType: "json",
		data: {
			"friend-id": profileId
		},
		success: function (data) {
			if(!data.success)
				return;
			
			$("#friend-send-invite").show();
			$("#friend-delete").hide();
			$("#friend-cancel-invite").hide();
			$("#friend-accept").hide();
			$("#friend-reject").hide();
		}
	});
}

function normalizeProfileImages() {	
	//Środkowanie małych obrazów
	$("#profile-photos .profile-image-wrapper > img").each(function () {
		var image = $(this);
		var imgHeight = image.height();
		if(imgHeight < 300) {
			var offset = (150 - imgHeight / 2);	//(300 / 2) - imgHeight / 2
			image.css({top: offset + "px"});	//Przesuwamy
		}
	});
	
	//Środkowanie dużych obrazów i wyrównanie długich opisów
	$("#profile-photos .row").each(function () {
		var row = $(this);
		var imgWrappers = row.find(".profile-image-wrapper");
		
		if(imgWrappers.length == 2) {	//Jeśli w rzędzie są dwa obrazy...
			var images = imgWrappers.children("img");
			var captions = row.find(".profile-image-info");
			var imgWrappersHeights = [];
			var imgsHeights = [];
			var captionsHeights = [];
			imgWrappersHeights[0] = imgWrappers.eq(0).height();
			imgWrappersHeights[1] = imgWrappers.eq(1).height();
			imgsHeights[0] = images.eq(0).height();
			imgsHeights[1] = images.eq(1).height();
			captionsHeights[0] = captions.eq(0).height();
			captionsHeights[1] = captions.eq(1).height();
			
			//Skalujemy większy obraz do wysokości mniejszego
			if(imgWrappersHeights[0] > imgWrappersHeights[1]) {			//Pierwszy obraz za duży
				var offset = (imgWrappersHeights[1] / 2 - imgsHeights[0] / 2);	//newWrapperHeight / 2 - imgHeight / 2
				imgWrappers.eq(0).height(imgWrappersHeights[1]);	//Skalujemy	
				images.eq(0).css({top: offset + "px"});	//Przesuwamy
			}
			else if(imgWrappersHeights[0] < imgWrappersHeights[1]) {	//Drugi obraz za duży
				var offset = (imgWrappersHeights[0] / 2 - imgsHeights[1] / 2);	//newWrapperHeight / 2 - imgHeight / 2
				imgWrappers.eq(1).height(imgWrappersHeights[0]);	//Skalujemy
				images.eq(1).css({top: offset + "px"});	//Przesuwamy
			}
			
			//Skalujemy mniejszy opis do wysokości większego
			if(captionsHeights[0] > captionsHeights[1])			//Pierwszy opis
				captions.eq(1).height(captionsHeights[0]);	//Skalujemy
			else if(captionsHeights[0] < captionsHeights[1])	//Drugi opis
				captions.eq(0).height(captionsHeights[1]);	//Skalujemy
			
		}
	});
}

function galleryOpen() {
	if($(".gallery-container").length)
		return;
	
	var profileImage = $(this).find("img");
	var profileImagePanel = $(this).next(".profile-image-panel");
	var profileImageTitle = profileImagePanel.find("h3").text();
	var profileImageCaption = profileImagePanel.find("p").text();
	
	var imageData = {};
	imageData.src = profileImage.attr("src");
	imageData.galleryId = profileImage.attr("data-gallery-image-id");
	galleryCreate(imageData, profileImageTitle, profileImageCaption);
	galleryResize();	
}

function galleryCreate(imageData, headerTitle, caption) {
	//Bloki
	var galleryContainer = $("<div>").addClass("gallery-container");
	var galleryImageBox = $("<div>").addClass("gallery-image-box");
	var galleryArrowLeft = $("<div>").addClass("gallery-arrow").addClass("gallery-arrow-left");
	var galleryArrowRight = $("<div>").addClass("gallery-arrow").addClass("gallery-arrow-right");
	var galleryArrowLeftI = $("<i>").addClass("fas").addClass("fa-angle-left");
	var galleryArrowRightI = $("<i>").addClass("fas").addClass("fa-angle-right");
	var galleryImageWrapper = $("<div>").addClass("gallery-image-wrapper");
	var galleryImage =  $("<img>");
	var galleryPanel = $("<div>").addClass("gallery-panel");
	var galleryProfileImageInfo = $("<div>").addClass("profile-image-info");
	var galleryProfileImageInfoH3 = $("<h3>");
	var galleryProfileImageInfoP = $("<p>");
	var galleryCloseDiv = $("<div>").addClass("gallery-close");
	var galleryCloseI = $("<i>").addClass("fas").addClass("fa-times");
	
	//Wpisywanie danych
	galleryImage.attr({src: imageData.src});
	galleryImage.data("gallery-image-id", imageData.galleryId);
	galleryProfileImageInfoH3.text(headerTitle);
	galleryProfileImageInfoP.text(caption);
	
	//Appendy
	galleryContainer.append(galleryImageBox);
	galleryImageBox.append(galleryArrowLeft);
	galleryImageBox.append(galleryArrowRight);
	galleryImageBox.append(galleryImageWrapper);
	galleryImageBox.append(galleryPanel);
	galleryImageBox.append(galleryCloseDiv);
	galleryArrowLeft.append($("<span>").append(galleryArrowLeftI));
	galleryArrowRight.append($("<span>").append(galleryArrowRightI));
	galleryImageWrapper.append(galleryImage);
	galleryPanel.append(galleryProfileImageInfo);
	galleryProfileImageInfo.append(galleryProfileImageInfoH3);
	galleryProfileImageInfo.append(galleryProfileImageInfoP);
	galleryCloseDiv.append(galleryCloseI);
	
	//Eventy
	galleryContainer.click(galleryClose);
	galleryImageBox.mousemove(galleryShowPanel);
	galleryImageBox.mouseout(galleryHidePanel);
	galleryImageBox.click(function (event) {
		event.stopPropagation();
	});
	galleryCloseDiv.click(galleryClose);
	galleryArrowLeft.click(galleryPrev);
	galleryArrowRight.click(galleryNext);
	
	//Wyświetlanie
	$("main").append(galleryContainer);
}

function galleryResize() {
	//Dostosowanie wielkości kontenera do wielkości dostępnej na ekranie
	var galleryContainer = {};
	galleryContainer.object = $(".gallery-container");
	galleryContainer.width = $(window).width();
	galleryContainer.height = $(window).height();
	
	galleryContainer.object.width(galleryContainer.width);
	galleryContainer.object.height(galleryContainer.height);
	
	//Skalowanie obrazu wewnącz wrappera
	var galleryImage = $(".gallery-image-wrapper img");
	galleryImage.css({maxHeight: "100%"});
}

function galleryClose(event) {
	$(".gallery-container").remove();
}

function galleryShowPanel() {
	if(timers.galleryPanel)
		clearTimeout(timers.galleryPanel);
	
	timers.galleryPanel = setTimeout(galleryHidePanel, 1500);
	$(".gallery-panel").css({opacity: 1});
}

function galleryHidePanel() {
	if(timers.galleryPanel)
		clearTimeout(timers.galleryPanel);
	$(".gallery-panel").css({opacity: 0});
}

function galleryChangeImage(direction) {
	var images = $(".profile-image-wrapper img");
	var currentImage = $(".gallery-image-wrapper img");
	var currentImageId = currentImage.data("gallery-image-id");
	var currentImageTitle = $(".gallery-panel h3");
	var currentImageCaption = $(".gallery-panel p");
	currentImageId = parseInt(currentImageId);
	
	var nextImageId;
	var nextImage;
	var nextImageSrc;
	var nextImagePanel;
	var nextImageTitle;
	var nextImageCaption;
	
	if(direction == 1) {
		nextImageId = currentImageId + 1;
		if(nextImageId < images.length)
			nextImage = $(images[nextImageId]);
		else {
			nextImageId = 0;
			nextImage = $(images[nextImageId]);
		}		
	} else if(direction == -1) {
		nextImageId = currentImageId - 1;
		if(nextImageId >= 0)
			nextImage = $(images[nextImageId]);
		else {
			nextImageId = images.length - 1;
			nextImage = $(images[nextImageId]);
		}	
	}
	
	nextImageSrc = nextImage.attr("src");
	nextImagePanel = nextImage.parent().next(".profile-image-panel");
	nextImageTitle = nextImagePanel.find(".profile-image-info h3").text();
	nextImageCaption = nextImagePanel.find(".profile-image-info p").text();
	
	currentImage.attr({src: nextImageSrc});
	currentImage.data("gallery-image-id", nextImageId);
	currentImageTitle.text(nextImageTitle);
	currentImageCaption.text(nextImageCaption);
	
	galleryResize();
}

function galleryNext() {
	galleryChangeImage(1);
}

function galleryPrev() {
	galleryChangeImage(-1);
}

$.fn.extend({
	addGallery: function () {
		$(this).each(function () {
			$(this).click(galleryOpen);
		})
	}
})
