describe('controller: homeController', function () {
  var controller,
    scope;

  beforeEach(module('Company'));
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('homeController', {
      $scope: scope
    });
  }));

  it('should work department selection', function () {
    scope.onDepartmentSelectionChange(true, '1');
    scope.onDepartmentSelectionChange(true, '2');
    scope.onDepartmentSelectionChange(true, '3');
    expect(scope.selectedDepartments).toEqual(['1', '2', '3']);
    scope.onDepartmentSelectionChange(false, '2');
    expect(scope.selectedDepartments).toEqual(['1', '3']);
  });

  it('should work group selection', function () {
    scope.onGroupSelectionChange(true, '1');
    scope.onGroupSelectionChange(true, '2');
    scope.onGroupSelectionChange(true, '3');
    expect(scope.selectedGroups).toEqual(['1', '2', '3']);
    scope.onGroupSelectionChange(false, '2');
    expect(scope.selectedGroups).toEqual(['1', '3']);
  });

  it('should work employee selection', function () {
    scope.onEmployeeSelectionChange(true, '1');
    scope.onEmployeeSelectionChange(true, '2');
    scope.onEmployeeSelectionChange(true, '3');
    expect(scope.selectedEmployees).toEqual(['1', '2', '3']);
    scope.onEmployeeSelectionChange(false, '2');
    expect(scope.selectedEmployees).toEqual(['1', '3']);
  });

  it('should work group selection on department selection', function () {
    scope.onDepartmentSelectionChange(true, '1');
    expect(scope.selectedGroups).toEqual(['1', '2']);
  });

  it('should work employee list on group selection', function () {
    scope.onGroupSelectionChange(true, '1');
    scope.onGroupSelectionChange(true, '2');
    expect(scope.employees).toEqual([{
        "employeeId": "1",
        "employeeName": "Edward",
        "groupId": "1"
      },
      {
        "employeeId": "2",
        "employeeName": "Mike",
        "groupId": "1"
      },
      {
        "employeeId": "3",
        "employeeName": "Michel",
        "groupId": "2"
      }]);

    scope.onGroupSelectionChange(false, '1');
    expect(scope.employees).toEqual([{
        "employeeId": "3",
        "employeeName": "Michel",
        "groupId": "2"
      }]);
  });


});
