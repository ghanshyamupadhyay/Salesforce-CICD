({
	getHouses : function(component, page) {
        page = page || 1;
        var action = component.get("c.findAll");
		action.setParams({
      		"searchKey": component.get("v.searchKey"),
      		"minPrice": component.get("v.minPrice"),
      		"maxPrice": component.get("v.maxPrice"),
            "pageNumber": page
    	});
    	action.setCallback(this, function(a) {
            var result = a.getReturnValue();
            component.set("v.houses", result.houses);
            component.set("v.page", result.page);
            component.set("v.total", result.total);
            component.set("v.pages", Math.ceil(result.total/8));
    	});
    	$A.enqueueAction(action);
	}
})