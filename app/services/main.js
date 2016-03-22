'use strict';
require('./access-service');
require('./auth-service');
require('./local-service');
require('./var-service');
require('./ui-load');
exports.module =  angular.module('app.services', ['app.accessService', 'app.authService', 'app.localService', 'app.varService', 'ui.load']);
