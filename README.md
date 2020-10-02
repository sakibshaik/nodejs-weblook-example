
# Nodejs webhook server

  
I have implemented a small webhook server using express and nodejs. Webhooks is a feature offered  
by some web APIs such as Github, Facebook, Stripe and many others. Essentially it allows  
API clients to register a URL that will receive an HTTP request in response to certain events.  
  
#### **Setting up the application:**  
1. `git clone git@github.com:sakibshaik/nodejs-weblook-example.git`  
2. `cd nodejs-weblook-example`  
3. `npm install`  
4. Running tests : `npm run test`  
5. start server : `npm start`  
  
#### **Server Details:**  
1. server listens on port 9876.  
2. client can register by calling endpoint: `/api/webhooks` method: `POST` with payload:

>  { "url": "https://postman-echo.com/post?hand=xxx", "token": "1312-3128-qwqw" }
3. Clients should be able to trigger all registered webhooks by making a `POST` request to `/api/webhooks/test` with a  payload:
> {"payload": ["aaaa", { "valid": "JSON" }]}

The application uses a fake data generator (located at `helpers\fakeEventGenerators.js`) which generates random data defaulted to every 5 seconds (which can be set by setting an environment variable `GENERATORFREQUENCY` in ms ) and publishes and `'OrderReceived'` event using Javascript event emitters.

the processor (located at `controller\processor.js`) listens to the event `'OrderReceived'` and triggers an batch update to all the registered clients.

If no client is registered console would print `.... No Clients Registered yet ....` .

On completion of a batch update a log on console: 
`{ 
	processed: ['https://postman-echo.com/post?hand=Moore'],
	failed:['https://postman-echo.coms/post?hand=Runolfsson - Error: getaddrinfo ENOTFOUND postman-echo.coms postman-echo.coms:443' ] 
	}`
	`processed` array will have the url's of successfully updates.
	`failed` would have  url's with failed updates with error message.
	
*The application currently doesn't retry the failures.*

**Tests**:

 - Unit tests located at `/tests/unit/`
 - Integration tests are located at  `/test/integration`







