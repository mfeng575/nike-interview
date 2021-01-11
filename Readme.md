- unzip all files to a directory then do "npm install" (tested using node 14.15.3)
- to run test, do "npm run build" and then "npm run test".  The test file is src\tests\htmlcontent.test.ts, which covers 4 cases described in the problem set doc.
- to run the app, do "npm run start", the web service should be listening at localhost:3000.  
- There is a swagger page for this at http://localhost:3000/api-docs/  
  Sample payload is ->
  {
      "template": [
                      {
                      "dataText": "Hello {{firstName}},",
                      "fallbackText": "Hello from Nike,"
                      },
                      "This dynamic data is {{requiredText}}",
                      {
                      "dataText": "Sincerely yours, {{senderName}}",
                      "fallbackText" : ""
                      }
                  ],
      "input": "{\"firstName\": \"Pierre\", \"requiredText\": \"required\", \"senderName\": \"Natasha\"}"
  }
- Most of the relevant code is in "src\services\htmlcontent.service.ts" .
