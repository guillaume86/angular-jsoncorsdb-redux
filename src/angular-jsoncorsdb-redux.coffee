class JsonCorsDbService
  @$inject:  ['$http','config']
  constructor: (@$http , config ) ->
    @server = config.jsoncorsdb.server

  store: (bucket, obj) ->
    @$http.post('http://' + @server + '/put/buckets/' + bucket + '/', obj,
      useXDomain: true
    )
    .then((response) -> response.data)
    .catch((error) -> console.error('JsonCorsDbService error:', error))

  getByKey: (key) ->
    @$http.get('http://' + @server + '/get/keys/' + key,
      useXDomain: true
    )
    .then((response) -> response.data)
    .catch((error) -> console.error('JsonCorsDbService error:', error))

  getBucket: (bucket, filter) ->
    params = {}
    params.filter = angular.toJson(filter) if filter

    @$http.get('http://' + @server + '/get/buckets/' + bucket + '/',
      params: params
    )
    .then((response) -> response.data)
    .catch((error) -> console.error('JsonCorsDbService error:', error))

angular.module('jsoncorsdb-redux', [])
  .service('jsoncorsdb', JsonCorsDbService)
