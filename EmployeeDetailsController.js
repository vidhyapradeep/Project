(function (angular, undefined) {
    'use strict'
    var EmployeeDetailsCtrl = ["$scope", "$http", "$state", "$rootScope", "$filter", function ($scope, $http, $state, $rootScope, $filter) {

        var CommonURL = "";
        var App_Key = "";
        CommonURL = $rootScope.ApiUrl + "EmployeeDetails/";
        App_Key = $rootScope.App_Key;
        var _this = this;
        var DatabaseName = localStorage.getItem('databaseName');
        var UserId = localStorage.getItem('UserId');
        var RoleName = localStorage.getItem('RoleName');
        //Header Details
        var UsrId = "[" + UserId + "]";
        var RolName = "[" + RoleName + "]";
        var AppKey = "[" + App_Key + "]";

        var MaritalStatusId;
        $scope.alertMessage = "";
        $scope.errorMessage = "";
        $scope.MaritalStatusType = "";
        document.getElementById("txtMaritalStatusDate").disabled = true;

        _this.VeteranArr = [
          { id: 1, type: 'Army' },
          { id: 2, type: 'Navy' },
          { id: 3, type: 'Airforce' },

        ];

        _this.VeteranArr1 = [
          { id: 0, type: 'No' },
          { id: 1, type: 'Yes' },

        ];

        function getCountryList() {

            var isActive = 1
            _this.countryList = [];
            $scope.selected = null;
            var Language = "en";
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: $rootScope.ApiUrl + "Register/" + 'GetCountryList',
                params: { isActive: isActive, DatabaseName: DatabaseName, Language: Language },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '6'
                }
            }).then(function (res) {
                if (res.data.length > 0) {
                    _this.countryList = res.data;
                    //    console.log(res);
                }

            }, function (err) {
                $scope.errorMessage = "Authorization has been denied";
            });
        }


        getCountryList();


        function getMaritalStatusList() {
            var isActive = 1
            _this.MaritalStatusList = [];
            $scope.selected = null;
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetMaritalStatusList',
                params: { DatabaseName: DatabaseName },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '6'
                }

            }).then(function (res) {

                if (res.data.length > 0) {

                    _this.MaritalStatusList = res.data;

                    //   console.log(res);
                }
            }, function (err) {
                $scope.errorMessage = "Authorization has been denied";
            });
        }
        getMaritalStatusList();

        function getEmployeeDetails() {

            var UserId = parseInt(localStorage.getItem('UserId'));
            //   var DatabaseName = localStorage.getItem('databaseName');          
            _this.EmployeeDetails = [];
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'getEmployeeDetails',
                params: { DatabaseName: DatabaseName, ContactId: UserId },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '6'
                }
            }).then(function (res) {
                //debugger;
                _this.EmployeeDetails = res.data;

                $scope.fromDate = res.data[0].maritalStatusDate.split(' ')[0];

                _this.maritalStatus = res.data[0].maritalStatus;

                $scope.userimage = res.data[0].strEmpImg;

                MaritalStatusId = res.data[0].maritalStatusId;
                if (res.data[0].maritalStatusId == 2) {
                    _this.maritalStatusId = 2;
                }

                if (MaritalStatusId != 2) {
                    document.getElementById("txtMaritalStatusDate").disabled = true;
                    document.getElementById("txtMaritalStatusDate").value = "";
                    $scope.fromDate = "";
                }
                //else {
                //    document.getElementById("txtMaritalStatusDate").disabled = false;
                //}

                if (res.data[0].isVeteran != 0) {
                    _this.isVeteran = _this.VeteranArr1[1].id;
                }
                else {
                    _this.isVeteran = _this.VeteranArr1[0].id;
                }
                //console.log(res);
            }, function (err) {
                $scope.errorMessage = "Authorization has been denied";
            });
        }
        getEmployeeDetails();


        $scope.fnmrgdate = function (mySwitch6) {
            //alert(mySwitch6);
            //alert(_this.EmployeeDetails[0].maritalStatusId);
            if (_this.EmployeeDetails[0]) {
                if (_this.EmployeeDetails[0].maritalStatusId != 2) {
                    document.getElementById("txtMaritalStatusDate").disabled = true;
                    document.getElementById("txtMaritalStatusDate").value = "";
                    $scope.fromDate = "";
                }
                //else {
                //    document.getElementById("txtMaritalStatusDate").disabled = false;
                //}

                if (_this.EmployeeDetails[0].maritalStatusId == 2 && mySwitch6 == false) {
                    document.getElementById("txtMaritalStatusDate").disabled = false;
                }
                else {
                    document.getElementById("txtMaritalStatusDate").disabled = true;
                }
            }
        }

        $scope.disableDate = function () {
            //alert(_this.EmployeeDetails[0].maritalStatusId);
            if (_this.EmployeeDetails[0]) {
                if (_this.EmployeeDetails[0].maritalStatusId != 2) {
                    document.getElementById("txtMaritalStatusDate").disabled = true;
                    document.getElementById("txtMaritalStatusDate").value = "";
                    $scope.fromDate = "";
                }
                else {
                    document.getElementById("txtMaritalStatusDate").disabled = false;
                }
            }
        }

        $scope.selectDate = function () {
            if (MaritalStatusId == 2) {
                debugger;
                $scope.enableMe = true;
            }
            else
                $scope.enableMe = false;
        }


        $scope.UpdateImage = function () {
            var UserId = parseInt(localStorage.getItem('UserId'));
            var file = $scope.AlbumPic;
            var DatabaseName = localStorage.getItem('databaseName');
            var registerModelEntityList = {
                DatabaseName: DatabaseName,
                EmployeeID: UserId,
                StrEmpImg: file
            }

            $http({
                method: 'POST',
                dataType: 'JSON',
                url: CommonURL + 'updateEmployeeImage',
                data: registerModelEntityList,
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': 'W',
                    'Menu': '6'
                }
            }).then(function (res) {
                //alert("Records updated");
                $scope.alertMessage = "Personal details Updated Successfully";
                getEmployeeDetails();
            }, function (err) {
                $scope.errorMessage = "Authorization has been denied";
            });

        }

        /*----Update/Insert Employee Details----*/
        $scope.UpdateEmployeeDetails = function () {
            $scope.errorMessage = "";
            $scope.alertMessage = "";
            debugger;
            var UserId = parseInt(localStorage.getItem('UserId'));
            var Country = _this.EmployeeDetails[0].countryId;
            var HAddress = document.getElementById("HAddress").value;
            var Mobile = document.getElementById("txtMobile").value;
            var Email = document.getElementById("txtEmail").value;
            var EmergencyName = document.getElementById("txtEmergencyName").value;
            var EmergencyRelation = document.getElementById("txtemergencyRelation").value;
            var EmergencyPhonenumber = document.getElementById("txtemergencyPhonenumber").value;
            //var MaritalStatus = document.getElementById("ddlMaritalStatus").value;
            var MaritalStatus = _this.EmployeeDetails[0].maritalStatusId;
            var MaritalStatusDate = document.getElementById("txtMaritalStatusDate").value;
            var PrefPrimaryName = document.getElementById("txtPreferedPName").value;
            var PreferedName = document.getElementById("txtPreferedName").value;
            var checkedPrimary = document.getElementById("txtemergencyIsPrimary").checked;
            var contactPhone = document.getElementById("ContactPhone").checked;
            var contactEmail = document.getElementById("ContactEmail").checked;
            var checkedDisable = document.getElementById("chkIsDisable").checked;

            var ststype = "";
            if (_this.isVeteran == 0) {
                ststype = _this.isVeteran;
            }
            else {
                ststype = _this.EmployeeDetails[0].isVeteran;
                //ststype = document.getElementById("ddlVeteranStatus").value;
            }

            var emailId = Email;
            var atpos = emailId.indexOf("@");
            var dotpos = emailId.lastIndexOf(".");
            if (emailId != "") {
                if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= emailId.length) {
                    //alert("Not a valid e-mail address");
                    $scope.alertMessage = "";
                    $scope.errorMessage = "Not a valid e-mail address";
                    return false;
                }
            }

            if (MaritalStatus == 2 && $scope.fromDate == "") {
                $scope.alertMessage = "";
                $scope.errorMessage = "Please Select Marriage Date";
                return false;
            }
            if (_this.isVeteran > 0 && ststype == "") {
                $scope.alertMessage = "";
                $scope.errorMessage = "Please Select Veteran Type";
                return false;
            }


            debugger;
            $http({
                method: 'POST',
                dataType: 'JSON',
                url: CommonURL + 'updateEmployeeDetails',
                params: {
                    DatabaseName: DatabaseName, ContactId: UserId, CountryId: Country, Address: HAddress, Mobile: Mobile, Email: Email, MaritalStatus: MaritalStatus,
                    MaritalStatusDate: MaritalStatusDate, EmergencyContactName: EmergencyName, EmergencyContactRelationship: EmergencyRelation, EmergencyPhonenumber,
                    PreferedPrimaryName: PrefPrimaryName, PreferedName: PreferedName, Disable: checkedDisable, Veteran: ststype, EmergencyIsPrimary: checkedPrimary,
                    EmailPrefered: contactEmail, MobilePrefered: contactPhone
                },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': 'W',
                    'Menu': '6'
                }
            }).then(function (res) {
                //alert("Records updated");
                $scope.errorMessage = "";
                $scope.alertMessage = "Personal details Updated Successfully";
                getEmployeeDetails();
            }, function (err) {
                $scope.errorMessage = "Authorization has been denied";
            });
        }

        $scope.setClickedRow = function (index) {
            $scope.selectedRow = index;
        }


    }];



    angular
      .module("HRMSApp")
      .controller("EmployeeDetailsCtrl", EmployeeDetailsCtrl)
})(angular);
