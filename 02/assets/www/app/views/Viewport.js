UPSApp.views.Viewport = Ext.extend(Ext.Panel, {
	fullscreen:true,
	layout: 'card',
	cardSwitchAnimation:'slide',
	dockedItems:[],
	items:[],
	initComponent: function() {
		
		UPSApp.views.toolbar = new Ext.Toolbar({
			title:'UPS App'
		});
		
		this.dockedItems[0] = UPSApp.views.toolbar;
		
		UPSApp.views.tabview = new UPSApp.views.TabView();
		UPSApp.views.newsDetail = new UPSApp.views.NewsDetail();
		this.items[0] = UPSApp.views.tabview;
		this.items[1] = UPSApp.views.newsDetail;
		
		UPSApp.views.Viewport.superclass.initComponent.apply(this, arguments);
	}
});