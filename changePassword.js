(function (angular, undefined) {
    "use strict";
    var CommonURL = "";
    var ChangePassCtrl = ["$scope", "$http", "$state", "$rootScope", function ($scope, $http, $state, $rootScope) {
        CommonURL = $rootScope.ApiUrl + "ChangePassword/";
        var vm = this;
        vm.validateChangePassword = function () {
            if ($scope.oldpassword !== $scope.newpassword && $scope.newpassword == $scope.confirmpassword) {
                $rootScope.NewPassword = $scope.newpassword;
                var UserId = localStorage.getItem('UserId');
                $http({
                    method: 'POST',
                    dataType: 'JSON',
                    url: CommonURL + 'changePassword',
                    params: { UserId: UserId, NewPAssword: $scope.newpassword } //, ConfirmPassword: $scope.confirmpassword },
                }).success(function (res) {             
                   // alert("Password Changed Sucessfully");
                    $state.go("private.dashboard");
                }, function (err) {        
                 //   alert('Error Occurred');
                });
            }
            else {
             //   alert("New password and confirm password should be same");
            }
        }
    }];
    angular
       .module("HRMSApp")
       .controller("ChangePassCtrl", ChangePassCtrl)
})(angular);
