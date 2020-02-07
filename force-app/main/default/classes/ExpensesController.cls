public with sharing class ExpensesController {
    @AuraEnabled
    public static list<Expense__c> getExpenses(){
        return[select id, name,Amount__c, Client__c, Date__c,Reimbursed__c, CreatedDate
              		FROM Expense__c];
    }
	
    @AuraEnabled
    public static Expense__c saveExpense(Expense__c exp){
        upsert exp;
        return exp;
    }
}