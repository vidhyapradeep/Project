(function (angular, undefined) {
    "use strict";
    var CommonURL = "";
    var LoginCtrl = ["$scope", "$http", "$state", "$rootScope", function ($scope, $http, $state, $rootScope) {
        CommonURL = $rootScope.ApiUrl + "Login/";
        var vm = this;
        vm.inputData = {};
        $scope.inputType = 'password';
        $scope.alertMessage = "";

        //vm.show = function() {
        //    if ($scope.inputType === 'password') {
        //        $scope.inputType = !$scope.inputType;
        //        $scope.inputType = 'text';
        //    } else {
        //        $scope.inputType = !$scope.inputType;
        //        $scope.inputType = 'password';
        //    }
        
        vm.show = function () {
            debugger;
          //  $scope.inputType = 'password';
            if ($scope.inputType == 'password')
                $scope.inputType = 'text';
            else
                $scope.inputType = 'password';
        };

        vm.validateLogin = function () {
            
            //if (vm.username != undefined && vm.password != undefined) {

            if ($scope.loginForm.$valid) {
                debugger;
                $rootScope.Username = vm.username;
                $rootScope.Password = vm.password;
                $http({
                    method: 'GET',
                    dataType: 'JSON',
                    url: CommonURL + 'verifyLogin',
                    params: { Uid: vm.username, pwd: vm.password },
                }).then(function (res) {
                    if (res.data.length > 0) {    
                        if (res.data[0].isValid == 1) {                       
                            $scope.list = res.data;
                            localStorage.setItem('Name', res.data[0].name);
                            localStorage.setItem('UserId', res.data[0].userId);
                            localStorage.setItem('databaseName', res.data[0].databaseName);
                            localStorage.setItem('RoleName', res.data[0].roleName);
                            localStorage.setItem('HierachyId', res.data[0].hierachyId);
                            localStorage.setItem('LocationId', res.data[0].locationId);
                            localStorage.setItem('TokenKey', res.data[0].tokenKey);
                            $rootScope.App_Key = localStorage.getItem('TokenKey');
                            $state.go("private.dashboard");
                        }
                        else {
                            //alert("Invalid UserName/Password or Please contact HR Admin to login");
                           $scope.alertMessage = "Invalid UserName/Password or Please contact HR Admin to login";
                          
                        }
                    }
                    else {
                        //alert("Fail to Login");
                        $scope.alertMessage = "Fail to Login";
                    }
                }, function (err) {          //second function "error"
                  //  alert('Error Occoured.Please check the internet connectivity..!');
                    $scope.alertMessage = "Error Occoured.Please check the internet connectivity..!";
                });
            }
            //else {
            //    alert("Please Enter UserName and Password..!");
            //}
        }

        vm.signup = function () {
            $state.go("public.register");
        }

        vm.forgetPassword = function () {
            
            if (vm.username == undefined) {
                //   alert("Please Enter Username");
                $scope.alertMessage = "Please Enter Username";
            }
            else {
                $http({
                    
                    method: 'POST',
                    dataType: 'JSON',
                    url: CommonURL + 'forgetPassword',
                    params: { UserName: vm.username },
                }).then(function (res)
                {
                    if(res.data>0)
                    {
                      //  alert("Check Your Registered EmailId");

                        $scope.alertMessage = "Check Your Registered EmailId";
                    }
                    else {
                    //    alert(" UserName/Email not exists");
                        $scope.alertMessage = "UserName/Email not exists";
                    }                   
                }, function (err) {
              //      alert("Error Occoured");
                });
            }
        }
        
        //function showPassword() {
        //    var x = document.getElementById("password");
        //    if (x.type === "password") {
        //        x.type = "text";
        //    } else {
        //        x.type = "password";
        //    }
        //}
        

    }];
    angular
       .module("HRMSApp")
       .controller("LoginCtrl", LoginCtrl)
})(angular);

