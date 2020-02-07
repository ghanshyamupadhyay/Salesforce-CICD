({
	clickCreateExpense : function(component, event, helper) {
        var validexpense = true;
        var expensename=component.find("expname").get("v.value");
        if($A.util.isEmpty(expensename)){
            validexpense= false;
            alert("Expense name can'nt be blank!");
        }
        //alert("validexpense -->" +validexpense+ "-- exp name -->" +expensename);
        
        if(validexpense){
            var newExpense = component.get("v.newExpense");
            //alert("newExpense -->" +JSON.stringify(newExpense));
            helper.createExpense(component,newExpense);
        }
        
		
	},
    doInit: function(component,event,helper){
        var action = component.get("c.getExpenses");
        //alert("action --" +action.getReturnValue());
        action.setCallback(this, function(response){
            var state = response.getState();
            //alert("response --" +JSON.stringify(response.getReturnValue()));
            if(component.isValid() && state === "SUCCESS"){
                component.set("v.expenses",response.getReturnValue());
            }else{
                alert("Failed with state : " +state);
            }
            
        });
        $A.enqueueAction(action);
    }
})