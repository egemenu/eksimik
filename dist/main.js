'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = {
	url: {
		main: 'https://eksisozluk.com',
		popular: 'https://eksisozluk.com/basliklar/m/populer'
	},
	handler: {
		first_entry: '#entry-item-list > li:first-of-type',
		entry_list: 'ul.topic-list.partial.mobile>li',
		content: '.content',
		author: '.entry-author',
		date: '.entry-date'
	}
};

var Parser = function () {
	function Parser(html, query) {
		_classCallCheck(this, Parser);

		this.html = html;
		this.query = query;
	}

	_createClass(Parser, [{
		key: 'getElementList',
		value: function getElementList() {
			var obj = document.createElement('div');
			obj.innerHTML = this.html;
			return obj.querySelectorAll(this.query);
		}
	}, {
		key: 'getElement',
		value: function getElement() {
			var obj = document.createElement('div');
			obj.innerHTML = this.html;
			return obj.querySelector(this.query);
		}
	}, {
		key: 'parseEntry',
		value: function parseEntry() {
			var obj = document.createElement('div');
			obj.innerHTML = this.html;
			var holder = obj.querySelector(this.query);
			var content = holder.querySelector(config.handler.content);
			var childArr = [].concat(_toConsumableArray(content.children));
			for (var i in childArr) {
				if (childArr[i].nodeName === 'A' && [].concat(_toConsumableArray(childArr[i].classList)).includes('b')) {
					childArr[i].className += '  sign';
					childArr[i].target = '_blank';
					childArr[i].href = config.url.main + '/' + childArr[i].search;
				}
			}var author = holder.querySelector(config.handler.author);
			var date = holder.querySelector(config.handler.date);
			return {
				content: content.innerHTML,
				url: date.getAttribute('href'),
				date: date.innerHTML,
				author: author.innerHTML,
				author_url: author.getAttribute('href')
			};
		}
	}, {
		key: 'remover',
		value: function remover() {
			var obj = this.html;
			var child = obj.querySelector(this.query);
			obj.removeChild(child);
			return obj;
		}
	}]);

	return Parser;
}();

var Entry = function () {
	function Entry(index, elem) {
		_classCallCheck(this, Entry);

		this.main_url = config.url.main;
		this.id = index;
		this.elem = elem;
		this.url = config.url.main + this.elem.firstElementChild.getAttribute('href');
		this.title = this.elem.firstElementChild.innerHTML.split('<small')[0];
		this.count = this.elem.firstElementChild.firstElementChild.innerText;
		this.loader = '<div class="loader" id="loader">\n    \t\t\t\t\t\t\t\t<span></span>\n    \t\t\t\t\t\t\t\t<span></span>\n    \t\t\t\t\t\t\t\t<span></span>\n\t\t\t\t\t\t\t\t\t</div>';
	}

	_createClass(Entry, [{
		key: 'makeTitle',
		value: function makeTitle() {
			return '<input type="radio" name="accordion" id="acc-' + this.id + '" data-url="' + this.url + '"/>\n\t\t\t\t\t\t<section>\n\t\t\t\t\t\t\t<label for="acc-' + this.id + '">' + this.title + '<small>' + this.count + '</small></label>\n\t\t\t\t\t\t\t<label for="acc-close"></label>\t\n\t\t\t\t\t\t\t\t<article id="article-' + this.id + '">' + this.loader + '</article>\n\t\t\t\t\t\t</section>';
		}
	}, {
		key: 'eventListenerAdder',
		value: function eventListenerAdder() {
			var _this = this;

			var elem = document.getElementById('acc-' + this.id);
			elem.addEventListener('click', function () {
				_this.createEntry();
			}, false);
		}
	}, {
		key: 'createEntry',
		value: function createEntry() {
			var _this2 = this;

			var article = document.getElementById('article-' + this.id);
			if (article.firstElementChild.classList.contains('loader')) fetch(this.url).then(function (res) {
				return res.text();
			}).then(function (html) {
				var entry = new Parser('' + html, config.handler.first_entry).parseEntry();
				var article = new Parser(document.querySelector('#article-' + _this2.id), '#article-' + _this2.id + ' .loader').remover();
				article.innerHTML += entry.content;
				article.innerHTML += '<footer>\n  \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="' + (_this2.main_url + entry.url) + '" target="_blank">ba\u015Fl\u0131\u011Fa git</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="' + (_this2.main_url + entry.url) + '" target="_blank">' + entry.date + '</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="' + (_this2.main_url + entry.author_url) + '" target="_blank">' + entry.author + '</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</footer>';
			});
		}
	}]);

	return Entry;
}();

var engine = function engine() {
	fetch(config.url.popular).then(function (res) {
		return res.text();
	}).catch(function () {
		var main = new Parser(document.getElementById('main'), '#main > .loader').remover();
		main.innerHTML += '<div style="text-align: center; margin: 10px auto;">Bağlantı Hatası!</div>';
	}).then(function (html) {
		var entryList = [].concat(_toConsumableArray(new Parser('' + html, config.handler.entry_list).getElementList())).slice(0, 10);
		var main = new Parser(document.getElementById('main'), '#main > .loader').remover();

		var _loop = function _loop(index) {
			main.innerHTML += new Entry(index, entryList[index]).makeTitle();
			setTimeout(function () {
				new Entry(index, entryList[index]).eventListenerAdder();
			}, 100);
		};

		for (var index in entryList) {
			_loop(index);
		}
	});
};

document.addEventListener('DOMContentLoaded', function () {
	setTimeout(function () {
		engine();
	}, 400);
});