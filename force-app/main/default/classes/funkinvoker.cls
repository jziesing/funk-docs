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

	@auraEnabled
    public static List<Account> fetchAccounts()
    {
        List<Account> conList=[SELECT Id,Name FROM Account];
        return Account;
    }
}
