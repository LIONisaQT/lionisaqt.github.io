let imgArray = [];

let filepath = '/static/creativity/app-screenshots/creations/';
for (let i = 1; i < 14; i++) {
	imgArray.push(filepath + i.toString().padStart(2, '0') + ".jpg");
}

curIndex = -1;
imgDuration = 5000;

function slideShow() {
	document.getElementById('slider').className += "fadeOut";
	setTimeout(function () {
		document.getElementById('slider').src = imgArray[curIndex];
		document.getElementById('slider').className = "";
	}, 750);
	curIndex++;
	if (curIndex == imgArray.length) {
		curIndex = 0;
	}
	setTimeout(slideShow, imgDuration);
}

slideShow();