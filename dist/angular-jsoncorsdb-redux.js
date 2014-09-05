(function() {
  var JsonCorsDbService;

  JsonCorsDbService = (function() {
    JsonCorsDbService.$inject = ['$http', 'config'];

    function JsonCorsDbService($http, config) {
      this.$http = $http;
      this.server = config.jsoncorsdb.server;
    }

    JsonCorsDbService.prototype.store = function(bucket, obj) {
      return this.$http.post('http://' + this.server + '/put/buckets/' + bucket + '/', obj, {
        useXDomain: true
      }).then(function(response) {
        return response.data;
      })["catch"](function(error) {
        return console.error('JsonCorsDbService error:', error);
      });
    };

    JsonCorsDbService.prototype.getByKey = function(key) {
      return this.$http.get('http://' + this.server + '/get/keys/' + key, {
        useXDomain: true
      }).then(function(response) {
        return response.data;
      })["catch"](function(error) {
        return console.error('JsonCorsDbService error:', error);
      });
    };

    JsonCorsDbService.prototype.getBucket = function(bucket, filter) {
      var params;
      params = {};
      if (filter) {
        params.filter = angular.toJson(filter);
      }
      return this.$http.get('http://' + this.server + '/get/buckets/' + bucket + '/', {
        params: params
      }).then(function(response) {
        return response.data;
      })["catch"](function(error) {
        return console.error('JsonCorsDbService error:', error);
      });
    };

    return JsonCorsDbService;

  })();

  angular.module('jsoncorsdb-redux', []).service('jsoncorsdb', JsonCorsDbService);

}).call(this);
