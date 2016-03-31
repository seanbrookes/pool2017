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
