'use strict';

var view = `<div class="live-edit-editor">`;


AUI().ready(
	'aui-io-request',
	'datatype-xml',
	'liferay-portlet-url',
	function(A) {
		var addInfo = function(node) {
			var articleId = node.attr('data-article-id');
			var levelPath = node.attr('data-level-path');

			var content = node.getContent();

			if ((content == '') || (node._initialContent.trim() == content.trim())) {
				clearField(node, true);

				return;
			}

			if (!liveEditInfo[articleId]) {
				liveEditInfo[articleId] = {};
			}

			liveEditInfo[articleId][levelPath] = content;

			clearControls();

			liveEditControls.addClass('edits-pending');
			node.addClass('live-edited');
		};

		var clearControls = function() {
			liveEditControls.removeClass('edits-pending');
			liveEditControls.removeClass('update-failure');
			liveEditControls.removeClass('update-sending');
			liveEditControls.removeClass('update-success');
		};

		var clearField = function(node, reset) {
			var articleId = node.attr('data-article-id');
			var levelPath = node.attr('data-level-path');

			if (liveEditInfo[articleId] && liveEditInfo[articleId][levelPath]) {
				delete liveEditInfo[articleId][levelPath];

				if (Object.keys(liveEditInfo[articleId]).length == 0) {
					delete liveEditInfo[articleId];
				}

				if (Object.keys(liveEditInfo).length == 0) {
					clearControls();
				}
			}

			node.removeClass('live-edited');

			if (reset) {
				node.setContent(node._initialContent);
			}
		};

		var clearFields = function(reset) {
			A.all('.live-edited').each(
				function(node) {
					clearField(node, reset);
				}
			);
		};

		var getArticle = function(groupId, articleId, updates) {
			Liferay.Service(
				'/journalarticle/get-article',
				{
					articleId: articleId,
					groupId: groupId,
					status: -1
				},
				function(obj) {
					var exception = obj.exception;

					if (!exception) {
						sendUpdate(obj, updates);
					}
					else {
						liveEditControls.addClass('update-failure');
					}
				}
			);
		};

		var sendUpdate = function(article, updates) {
			if (!article) {
				liveEditControls.addClass('update-failure');

				return;
			}

			var content = A.XML.parse(article.content);

			var availableLocales = content.firstChild.getAttribute('available-locales');

			if (availableLocales.indexOf(themeDisplay.getLanguageId()) == -1) {
				updateTranslation(article, content, updates);
			}
			else {
				updateArticle(article, content, updates);
			}
		};

		var updateArticle = function(article, content, updates) {
			content = updateContent(content, updates);

			Liferay.Service(
				'/journalarticle/update-article',
				{
					articleId: article.articleId,
					content: (new XMLSerializer()).serializeToString(content),
					folderId: article.folderId,
					groupId: article.groupId,
					version: article.version
				},
				function(obj) {
					var exception = obj.exception;

					if (!exception) {
						updateSuccessCount++;

						if (updateSuccessCount == Object.keys(liveEditInfo).length) {
							clearControls();
							clearFields();

							liveEditControls.addClass('update-success');
						}
					}
					else {
						clearControls();

						liveEditControls.addClass('update-failure');
					}
				}
			);
		};

		var updateContent = function(content, updates) {
			for (var key in updates) {
				if (updates.hasOwnProperty(key)) {
					var currentElement = content;
					var levels = key.split(',');

					for (var i in levels) {
						var levelObj = levels[i].split('::');

						var index = levelObj[1];
						var name = levelObj[0];

						var dynamicElements = currentElement.getElementsByTagName('dynamic-element');
						var dynamicElementCount = 0;

						for (var i in dynamicElements) {
							if (dynamicElements[i].getAttribute('name') == name) {
								if (dynamicElementCount == index) {
									currentElement = dynamicElements[i];

									break;
								}

								dynamicElementCount++;
							}
						}
					}

					var currentElementChildren = currentElement.childNodes;
					var languageFound = false;

					for (var i in currentElementChildren) {
						var currentElementChild = currentElementChildren[i];

						if ((currentElementChild.tagName == 'dynamic-content') && (themeDisplay.getLanguageId() == currentElementChild.getAttribute('language-id'))) {
							var cdataSection = content.createCDATASection(updates[key]);

							currentElementChild.replaceChild(cdataSection, currentElementChild.firstChild);

							languageFound = true;
						}
					}

					if (!languageFound) {
						var dynamicContent = content.createElement('dynamic-content');

						dynamicContent.setAttribute('language-id', themeDisplay.getLanguageId());

						var cdataSection = content.createCDATASection(updates[key]);

						dynamicContent.appendChild(cdataSection);

						currentElement.appendChild(dynamicContent);
					}
				}
			}

			return content;
		};

		var updateTranslation = function(article, content, updates) {
			var rootElement = content.firstChild;

			var availableLocales = rootElement.getAttribute('available-locales') + ',' + themeDisplay.getLanguageId();

			rootElement.setAttribute('available-locales', availableLocales);

			Liferay.Service(
				'/journalarticle/update-article-translation',
				{
					articleId: article.articleId,
					content: (new XMLSerializer()).serializeToString(content),
					description: '',
					groupId: article.groupId,
					images: {},
					locale: themeDisplay.getLanguageId(),
					title: '',
					version: article.version
				},
				function(obj) {
					var exception = obj.exception;

					if (!exception) {
						updateArticle(obj, A.XML.parse(obj.content), updates);
					}
					else {
						clearControls();

						liveEditControls.addClass('update-failure');
					}
				}
			);
		};

		window.liveEditClear = function() {
			clearFields(true);
		};

		window.liveEditInfo = {};

		window.liveEditSave = function() {
			liveEditControls.addClass('update-sending');

			updateSuccessCount = 0;

			for (var key in liveEditInfo) {
				if (liveEditInfo.hasOwnProperty(key)) {
					getArticle(themeDisplay.getScopeGroupId(), key, liveEditInfo[key]);
				}
			}
		};

		var body = A.getBody();

		body.append('<div id="liveEditControls"><a href="javascript:;" onclick="liveEditSave()">Save</a><a href="javascript:;" onclick="liveEditClear()">Cancel</a></div>');

		var liveEditControls = A.one('#liveEditControls');

		body.delegate(
			'focus',
			function(event) {

				if (!body.hasClass('controls-visible')) {
					return;
				}

				event.preventDefault();

				var node = event.currentTarget;

				console.log(node.getContent());

				if (!node._initialContent) {
					node._initialContent = node.getContent();
				}

				node.on(
					'blur',
					function(event) {
						node.detach('blur');

						addInfo(node);
					}
				);
			},
			'.live-edit'
		);
	}
);
