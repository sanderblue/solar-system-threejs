'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    module.exports = factory();
  } else {
    root.Ajaxrequest = factory();
  }
})(undefined, function () {
  /**
   * AjaxRequest
   *
   * The AjaxRequest object is a wrapper around Javascript's XMLHttpRequest object. The goal
   * of this object is to provide a minimalist approach to creating an HTTP request to the
   * server.
   */
  'use strict';

  var AjaxRequest = (function () {
    function AjaxRequest(method, url, async, callback) {
      _classCallCheck(this, AjaxRequest);

      this.request = new XMLHttpRequest();
      this.method = method;
      this.url = url;
      this.callback = callback || null;
      this.async = typeof async !== 'boolean' ? true : async;
      this.send = this.sendRequest;
    }

    _createClass(AjaxRequest, [{
      key: 'sendRequest',
      value: function sendRequest() {
        var _this = this;

        return new Promise(function (resolve, reject) {
          _this.request.open(_this.method, _this.url, _this.async);

          _this.request.send();

          _this.request.onload = function () {
            if (this.status >= 200 && this.status < 300) {
              // Performs the function "resolve" when this.status is equal to 2xx
              resolve(JSON.parse(this.response));
            } else {
              // Performs the function "reject" when this.status is different than 2xx
              reject(this.statusText);
            }
          };

          _this.request.onerror = function () {
            reject(this.statusText);
          };
        });
      }
    }]);

    return AjaxRequest;
  })();

  return AjaxRequest;
});