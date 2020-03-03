public with sharing class BoatSearchResults {

    @AuraEnabled
    public static List<Boat__c> getBoats(String boatTypeId) {
        List<Boat__c> boats = new List<Boat__c>();
        if (String.isEmpty(boatTypeId)) {
            boats = [select Id,Name,Picture__c,Contact__r.name from Boat__c];
        } else{
            boats = [select Id,Name,Picture__c,Contact__r.name from Boat__c where BoatType__c = :boatTypeId ];
        }
        //test code change form automated deployment from jenkins hosted on aws server
        return boats;
    }
}