(function (angular, undefined) {
    'use strict'

    var NewUserDetailCtrl = ["$scope", "$http", "$state", "$rootScope", "$filter", function ($scope, $http, $state, $rootScope, $filter) {

        var CommonURL = "";
        var App_Key = "";
        CommonURL = $rootScope.ApiUrl + "NewUserDetail/";
        App_Key = $rootScope.App_Key;
        var _this = this;

        var DatabaseName = localStorage.getItem('databaseName');
        var RoleName = localStorage.getItem('RoleName');
        $scope.alertMessage = "";
        //Header Details
        var UserId = localStorage.getItem('UserId');
        var UsrId = "[" + UserId + "]";
        var RolName = "[" + RoleName + "]";
        var AppKey = "[" + App_Key + "]";

        $scope.AuthAlertMessage = "";

        /*-----Binding Location List-----*/
        function getLocationList() {
            _this.locationList = [];
            $scope.selected = null;
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetLocationList',
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '30'
                }
            }).then(function (res) {
                if (res.data.length > 0) {
                    _this.locationList = res.data;
                    document.getElementById("ddlUserid").disabled = false;
                }
            }, function (err) {
             //   alert('func err');
            });
        }

        /*-----Binding UserIdList-----*/
        function getUserIdList() {
            //$scope.AuthAlertMessage = "";
            //$scope.alertMessage = "";
            debugger;
            // _this.useridList = [];
            $scope.selected = null;
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetUserIdList',
                params: { LocationID: $scope.location },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '30'
                }
            }).then(function (res) {
                if (res.data.length > 0) {
                    _this.useridList = [];
                    _this.useridList = res.data;
                    
                }
            }, function (err) {
            //    alert('func err');
            });

            if ($scope.location != "") {
                _this.errorLocation = false;
            }
        }
        $scope.getUserIdList = function () { getUserIdList(); }


        /*-----Binding UserRoleList-----*/
        function getUserRoleList() {
            _this.userRoleList = [];
            $scope.selected = null;
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetUserRoleList',
                params: { IsActive: "1" },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '30'
                }
            }).then(function (res) {
                if (res.data.length > 0) {
                    _this.userRoleList = res.data;
                }
            }, function (err) {
            //    alert('func err');
            });
        }


        /*----Binding UserCompanyList-----*/
        function getUserCompanyList() {
            _this.userCompanyList = [];
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetUserCompanyList',
                params: { IsActive: "1", IsCompany: "1" },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '30'
                }
            }).then(function (res) {
                if (res.data.length > 0) {
                    _this.userCompanyList = res.data;
                    paginate();
                }
            }, function (err) {
            //    alert('func err');
            });
        }

        /*---Displaying New User List-----*/

        function getUserList() {
            var UserId = parseInt(localStorage.getItem('UserId'));

            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'getNewUserDetails',
                params: { DatabaseName: DatabaseName, UserId: UserId },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '30'
                }
            }).then(function (res) {
                _this.NewUserDetails = res.data;
                console.log(_this.NewUserDetails);
            }, function (err) {          //second function "error"
            //    alert("function error");
            });
        }

        $scope.getNewUserList = function () { getUserList(); }

        /*----Display company & role popup----*/
        $scope.showCompanyRole = function (user) {
            $scope.useridCompany = user.userId;
            $scope.company = user.companyDescription;
            $scope.firstnameCompany = user.firstName;
            $scope.lastnameCompany = user.lastName;
            $scope.role = user.roleName;
        }


        /*-----Edit/Update New User Details*/
        $scope.edit = function (user) {
            debugger;
            //document.getElementById("spSuccessMsg").innerHTML = " ";
            $scope.alertMessage = "";
            _this.updateMsg = true;
            _this.errorLocation = false; _this.errorUserid = false; _this.errorRole = false; _this.errorCompany = false; _this.errorPassword = false;// _this.active = false;
            $scope.location = user.locationId;
            getUserIdList();
            $scope.userid = user.userId;
            $scope.password = user.password;
            $scope.roleList = user.roleName;
            $scope.companyList = user.companyDescription;
            if (user.isActive == true) {
                $scope.active = true;
                $scope.inactive = false;
            }
            else {
                $scope.inactive = true;
                $scope.active = false;
            }
            $scope.editRoleid = user.roleIds;
            var editRoleid = user.roleIds;
            _this.SelectRole = [];
            _this.SelectCompany = [];
            var strarrayRole = editRoleid.split(',');

            //_this.SelectRole = [];
            for (var ia = 0; ia <= strarrayRole.length; ia++) {
                angular.forEach(_this.userRoleList, function (value, index) {

                    if (Number(value.roleId) == Number(strarrayRole[ia])) {
                        debugger
                        value.flag = true;
                        _this.SelectRole.length = 0;
                        _this.SelectRole.push(value.roleName);
                    }

                });
            }

            $scope.editCompanyid = user.companyIds;
            var editCompanyid = user.companyIds;

            var strarrayCompany = editCompanyid.split(',');
            debugger;
            for (var ia = 0; ia <= strarrayCompany.length; ia++) {
                angular.forEach(_this.userCompanyList, function (value, index) {

                    if (Number(value.hierarchyId) == Number(strarrayCompany[ia])) {
                        debugger
                        value.flag = true;
                        _this.SelectCompany.length = 0;
                        _this.SelectCompany.push(value.description);
                    }

                });
            }

        }

        /*---Add New User---*/
        _this.updateMsg = false;
        $scope.AddNewUser = function () {
            debugger;
            _this.errorLocation = false; _this.errorUserid = false; _this.errorRole = false; _this.errorCompany = false;
            _this.errorPassword = false; _this.errorActive = false;
            if ($scope.location == "" || $scope.location == undefined) {
                _this.errorLocation = true;
            }
            if ($scope.userid == "" || $scope.userid == undefined) {
                _this.errorUserid = true;
            }
            if ($scope.password == "" || $scope.password == undefined) {
                _this.errorPassword = true;
            }
            //if (($scope.active == "" && $scope.active == undefined) || ($scope.inactive == "" && $scope.inactive == undefined)) {
            //    _this.errorActive = true;
            //}

            var ddlUserId = $scope.userid;

            var ress = _this.userRoleList;
            var RoleIds = [];
            angular.forEach(_this.userRoleList, function (value, index) {
                if (value.flag) {
                    var roleids = { id: value.roleId, userid: ddlUserId }
                    RoleIds.push(roleids);
                }
            });
            var resultsRole = RoleIds;
            if (resultsRole.length == 0) {
                _this.errorRole = true;
            }

            var company = _this.userCompanyList;
            var CompanyIds = [];
            //angular.forEach(_this.userCompanyList, function (value, index) {
            //    if (value.flag) {
            //        var companyids = { userid: ddlUserId, id: value.hierarchyId, IsDepartment: 1 }
            //        CompanyIds.push(companyids);
            //    }
            //});
            //for temp Solution to deactivate company
            var companyids = { userid: ddlUserId, id: 1, IsDepartment: 1 }
            CompanyIds.push(companyids);

            var resultsCompany = CompanyIds;
            if (_this.updateMsg == false) {
                if (resultsCompany.length == 0 || $scope.companyList == "") {
                    _this.errorCompany = true;
                }
            }
            if (_this.updateMsg == true) {
                if (resultsCompany.length == 0 && $scope.companyList == "") {
                    _this.errorCompany = true;
                }
            }
            // if ($scope.addUpdateUserForm.$valid) {

            var Username = document.getElementById("txtUsername").value;
            var Password = document.getElementById("txtPassword").value;

            var IsActive;
            if ($scope.active == true) IsActive = true;
            else if ($scope.active == false) IsActive = false;
            else IsActive = true;

            var NewUserParams = {
                DatabaseName: DatabaseName,
                UserIdNew: ddlUserId,
                Username: Username,
                Password: Password,
                Roles: RoleIds,
                Company: CompanyIds,
                IsActive: IsActive
            };

           // alert(NewUserParams.Company);
            //&& _this.errorActive == false

            if (_this.errorLocation == false && _this.errorUserid == false && _this.errorPassword == false &&  _this.errorRole == false)   //  _this.errorCompany == false
            {
                $http({
                    method: 'POST',
                    dataType: 'JSON',
                    url: CommonURL + 'AddNewUserDetails',                
                    data: NewUserParams,
                    headers: {
                        'Content-Type': 'application/json',
                        'App_Key': AppKey,
                        'UserId': UsrId,
                        'RoleName': RolName,
                        'Read': 'R',
                        'Write': 'W',
                        'Menu': '30'
                    },

                }).then(function (res) {
                    debugger;
                    //alert("Records inserted successfully");
                    //_this.SelectRole.length = 0;
                   // _this.SelectCompany.length = 0;
                    RoleIds.length = 0;
                    CompanyIds.length = 0;
                    $scope.roleList = "";
                    $scope.countryList = "";
                    if (_this.updateMsg == true) {
                    //    document.getElementById("spSuccessMsg").innerHTML = "Records updated successfully";
                        $scope.alertMessage = "User Details Updated Successfully";
                        _this.Clear();
                    }
                    else {
                        //   document.getElementById("spSuccessMsg").innerHTML = "Records inserted successfully";
                        $scope.alertMessage = "User Details Inserted Successfully";
                        _this.Clear();
                    }
                    _this.errorLocation = false; _this.errorUserid = false; _this.errorRole = false; _this.errorCompany = false; _this.errorPassword = false; _this.errorActive = false;
                    $scope.getNewUserList();
                }, function (err) {
                    //     alert("function error");
                  $scope.AuthAlertMessage=  "Authorisation has been denied";

                });
            }
            // }

        }


        $scope.changeRole = function () {
            debugger;
            _this.errorRole == false;
            var ress = _this.userRoleList;
            var RoleIds = [];
            angular.forEach(_this.userRoleList, function (value, index) {
                if (value.flag) {
                    var roleids = { id: value.roleId, name: value.roleName }
                    RoleIds.push(roleids);
                }
            });
            var RoleListLength = RoleIds.length;
            var RoleNameList = [];
            for (var i = 0; i < RoleListLength; i++)
                RoleNameList.push(RoleIds[i].name);
            $scope.roleList = RoleNameList;
        }

        $scope.changeCompany = function () {
            debugger;
            var ress = _this.userCompanyList;
            var CompanyIds = [];
            angular.forEach(_this.userCompanyList, function (value, index) {
                if (value.flag) {
                    var companyids = { id: value.hierarchyId, name: value.description }
                    CompanyIds.push(companyids);
                }
            });
            var CompanyListLength = CompanyIds.length;
            var CompanyNameList = [];
            for (var i = 0; i < CompanyListLength; i++)
                CompanyNameList.push(CompanyIds[i].name);
            $scope.companyList = CompanyNameList;
        }

        function paginate() {

            $scope.currentPage = 0;
            $scope.pageSize = 10;
            $scope.data = [];
            $scope.q = '';

            $scope.getData = function () {
                return $filter('filter')($scope.data, $scope.q)
            }

            $scope.numberOfPages = function () {
                return Math.ceil($scope.getData().length / $scope.pageSize);
            }

            $scope.data = _this.NewUserDetails;
        }

        $scope.changeActive = function () {
            debugger;
            // alert($scope.inactive)
            if ($scope.active != "") {
                // $scope.inactive == "";
                _this.inactive = false;
                _this.active = true;
            }
            if ($scope.inactive != "") {
                _this.active = false;
                _this.inactive = true;
            }
        }

        /*--Clear Function---*/
        _this.Clear = function () {
            debugger;
            _this.updateMsg = false;
           // document.getElementById("spSuccessMsg").innerHTML = "";
            _this.errorLocation = false; _this.errorUserid = false; _this.errorRole = false; _this.errorCompany = false; _this.errorPassword = false; _this.active = false;
            getLocationList();
            document.getElementById("ddlUserid").disabled = true;
            $scope.userid = "";
            $scope.password = "";
            $scope.active = "true";
            $scope.inactive = "";
        }
        $scope.clear = function () { Clear(); }

        /*Function calling*/
        getUserList();
        getUserRoleList();
        getLocationList();
        getUserCompanyList();

        $scope.ClearAlert = function () {
            debugger;
           
            if ($scope.userid != "" || $scope.userid != undefined || $scope.userid != null) {
                _this.errorUserid = false;
                return false;
            }

        }

        $scope.ClearAlertPass = function () {
            if ($scope.password != "" || $scope.password != undefined) {
                _this.errorPassword = false;
                return false;
            }

        }

    }];


    angular
      .module("HRMSApp")
      .controller("NewUserDetailCtrl", NewUserDetailCtrl)
})(angular)
