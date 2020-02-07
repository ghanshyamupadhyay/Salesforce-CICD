({
    doInit: function(component, event, helper) {
        helper.getHouses(component);
    },
    searchKeyChange: function(component, event, helper) {
        component.set ("v.searchKey", event.getParam("searchKey"));
        helper.getHouses(component);
	},
	priceSelectionChange: function(component, event, helper) {
        component.set ("v.minPrice", event.getParam("min"));
        component.set ("v.maxPrice", event.getParam("max"));
        helper.getHouses(component);
	},
	pageChange: function(component, event, helper) {
		var page = component.get("v.page") || 1;
        var direction = event.getParam("direction");
        page = direction === "previous" ? (page - 1) : (page + 1);
        helper.getHouses(component, page);
	}
})