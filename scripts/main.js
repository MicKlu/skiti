"use strict";

var timers = {};

$(function () {
	$("#friend-send-invite").click(ajaxSendInvite);
	$("#friend-cancel-invite").click(ajaxCancelInvite);
	$("#friend-accept").click(ajaxAcceptInvite);
	$("#friend-reject").click(ajaxRejectInvite);
	$("#friend-delete").click(ajaxDeleteFriend);
	$("#avatar-delete").click(ajaxDeleteAvatar);
	$("#background-delete").click(ajaxDeleteBackground);
	$(window).on("resize", normalizeProfileImages);
	$(window).on("resize", galleryResize);
	
	$("#profile-friends").ajaxGetFriends();
	$("#profile-photos").ajaxGetImages();
	$(".settings-panel").collapsiblePanel();	
})



function showAlert(type) {
	if(getCookie(type)) {
		$("#" + type).show();
		deleteCookie(type);
	}
}

function showRegisterAlert() {
	showAlert("register-error");
}

function showLoginAlert() {
	showAlert("login-error");
}

function showUserUpdateInfoErrorAlert() {
	showAlert("user-info-update-error");
}

function showAddImageErrorAlert() {
	showAlert("add-image-error");
}

function ajaxSendInvite() {
	var profileId = $(this).data("id");
	$.ajax("common.php?action=friend_send_invite", {
		method: "post",
		dataType: "json",
		data: {
			"friend_id": profileId
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
			"friend_id": profileId
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
			"friend_id": profileId
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
			"friend_id": profileId
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

function ajaxDeleteAvatar() {
	$.ajax("common.php?action=avatar_delete", {
		method: "post",
		dataType: "json",
		success: function (data) {
			if(!data.success)
				return;
			
			$("#avatar-delete").hide();
		}
	});
}

function ajaxDeleteBackground() {
	$.ajax("common.php?action=background_delete", {
		method: "post",
		dataType: "json",
		success: function (data) {
			if(!data.success)
				return;
			
			$("#background-delete").hide();
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
	},
	collapsiblePanel: function () {
		$(this).each(function (index) {
			var panel = $(this);
			if(index != 0) {
				hidePanel(panel);
			}
			var panelHeader = panel.find(".settings-panel-header");
			var panelCollapseButton = panel.find(".settings-panel-collapse");
			
			panelHeader.click(togglePanelEvt);
			panelCollapseButton.click(hidePanelEvt);
		})
	},
	ajaxGetFriends: function () {
		$(this).each(function () {
			var ProfileFriendsAccepted = $(this).find("#profile-friends-accepted");
			var ProfileFriendsFriendsInvited = $(this).find("#profile-friends-friends-invited");
			var ProfileFriendsUserInvited = $(this).find("#profile-friends-user-invited");
			$.ajax("common.php?action=get_friends_list", {
				method: "post",
				dataType: "json",
				data: {
					user_id: getQueryString().id
				},
				success: function(data) {
					if(!data.length) {
						ProfileFriendsAccepted.html("<p>Użytkownik nie ma znajomych.</p>");
						return;
					}

					var PFAcols = ProfileFriendsAccepted.children(".col-1");
					var PFFIcols = ProfileFriendsFriendsInvited.children(".col-1");
					var PFUIcols = ProfileFriendsUserInvited.children(".col-1");
					
					var j = 0, k = 0, l = 0;
					
					for(var i = 0; i < data.length; i++) {
						var profileFriendBox = $("<a>").addClass("profile-friend-box");
						var profileFriendAvatar = $("<div>").addClass("profile-friend-avatar");
						var profileAvatarMini = $("<div>").addClass("profile-avatar-mini");
						var profileAvatarMiniImg = $("<img>");
						var profileFriendInfo = $("<div>").addClass("profile-friend-info");
						var profileFriendInfoH6 = $("<h6>");
						
						//profileAvatarMini.attr({src: "img/avatar_placeholder.png"});
						
						profileFriendBox.append(profileFriendAvatar);
						profileFriendBox.append(profileFriendInfo);
						profileFriendAvatar.append(profileAvatarMini);
						profileAvatarMini.append(profileAvatarMiniImg);
						profileFriendInfo.append(profileFriendInfoH6);
					
						profileFriendBox.attr({href: "profil.php?id=" + data[i].id});
						profileFriendInfoH6.text(data[i].fullname);
						profileAvatarMiniImg.attr({src: data[i].avatar});
						
						if(data[i].friendInvited) {
							PFFIcols.eq(j % 3).append(profileFriendBox);
							j++;
						} else if(data[i].userInvited) {
							PFUIcols.eq(k % 3).append(profileFriendBox);
							k++;
						} else
						{
							PFAcols.eq(l % 3).append(profileFriendBox);
							l++;
						}
					}
				}
			});
		});
	},
	ajaxGetImages: function () {
		$(this).each(function () {
			var profilePhotos = $(this);
			$.ajax("common.php?action=get_images", {
				method: "post",
				dataType: "json",
				data: {
					user_id: getQueryString().id
				},
				success: function(data) {
					if(!data.images) {
						profilePhotos.append("<p>Użytkownik nie umieścił żadnych zdjęć.</p>");
						return;
					}
					
					var row;
					
					for(var i = 0; i < data.images.length; i++) {
						var colI = 0;
						
						if(i % 7 == 0)
							row = profileImageRowCreate(0);
						else if(i % 7 == 1)
							row = profileImageRowCreate(1);
						else if(i % 7 == 3)	//pomijamy 2, żeby nie tworzyć nowego row
							row = profileImageRowCreate(2);
						else if(i % 7 == 5)	//jak wyżej
							row = profileImageRowCreate(3);
						
						if(i % 7 == 2 || i % 7 == 4 || i % 7 == 6)
							colI = 1;
						
						data.images[i].localId = i;
						
						var cols = row.find(".col-1, .col-2");
						var profileImageBox = profileImageBoxCreate(data.images[i], data.owner);
						cols.eq(colI).append(profileImageBox);
						
						if(i % 7 != 1 && i % 7 != 3 && i % 7 != 5)
							profilePhotos.append(row);
					}
					console.log(data);
					
					//Bezpośrednio po usunięciu cache przeglądarki normalizacja nie jest przeprowadzana prawidłowo,
					setTimeout(normalizeProfileImages, 50);	//więc delikatnie ją opóźniamy.
				}
			});
		});
	}
});

function togglePanelEvt(event) {
	var panelHeader = $(event.currentTarget);
	var panel = panelHeader.parents(".settings-panel");
	if(panel.hasClass("collapsed"))
		showPanel(panel);
	else 
		hidePanel(panel);
}

function hidePanelEvt(event) {
	var panelCollapseButton = $(event.currentTarget);
	var panel = panelCollapseButton.parents(".settings-panel");
	hidePanel(panel);
}

function showPanel(panel) {
	var panelContentWrapper = panel.find(".settings-panel-content-wrapper");
	panel.removeClass("collapsed");
	panelContentWrapper.show();
}

function hidePanel(panel) {
	var panelContentWrapper = panel.find(".settings-panel-content-wrapper");
	panel.addClass("collapsed");
	panelContentWrapper.hide();
}

function profileImageBoxCreate(imageData, owner) {
	var profileImageBox = $("<div>").addClass("profile-image-box");
	var profileImageWrapper = $("<div>").addClass("profile-image-wrapper");
	var profileImageWrapperImg = $("<img>");
	var profileImagePanel = $("<div>").addClass("profile-image-panel");
	var profileImageInfo = $("<div>").addClass("profile-image-info");
	var profileImageInfoH3 = $("<h3>");
	var profileImageInfoP = $("<p>");
	var profileImageButtons = $("<div>").addClass("profile-image-buttons");
	var profileImageButtonsThumbsUp = $("<a>").addClass("button").addClass("button-light").addClass("button-primary");
	var profileImageButtonsThumbsUpI = $("<i>").addClass("fas").addClass("fa-thumbs-up");
	var profileImageButtonsThumbsUpSpan = $("<span>");
	var profileImageButtonsThumbsDown = $("<a>").addClass("button").addClass("button-light").addClass("button-primary");
	var profileImageButtonsThumbsDownI = $("<i>").addClass("fas").addClass("fa-thumbs-down");
	var profileImageButtonsThumbsDownSpan = $("<span>");
	var profileImageButtonsComments = $("<a>").addClass("button").addClass("button-light").addClass("button-primary");
	var profileImageButtonsCommentsI = $("<i>").addClass("fas").addClass("fa-comments");
	var profileImageButtonsCommentsSpan = $("<span>");
	
	//Appendy
	profileImageBox.append(profileImageWrapper);
	profileImageBox.append(profileImagePanel);
	profileImageWrapper.append(profileImageWrapperImg);
	profileImagePanel.append(profileImageInfo);
	profileImagePanel.append(profileImageButtons);
	profileImageInfo.append(profileImageInfoH3);
	profileImageInfo.append(profileImageInfoP);
	profileImageButtons.append(profileImageButtonsThumbsUp);
	profileImageButtons.append(profileImageButtonsThumbsDown);
	profileImageButtons.append(profileImageButtonsComments);
	profileImageButtonsThumbsUp.append(profileImageButtonsThumbsUpI);
	profileImageButtonsThumbsUp.append(profileImageButtonsThumbsUpSpan);
	profileImageButtonsThumbsDown.append(profileImageButtonsThumbsDownI);
	profileImageButtonsThumbsDown.append(profileImageButtonsThumbsDownSpan);
	profileImageButtonsComments.append(profileImageButtonsCommentsI);
	profileImageButtonsComments.append(profileImageButtonsCommentsSpan);
	
	if(owner) {
		var profileImageButtonsEdit = $("<a>").addClass("button").addClass("button-light").addClass("button-primary");
		var profileImageButtonsEditI = $("<i>").addClass("fas").addClass("fa-pencil-alt");
		var profileImageButtonsDelete = $("<a>").addClass("button").addClass("button-light").addClass("button-primary");
		var profileImageButtonsDeleteI = $("<i>").addClass("fas").addClass("fa-times");
		profileImageButtons.append(profileImageButtonsEdit);
		profileImageButtons.append(profileImageButtonsDelete);
		profileImageButtonsEdit.append(profileImageButtonsEditI);
		profileImageButtonsDelete.append(profileImageButtonsDeleteI);
	}
	
	//Eventy
	profileImageButtonsThumbsUp.click(ajaxImageThumbUp);
	profileImageButtonsThumbsDown.click(ajaxImageThumbDown);
	profileImageWrapper.addGallery();
	
	//Wypełnienie wartościami
	profileImageButtons.find("a").attr({href: "javascript:;"});
	profileImageWrapperImg.attr({src: "img/user_images/" + getQueryString().id + "/" + imageData.filename});
	profileImageWrapperImg.data({"gallery-image-id": imageData.localId});
	profileImageInfoH3.text(imageData.title);
	profileImageInfoP.text(imageData.caption);
	profileImageButtonsThumbsUp.data({"image-id": imageData.id});
	profileImageButtonsThumbsDown.data({"image-id": imageData.id});
	if(imageData.thumbsUp)
		profileImageButtonsThumbsUpSpan.text(" (" + imageData.thumbsUp + ")");
	if(imageData.thumbsDown)
		profileImageButtonsThumbsDownSpan.text(" (" + imageData.thumbsDown + ")");
	if(imageData.comments)
		profileImageButtonsCommentsSpan.text(" (" + imageData.comments + ")");
	
	if(imageData.thumbUpGiven)
		profileImageButtonsThumbsUp.addClass("thumbed");
	if(imageData.thumbDownGiven)
		profileImageButtonsThumbsDown.addClass("thumbed");
	
	return profileImageBox;
}

function profileImageRowCreate($type) {
	var row = $("<div>").addClass("row");
	var col1 = $("<div>").addClass("col-1");
	var col1_2 = $("<div>").addClass("col-1");
	var col2 = $("<div>").addClass("col-2");
	
	if($type == 0) {
		row.append(col1);
	} else if($type == 1) {
		row.append(col2);
		row.append(col1);
	} else if($type == 2) {
		row.append(col1);
		row.append(col1_2);
	} else if($type == 3) {
		row.append(col1);
		row.append(col2);
	}
		
	return row;
}

function ajaxImageThumbUp() {
	ajaxImageThumb("up", this);
}

function ajaxImageThumbDown() {
	ajaxImageThumb("down", this);
}

function ajaxImageThumb(thumb, self) {
	var self = $(self);
	var imageId = self.data("image-id");
	
	$.ajax("common.php?action=image_thumb", {
		method: "post",
		data: {
			"image_id": imageId,
			"thumb": thumb
		},
		dataType: "json",
		success: function (data) {
			if(!data.success)
				return;
			
			var buttons = self.parent(".profile-image-buttons").find(".button");
			console.log(buttons);
			buttons.eq(0).find("span").text((data.thumbsUp) ? " (" + data.thumbsUp + ")": "");
			buttons.eq(1).find("span").text((data.thumbsDown) ? " (" + data.thumbsDown + ")": "");
			
			var wasThumbed = self.hasClass("thumbed");
			self.parent(".profile-image-buttons").find(".button").removeClass("thumbed");
			if(!wasThumbed)
				self.addClass("thumbed");
		
		}
	});
}
