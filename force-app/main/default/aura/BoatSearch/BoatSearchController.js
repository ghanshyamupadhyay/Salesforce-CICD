({
	onFormSubmit : function(component, event, helper) {
		var formData = event.getParam("formData");
        var boatTypeId = formData.boatTypeId;
        console.log(boatTypeId);
        
        var boatSearchResultsComponent = component.find("cmpBoatSearchResults");
        boatSearchResultsComponent.search(formData.boatTypeId);
	}
})