//enclosure
//; semi colon prevents unclosed functions
;(function($, window, document, undefined) {

	var pluginName = "eyecandy",
		defaults = {
			rowLength : 4,
			small : 99,
			large : 2,
		};

	function Plugin(element, list, options) {
		this.element = element;
		this.options = $.extend( {} ,defaults, options);
		this._defaults = defaults;
		this._name = pluginName;

		this.init(list);

	};

	Plugin.prototype.init = function(list) {
		/* enums */
		var small = "small";
		var large = "large";
		/* end of enums */
		var self = this;
		var isLarge = 0;
		var isSmall = 0;
		var numList = [];
		var largeList = [];
		var sl = [];
		var str = "";
		
		for(var i=0;i<list.length;i++) {
			if(list[i].large && list[i].large == true) 
				isLarge +=1;
			else
			 	list[i].large = false;
			numList.push(i);
		}

		//randomize it here
		var j = numList.length;
		if(j==0) return;
		while(--j) {
			var k = Math.floor(Math.random() * (j+1));
			var temp = numList[j];
			numList[j] = numList[k];
			numList[k] = temp;
		}

		//now we know how many small grids
		var isSmall = list.length - isLarge;
	
		var largeGridSize = Math.pow((!self.options.large ? self._defaults.large : self.options.large), 2);		

		var _pigeon = Math.ceil(isSmall / largeGridSize);

		for(var i=0;i<(_pigeon + isLarge) ; i++) {
			if(i < _pigeon) {
				sl.push(small);
				sl.push(small);
			} else {
				sl.push(large);
			}
		}


		var j = sl.length;

		while(--j) {
			var k = Math.floor(Math.random()*(j+1));
			var temp = sl[j];
			sl[j] = sl[k];
			sl[k] = temp;
		}

		var make = function(type, content) {
			if(content == "")
				return "";
			if(type == small) {
				return "<div class='eyecandy-grid eyecandy-small'>"+content.img+"</div>";
			} else {
				return "<div class='eyecandy-grid eyecandy-large'>"+content.img+"</div>";
			}
		};

		var getNext = function(type) {
			var temp = [];
			var x;
			while(numList.length > 0) {
				x = numList.shift();
				if(list[x].large==true && type == large) {
					if(temp.length !=0)
						numList = temp.concat(numList);	
					return list[x];
				} else if(list[x].large==true && type == small) {
					temp.push(x);
				} else if((list[x].large==false) && type == small) {
					if(temp.length != 0)
						numList = temp.concat(numList);
					return list[x];	
				} else {
					temp.push(x);
				}
			};
			numList = temp;
			return "";
		};

		var j=0;
		var counter=0;
		for(var i=0, slLength = sl.length, length = numList.length,k=0;i<slLength;i++,j++,k++) {
			if((k % (self._defaults.rowLength)) == 0) {
				if(i!=0)
					str+="</div>";
				str+="<div class='eyecandy-row'>";	
				counter+=1;
			}
			if(sl[i] == small) {
				str+="<div class='eyecandy-column-thin'>";
				str+=make(small, getNext(small));
				if((j+1) < length) {
					j+=1;
					str+=make(small, getNext(small));
				}		
				str+="</div>";
				
			} else {
				if((k+2)-(self._defaults.rowLength*counter) > 0) {
					i-=1;
					j-=1;
					k=self._defaults.rowLength-1;
					continue;
				} 
				str+="<div class='eyecandy-column-fat'>";
				str+=make(large, getNext(large));
				str+="</div>";
				k+=1;
				//will need to upgrade this code later
			}
		}
		str+="</div>";
	

		$(self.element).html(str);
	};

	$.fn[pluginName] = function(list, options) {
		//no need $(this), can just use this
		
		return this.each(function() {
			if(!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_'+pluginName,
					new Plugin(this, list, options));
			}
		});
	};

})(jQuery, window, document);
