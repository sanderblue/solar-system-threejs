# AjaxRequest

Minimalist AJAX request module with zero dependencies.

# Usage

Include the module.
```javascript
// AMD
var AjaxRequest = require(['ajaxrequest']);

// CommonJS
var AjaxRequest = require('ajaxrequest');
```

Parameters.
```
var ajaxRequest = new AjaxRequest(
    method,  // String - required [GET, POST]
    url,     // String - required
    async,   // Boolean - optional
    callback // Function - optional
);
```

Hypothetical usage example.
```javascript
var ajaxRequest = new AjaxRequest(
  'GET',
  'http://www.site.com/data.json',
  true
);

ajaxRequest.send().then(function(successResponse, failResponse) {
    // Do stuff
});
```

