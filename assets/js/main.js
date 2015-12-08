if (!EM) var EM = {}; // Embria microblog

EM.init = function() {
	this.popUp.init();
	this.firstVisit.init();
	this.myCookies.init();
	this.note.init();
};
EM.note = {
	init: function(){
		if (this.supports_html5_storage()) {
			this.self = jQuery('#notes');
			
			this.requiredFields = [document.getElementById('noteName'), document.getElementById('noteText')];

			this.notesList = this.self.find('.notesList');
			this.notesListItem = this.self.find('label');
			this.saveNote = jQuery('#saveNote');
			this.viewNote = jQuery('#viewNote');
			this.noteName = jQuery('#noteName');
			this.textarea = jQuery('#noteText');
			this.buildList();
		}
		else {
			throw Error('Отсутствует поддержка браузером локального хранилища HTML5');
		}
	},
	supports_html5_storage: function () {
		try {
			return 'localStorage' in window && window.localStorage !== null;
		}
		catch (e) {
			return false;
		}
	},
	buildList: function () {
		var _note = this,
			i;
		for (i in window.localStorage) {
			_note.notesList.append(
				'<div class="form-group">' 															+
					'<input type="radio" name="note" id="' + i + '" value="' + i + '"/>' 			+
					'<label for="' + i + '">'														+
						'' + i + ''																	+
					'</label>'																		+
					'<button class="removeNote">'													+
						'<span class="glyphicon glyphicon-trash"></span>'							+
					'</button>'																		+
				'</div>'														
			);
		}
		this.initListeners();
	},
	initListeners: function() {
		var _note = this,
			ready;

		this.requiredFields.forEach(function (element) {
			jQuery(element).on('keyup change', function () {
				ready = _note.requiredFields.every(function (element) {
					var pattern = new RegExp(jQuery(element).attr('pattern'), 'im');
					// console.debug(element, pattern, pattern.test(element.value));
					return pattern.test(element.value);
				});
				_note.saveNote.prop('disabled', !ready);
			});
		});

		_note.saveNote.click(function () {
			if (!jQuery('#' + _note.noteName.val() + '')) {
				window.localStorage.setItem(_note.noteName.val(), _note.textarea.val());
				_note.notesList.append(
					'<div class="form-group">' 																						+
						'<input type="radio" name="note" id="' + _note.noteName.val() + '" value="' + _note.noteName.val() + '"/>' 	+
						'<label for="' + _note.noteName.val() + '">'																+
							'' + _note.noteName.val() + ''																			+
						'</label>'																									+
						'<button class="removeNote">'																				+
							'<span class="glyphicon glyphicon-trash"></span>'														+
						'</button>'																									+
					'</div>'														
				);

				/*--------------------------------
				Фьючерс - обернуть это в прототип.
				--------------------------------*/
				_note.notesList.on('change', function (e) {
					var val = window.localStorage.getItem(e.target.value);
					_note.viewNote.html(val);
					_note.noteName.val(e.target.value);
					_note.textarea.val(val);
					_note.noteName.focus();
				});
				/*------------------------------*/
			}
			else {
				window.localStorage['' + _note.noteName.val() + ''] = _note.textarea.val();
				jQuery('#' + _note.noteName.val() + '').attr('value', _note.noteName.val());
				jQuery('#' + _note.noteName.val() + '').parent().find('label').html(_note.noteName.val());
				_note.viewNote.html(_note.textarea.val());
			}
		});

		_note.notesList.find('input:radio').on('change', function (e) {
			var val = window.localStorage.getItem(e.target.value);
			_note.viewNote.html(val);
			_note.noteName.val(e.target.value);
			_note.textarea.val(val);
			_note.noteName.focus();
		});
		jQuery('.removeNote').click(function () {
			window.localStorage.removeItem(jQuery(this).parent().find('input:radio').attr('value'));
			jQuery(this).parent().remove();
		});
	}
};
EM.footerAndHead = {
	init: function() {
		this.footerElements = jQuery('.footer .tagline, .footer .authorInfo');
		this.action();
	},
	action: function() {
		var _this = this;
		setTimeout(function() {
			_this.footerElements.addClass('in');
		}, 500);
	}
};
EM.myCookies = {
	init: function() {
		var _this = this;
		this.cookies = (function() {
			_this.cookies = {};
			_this.all = document.cookie;
			if (_this.all === "") return _this.cookies;
			_this.list = _this.all.split("; ");
			for (var i = 0; i < _this.list.length; i++) {
				_this.cookie = _this.list[i];
				_this.p = _this.cookie.indexOf("=");
				_this.name = _this.cookie.substring(0, _this.p);
				_this.value = _this.cookie.substring(_this.p + 1);
				_this.value = decodeURIComponent(_this.value);
				_this.cookies[_this.name] = _this.value;
			}
			return _this.cookies;
		}());
		this.keys = [];
		for (var key in this.cookies) this.keys.push(key);
	},
	clear: function() {
		var _this = this;
		for (var i = 0; i < this.keys.length; i++) {
			document.cookie = this.keys[i] + "=; max-age=0";
		}
		this.cookes = {};
		this.keys = [];
	}
};
EM.firstVisit = {
	init: function() {
		this.test = jQuery.cookie('firstVisit');
		this.self = jQuery('.popUp .welcome');
		this.button = this.self.find('button');
		if (!this.test) {
			jQuery.cookie('firstVisit', 'true', {
			    expires: 60*60*24, // На сутки.
			    path: '/'
			});
			jQuery('.head, .footer').css({
				display: 'none'
			});
			EM.popUp._show('welcome');
			setTimeout(function(){
				EM.footerAndHead.init();
			}, 500);
		}
		else {
			EM.footerAndHead.init();
			jQuery('.head, .footer').removeClass('out').addClass('in');
			setTimeout(function(){
				jQuery('.notes').fadeIn('slow');
			}, 1500);
		}
		this.initListeners();
	},
	initListeners: function() {
		var _this = this;
		this.button.click(function(){
			EM.popUp._hide();
		});
	}
};
EM.popUp = {
	init: function () {
		this.self = jQuery('.popUp');
		this.wrapper = jQuery('.popUpWrapper');
		this.myScroll = this.self.find('.myScroll');
		this.overflow = this.self.find('.overflow');
		this.closeButton = this.self.find('.closePopUp')[0];
		this.closePopUpLayer = jQuery('.closeLayer');
		this.isShow = false;
		this.curLayer = undefined;
		this.initLayers();
		this.initListeners();
	},
	initLayers: function(){
        var _this = this;
        this.layers = {};
        this.layers.welcome = jQuery('.popUp .welcome');
        this.layers.aboutAuthor = jQuery('.popUp .aboutAuthor');
        this.layers.embriaTask = jQuery('.popUp .embriaTask');
        this.myScroll.mCustomScrollbar();
    },
	initListeners: function(){
		var _this = this;
		jQuery(_this.closeButton).on("click", function(){
			_this._hide();
		});
		jQuery(_this.closePopUpLayer).on("click", function(){
			_this._hide();
		});
		jQuery(window).resize(function() {
            _this.alignCenter();
        });
	},
	_show: function(layer) {
		var _this = this;
		if (!this.isShow){
			this.wrapper.fadeIn({
				duration: 100,
				complete: function() {
					_this.self.css({
			            display: 'block'
			        }).promise().done(function(){
			        	_this.layers[layer].css('display', 'block').promise().done(function() {
			        	}).promise().done(function(){
			        		var _height = _this.layers[layer].outerHeight(true) < jQuery(window).height() / 2 ? _this.layers[layer].outerHeight(true) : jQuery(window).height() / 2;
			        		_this.self.css({
			        			height: _height,
			        			top: (((jQuery(window).height() - _height) / 2) + jQuery(window).scrollTop()) - (_this.self.outerHeight() - _this.self.height()) / 2,
					            left: (jQuery(window).width() - _this.self.outerWidth()) / 2
			        		}).promise().done(function() {
			        			_this.isShow = true;
				        		_this.curLayer = _this.layers[layer];
				        		_this.self.removeClass('out').addClass('in').css('display', 'block');

				        		if (layer == 'aboutAuthor') {
								    var iteEM = jQuery('.aboutAuthor .item');
								    var K = 75;
								    var t = K * (iteEM.length + 1);
								    var i = iteEM.length;
								    jQuery(iteEM.get().reverse()).each(function() {
								        var item = jQuery(this);
							            setTimeout(function(){
							                item.addClass('in');
							            }, t);
							            t -= K;
								    });
								}
			        		});
			        	});
			        });
				 }
			});
		}
	},
	_hide: function(callback) {
        var _this = this;
        this.self.removeClass('in').addClass('out').promise().done(function(){
        	setTimeout(function(){
        		_this.curLayer.css('display', 'none').promise().done(function(){
        			_this.self.css('display', 'none').removeClass('out').promise().done(function(){
        				jQuery(_this.wrapper).fadeOut({
        					duration: 100,
        					complete: function(){
        						_this.isShow = false;
        						if (_this.curLayer[0].className == 'welcome') {
									jQuery('.head, .footer').removeClass('out').addClass('in');
									setTimeout(function(){
										jQuery('.notes').fadeIn('slow');
									}, 1500);
        						}
        						if (_this.curLayer[0].className == 'aboutAuthor') {
									jQuery('.popUp .aboutAuthor .item').removeClass('in');
        						}
                    			_this.curLayer = undefined;
                    			if(callback) return callback();
        					}
        				});
        			});
        		});
        	}, 400); // Задержка до окончания CSS анимации.
        });  
    },
    alignCenter: function () {
        var _this = this;
        if(this.isShow) {
            if(this.self.height() <= jQuery(window).height()){
                this.self.css({
                    top: ((jQuery(window).height() - _this.self.outerHeight()) / 2) + jQuery(window).scrollTop(),
                    left:(jQuery(window).width() - _this.self.outerWidth()) / 2
                });
            }
            else {
                this.self.css({
                    top: 40,
                    left: (jQuery(window).width() - _this.self.outerWidth()) / 2
                });
            }
        }
    }
};
jQuery(document).ready(function() {
    EM.init();
});