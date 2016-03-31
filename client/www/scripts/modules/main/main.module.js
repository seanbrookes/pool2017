var Main = angular.module('Main', [
  'ui.router',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'angularSpinner',
  'ngCookies',
  'HelloWorld',
  'Common',
  'Admin',
  'Roster',
  'Draft',
  'MLB',
  'Auth',
  'Stats',
  'bbPoolApi',
  'ui.bootstrap',
  'ui.utils'
]);

Main.config([
  '$stateProvider',
  '$urlRouterProvider',

  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: './scripts/modules/main/templates/main.html',
        controller: 'MainController'
      })
      .state('roster', {
        url:'/roster/:slug',
        controller:'RosterMainController',
        templateUrl:'./scripts/modules/roster/templates/roster.main.html'
      })
      .state('authuser', {
        url:'/authuser/:slug',
        controller:'AuthUserController',
        templateUrl:'./scripts/modules/auth/templates/auth.user.html'
      })
      .state('statsupdate', {
        url:'/statsupdate',
        controller:'StatsUpdateMainController',
        templateUrl:'./scripts/modules/stats/templates/stats.update.html'
      })
      .state('mlb', {
        url:'/mlb',
        controller:'MLBMainController',
        templateUrl:'./scripts/modules/mlb/templates/mlb.main.html'
      })
      .state('adminroster', {
        url:'/adminroster',
        controller:'RosterAdminController',
        templateUrl:'./scripts/modules/admin/templates/admin.roster.html'
      })
      .state('protected', {
        url:'/protected/:slug',
        controller:'RosterProtectedController',
        templateUrl:'./scripts/modules/roster/templates/roster.protected.html'
      })
      .state('generate',{
        url:'/generate',
        controller:'GenListController',
        templateUrl:'./scripts/modules/draft/templates/draft.main.html'
      })
      .state('rank', {
        url:'/rank/:pos',
        controller:'RankPosController',
        templateUrl:'./scripts/modules/stats/templates/rank.pos.html'
      })
      .state('draft', {
        url:'/draft',
        controller:'DraftMainController',
        templateUrl:'./scripts/modules/draft/templates/draft.main.html'
      })
      .state('admin', {
        url: '/admin',
        templateUrl: './scripts/modules/admin/templates/admin.main.html',
        controller: 'AdminMainController'
      });

  }
]);
