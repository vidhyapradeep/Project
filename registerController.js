(function (angular, undefined) {
    "use strict";

    var CommonURL = "";

    var RegisterCtrl = ["$scope", "$http", "$state", "$rootScope", function ($scope, $http, $state, $rootScope) {
        CommonURL = $rootScope.ApiUrl + "Register/";
        var vm = this;
        $scope.inputType = 'password';
        $scope.alertMessage = "";
        var DatabaseName = localStorage.getItem('databaseName');
        /////////////////////////////////////////////////




        //var date = new Date();         
        //$scope.dob = date.getFullYear() - 10;


        /////////////////////////////////////////////////////   

        $scope.$watch('regCtrl.empid', function () {
            $scope.regCtrl.username = $scope.regCtrl.empid;

        });

        getCountryList();

        function getCountryList() {
            DatabaseName = "";
            var isActive = 1
            var Language = "en";
            var Active = "1";
            vm.countryList = [];
            $scope.selected = null;
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetCountryList',
                params: { isActive: isActive, DatabaseName: DatabaseName, Language: Language },
                //headers: {
                //    'Content-Type': 'application/json',
                //    'App_Key': AppKey,
                //    'UserId': UsrId,
                //    'RoleName': RolName,
                //    'Read': 'R',
                //    'Write': ''
                //}

            }).then(function (res) {

                if (res.data.length > 0) {

                    vm.countryList = res.data;
                }
                else {
                    //    alert(0);
                }

            }, function (err) {          //second function "error"
                //    alert('func err');
            });
        }


        vm.registerEmp = function () {
            debugger;

            var registerModelEntityList = {
                EmployeeId: $scope.regCtrl.empid,
                GovtId: $scope.regCtrl.govtid,
                DOB: $scope.dob,
                EmailAddress: $scope.regCtrl.email,
                MobileNo: $scope.regCtrl.mobileno,
                Password: $scope.regCtrl.password,
                Country: $scope.regCtrl.regCountry,
                UserName: $scope.regCtrl.username,
            }

            if ($scope.regForm.$valid == false) {
                document.getElementById("spanEmpId").style.display = "block";
                document.getElementById("spanGovtId").style.display = "block";
                document.getElementById("spanDob").style.display = "block";
                document.getElementById("spanMobile").style.display = "block";
                document.getElementById("spanCountry").style.display = "block";
                document.getElementById("spanUserName").style.display = "block";
                document.getElementById("spanPassword").style.display = "block";
                document.getElementById("spanConfirmPwd").style.display = "block";
            }

            //if (ValidateRegister($scope)) {
            if ($scope.regForm.$valid) {

                if ($scope.regCtrl.password == $scope.regCtrl.confirmPassword) {
                    document.getElementById("spanEmail").style.display = "none";
                    if (checkEmail()) {
                     //     if (underAgeValidate($scope.dob)) {
                        debugger;
                        try {
                            $http({
                                method: 'POST',
                                dataType: 'JSON',
                                url: CommonURL + 'SaveEmployeeRegister',
                                data: registerModelEntityList,
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }).then(function (res) {
                                debugger;
                                if (res.data.length > 0) {

                                    if (res.data[0].status > 0) {
                                        //    $state.go("login");
                                        $scope.alertMessage = res.data[0].msg;
                                        $scope.ClearText();
                                        //  $scope.emptyValidateAlert();
                                    }
                                    else {
                                        $scope.alertMessage = res.data[0].msg;
                                        $scope.ClearText();
                                    }

                                    //   alert(res.data[0].msg);
                                    // alert(" User Details Registered Sucessfully");

                                    //  $state.go("login");
                                }
                                else {
                                    //    alert("UserName already exists");

                                    $scope.alertMessage = "UserName already exists";
                                }
                            }, function (err) {          //second function "error"
                                //   alert(err);
                                return;
                            });
                        }
                        catch (e) {
                            //    alert(e.message);
                        }
                      //        }
                    }
                    else {
                        document.getElementById("spanEmail").style.display = "block";
                        document.getElementById("spanEmail").innerHTML = "Please provide a valid Email Address";
                    }
                }
                else {
                    $scope.alertMessage = "Password and Confirm Password should be same";
                }
            }
        }


        function underAgeValidate(dob) {
            var optimizedBirthday = dob.replace(/-/g, "/");
            var mydob = new Date(optimizedBirthday);
            var currentDate = new Date().toJSON().slice(0, 10) + ' 01:00:00';
            var Age = ~~((Date.now(currentDate) - mydob) / (31557600000));
            if (Age < 18) {
                //  alert("Employee Should be 18 years Old");
                $scope.alertMessage = "Employee Should be 18 years Old";
                return false;
            } else {
                return true;
            }

        }

        vm.regValidate = false;
        function ValidateRegister($scope) {
        }


        vm.Captcha = function () {

            vm.possible = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            vm.verficode = '';
            for (var i = 0; i < 4; i++) {
                vm.verficode += vm.possible.charAt(Math.floor(Math.random() * vm.possible.length));
            }

            vm.oldCapthaCode = vm.verficode;
        }

        vm.myCheck = function () {

            if (vm.NewCaptchaCode.length == 4 && vm.NewCaptchaCode == vm.oldCapthaCode) {

                //     alert("successfull");
            }
            else {
                //   alert("captcha code doesnot match");
            }
        }

        vm.Login = function () {
            $state.go("login");
        }

        vm.show = function () {
            debugger;
            //  $scope.inputType = 'password';
            if ($scope.inputType == 'password')
                $scope.inputType = 'text';
            else
                $scope.inputType = 'password';
        };


        // -----------------Validate Email and Mobile Number------------------

        function ValidateEmail() {

            var email = $scope.regCtrl.email;
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

            if (!filter.test(email.value)) {
                //   alert('Please provide a valid email address');
                document.getElementById("spanEmail").innerHTML = "Please provide a valid Email Address";
                alert(email);
                email.focus;

            }
        }

        //function checkEmail() {

        //    var email = document.getElementById('txtEmail').value;
        //    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        //    if (!filter.test(email.value)) {
        //    //    alert('Please provide a valid email address');
        //        email.focus;
        //        return false;
        //    }
        //    return true;
        //}

        $scope.clearEmailspanmsg = function () {
            document.getElementById("spanEmail").style.display = "none";
        }

        function checkEmail() {

            var x = document.getElementById('txtEmail').value;

            if (x != "") {
                var atpos = x.indexOf("@");

                var dotpos = x.lastIndexOf(".");

                if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                return true;
            }

        }

        $scope.ClearText = function () {
            $scope.regCtrl.empid = "";
            $scope.regCtrl.govtid = "";
            $scope.dob = "";
            $scope.regCtrl.email = "";
            $scope.regCtrl.mobileno = "";
            $scope.regCtrl.password = "";
            $scope.regCtrl.regCountry = "";
            $scope.regCtrl.username = "";
            $scope.regCtrl.confirmPassword = "";
            $scope.regCtrl.password = "";
            $scope.emptyValidateAlert();
        }

        $scope.emptyValidateAlert = function () {
            document.getElementById("spanEmpId").style.display = "none";
            document.getElementById("spanGovtId").style.display = "none";
            document.getElementById("spanDob").style.display = "none";
            document.getElementById("spanMobile").style.display = "none";
            document.getElementById("spanCountry").style.display = "none";
            document.getElementById("spanUserName").style.display = "none";
            document.getElementById("spanPassword").style.display = "none";
            document.getElementById("spanConfirmPwd").style.display = "none";
        }

    }];
    angular
       .module("HRMSApp")
       .controller("RegisterCtrl", RegisterCtrl)
})(angular);