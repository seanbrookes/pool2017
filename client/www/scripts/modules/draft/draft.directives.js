Draft.directive('bbpDraftBoard', [
  function() {
    return  {
      restrict: 'E',
      templateUrl: './scripts/modules/draft/templates/draft.board.html'
    }
  }
]);

Draft.directive('bbpDraftMain', [
  function() {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/draft/templates/draft.main.html'
    }
  }
]);

Draft.directive('bbpDraftRoster', [
  function() {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/draft/templates/draft.roster.html'
    }
  }
]);
