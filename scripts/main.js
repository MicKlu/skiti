$(function () {
	$(window).on("resize", normalizeProfileImages)
	normalizeProfileImages();
})

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