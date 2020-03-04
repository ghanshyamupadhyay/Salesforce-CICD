public with sharing class ExpensesController {

    //The method is called from lighting compoenent to get list of all expenses
    @AuraEnabled
    public static list<Expense__c> getExpenses(){
        return[SELECT id, name, Amount__c, Client__c, Date__c, Reimbursed__c, CreatedDate, 
                    Short_Description__c
              	FROM Expense__c];
    }
	
    @AuraEnabled
    public static Expense__c saveExpense(Expense__c exp){
        upsert exp;
        return exp;
    }
}