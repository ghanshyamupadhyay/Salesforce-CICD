public class StringArrayTest{

    public static list<string> generateStringArray(integer n){
        list<string> testArrayList= new list<string>();
        
        for(integer a=0;a<n; a++)
            testArrayList.add('Test ' +a);
           
       return testArrayList;
    
    }

}