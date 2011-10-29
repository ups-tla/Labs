UPSApp.views.TabView = Ext.extend(Ext.TabPanel, {
	id:'tabview',
	layout: 'card',
	cardSwitchAnimation:'slide',
	dockedItems:[],
	items:[],
	initComponent: function() {

		UPSApp.views.eventsList = new UPSApp.views.EventsList();

		UPSApp.views.newsList = new UPSApp.views.NewsList();
		
		this.items[0] = UPSApp.views.newsList;
		this.items[1] = UPSApp.views.eventsList;

		UPSApp.views.TabView.superclass.initComponent.apply(this, arguments);
	}
});