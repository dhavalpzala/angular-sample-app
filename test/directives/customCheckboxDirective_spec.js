describe('Directive: customCheckbox', function () {
  var compile,
      scope,
      directiveElement;

  // Load the Company module, which contains the directive
  beforeEach(module('Company'));

  beforeEach(inject(function($compile, $rootScope){
    compile = $compile;
    scope = $rootScope.$new();;

    var element = angular.element('<custom-checkbox value="1" text="HR"></custom-checkbox>');
    directiveElement =   $compile (element)(scope);
    scope.$digest();
  }));

  it('Should it exists', function() {
    expect(directiveElement.html()).toContain('HR');
  });
});
