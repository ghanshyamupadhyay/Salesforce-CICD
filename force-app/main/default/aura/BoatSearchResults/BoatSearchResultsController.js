({
	doInit : function(component, event, helper) {
		helper.onSearch(component,helper,"");
	},
    
    doSearch : function(component, event, helper) {
        var args = event.getParam('arguments');
        if(args) {
            /*console.log("Recieved boatTypeId in Method : ", args.boatTypeId);*/
            helper.onSearch(component,helper,args.boatTypeId);
        }
        
    },
    onBoatSelect : function (component, event, helper) {
        /*console.log("click recieved on boat search result");*/
        var boatId = event.getParam("boatId");
        component.set("v.selectedBoatId", boatId);
    }
})