public with sharing class CampingListController {
    @AuraEnabled
    public static list<Camping_Item__c> getItems(){
        return[select id, name, Quantity__c, Price__c, packed__c from Camping_Item__c];
        
    }
    
    @AuraEnabled
    public static Camping_Item__c saveItem(Camping_Item__c rec){
        upsert rec;
        return rec;
    }

}