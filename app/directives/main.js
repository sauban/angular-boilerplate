require('./checkuser');
require('./ui-jq');
require('./ngFacebook');
//require('./ds-angular-payments');
exports.module = angular.module('app.directives', ['CheckUser', 'ui.jq', 'ngFacebook']);//,'angularPayments']);
