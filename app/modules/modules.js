
require('./dashboard/dashboard');
require('./access/access');

exports.module = angular.module('app.modules', ['app.dashboard', 'app.access']);
