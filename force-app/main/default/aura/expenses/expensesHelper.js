({
	createExpense : function(component,expense) {
		var theExpense = component.get("v.expenses");
        var newExpense = JSON.parse(JSON.stringify(expense));
        //theExpense.push(newExpense);
        alert("theExpense -->" +JSON.stringify(theExpense));
        //component.set("v.expenses",theExpense);
        
        var action = component.get("c.saveExpense");
        action.setParams({
            "exp":expense
        });
        alert('expense --' +JSON.stringify(expense));
        action.setCallback(this, function(response){
            
            var state= response.getState();
            //alert('state --' +state);
            alert('Error -->'+JSON.stringify(response.getError()));
            if(component.isValid() && state === "SUCCESS"){
                var expenses = response.getReturnValue();
                theExpense.push(expenses);
                component.set("v.expenses", theExpense);
			}
        });
        $A.enqueueAction(action);
	}
})