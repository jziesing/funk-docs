public with sharing class funkinvoker {

	@AuraEnabled
    public static String addAccount() {
        System.debug('Invoking myfunction');

        functions.Function myFunction = functions.Function.get('twilfunk.makeaccountfunk');
        functions.FunctionInvocation invocation = myFunction.invoke('{ "name": "MyAccountJack", "accountNumber": "123456788", "industry": "Technology", "type": "Prospect", "website": "www.jack.com" }');
        String jsonResponse = invocation.getResponse();

        System.debug('Response from myfunction ' + jsonResponse);

		return jsonResponse;
    }


	@AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(String searchKey) {
        string searchKeyword = '%' + searchKey + '%';

       // create contact list to store search result
        List<Account> accountListRecord = new List<Account>();

	   // query contact records
        for(Account accObj : [Select id,Name
                            From Account
                            WHERE name LIKE : searchKeyword]){
           accountListRecord.add(accObj);
        }

         if(accountListRecord.size() == 0){
            throw new AuraHandledException('No Record Found..');
         }

        return accountListRecord;
    }


}
