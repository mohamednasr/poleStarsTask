# poleStarsTask

you should run npm install to install the depended packages

-----------------------------------------------------------
# about the dataSet
	An Interceptor has been made to intercept the HTTP and return the data from the saved json data set.

	if you want to use a real API please comment the interceptor line from the providers in the app.module.ts so it will complete the real request.
			 providers: [
    			//InterceptorProvider,
    			...
    			]
----------------------------------------------------------
An Scroll on demand is done on the list so when you scroll it will called the api to get more data.

The Limit is set in the config.ts to 8 you can change it from their.

# Thanks
