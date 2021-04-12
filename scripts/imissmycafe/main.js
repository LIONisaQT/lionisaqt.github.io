const embedLink = "https://www.youtube.com/embed?autoplay=1&listType=playlist&list=";

const lofiPlaylists = [
	"https://www.youtube.com/embed?autoplay=1&listType=playlist&list=",
	"https://www.youtube.com/embed?autoplay=1&listType=playlist&list=",
	"https://www.youtube.com/embed?autoplay=1&listType=playlist&list=",
	"https://www.youtube.com/embed?autoplay=1&listType=playlist&list="
];

const kpopPlaylists = [
	"https://www.youtube.com/embed?autoplay=1&listType=playlist&list=",
	"https://www.youtube.com/embed?autoplay=1&listType=playlist&list=",
	"https://www.youtube.com/embed?autoplay=1&listType=playlist&list=",
];

const jpopPlaylists = [
	"https://www.youtube.com/embed?autoplay=1&listType=playlist&list=",
	"https://www.youtube.com/embed?autoplay=1&listType=playlist&list=",
];

const animePlaylists = [
	"https://www.youtube.com/embed?autoplay=1&listType=playlist&list=",
];

const gamesPlaylists = [
	"https://www.youtube.com/embed?autoplay=1&listType=playlist&list=",
	"https://www.youtube.com/embed?autoplay=1&listType=playlist&list=",
	"https://www.youtube.com/embed?autoplay=1&listType=playlist&list=",
	"https://www.youtube.com/embed?autoplay=1&listType=playlist&list=",
	"https://www.youtube.com/embed?autoplay=1&listType=playlist&list="
];

const playlistMap = new Map();
playlistMap.set('Lo-fi', lofiPlaylists);
playlistMap.set('K-pop', kpopPlaylists);
playlistMap.set('J-pop', jpopPlaylists);
playlistMap.set('Anime', animePlaylists);
playlistMap.set('Games', gamesPlaylists);

var playlistHolder = "Lo-fi";
var currentPlaylist = playlistHolder;
var currentIndex = 1;
var currentBackground = "Rain";

var somethingOpen = false;

window.onload = function() {
	registerEvents();
	manageURLArgs();
};

function playlistSelected(playlistName) {
	// Close dropdown.
	dropdownLeave(null, 'playlist');

	// Save playlist name temporarily.
	playlistHolder = playlistName;

	manageSelectedOption('playlist', playlistName);

	// Clear div of all child elements.
	let playlistParent = document.getElementById('playlist-parent');
	while (playlistParent.firstChild) {
		playlistParent.removeChild(playlistParent.lastChild);
	}

	// Add playlists as children to div.
	if (playlistName != "Use My Own") {
		let playlists = playlistMap.get(playlistName);
		for (let i = 1; i <= playlists.length; i++) {
			let link = document.createElement('p');
			link.id = i;
			let num = document.createTextNode(padWithZeroes(i, 2));
			if (link.addEventListener) {
				link.addEventListener('click', e => subPlaylistSelected(e, i), false);
			} else {
				link.attachEvent('onclick',  e => subPlaylistSelected(e, i));
			}
			link.appendChild(num);
			playlistParent.appendChild(link);
		}

		if (playlistName == currentPlaylist) {
			uncolorSubPlaylists(currentIndex);
		}
	} else {
		console.log('drop textbox here');
	}
}

function subPlaylistSelected(event, index) {
	currentPlaylist = playlistHolder;
	currentIndex = parseInt(index);
	uncolorSubPlaylists(index);
	buildURL();
}

function uncolorSubPlaylists(index) {
	let nodes = document.getElementById('playlist-parent').childNodes;
	nodes.forEach(node => {
		node.style.color = 'white';
		node.style.borderBottom = '0px';
	});

	let subPlaylist = document.getElementById(index);
	subPlaylist.style.color = '#a7bfff';
	subPlaylist.style.borderBottom = '2px solid #a7bfff';
}

function backgroundSelected(background) {
	dropdownLeave(null, 'background');
	currentBackground = background;
	manageSelectedOption('background', background);
	buildURL();
}

function submit(event) {
	if (event.keyCode === 13) {
		let input = document.getElementById("input");
		refreshPlaylist(input.value);
	}
}

function refreshPlaylist(playlistId) {
	let iframe = document.getElementById("playlist");
	iframe.src = "";
	iframe.src = embedLink + playlistId;

	let input = document.getElementById("input");
	input.value = "";

	localStorage.setItem("lastPlaylistId", playlistId);
}

// TODO: Utility methods, move to another JS file.
function registerEvents() {
	let playlistParent = document.getElementById('playlist-select');
	playlistParent.addEventListener('mouseover', e => resizeDropdownWidth(e, 'playlist'));

	let playlistArea = document.getElementById('playlist-area');
	playlistArea.addEventListener('mouseleave', e => dropdownLeave(e, 'playlist'));

	let backgroundParent = document.getElementById('background-select');
	backgroundParent.addEventListener('mouseover', e => resizeDropdownWidth(e, 'background'));

	let backgroundArea = document.getElementById('background-area');
	backgroundArea.addEventListener('mouseleave', e => dropdownLeave(e, 'background'));
}

function dropdownLeave(event, type) {
	if (type != undefined) {
		somethingOpen = false;

		let dropdown = document.getElementById(type + '-dropdown');
		dropdown.style.display = "none";

		let select = document.getElementById(type + '-select');
		select.style.borderBottomLeftRadius = '6px';
		select.style.borderBottomRightRadius = '6px';
	}
}

function dropdownClicked(type) {
	somethingOpen = !somethingOpen;

	if (somethingOpen) {
		let dropdown = document.getElementById(type + '-dropdown');
		dropdown.style.display = 'block';

		let select = document.getElementById(type + '-select');
		select.style.borderBottomLeftRadius = '0px';
		select.style.borderBottomRightRadius = '0px';
	} else {
		dropdownLeave(null, type);
	}
}

function resizeDropdownWidth(event, element) {
	let playlistSelect = document.getElementById(element + '-select');
	let buttonSize = playlistSelect.offsetWidth;
	let dropdownParent = document.getElementById(element + '-dropdown');
	dropdownParent.style.width = (buttonSize - 4) + 'px'; // -4 because the dropdown's box shadow is 2 pixels on both sides
}

function manageURLArgs() {
	let url = window.location.href;
	if (url.includes('#')) {
		url = url.substr(url.indexOf('#') + 1);
		const args = url.split(',');
		let playlist = args[0];

		// If we're using our own playlist, check localStorage for it. Play lo-fi if it doesn't exist.
		if (playlist === 'Use My Own') {
			let lastId = localStorage.getItem('lastPlaylistId');
			if (lastId != null) {
				let iframe = document.getElementById('playlist');
				if (!iframe.src.includes(lastId)) {
					refreshPlaylist(lastId);
				}
			} else {
				playlistSelected(args[0]);
			}
		} else {
			playlistSelected(args[0]);
		}

		subPlaylistSelected(null, parseInt(args[1]));
		backgroundSelected(args[2]);
	} else {
		playlistSelected('Lo-fi');
		backgroundSelected('Rain');
	}
}

function manageSelectedOption(type, option) {
	// Change button text.
	let select = document.getElementById(type + '-select');
	select.innerHTML = option;

	// Set currently selected background name in the dropdown.
	let nodes = document.getElementById(type + '-dropdown').childNodes;
	nodes.forEach(node => {
		if (node.style != undefined) {
			node.innerHTML = node.innerHTML.substr(node.innerHTML.indexOf('✓ ') + 1);
			node.style.fontWeight = "normal";
		}
	});

	// Set style of selected background.
	let selection = document.getElementById(option);
	selection.innerHTML = '✓ ' + selection.innerHTML;
	selection.style.fontWeight = "bold";
}

function buildURL() {
	let url = window.location.href;
	let args = currentPlaylist + "," + currentIndex + "," + currentBackground;

	if (url.includes('#')) {
		let baseURL = url.substr(0, url.indexOf('#'));
		window.location.href = baseURL + "#" + args;
	} else {
		window.location.href += "#" + args;
	}
}

function padWithZeroes(number, length) {
	let paddedString = '' + number;
	while (paddedString.length < length) {
		paddedString = '0' + paddedString;
	}

	return paddedString;
}