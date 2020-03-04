public with sharing class ExpensesController {
    @AuraEnabled
    public static list<Expense__c> getExpenses(){
        return[SELECT id, name, Amount__c, Client__c, Date__c, Reimbursed__c, CreatedDate, 
                    Short_Description__c, Long_Description__c, Expense_Type__c
                FROM Expense__c];
    }
    
    @AuraEnabled
    public static Expense__c saveExpense(Expense__c exp){
        upsert exp;
        return exp;
    }
}