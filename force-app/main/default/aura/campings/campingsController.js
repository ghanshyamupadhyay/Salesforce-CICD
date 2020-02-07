({
	addItem : function(component, event, helper) {
		var campingName = component.find("name").get("v.value");
        var campingPrice = component.find("price").get("v.value");
        var campingQty = component.find("QTY").get("v.value");
        var campingRec = component.get("v.newItem");
        if(campingName == '' || campingPrice == null || campingQty == null || campingQty == ''){
            alert("Name, Price and Quantity should have value! =====" +campingPrice);
        }else{
            var campingJson = JSON.parse(JSON.stringify(campingRec));
            var campingList = component.get("v.Items");
           	
            
            var action=component.get("c.saveItem");
            action.setParams({
                "rec":campingJson
            });
            
            action.setCallback(this, function(response){
                alert("inside function");
                var state = response.getState();
                alert("state -->" +state);
                if(component.isValid() && state === "SUCCESS"){
                    var insertedrec = response.getReturnValue();
                    campingList.push("v.Items",insertedrec);
                    component.set("v.Items",campingList);
                }
            });
            $A.enqueueAction(action);
        }
        
	},
    doInit: function(component, event, helper) {
        
        var items = component.get("v.Items");
        var action = component.get("c.getItems");
        action.setCallback(this, function(response){
            var state = response.getState();
            
            
            if(component.isValid() && state === "SUCCESS"){
                var inserteditem = response.getReturnValue();
                items.push("items",inserteditem);
                //alert("items --" +JSON.stringify(items));
                component.set("v.Items",items);
            }
        });
        $A.enqueueAction(action);
    }
})