public with sharing class caseController {
    @AuraEnabled
    public list<case> cases;
    
    @AuraEnabled
    public integer offst, total;
    
    @AuraEnabled
    public boolean hasNxt, hasPrev;
    
    private static integer pageSize = 8;
    private static integer offset;
    
    @AuraEnabled
    public static caseController getCase(boolean next, boolean prev, decimal off){
     	offset=(integer)off;
        list<case> cses= new list<case>();
        integer cLength = [select count() from case];
        if(next==false && prev == false){
            cses=[select id,description from case limit :pageSize OFFSET :offset];
        }
        caseController cCs = new caseController();
        cCs.cases = cses;
        cCs.offst = offset;
        cCs.hasNxt = hasnxt(offset,cLength,pageSize);
        cCs.hasPrev = hasprev(offset);
        system.debug('8th commit');
        return cCs;
    }
    private static boolean hasprev(integer off){
        if(off>0)
            return false;
        return true; 
    }
    private static boolean hasnxt(integer off,integer li,integer ps){
        if(off+ps<li)
            return false;
        return true;
    }
}