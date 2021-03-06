window.onscroll = function () {
	stickyToggle(), addTopButton();
};
var header = document.getElementById("navbar"),
	sticky = header.offsetTop;

function stickyToggle() {
	window.pageYOffset > sticky ? header.classList.add("sticky") : header.classList.remove("sticky");
}

function addTopButton() {
	document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ? (document.getElementById("to-top").style.display = "block") : (document.getElementById("to-top").style.display = "none");
}

function toTop() {
	(document.body.scrollTop = 0), (document.documentElement.scrollTop = 0);
}

function toggleMenu() {
	0 == header.className.includes("responsive") ? openMenu() : closeMenu();
}

function openMenu() {
	header.classList.add("responsive");
}

function closeMenu() {
	header.classList.remove("responsive");
}