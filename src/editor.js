'use strict';

var view = `
	<div class="block-container live-edit-editor no-padding">
		<button class="format" data-format-method="bold"><strong>B</strong></button>
		<button class="format" data-format-method="italic"><em>I</em></button>
		<button class="format" data-format-method="underline"><span style="text-decoration: underline;">U</button>
		<button class="make-link"><?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg enable-background="new 0 0 16 16" height="12px" id="Layer_1" version="1.1" viewBox="0 0 24 24" width="12px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M16.9,7.1c-0.4-0.4-1-0.4-1.4,0l-8.4,8.4c-0.4,0.4-0.4,1,0,1.4c0.4,0.4,1,0.4,1.4,0l8.4-8.4C17.3,8.1,17.3,7.5,16.9,7.1z"/><path d="M8.5,22.5L12,19c1.4-1.4,1.8-3.5,1.1-5.3l-1.7,1.7c0,0.8-0.2,1.6-0.9,2.3l-3.5,3.5c-1.2,1.2-3.1,1.2-4.2,0   c-1.2-1.2-1.2-3.1,0-4.2l3.5-3.5c0.6-0.6,1.5-0.9,2.3-0.9l1.7-1.7C8.5,10.2,6.4,10.5,5,12l-3.5,3.5c-1.9,1.9-1.9,5.1,0,7   C3.4,24.5,6.6,24.5,8.5,22.5z"/><path d="M13.4,6.4l3.5-3.5c1.2-1.2,3.1-1.2,4.2,0s1.2,3.1,0,4.2l-3.5,3.5c-0.6,0.6-1.5,0.9-2.3,0.9l-1.7,1.7   c1.8,0.7,3.9,0.3,5.3-1.1l3.5-3.5c1.9-1.9,1.9-5.1,0-7c-1.9-1.9-5.1-1.9-7,0L12,5c-1.4,1.4-1.8,3.5-1.1,5.3l1.7-1.7   C12.5,7.8,12.8,7,13.4,6.4z"/></g></svg></button>
		<button class="format" data-format-method="insertUnorderedList"><?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg enable-background="new 0 0 61 47" height="12px" id="Layer_1" version="1.1" viewBox="0 0 61 47" width="12px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><rect fill="#231F20" height="5" width="48" x="13" y="21"/><circle cx="4.5" cy="23.5" fill="#231F20" r="4.5"/><rect fill="#231F20" height="5" width="48" x="13" y="2"/><circle cx="4.5" cy="4.5" fill="#231F20" r="4.5"/><rect fill="#231F20" height="5" width="48" x="13" y="40"/><circle cx="4.5" cy="42.5" fill="#231F20" r="4.5"/></g></svg></button>
		<button class="format" data-format-method="insertOrderedList">1.</button>
		<button class="format" data-format-method="removeFormat"><?xml version="1.0" ?><svg height="12px" viewBox="0 0 48 48" width="12px" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48h-48z" fill="none"/><path d="M6.54 10l-2.54 2.55 13.94 13.94-4.94 11.51h6l3.14-7.32 11.32 11.32 2.54-2.55-28.91-28.9-.55-.55zm5.46 0v.36l5.64 5.64h4.79l-1.44 3.35 4.2 4.2 3.24-7.55h11.57v-6h-28z"/></svg></button>
		<!--<button class="format" data-format-method="justifyLeft"><?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg enable-background="new 0 0 24 24" height="12px" id="Layer_1" version="1.1" viewBox="0 0 24 24" width="12px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path clip-rule="evenodd" d="M17.986,16.001c0,0.274-0.223,0.499-0.5,0.499H0.5c-0.275,0-0.5-0.225-0.5-0.499  V14c0-0.275,0.225-0.5,0.5-0.5h16.986c0.277,0,0.5,0.225,0.5,0.5V16.001z M21.986,8c0-0.275-0.223-0.5-0.5-0.5H0.5  C0.225,7.5,0,7.725,0,8v2.001C0,10.275,0.225,10.5,0.5,10.5h20.986c0.277,0,0.5-0.225,0.5-0.499V8z M13.986,2  c0-0.275-0.223-0.5-0.5-0.5H0.5C0.225,1.5,0,1.725,0,2v2.001C0,4.275,0.225,4.5,0.5,4.5h12.986c0.277,0,0.5-0.225,0.5-0.499V2z   M24,20c0-0.275-0.225-0.5-0.5-0.5h-23C0.225,19.5,0,19.725,0,20v2.001C0,22.275,0.225,22.5,0.5,22.5h23  c0.275,0,0.5-0.225,0.5-0.499V20z" fill-rule="evenodd"/></svg></button>
		<button class="format" data-format-method="justifyCenter"><?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg enable-background="new 0 0 24 24" height="12px" id="Layer_1" version="1.1" viewBox="0 0 24 24" width="12px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path clip-rule="evenodd" d="M4,14c0-0.275,0.225-0.5,0.5-0.5h15c0.275,0,0.5,0.225,0.5,0.5v2.001  c0,0.274-0.225,0.499-0.5,0.499h-15c-0.275,0-0.5-0.225-0.5-0.499V14z M0,10.001C0,10.275,0.225,10.5,0.5,10.5h23  c0.275,0,0.5-0.225,0.5-0.499V8c0-0.275-0.225-0.5-0.5-0.5h-23C0.225,7.5,0,7.725,0,8V10.001z M4,4.001C4,4.275,4.225,4.5,4.5,4.5  h15c0.275,0,0.5-0.225,0.5-0.499V2c0-0.275-0.225-0.5-0.5-0.5h-15C4.225,1.5,4,1.725,4,2V4.001z M0,22.001  C0,22.275,0.225,22.5,0.5,22.5h23c0.275,0,0.5-0.225,0.5-0.499V20c0-0.275-0.225-0.5-0.5-0.5h-23C0.225,19.5,0,19.725,0,20V22.001z" fill-rule="evenodd"/></svg></button>
		<button class="format" data-format-method="justifyRight"><?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg enable-background="new 0 0 24 24" height="12px" id="Layer_1" version="1.1" viewBox="0 0 24 24" width="12px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path clip-rule="evenodd" d="M6.014,14c0-0.274,0.223-0.5,0.5-0.5H23.5c0.275,0,0.5,0.225,0.5,0.5v2.001  c0,0.274-0.225,0.499-0.5,0.499H6.514c-0.277,0-0.5-0.225-0.5-0.499V14z M2.014,10.001c0,0.274,0.223,0.499,0.5,0.499H23.5  c0.275,0,0.5-0.225,0.5-0.499V8c0-0.274-0.225-0.5-0.5-0.5H2.514c-0.277,0-0.5,0.225-0.5,0.5V10.001z M10.014,4.001  c0,0.274,0.223,0.499,0.5,0.499H23.5c0.275,0,0.5-0.225,0.5-0.499V2c0-0.274-0.225-0.5-0.5-0.5H10.514c-0.277,0-0.5,0.225-0.5,0.5  V4.001z M0,22.001C0,22.275,0.225,22.5,0.5,22.5H23.5c0.275,0,0.5-0.225,0.5-0.499V20c0-0.274-0.225-0.5-0.5-0.5H0.5  C0.225,19.5,0,19.725,0,20V22.001z" fill-rule="evenodd"/></svg></button> -->
	</div>
`;

var domUtils = (function() {
	var offset = function(el) {
		var rect = el.getBoundingClientRect();
		var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		return {
			top: rect.top + scrollTop,
			left: rect.left + scrollLeft
		};
	};

	window.$ = function(selector) {
		var selector = document.querySelectorAll(selector);

		if (selector.length === 1) {
			return selector[0];
		}

		return selector;
	};

	return {
		offset: offset
	};
})();

var formatter = (function() {
	var format = function(options) {
		document.execCommand(options.method, false, options.data);
		if (options.onComplete) {
			options.onComplete();
		}
	};

	return {
		format: format
	};
})();

var editor = (function() {

	var attachListeners = function(nodes) {

		nodes.forEach(function(node) {
			node.addEventListener('focus', function(event) {
				var coordinates = domUtils.offset(node);

				activateEditor(coordinates);
			});
		});

		$('.format').forEach(function(node) {
			node.addEventListener(
				'mousedown',
				function(event) {
					event.preventDefault();
					let method = node.getAttribute('data-format-method');
					formatter.format(
						{
							method: method
						}
					);
				}
			);
		});

		$('.make-link')
			.addEventListener(
				'mousedown',
				function(event) {
					var editor = $('.live-edit-editor');

					var link = prompt("Link URL");

					if (link) {
						document.execCommand("createLink", false, link);
					}

				}
			);

		$('a').forEach(function(node) {
			node.addEventListener(
				'click',
				function(event) {
					event.preventDefault();
				}
			);
		});
	};

	var appendEditor = function() {
		var body = $('body');

		body.insertAdjacentHTML('beforeend', view);
	};

	// our master init function
	var activate = function(selector, options) {

		var nodes = $(selector);

		nodes.forEach(function(node) {
			node.setAttribute('contenteditable', 'true');
			node.setAttribute('spellcheck', 'true');
		});

		appendEditor();

		attachListeners(nodes);

		formatter.format(
			{
				method: 'styleWithCSS',
				data: true
			}
		);

	};

	var activateEditor = function(coordinatesObj) {
		var editor = $('.live-edit-editor');
		var editorHeight = editor.offsetHeight;
		var editorWidth = editor.offsetWidth;

		editor.style.left = `${coordinatesObj.left + editorWidth/2}px`;
		editor.style.top = `${coordinatesObj.top - editorHeight - 10}px`;
	};

	return {
		activate: activate
	};
})();