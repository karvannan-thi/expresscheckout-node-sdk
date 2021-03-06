# Juspay Nodejs Client Library #

-----------------------

The Juspay ExpressCheckout Nodejs SDK makes it easier for merchants to integrate the express-checkout APIs in their product. This SDK is distributed using `package`. To add the SDK to your project, add the following code to your **package.json**:


```
#!python

"dependencies" : {
	"expresscheckout-Nodejs-sdk" : "1.0.3"
}

```

This package requires a `minimum-stability` of `stable`. Set the `minimum-stability` in your **package.json** accordingly.

## Setting up the SDK for use. ##

By default SDK is initialised for Juspay production account.

**To setup Nodejs SDK for production account with default timeouts, use following code:**

```
#!python

JuspayEnvironment.init()
.withApiKey("your_api_key")

```


**To setup Nodejs SDK for sandbox account with default timeouts, use following code:**

```
#!python

JuspayEnvironment.init()
.withApiKey("yourApiKey")
.withBaseUrl(JuspayEnvironment::SANDBOX_BASE_URL)

```

**To setup Nodejs SDK for production account with custom timeouts, use following code:**

```
#!python

JuspayEnvironment::init()
.withApiKey("yourApiKey")
.withConnectTimeout(connectTimeout)
.withReadTimeout(readTimeout);

```

**To setup Nodejs SDK for sandbox account with custom timeouts, use following code:**

```
#!python

JuspayEnvironment.init()
.withApiKey("yourApiKey")
.withBaseUrl(JuspayEnvironment::SANDBOX_BASE_URL)
.withConnectTimeout(connectTimeout)
.withReadTimeout(readTimeout);

```

## Using SDK ##
The input to all methods in SDK is an associative array and most of the methods will return the object of the corresponding class.
### Example: ###
**Adding a card to Juspay Locker:**

```
#!Nodejs

$params = array ();
$params ['merchant_id'] = "merchantId";
$params ['customer_id'] = "customerId";
$params ['customer_email'] = "support@juspay.in";
$params ['card_number'] = "4111111111111111";
$params ['card_exp_year'] = "2018";
$params ['card_exp_month'] = "07";
$params ['name_on_card'] = "Juspay Technologies";
$params ['nickname'] = "ICICI VISA";
$card = Card.create ( $params );

```
