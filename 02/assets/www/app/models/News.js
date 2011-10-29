/**
 * File: app/models/News.js
 * Summary: Contains a description for the news model.  This model holds the
 * news data downloaded from the campus RSS feed.
 * 
 * Both the UPSApp.models.News model and a UPSApp.stores.news Store are created.
 */
UPSApp.models.News = Ext.regModel('News', {
	fields: ['title','link','description']
});

UPSApp.stores.news = new Ext.data.Store({
	model: 'News',
	proxy: {
		type:'ajax',
		url: 'http://pugetsound.edu/rss/news.php',
		reader:{
			type:'xml',
			root:'channel',
			record:'item'
		}
	}
});