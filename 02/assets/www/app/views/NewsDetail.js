UPSApp.views.NewsDetail = Ext.extend(Ext.Panel, {    	
	id:'newsdetail',
	styleHtmlContent:true, // Basic HTML styling
	tpl:"<h3>{title}</h3>{description}", // Content template
	scroll:'vertical'
});