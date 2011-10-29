/**
 * File: app/views/NewsList.js
 * Summary:	This class displays items from a news feed in a list
 */

UPSApp.views.NewsList = Ext.extend(Ext.List, {
	id:'newslist',
	title:"News",
	itemTpl:'<div style="font-size:20px">{title}</div>',
	grouped:false,
	indexBar:false,
	singleselect:true,
	store:UPSApp.stores.news,
	listeners:{
		// When a list item is tapped:
		itemtap:function(list, index){
			function onBack(){
				// Remove back button and redraw the toolbar (w/o the back button)
				UPSApp.views.toolbar.remove('back');
				UPSApp.views.toolbar.doLayout();
				// Set the newslist to be our active view again
				UPSApp.views.viewport.setActiveItem('tabview',
						{type:'slide', reverse:true}); // Slide to new active item to the reverse direction
				// Remove the listener for the <i>Android</i> back button
				document.removeEventListener("backbutton", onBack, true);
			}
			// Add a back button to the tool bar
			UPSApp.views.toolbar.remove('back');
			UPSApp.views.toolbar.add({
				id:'back',
				text:'Back',
				ui:'back',
				handler: onBack
			});
			// Redraw toolbar layout
			UPSApp.views.toolbar.doLayout();
			// Update the detail view with the news text
			UPSApp.views.newsDetail.update(list.store.getAt(index).data);
			// Set the detail to be our active view
			UPSApp.views.viewport.setActiveItem('newsdetail');
			// Add a listener for the <i>Android</i> back button
			document.addEventListener("backbutton", onBack, true);
		}
	},
	initComponent: function() {
		
		// Load the events store
		UPSApp.stores.news.load();

		UPSApp.views.NewsList.superclass.initComponent.apply(this);
	}
});