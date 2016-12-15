App.controller("homeController", [ "$scope" ,function ($scope) {
  $scope.departments = (MockData && MockData["departments"]) || [];
  $scope.groups = (MockData && MockData["groups"]) || [];
  $scope.employees = [];

  $scope.selectedDepartments = [];
  $scope.selectedGroups = [];
  $scope.selectedEmployees = [];

  $scope.results = [];

  function modifySelectedItems (selectedItems, isAdded, item) {
    var index = selectedItems.indexOf(item);
    if (isAdded) {
      if(index === -1) {
        selectedItems.push(item);
      }
      return true;
    } else {
      if(index > -1) {
      	selectedItems.splice(index, 1);
      }
      return true;
    }

    return false;
  }

  $scope.onDepartmentSelectionChange = function (isChecked, departmentId) {
    var result = modifySelectedItems(this.selectedDepartments, isChecked, departmentId);

    // select or unselect groups belongs to department
    if (result && isChecked) {
      var groups = this.groups.filter(function(group) {
        return group.departmentId === departmentId;
      });

      if (isChecked) {
        var self = this;
        groups.forEach(function (group) {
          if (self.selectedGroups.indexOf(group.groupId) === -1) {
            self.selectedGroups.push(group.groupId);
            self.onGroupSelectionChange(true, group.groupId);
          }
        });
      }
    }
  };

  $scope.onGroupSelectionChange = function (isChecked, groupId) {
    var result = modifySelectedItems(this.selectedGroups, isChecked, groupId);

    // get or remove all employees belongs to group
    if(result) {
      var allEmployees = (MockData && MockData["employees"]) || [];
      var employees = allEmployees.filter(function(employee) {
        return employee.groupId === groupId;
      });

      if (isChecked) {
        Array.prototype.push.apply(this.employees, employees);
      } else {
        var self = this;
        employees.forEach(function(employee) {
          var index = self.employees.indexOf(employee);
          if(index > -1) {
          	self.employees.splice(index, 1);
            self.onEmployeeSelectionChange(false, employee.employeeId)
          }
        });
      }
    }
  };

  $scope.onEmployeeSelectionChange = function (isChecked, employeeId) {
    modifySelectedItems(this.selectedEmployees, isChecked, employeeId);
  };

  $scope.getResults = function() {
    var self = this;
    this.results = [];
    this.selectedEmployees.forEach(function (employeeId) {
      var employee = self.employees.find(function(emp) {
        return emp.employeeId === employeeId;
      });

      if (employee) {
        var group = self.groups.find(function(grp) {
          return grp.groupId === employee.groupId;
        });

        if (group) {
          var department = self.departments.find(function(dep) {
            return dep.departmentId === group.departmentId;
          });

          if (department) {
            self.results.push({
              "department": department,
              "group": group,
              "employee": employee
            });
          }
        }
      }
    });
  }
}]);
