({
    onBoatClick : function(component, event, helper) {
        var boatSelectEvent = component.getEvent("onBoatSelect");
        boatSelectEvent.setParams({"boatId" : component.get("v.boat").Id});
        boatSelectEvent.fire();
        
        //To retrieve the application event - event type is the required one.
        var boatSelectedEvent = $A.get("e.c:BoatSelected");
        boatSelectedEvent.setParams({"boat" : component.get("v.boat")});
        boatSelectedEvent.fire();
        
        var boat = component.get("v.boat");
        var plotMapMarkerEvent = $A.get("e.c:PlotMapMarker");
        plotMapMarkerEvent.setParams(
            {
                "lat": boat.Geolocation__Latitude__s,
                "sObjectId": boat.Id,
                "long": boat.Geolocation__Longitude__s,
                "label":boat.Name 
            }
        );
        plotMapMarkerEvent.fire();
        //console.log("event triggered");
    }
})