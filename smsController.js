(function (angular, undefined) {
    "use strict";

    var CommonURL = "";

    var SmsCtrl = ["$scope", "$http", "$state", "$rootScope", "$filter", function ($scope, $http, $state, $rootScope, $filter) {
        CommonURL = $rootScope.ApiUrl + "Sms/";
        var vm = this;
        vm.ShowForgetPasswordPopup = false;
        $scope.textOTP = true;   
        $scope.alertMessageModal = "";
        $scope.alertMessageForSMS = "";
        vm.ForgetPasswordPopup = function () {
            debugger
            vm.ShowForgetPasswordPopup = true;
       //     alert(vm.ShowForgetPasswordPopup);
        }

        vm.CloseForgetPasswordPopup = function () {
          
            $scope.emptyValidateAlert();
            $scope.alertMessageModalForOTPRequired = "";
            vm.ClearText();
            $scope.alertMessageModal = "";
            $scope.alertMessageForSMS = "";
            vm.ShowForgetPasswordPopup = false;
        }


        vm.SendSms = function () {
            debugger;
            try{
                //if ($scope.forgetPasswordForm.$valid == false) {         
                //    document.getElementById("spanEmpID").style.display = 'block';
                //    document.getElementById("spanEmail").style.display = 'block';
                //    document.getElementById("spanMobile").style.display = 'block';
                //}

                var UserId = document.getElementById("txtEmployeeId").value;
                var Email = document.getElementById("txtEmail").value;
                var mobileNo = document.getElementById("txtMobile").value;
                //document.getElementById("txtCountryPrefix").defaultValue = "91";
                //var mobileNo = document.getElementById("txtCountryPrefix").value + "" + mobile;
           

                //if ($scope.forgetPasswordForm.$valid) {
                if (UserId == "" || Email == "" || mobileNo == "") {
                    $scope.alertMessageModal = "Please Enter required fields to receive OTP";
                    //   alert($scope.alertMessage);
                }
                else {
                    if (ValidateEmail()) {
                        //     var mobileNo = $scope.txtMobile;
                        //     var msg = "The New Password for HRM : 12345";
                        //     var UserId = parseInt(localStorage.getItem('UserId'));
                        //       var UserId = $scope.txtEmployeeId;
                        //   var Email = $scope.txtEmail;
                        var OTP = Math.floor(1000 + Math.random() * 9000);
                        localStorage.setItem("Otp", OTP);


                        $http({
                            method: 'POST',
                            dataType: 'JSON',
                            url: CommonURL + 'SendSms',
                            params: { mobileNo: mobileNo, UserId: UserId, OTP: OTP },

                        }).then(function (res) {
                            debugger;
                            if (res.data == 0) {
                                $scope.alertMessageModal = "User ID does not exists";
                            }
                            else {
                                if (res.data == "1") {
                                    $scope.alertMessageForSMS = "OTP Sent to Your Mobile";
                                    $scope.alertMessageModal = "";
                                    $scope.textOTP = false;
                                }
                                else {
                                    $scope.alertMessageModal = res.data;
                                }

                            }
                        }, function (err) {          //second function "error"
                            //   alert('func err');
                        });
                    }
                    //else {
                    //    alert("Email address is not valid");
                    //}
                    //   }
                }
            }
            catch (err) {
                alert(err.message);
            }
        }


        //---------------send otp and mail by clicking submit in popup-------------------------

        vm.SendPassword = function () {
            debugger;
            if ($scope.txtUserName == undefined || $scope.txtUserName == "") {
                //   alert("Please Enter Username");
                $scope.alertMessageModal = "Please Enter Username";
            }
            else {
                $http({

                    method: 'GET',
                    dataType: 'JSON',
                    url: CommonURL + 'GetForgetPasswordDetails',
                    params: { UserName: $scope.txtUserName },

                }).then(function (res) {
                    debugger;
                    if (res.data.length > 0) {
                        //  alert("Check Your Registered EmailId");
                        //  $scope.alertMessageModal = "Check Your Registered EmailId/Message";
                        $scope.txtEmail = res.data[0].email;
                        $scope.txtMobile = res.data[0].mobile;
                        $scope.txtCountryPrefix = res.data[0].countryPrefix;
                    }
                    else {
                        //    alert(" UserName/Email not exists");
                        $scope.alertMessageModal = "UserName/Email not exists";
                    }
                }, function (err) {
                    //      alert("Error Occoured");
                });
            }
        }


        //vm.forgetPassword = function () {
        $scope.forgetPassword = function () {
            debugger;
            //var UserId = $scope.txtEmployeeId;
            //var Email = $scope.txtEmail;
            //var OTP = $scope.txtOtp;

         

            var UserId = document.getElementById("txtEmployeeId").value;
            var Email = document.getElementById("txtEmail").value;
            var mobileNo = document.getElementById("txtMobile").value;
            var OTP = document.getElementById("txtOtp").value;


            if ($scope.forgetPasswordForm.$valid == false) {
                document.getElementById("spanEmpID").style.display = 'block';
                document.getElementById("spanEmail").style.display = 'block';
                document.getElementById("spanMobile").style.display = 'block';
            }


            //if (UserId == undefined || Email == undefined || OTP == undefined) {
            //    $scope.alertMessageModal = "Please Enter required fields to receive OTP";
            //}
            //else {

          
            if ($scope.forgetPasswordForm.$valid) {
                if (OTP != "") {
                    var otp = localStorage.getItem('Otp');
                    if (OTP != otp) {
                        $scope.alertMessageModal = "OTP is not Valid";
                        $scope.alertMessageForSMS = "";
                    }

                    else {


                        $http({
                            method: 'GET',
                            dataType: 'JSON',
                            url: CommonURL + 'forgetPassword',
                            params: { UserId: UserId, ToEmail: Email },

                        }).then(function (res) {
                            debugger;
                            if (res.data > 0) {
                                //  alert("Email Sent");
                                $scope.alertMessageForSMS = "Check your Email to Know your Password";
                                $scope.alertMessageModal = "";
                                vm.ClearText();
                                $scope.emptyValidateAlert();
                            }

                            else {
                                //  alert("Error Occured");
                            }
                        }, function (err) {          //second function "error"
                            //   alert('func err');
                        });
                    }
                }
            } else {
                $scope.alertMessageModalForOTPRequired = "OTP is required";
            }
            //    }
        }

        vm.ClearText = function () {
            $scope.txtEmployeeId = "";
            $scope.txtEmail = "";
            $scope.txtOtp = "";
            $scope.txtMobile = "";
            $scope.textOTP = true;
        }


        // -----------------Validate Email and Mobile Number------------------

        function ValidateEmail() {
            //var x = document.forms["forgetPasswordForm"]["email"].value;
            //var atpos = x.indexOf("@");
            //var dotpos = x.lastIndexOf(".");
            //if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
            //    alert("Not a valid e-mail address");
            //    return false;
            //}

            var email = document.getElementById('txtEmail');
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

            if (!filter.test(email.value)) {
                //   alert('Please provide a valid email address');
                $scope.alertMessageModal = "Please provide a valid Email Address";
                email.focus;
                return false;
            }

            var val = document.getElementById("txtMobile").value;
         
            if (/^\d{10}$/.test(val)) {
                // value is ok, use it
                return true;
            } else {
                //   alert("Invalid number; must be ten digits")
                $scope.alertMessageModal = "Invalid number, must be ten digits";
                //  number.focus()
                return false
            }

        }

        $scope.emptyValidateAlert = function () {
            if (document.getElementById("spanEmpID"))
                document.getElementById("spanEmpID").style.display = 'none';
            if (document.getElementById("spanEmail"))
                document.getElementById("spanEmail").style.display = 'none';
            if (document.getElementById("spanMobile"))
                document.getElementById("spanMobile").style.display = 'none';


        }



    }];
    angular
       .module("HRMSApp")
       .controller("SmsCtrl", SmsCtrl)
})(angular);