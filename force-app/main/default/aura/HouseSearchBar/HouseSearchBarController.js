({
    searchKeyChange: function(component, event) {
        var myEvent = $A.get("e.c:HouseSearchKeyChange");
        alert(JSON.stringify(myEvent));
        myEvent.setParams({"searchKey": document.querySelector('.searchKey').value });
        myEvent.fire();
    },
    clearText: function(component) {
        component.set("v.searchKey", "");
        var myEvent = $A.get("e.c:HouseSearchKeyChange");
        myEvent.setParams({"searchKey": "" });
        myEvent.fire();
    }
})