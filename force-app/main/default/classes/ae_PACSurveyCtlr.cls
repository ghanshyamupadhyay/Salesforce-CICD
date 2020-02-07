global with sharing class ae_PACSurveyCtlr{

    public String parisName {get;set;} 
    public String selectedparisName {get;set;} 
    public String eventId {get;set;} 
    
    public ae_PACSurveyCtlr(ApexPages.StandardController controller) {
        
    }
    
     public void selectedParisvalue(){
        string selectID = Apexpages.currentPage().getParameters().get('idVal');
        system.debug('debug from branch 1');
        if(selectID != null){ 
            selectedparisName = selectID;
        }
     }
    
    @RemoteAction
    public static List<WrapperClass1> findAccounts(String s){
        List<WrapperClass1> wrpList = new List<WrapperClass1>();
        String accNamePat = '%'+s + '%';
        String aname;
        if(s.trim() != null){
            for(Account acc: [Select id, Name,BillingStreet,BillingState,BillingPostalCode from Account where name like :accNamePat]){
                aname = '';
                aname = acc.name;
                wrpList.add(new WrapperClass1(string.valueof(acc.id), aname));
            }   
        }
        return wrpList ; 
    }
    
    public class WrapperClass1
    {
        String ids,label;
        public WrapperClass1(String wrid, String name)
        {
            this.label = name;
            this.ids = wrid;
        }
    }
  
}