//boilerplate 
//this file is a common js template 

(function() {
	define([
		'jquery/jquery',
		'underscore/underscore',
		'backbone/backbone',
		'mustache/mustache',
		'text!tpl/main.mustache'
	],function($, _, Backbone, Mustache, tpl) {
		
		var homeView = Backbone.View.extend({
			render : function(lang) {
				$("#body").html(tpl);
				var list = [];
				for(var i=1;i<=20;i++) {
					if(i % 5 == 0) {
						list.push({large:true, img: i });
					} else {
						list.push({img : i } );
					}
				}
				$("#eyecandy").eyecandy(list);
			},
		});	

		return homeView;
	});
})();
