;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Ajaxrequest = factory();
  }
}(this, function() {
  /**
   * AjaxRequest
   *
   * The AjaxRequest object is a wrapper around Javascript's XMLHttpRequest object. The goal
   * of this object is to provide a minimalist approach to creating an HTTP request to the
   * server.
   */
  'use strict';

  class AjaxRequest {
    constructor(method, url, async, callback) {
      this.request = new XMLHttpRequest();
      this.method = method;
      this.url = url;
      this.callback = callback || null;
      this.async = typeof async !== 'boolean' ? true : async;
      this.send = this.sendRequest;
    }

    sendRequest() {
      return new Promise((resolve, reject)=> {
        this.request.open(
          this.method,
          this.url,
          this.async
        );

        this.request.send();

        this.request.onload = function() {
          if (this.status >= 200 && this.status < 300) {
            // Performs the function "resolve" when this.status is equal to 2xx
            resolve(JSON.parse(this.response));
          } else {
            // Performs the function "reject" when this.status is different than 2xx
            reject(this.statusText);
          }
        };

        this.request.onerror = function() {
          reject(this.statusText);
        };
      });
    }
  }

  return AjaxRequest;
}));
