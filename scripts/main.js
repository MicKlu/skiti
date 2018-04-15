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
	$("#search").keyup(ajaxSearch);
	$("#search-form button").click(ajaxSearch);
	$(window).on("resize", normalizeProfileImages);
	$(window).on("resize", galleryResize);
	
	$("#profile-friends").ajaxGetFriends();
	$("#profile-photos").ajaxGetImages();
	$("#profile-wall").ajaxGetThreads();
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

function showNewThreadErrorAlert() {
	showAlert("new-thread-error");
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
	imageData.galleryId = profileImage.data("gallery-image-id");
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
						
						if((i % 7 != 1 && i % 7 != 3 && i % 7 != 5) || ((i % 7 == 1 || i % 7 == 3 || i % 7 == 5) && i == data.images.length - 1))
							profilePhotos.append(row);
					}
					
					//Bezpośrednio po usunięciu cache przeglądarki normalizacja nie jest przeprowadzana prawidłowo,
					setTimeout(normalizeProfileImages, 50);	//więc delikatnie ją opóźniamy.
				}
			});
		});
	},
	ajaxGetThreads: function () {
		$(this).each(function () {
			var profileWall = $(this);
			$.ajax("common.php?action=get_threads", {
				method: "post",
				dataType: "json",
				data: {
					user_id: getQueryString().id
				},
				success: function(data) {
					if(!data.threads) {
						profileWall.append("<p>Tablica wiadomości jest pusta.</p>");
						return;
					}
					var colLeft = profileWall.find(".col-2");
					var colRight = profileWall.find(".col-1");
					
					for(var i = 0; i < data.threads.length; i++) {
						if(i % 2 == 0)
							colLeft.append(profileThreadContainerCreate(data.threads[i]));
						if(i % 2 == 1)
							colRight.append(profileThreadContainerCreate(data.threads[i]));
					}
				}
			});
		});
	}
});

function profileThreadContainerCreate(threadData) {
	var profileThreadContainer = $("<div>").addClass("profile-thread-container");
	var profileThreadSender = $("<div>").addClass("profile-thread-sender");
	var profileComment = $("<div>").addClass("profile-comment");
	var profileCommentAvatar = $("<div>").addClass("profile-comment-avatar");
	var profileCommentAvatarA = $("<a>");
	var profileAvatarMini = $("<div>").addClass("profile-avatar-mini");
	var profileAvatarMiniImg = $("<img>");
	var profileCommentContent = $("<div>").addClass("profile-comment-content");
	var profileCommentContentH6 = $("<h6>");
	var profileCommentContentH6A = $("<a>");
	var profileCommentContentH6Small = $("<small>");
	var profileThreadContent = $("<div>").addClass("profile-thread-content");
	var profileThreadMsg = $("<div>").addClass("profile-thread-msg");
	var profileThreadMsgH4 = $("<h4>");
	var profileThreadMsgP = $("<p>");
	var profileThreadButtons =  $("<div>").addClass("profile-thread-buttons");
	var profileThreadPosts =  $("<div>").addClass("profile-thread-posts");
	var profileThreadForm =  $("<div>").addClass("profile-thread-form");
	var profileThreadFormTextArea =  $("<textarea>");
	var profileThreadFormButton =  $("<button>").addClass("button-light").addClass("button-primary");
	
	//Appendy
	profileThreadContainer.append(profileThreadSender);
	profileThreadContainer.append(profileThreadContent);
	profileThreadSender.append(profileComment);
	profileComment.append(profileCommentAvatar);
	profileComment.append(profileCommentContent);
	profileCommentAvatar.append(profileCommentAvatarA);
	profileCommentAvatarA.append(profileAvatarMini);
	profileAvatarMini.append(profileAvatarMiniImg);
	profileCommentContent.append(profileCommentContentH6);
	profileCommentContentH6.append(profileCommentContentH6A);
	profileCommentContentH6.append(profileCommentContentH6Small);
	profileThreadContent.append(profileThreadMsg);
	profileThreadContent.append(profileThreadButtons);
	profileThreadContent.append(profileThreadPosts);
	profileThreadMsg.append(profileThreadMsgH4);
	profileThreadMsg.append(profileThreadMsgP);
	
	if(threadData.author) {
		var profileThreadButtonsEdit =  $("<a>").addClass("button").addClass("button-light").addClass("button-primary");
		var profileThreadButtonsEditI =  $("<i>").addClass("fas").addClass("fa-pencil-alt");
		
		profileThreadButtons.append(profileThreadButtonsEdit);
		profileThreadButtonsEdit.append(profileThreadButtonsEditI);
		
		profileThreadButtonsEdit.data({"thread-id": threadData.id});
		profileThreadButtonsEdit.click(toggleEditThread);
	}
	
	if(threadData.owner || threadData.author) {
		var profileThreadButtonsDelete =  $("<a>").addClass("button").addClass("button-light").addClass("button-primary");
		var profileThreadButtonsDeleteI =  $("<i>").addClass("fas").addClass("fa-times");
		
		profileThreadButtons.append(profileThreadButtonsDelete);
		profileThreadButtonsDelete.append(profileThreadButtonsDeleteI);
		
		profileThreadButtonsDelete.data({"thread-id": threadData.id});
		profileThreadButtonsDelete.click(ajaxDeleteThread);
	}
	
	
	
	if(!threadData.comments.length) {
		var profileThreadNoCommentsP = $("<p>").addClass("profile-thread-no-comments");
		profileThreadNoCommentsP.text("Brak komentarzy");
		profileThreadPosts.append(profileThreadNoCommentsP);
	}
	
	for(var i = 0; i < threadData.comments.length; i++)
		profileThreadPosts.append(profileThreadCommentCreate(threadData.comments[i]));
	
	profileThreadContent.append(profileThreadForm);
	profileThreadForm.append(profileThreadFormTextArea);
	profileThreadForm.append(profileThreadFormButton);
	
	//Wypełnienie danych
	profileCommentAvatarA.attr({href: "profil.php?id=" + threadData.authorId});
	profileAvatarMiniImg.attr({src: threadData.avatar});
	profileCommentContentH6A.attr({href: "profil.php?id=" + threadData.authorId});
	profileCommentContentH6A.html(threadData.fullname + "<br />");
	profileCommentContentH6Small.text(threadData.date);
	profileThreadMsgH4.text(threadData.topic);
	profileThreadMsgP.html(threadData.msg);
	profileThreadFormButton.data({"thread-id": threadData.id})
	profileThreadFormButton.text("Odpowiedz");
	
	//Eventy
	profileThreadFormButton.click(ajaxSendThreadComment);
	
	return profileThreadContainer;
}

function profileThreadCommentCreate(commentData) {
	var profileComment = $("<div>").addClass("profile-comment");
	var profileCommentAvatar =  $("<div>").addClass("profile-comment-avatar");
	var profileCommentAvatarA =  $("<a>");
	var profileAvatarMini =  $("<div>").addClass("profile-avatar-mini");
	var profileAvatarMiniImg =  $("<img>");
	var profileCommentContent =  $("<div>").addClass("profile-comment-content");
	var profileCommentContentH6 =  $("<h6>");
	var profileCommentContentH6A =  $("<a>");
	var profileCommentContentH6Small =  $("<small>");
	var profileCommentContentP =  $("<p>");
	
	//Appendy
	profileComment.append(profileCommentAvatar);
	profileComment.append(profileCommentContent);
	profileCommentAvatar.append(profileCommentAvatarA);
	profileCommentAvatarA.append(profileAvatarMini);
	profileAvatarMini.append(profileAvatarMiniImg);
	profileCommentContent.append(profileCommentContentH6);
	profileCommentContent.append(profileCommentContentP);
	profileCommentContentH6.append(profileCommentContentH6A);
	profileCommentContentH6.append(profileCommentContentH6Small);
	profileCommentContentH6.append(profileCommentContentH6Small);
	
	//Wypełnienie danych
	profileCommentAvatarA.attr({"href": "profil.php?id=" + commentData.id});
	profileAvatarMiniImg.attr({src: commentData.avatar});
	profileCommentContentH6A.attr({"href": "profil.php?id=" + commentData.id});
	profileCommentContentH6A.text(commentData.fullname + " ");
	profileCommentContentH6Small.text(commentData.date);
	profileCommentContentP.text(commentData.content);
	
	return profileComment;
}

function ajaxSendThreadComment() {
	var self = $(this);
	var threadId = self.data("thread-id");
	var profileThreadFormTextArea = self.siblings("textarea");
	$.ajax("common.php?action=thread_post_comment", {
		method: "post",
		data: {
			"thread_id": threadId,
			"comment": profileThreadFormTextArea.val()
		},
		dataType: "json",
		success: function (data) {
			if(!data.success)
				return;
			
			var profileThreadContent = self.parents(".profile-thread-content");
			var profileThreadPosts = profileThreadContent.find(".profile-thread-posts");
			profileThreadPosts.find(".profile-thread-no-comments").remove();
			profileThreadFormTextArea.val("");
			profileThreadPosts.append(profileThreadCommentCreate(data.comment))
			
		}
	});
}

function toggleEditThread() {
	var self = $(this);
	var threadId = self.data("thread-id");
	var profileThreadContent = self.parents(".profile-thread-content");
	var profileThreadMsg = profileThreadContent.find(".profile-thread-msg");
	if(profileThreadMsg.find("h4").length)
		switchOnEditThread(profileThreadMsg, threadId);
	else
		switchOffEditThread(profileThreadMsg);
}

function switchOnEditThread(profileThreadMsg, threadId) {
	var profileThreadButtons = profileThreadMsg.siblings(".profile-thread-buttons");
	var profileThreadMsgH4 = profileThreadMsg.find("h4");
	var profileThreadMsgP = profileThreadMsg.find("p");
	
	var profileThreadMsgInputTopic = $("<input>").attr({type: "text", placeholder: "Tytuł"}).addClass("thread-edit-input").addClass("topic");
	var profileThreadMsgInputMsg = $("<input>").attr({type: "text", placeholder: "Podpis"}).addClass("thread-edit-input").addClass("msg");
	var profileThreadButtonsSaveButton = $("<button>").addClass("thread-save-edit").addClass("button-primary").addClass("button-light").text("Zapisz");
	
	profileThreadMsgInputTopic.val(profileThreadMsgH4.text());
	profileThreadMsgInputTopic.data({"default": profileThreadMsgH4.text()});
	profileThreadMsgInputMsg.val(profileThreadMsgP.text());
	profileThreadMsgInputMsg.data({"default": profileThreadMsgP.text()});
	
	profileThreadMsgH4.replaceWith(profileThreadMsgInputTopic);
	profileThreadMsgP.replaceWith(profileThreadMsgInputMsg);
	
	profileThreadButtons.prepend(profileThreadButtonsSaveButton);
	profileThreadButtonsSaveButton.data({"thread-id": threadId});
	profileThreadButtonsSaveButton.click(ajaxEditThread);
}

function switchOffEditThread(profileThreadMsg) {
	var profileThreadButtons = profileThreadMsg.siblings(".profile-thread-buttons"); 
	var profileThreadMsgInputTopic = profileThreadMsg.find(".thread-edit-input.topic");
	var profileThreadMsgInputMsg = profileThreadMsg.find(".thread-edit-input.msg");
	var profileThreadButtonsSaveButton = profileThreadButtons.find(".thread-save-edit");
	var profileThreadMsgH4 = $("<h4>");
	var profileThreadMsgP = $("<p>");
	profileThreadMsgH4.text(profileThreadMsgInputTopic.data("default"))
	profileThreadMsgP.text(profileThreadMsgInputMsg.data("default"))
	profileThreadMsgInputTopic.replaceWith(profileThreadMsgH4);
	profileThreadMsgInputMsg.replaceWith(profileThreadMsgP);
	profileThreadButtonsSaveButton.remove();
}

function ajaxEditThread() {
	var self = $(this);
	var threadId = self.data("thread-id");
	var profileThreadContent = self.parents(".profile-thread-content");
	var profileThreadMsg = profileThreadContent.find(".profile-thread-msg");
	var profileThreadMsgInputTopic = profileThreadMsg.find(".thread-edit-input.topic");
	var profileThreadMsgInputMsg = profileThreadMsg.find(".thread-edit-input.msg");
	
	$.ajax("common.php?action=topic_edit", {
		method: "post",
		data: {
			"thread_id": threadId,
			"topic": profileThreadMsgInputTopic.val(),
			"msg": profileThreadMsgInputMsg.val(),
		},
		dataType: "json",
		success: function (data) {
			if(!data.success)
				return;
			
			profileThreadMsgInputTopic.data({"default": data.topic});
			profileThreadMsgInputMsg.data({"default": data.msg});
			switchOffEditThread(profileThreadMsg);
		}
	});
}

function ajaxDeleteThread() {
	var self = $(this);
	var threadId = self.data("thread-id");
	$.ajax("common.php?action=thread_delete", {
		method: "post",
		data: {
			"thread_id": threadId,
		},
		dataType: "json",
		success: function (data) {
			if(!data.success)
				return;
			
			self.parents(".profile-thread-container").remove();
		}
	});
}

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
	var profileImageButtonsFeedback = $("<span>").addClass("profile-image-buttons-feedback");
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
	profileImageButtons.append(profileImageButtonsFeedback);
	profileImageButtonsFeedback.append(profileImageButtonsThumbsUp);
	profileImageButtonsFeedback.append(profileImageButtonsThumbsDown);
	profileImageButtonsFeedback.append(profileImageButtonsComments);
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
		var profileImageButtonsManage = $("<span>").addClass("profile-image-manage");
		
		//Appendy właściciela
		profileImageButtons.append(profileImageButtonsManage);
		profileImageButtonsManage.append(profileImageButtonsEdit);
		profileImageButtonsManage.append(profileImageButtonsDelete);
		profileImageButtonsEdit.append(profileImageButtonsEditI);
		profileImageButtonsDelete.append(profileImageButtonsDeleteI);
		
		//Eventy właściciela
		profileImageButtonsEdit.click(toggleEditImage);
		profileImageButtonsDelete.click(ajaxDeleteImage);

		//Wypełnienie wartościami właściciela
		profileImageButtonsEdit.data({"image-id": imageData.id});
		profileImageButtonsDelete.data({"image-id": imageData.id});
	}
	
	//Eventy
	profileImageButtonsThumbsUp.click(ajaxImageThumbUp);
	profileImageButtonsThumbsDown.click(ajaxImageThumbDown);
	profileImageButtonsComments.click(toggleOpenComments);
	profileImageWrapper.addGallery();
	
	//Wypełnienie wartościami
	profileImageButtons.find("a").attr({href: "javascript:;"});
	profileImageWrapperImg.attr({src: "img/user_images/" + imageData.userId + "/" + imageData.filename});
	profileImageWrapperImg.data({"gallery-image-id": imageData.localId});
	
	profileImageInfoH3.text(imageData.title);
	profileImageInfoP.text(imageData.caption);
	profileImageButtonsThumbsUp.data({"image-id": imageData.id});
	profileImageButtonsThumbsDown.data({"image-id": imageData.id});
	profileImageButtonsComments.data({"image-id": imageData.id});
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
			
			var buttons = self.parent(".profile-image-buttons-feedback").find(".button");
			buttons.eq(0).find("span").text((data.thumbsUp) ? " (" + data.thumbsUp + ")": "");
			buttons.eq(1).find("span").text((data.thumbsDown) ? " (" + data.thumbsDown + ")": "");
			
			var wasThumbed = self.hasClass("thumbed");
			self.parent(".profile-image-buttons-feedback").find(".button").removeClass("thumbed");
			if(!wasThumbed)
				self.addClass("thumbed");
		}
	});
}

function toggleOpenComments() {
	var self = $(this);
	var profileImagePanel = self.parents(".profile-image-panel");
	if(!profileImagePanel.find(".profile-image-comment-box").length)
		ajaxOpenComments(self.data("image-id"), profileImagePanel);
	else
		closeComments(profileImagePanel);
		
}

function closeComments(profileImagePanel) {
	profileImagePanel.find(".profile-image-comment-box").remove();
}

function ajaxOpenComments(imageId, profileImagePanel) {
	$.ajax("common.php?action=image_comments", {
		method: "post",
		data: {
			"image_id": imageId
		},
		dataType: "json",
		success: function (data) {
			if(!data.success)
				return;
			
			var profileImageCommentBox = profileImageCommentBoxCreate(imageId, data.comments);
			profileImagePanel.append(profileImageCommentBox);
		}
	});
}

function profileImageCommentBoxCreate(imageId, comments) {
	var profileImageCommentBox = $("<div>").addClass("profile-image-comment-box");
	var profileImageCommentInnerBox = $("<div>").addClass("profile-image-comment-inner-box");
	var profileImageComments = $("<div>").addClass("profile-image-comments");
	var profileImageCommentForm = $("<div>").addClass("profile-image-comment-form");
	var profileImageCommentFormTextArea = $("<textarea>");
	var profileImageCommentFormButton = $("<button>").addClass("button-light").addClass("button-primary");
	
	//Appendy
	profileImageCommentBox.append(profileImageCommentInnerBox);
	profileImageCommentInnerBox.append(profileImageComments);
	profileImageCommentInnerBox.append(profileImageCommentForm);
	profileImageCommentForm.append(profileImageCommentFormTextArea);
	profileImageCommentForm.append(profileImageCommentFormButton);
	
	//Wypełnienie danych
	profileImageCommentForm.data({"image-id": imageId});
	profileImageCommentFormButton.text("Wyślij komentarz");
	
	if(!comments.length)
		profileImageComments.html("<span>Brak komentarzy</span>");
	
	for(var i = 0; i < comments.length; i++)
		profileImageComments.append(profileImageCommentCreate(comments[i]));
	
	//Eventy
	profileImageCommentFormButton.click(ajaxSendImageComment);
	profileImageCommentFormTextArea.keydown(ajaxSendImageComment)
	
	return profileImageCommentBox;
}

function profileImageCommentCreate(commentData) {
	var profileComment = $("<div>").addClass("profile-comment");
	var profileCommentAvatar = $("<div>").addClass("profile-comment-avatar");
	var profileAvatarMini = $("<div>").addClass("profile-avatar-mini");
	var profileAvatarMiniA = $("<a>");
	var profileAvatarMiniImg = $("<img>");
	var profileCommentContent = $("<div>").addClass("profile-comment-content");
	var profileCommentContentH6 = $("<h6>");
	var profileCommentContentH6A = $("<a>");
	var profileCommentContentH6Small = $("<small>");
	var profileCommentContentP = $("<p>");
	
	//Appendy
	profileComment.append(profileCommentAvatar);
	profileComment.append(profileCommentContent);
	profileCommentAvatar.append(profileAvatarMini);
	profileCommentAvatar.append(profileAvatarMiniA);
	profileAvatarMiniA.append(profileAvatarMini);
	profileAvatarMini.append(profileAvatarMiniImg);
	profileCommentContent.append(profileCommentContentH6);
	profileCommentContent.append(profileCommentContentP);
	profileCommentContentH6.append(profileCommentContentH6A);
	profileCommentContentH6.append(profileCommentContentH6Small);
	
	//Wypełnienie danych
	profileAvatarMiniImg.attr({src: commentData.avatar});
	profileAvatarMiniA.attr({href: "profil.php?id=" + commentData.userId});
	profileCommentContentH6A.attr({href: "profil.php?id=" + commentData.userId});
	profileCommentContentH6A.text(commentData.fullname + " ");
	profileCommentContentH6Small.text(commentData.date);
	profileCommentContentP.text(commentData.content);
	
	return profileComment;
}

function ajaxSendImageComment() {
	if(event.type == "keydown")
		if(event.keyCode == 13)
			event.preventDefault();
		else
			return;

	var self = $(this);
	var profileImageCommentForm = self.parents(".profile-image-comment-form");
	var profileImageCommentFormTextArea = profileImageCommentForm.children("textarea");
	var comment = profileImageCommentFormTextArea.val();
	profileImageCommentFormTextArea.val("");
	var imageId = profileImageCommentForm.data("image-id");
	
	if(!comment.length)
		return;
	
	$.ajax("common.php?action=image_post_comment", {
		method: "post",
		data: {
			"image_id": imageId,
			"comment": comment
		},
		dataType: "json",
		success: function (data) {
			if(!data.success)
				return;
			
			var profileComment = profileImageCommentCreate(data.comment);
			var profileImageComments = profileImageCommentForm.parents(".profile-image-comment-inner-box").find(".profile-image-comments");
			profileImageComments.find("span").remove();
			profileImageComments.append(profileComment);
		}
	});
}

function ajaxDeleteImage() {
	var self = $(this);
	var imageId = self.data("image-id");
	$.ajax("common.php?action=image_delete", {
		method: "post",
		data: {
			"image_id": imageId,
		},
		dataType: "json",
		success: function (data) {
			if(!data.success)
				return;
			
			self.parents(".profile-image-box").remove();
		}
	});
}

function toggleEditImage() {
	var self = $(this);
	var imageId = self.data("image-id");
	var profileImagePanel = self.parents(".profile-image-panel");
	if(profileImagePanel.find("h3").length)
		switchOnEditImage(profileImagePanel, imageId);
	else
		switchOffEditImage(profileImagePanel);
	normalizeProfileImages();
}

function switchOnEditImage(profileImagePanel, imageId) {
	var profileImageButtons = profileImagePanel.find(".profile-image-buttons");
	var profileImageButtonsFeedback = profileImageButtons.find(".profile-image-buttons-feedback");
	var profileImagePanelH3 = profileImagePanel.find("h3");
	var profileImagePanelP = profileImagePanel.find("p");
	var profileImagePanelInputTitle = $("<input>").attr({type: "text", placeholder: "Tytuł"}).addClass("image-edit-input").addClass("title");
	var profileImagePanelInputCaption = $("<input>").attr({type: "text", placeholder: "Podpis"}).addClass("image-edit-input").addClass("caption");
	var profileImagePanelSaveButton = $("<button>").addClass("image-save-edit").addClass("button-primary").addClass("button-light").text("Zapisz");
	profileImagePanelInputTitle.val(profileImagePanelH3.text());
	profileImagePanelInputTitle.data({"default": profileImagePanelH3.text()});
	profileImagePanelInputCaption.val(profileImagePanelP.text());
	profileImagePanelInputCaption.data({"default": profileImagePanelP.text()});
	profileImagePanelH3.replaceWith(profileImagePanelInputTitle);
	profileImagePanelP.replaceWith(profileImagePanelInputCaption);
	
	profileImageButtons.prepend(profileImagePanelSaveButton);
	profileImagePanelSaveButton.data({"image-id": imageId})
	profileImagePanelSaveButton.click(ajaxEditImage);
	profileImageButtonsFeedback.hide();
	
}

function switchOffEditImage(profileImagePanel) {
	var profileImagePanelInputTitle = profileImagePanel.find(".image-edit-input.title");
	var profileImagePanelInputCaption = profileImagePanel.find(".image-edit-input.caption");
	var profileImagePanelSaveButton = profileImagePanel.find(".image-save-edit");
	var profileImageButtonsFeedback = profileImagePanel.find(".profile-image-buttons-feedback");
	var profileImagePanelH3 = $("<h3>");
	var profileImagePanelP = $("<p>");
	profileImagePanelH3.text(profileImagePanelInputTitle.data("default"))
	profileImagePanelP.text(profileImagePanelInputCaption.data("default"))
	profileImagePanelInputTitle.replaceWith(profileImagePanelH3);
	profileImagePanelInputCaption.replaceWith(profileImagePanelP);
	profileImagePanelSaveButton.remove();
	profileImageButtonsFeedback.show();
}

function ajaxEditImage() {
	var self = $(this);
	var imageId = self.data("image-id");
	var profileImagePanel = self.parents(".profile-image-panel");
	var profileImagePanelInputTitle = profileImagePanel.find(".image-edit-input.title");
	var profileImagePanelInputCaption = profileImagePanel.find(".image-edit-input.caption");
	$.ajax("common.php?action=image_edit", {
		method: "post",
		data: {
			"image_id": imageId,
			"title": profileImagePanelInputTitle.val(),
			"caption": profileImagePanelInputCaption.val(),
		},
		dataType: "json",
		success: function (data) {
			if(!data.success)
				return;
			
			profileImagePanelInputTitle.data({"default": data.title});
			profileImagePanelInputCaption.data({"default": data.caption});
			switchOffEditImage(profileImagePanel);
		}
	});
}

function ajaxSearch() {
	var self = $(this);
	
	if(event.type == "click")
		self = self.siblings("#search");
	
	var searchResults = self.siblings("#search-results");
	if(event.keyCode == 27)
	{
		searchResults.hide();
		return;
	}
	
	var query = self.val();
	$.ajax("common.php?action=search_page", {
		method: "post",
		data: {
			"query": query,
		},
		dataType: "json",
		success: function (data) {
			if(!data.success) {
				searchResults.hide();
				return;
			}

			searchResults.html("");
			searchResults.show();
			
			if(!data.items.length) {
				var searchResultsNoResultsSpan = $("<div>").addClass("search-results-no-results");
				searchResultsNoResultsSpan.text("brak wyników");
				searchResults.html(searchResultsNoResultsSpan);
				return;
			}
			
			for(var i = 0; i < data.items.length; i++) {
				searchResults.append(searchResultItemCreate(data.items[i]));
			}
		}
	});
}

function searchResultItemCreate(searchItemData) {
	var searchResultItem = $("<a>").addClass("search-results-item");
	var searchResultsAvatar = $("<div>").addClass("search-results-avatar");
	var searchResultsInfo = $("<div>").addClass("search-results-info");
	var profileAvatarMini = $("<div>").addClass("profile-avatar-mini");
	var profileAvatarMiniImg = $("<img>");
	var searchResultsInfoH6 = $("<h6>");
	
	//Appendy
	searchResultItem.append(searchResultsAvatar);
	searchResultItem.append(searchResultsInfo);
	searchResultsAvatar.append(profileAvatarMini);
	profileAvatarMini.append(profileAvatarMiniImg);
	searchResultsInfo.append(searchResultsInfoH6);
	
	//Wypełnienie danych
	searchResultItem.attr({href: "profil.php?id=" + searchItemData.id});
	profileAvatarMiniImg.attr({src: searchItemData.avatar});
	searchResultsInfoH6.text(searchItemData.fullname);
	
	return searchResultItem;
}

