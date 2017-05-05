var window              = require('global');
var MockXMLHttpRequest  = require('./lib/MockXMLHttpRequest');
var real                = window.XMLHttpRequest;
var mock                = MockXMLHttpRequest;

/**
 * Mock utility
 */
module.exports = {

  XMLHttpRequest: MockXMLHttpRequest,

  /**
   * Replace the native XHR with the mocked XHR
   * @returns {exports}
   */
  setup: function() {
    window.XMLHttpRequest = mock;
    return this.reset();
  },

  /**
   * Replace the mocked XHR with the native XHR and remove any handlers
   * @returns {exports}
   */
  teardown: function() {
    window.XMLHttpRequest = real;
    return this.reset();
  },

  /**
   * Remove any handlers
   * @returns {exports}
   */
  reset: function() {
    MockXMLHttpRequest.reset();
    return this;
  },
  
  /**
   * Mock a request
   * @param   {string}    [method]
   * @param   {string}    [url]
   * @param   {Function}  fn
   * @returns {exports}
   */
  mock: function(method, url, options, fn) {
    if (typeof options === 'function'){
      fn = options;
      options = {};
    }
    
    var handler;
    if (arguments.length >= 3) {
      handler = {
        match: function(req) {
          if (req.method() === method && ( options.partialUrlMatch ? req.url().indexOf(url) !== -1 : req.url() === url )) {
            return true;
          }
          return false;
        },
        callback:function (req, res) { return fn(req, res); },
        sync:!!options.sync
      };
    } else {
      handler = method;
    }
    MockXMLHttpRequest.addHandler(handler);
    
    return this;
  },
  
  
  
  /**
   * Mock a GET request
   * @param   {String}    url
   * @param   {Function}  fn
   * @returns {exports}
   */
  get: function(url, options, fn) {
    return this.mock('GET', url, options, fn);
  },
  
  /**
   * Mock a POST request
   * @param   {String}    url
   * @param   {Function}  fn
   * @returns {exports}
   */
  post: function(url, options, fn) {
    return this.mock('POST', url, options, fn);
  },
  
  /**
   * Mock a PUT request
   * @param   {String}    url
   * @param   {Function}  fn
   * @returns {exports}
   */
  put: function(url, options, fn) {
    return this.mock('PUT', url, options, fn);
  },
  
  /**
   * Mock a PATCH request
   * @param   {String}    url
   * @param   {Function}  fn
   * @returns {exports}
   */
  patch: function(url, options, fn) {
    return this.mock('PATCH', url, options, fn);
  },
  /**
   * Mock a DELETE request
   * @param   {String}    url
   * @param   {Function}  fn
   * @returns {exports}
   */
  del: function(url, options, fn) {
    return this.mock('DELETE', url, options, fn);
  }

};
