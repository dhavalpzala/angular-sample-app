App.directive('customCheckbox', function () {
  return {
    restrict: "E",
    scope: {
      "text": "@",
      "value": "@",
      "isChecked": "=?",
      "onChange": "&"
    },
    template: "<div class='custom-checkbox' ng-click='toggleState()'><input type='checkbox' ng-checked='isChecked' value='{{value}}' /><label>{{text}}</label></div>",
    link: function($scope, element, attrs) {
      $scope.toggleState = function() {
        this.isChecked = !this.isChecked;
        this.onChange({ isChecked: this.isChecked, value: this.value });
      }
    }
  }
});
