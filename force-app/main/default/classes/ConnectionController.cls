public class ConnectionController {
    
    public static String SERVER_URL;
    public static String SESSION_ID;
    /*
     * establishConnection() - Login via SOAP/XML web service api to establish session
     * LOGIN_DOMAIN = 'login.salesforce.com'; //other options: test, prerellogin.pre
     * USERNAME = Username of target org.
     * PASSWORD = Password of target org. 
     */
  public static void establishConnection(String LOGIN_DOMAIN, String USERNAME, String PASSWORD){
        //----------------------------------------------------------------------
        // Login via SOAP/XML web service api to establish session
        //----------------------------------------------------------------------
        //String LOGIN_DOMAIN = 'login.salesforce.com';
        //String USERNAME = 'ghanshyam.U@SB.com';
        //String PASSWORD = 'password123';
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://' + LOGIN_DOMAIN + '/services/Soap/u/22.0');
        //request.setEndpoint('http://requestb.in/slxr18sl');
        request.setMethod('POST');
        request.setHeader('Content-Type', 'text/xml;charset=UTF-8');
        request.setHeader('SOAPAction', '""');       
        request.setBody('<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Header/><Body><login xmlns="urn:partner.soap.sforce.com"><username>' + USERNAME + '</username><password>' + PASSWORD + '</password></login></Body></Envelope>');
        Dom.XmlNode resultElmt = (new Http()).send(request).getBodyDocument().getRootElement()
          .getChildElement('Body','http://schemas.xmlsoap.org/soap/envelope/')
          .getChildElement('loginResponse','urn:partner.soap.sforce.com')
          .getChildElement('result','urn:partner.soap.sforce.com');
        
        //----------------------------------------------------------------------
        // Grab session id and server url (ie the session)
        //----------------------------------------------------------------------
        SERVER_URL = resultElmt.getChildElement('serverUrl','urn:partner.soap.sforce.com').getText().split('/services')[0];
        SESSION_ID = resultElmt.getChildElement('sessionId','urn:partner.soap.sforce.com').getText();
        system.debug('resultElmt --' +resultElmt);
    }
    
    public static String setAuthentication(String sessionId){        
        String authorizationHeader = 'OAuth ' + sessionId;
        return authorizationHeader;
        
    }
}