/*
 * Our custom GCalendarReader is an extension of the JsonReader class.
 * This reader is used to change the data we get from the Google Calendar Data API
 * into a form that matches our 'CalDate' model we defined above. 
 */
UPSApp.models.GCalendarReader = Ext.extend(Ext.data.JsonReader,{
	type:'json',	// Still a JSON request
	root:'items',	// Default root is 'items'
	getResponseData: function(response)	// This method is called when the response text is receive, here we change the data to suit our needs
	{
		// First, attempt to convert the response string into an actual JavaScript object
        try {
            var eventdata = Ext.decode(response.responseText);
        }
        catch (ex) {
            throw 'Ext.data.JsonReader.getResponseData: Unable to parse JSON returned by Server.';
        }

        // If the object couldn't be created, throw an error
        if (!eventdata) {
            throw 'Ext.data.JsonReader.getResponseData: JSON object not found';
        }
        
        // Grab a reference to the array of events
        var eventItems = eventdata.data.items;
        
        // Create our return object that we will build
        var data = new Object();
        // Give it a property called 'items' that is an array
        data.items = new Array();

        // This object will serve as a hashmap that maps a date to an array of events
        var dateToEvents = new Object();
        
        // Go through each event item we received from the request
        for(var i = 0; i < eventItems.length; i++)
    	{
        	// Grab the date/time object and chop off the time value (we want to group only by date, not time of the event)
        	var eventTime = eventItems[i].when[0].start;
        	eventTime = eventTime.substr(0,10);
        	
        	// We need to convert the string to a Date object and then add one day to it
        	// to avoid an issue where the date appears one day behind.
        	var tempDate = new Date(eventTime);
        	tempDate.setDate(tempDate.getDate()+1);
        	eventTime = tempDate.toString();
        	
        	// If there isn't an entry for this date in our hashmap, add it!
        	if(typeof(dateToEvents[eventTime]) == "undefined")
        		dateToEvents[eventTime] = {date:eventTime, events:new Array()};
        	
        	// Add a handy 'starttime' property for easy access to date information for this event
        	eventItems[i].starttime = new Date(eventItems[i].when[0].start);
        	
        	// Finally, add this event to the events array of the day this event falls on
        	dateToEvents[eventTime].events.push(eventItems[i]);
    	}
        
        // Now we need to build our final output data object by going through each
        // value in our dateToEvents hashmap and extracting the data from it
        for(var x in dateToEvents)
        {
        	// First add an element to the items array of our data object
        	// This element contains a date property and a calevents property.
        	// The date is simply set to the key of the hashmap and the calevents
        	// is set to the events array of the dateToEvents value.
        	data.items.push({date:x, calevents: dateToEvents[x].events});
        	
        	// Our data is not in order, as Google sends the data in the order
        	// in which the items were added to the calendar.  So, we sort the
        	// dates so 
        	data.items[data.items.length-1].calevents.sort(function(a, b){
        		
        		// Create a JavaScript Date object for each string
        		var dateA = new Date(a.when[0].start);
        		var dateB = new Date(b.when[0].start);

        		// We can then simply subtract the dates to get the difference
        		return dateA - dateB;
        	});
        }
        console.log(data);
        return data;
	}
});
Ext.data.ReaderMgr.registerType('gcalendar', UPSApp.models.GCalendarReader);