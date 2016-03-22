
require('./landing/landing');
require('./charity/charity');
require('./reward/reward');
require('./donation/donate');
require('./dashboard/dashboard');
require('./access/access');
// require('./angular-payments');

exports.module = angular.module('app.modules', ['app.landing', 'app.charity', 'app.reward', 'app.donate', 'app.dashboard', 'app.access']);//, 'angularPayments']);
