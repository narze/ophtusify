export default function dragElement(elmnt) {
	let pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
	if (elmnt) {
		/* if present, the header is where you move the DIV from:*/
		elmnt.onmousedown = dragMouseDown;
		elmnt.ontouchstart = dragMouseDown;
	} else {
		/* otherwise, move the DIV from anywhere inside the DIV:*/
		elmnt.onmousedown = dragMouseDown;
		elmnt.ontouchstart = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		if (e.type === 'touchstart') {
			pos3 = e.touches[0].clientX;
			pos4 = e.touches[0].clientY;
		} else {
			pos3 = e.clientX;
			pos4 = e.clientY;
		}

		document.onmouseup = closeDragElement;
		document.ontouchend = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
		document.ontouchmove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		if (e.type === 'touchmove') {
			//if its a touchscreen
			pos1 = pos3 - e.touches[0].clientX;
			pos2 = pos4 - e.touches[0].clientY;
			pos3 = e.touches[0].clientX;
			pos4 = e.touches[0].clientY;
		} else {
			//if its not a touchscreen (mouse)
			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;
		}

		// set the element's new position:
		elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
		elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
	}

	function closeDragElement() {
		/* stop moving when mouse button is released:*/
		document.onmouseup = null;
		document.ontouchend = null;
		document.onmousemove = null;
		document.ontouchmove = null;
	}
}
