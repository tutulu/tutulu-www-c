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

				var list = [
					{
						large : true,
						img : "1",
					},	
					{
						img : "2",
					},
					{
						img : "3",
					}, 
					{
						img : "4",
					}, 
					{
						img : "5",
						large : true,	
					},
					{
						img : "6",
					},
					{
						img : "7",
					},
					{
						img : "8",
					},
				];
				$("#eyecandy").eyecandy(list);
			},
		});	

		return homeView;
	});
})();
