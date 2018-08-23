(function (angular, undefined) {
    "use strict";

    var CommonURL = "";
    var App_Key = "";
    var ApprovalCtrl = ["$scope", "$http", "$state", "$rootScope", "$filter", function ($scope, $http, $state, $rootScope, $filter) {
        CommonURL = $rootScope.ApiUrl + "StaffAdvanceApproval/";
        App_Key = $rootScope.App_Key;
        var vm = this;
        var DatabaseName = localStorage.getItem('databaseName');
        var RoleName = localStorage.getItem('RoleName');
        var UserId = parseInt(localStorage.getItem('UserId'));
        //Header Details
        var UsrId = "[" + UserId + "]";
        var RolName = "[" + RoleName + "]";
        var AppKey = "[" + App_Key + "]";

       // GetStaffAdvanceApprovalList();
        vm.ShowApprovePopup = false;
        vm.ShowCancelPopup = false;
        vm.viewEMIForm = false;
        //vm.ShowNRImage_Adv = true;
        //vm.ShowNRImage_ApvAdv = true;
        vm.ShowNRImage_Adv = false;
        vm.ShowNRImage_ApvAdv = false;
       
        GetAllStaffAdvanceApprovalList();
        GetStaffAdvanceApprovalList();

        vm.ClosePopUp = function () {
            vm.viewEMIForm = false;
        }

        $scope.selectedRow = null;
        $scope.setClickedRow = function (index) {
            $scope.selectedRow = index;
        }

     //   vm.GetStaffAdvanceApprovalList = function () {
        function GetStaffAdvanceApprovalList() {
            debugger;
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetStaffAdvanceApprovalList',
                params: { UserId: UserId, DatabaseName: DatabaseName },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '29'

                }
            }).then(function (res) {
                debugger;
                if (res.data.length > 0) {
                    vm.AdvanceApprovalList = res.data;
                   // vm.List = res.data;
                    paginateStatus();
                    vm.ShowNRImage_Adv = false;
                }
                else {
                    vm.ShowNRImage_Adv = true;
                }               
            }, function (err) {          //second function "error"
             //   alert('func err');
            });
        }

        //Approve Advance Approval
        vm.ApproveAdvanceApproval = function (AdvanceId, EmployeeId) {
            debugger;
            $http({
                method: 'POST',
                dataType: 'JSON',
                url: CommonURL + 'ApproveAdvanceApproval',
                params: { UserId: UserId, AdvanceId: AdvanceId, EmployeeId: EmployeeId, DatabaseName: DatabaseName },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': 'W',
                    'Menu': '28'
                }
            }).then(function (res) {
                if (res.data > 0) {                
                    vm.ShowApprovePopup = true;
                    vm.GetAllStaffAdvanceApprovalList();
                  //  vm.ShowNRImage_Adv = false;
                }
                else {
                //    vm.ShowNRImage_Adv = true;
                }
            }, function (err) {          //second function "error"
                //  alert('func err');

                $scope.alertMessageForAdvApproval = "Authorization has been denied";

            });
        }


        //Cancel Advance Approval
        vm.CancelAdvanceApproval = function (AdvanceId, EmployeeId) {
            debugger;
            var IsActive = 1;
            $http({
                method: 'POST',
                dataType: 'JSON',
                url: CommonURL + 'CancelAdvanceApproval',
                params: { UserId: UserId, AdvanceId: AdvanceId, EmployeeId: EmployeeId, DatabaseName: DatabaseName, IsActive: IsActive },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': 'W',
                    'Menu': '28'
                }
            }).then(function (res) {
                if (res.data > 0) {
                    vm.ShowCancelPopup = true;
                    vm.GetAllStaffAdvanceApprovalList();

                }
            }, function (err) {          //second function "error"
                //    alert('func err');
                $scope.alertMessageForAdvApproval = "Authorization has been denied";
            });
        }

        //vm.GetAllStaffAdvanceApprovalList = function () {
        function GetAllStaffAdvanceApprovalList() {
            debugger
            var IsActive = 1;
            //   function GetStaffAdvanceApprovalList() {
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetAllStaffAdvanceApprovalList',
                params: { UserId: UserId, DatabaseName: DatabaseName, IsActive: IsActive },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '28'
                }
            }).then(function (res) {
                debugger
                if (res.data.length > 0) {
                    vm.AllAdvanceApprovalList = res.data;

                  //  vm.GetStaffAdvanceApprovalList();
                  //  vm.List = res.data;
                    paginateApv();
                    vm.ShowNRImage_ApvAdv = false;
                }
                else {
                    vm.ShowNRImage_ApvAdv = true;
                }
            }, function (err) {          //second function "error"
              //  alert('func err');
            });
        }

        function paginateStatus() {
            debugger;
            $scope.ApvcurrentPage = 0;
            $scope.ApvpageSize = 10;
            $scope.dataStat = [];
            $scope.s = '';

            $scope.getData = function () {
                return $filter('filter')($scope.dataStat, $scope.s)
            }

            $scope.numberOfPages = function () {
                return Math.ceil($scope.getData().length / $scope.ApvpageSize);
            }

            $scope.dataStat = vm.AdvanceApprovalList;
        }

        function paginateApv() {
            debugger;
            $scope.currentPage = 0;
            $scope.ApvpageSize = 10;
            $scope.data = [];
            $scope.p = '';

            $scope.getData = function () {
                return $filter('filter')($scope.data, $scope.p)
            }

            $scope.numberOfPages = function () {
                return Math.ceil($scope.getData().length / $scope.ApvpageSize);
            }

            $scope.data = vm.AllAdvanceApprovalList;
        }


        vm.Clearsearch = function () {
            //$scope.p = null || '';
            $scope.search = '';
        }
        vm.ClearsearchApv = function () {
            //$scope.p = null || '';
            $scope.searchApv = '';
        }

        vm.ViewEMIDetails = function (advanceId,EmpId,Date,Currency,Amount) {
            $scope.LabelEmployeeId = EmpId;
            $scope.LabelDate = Date;
            $scope.LabelCurrency = Currency;
            $scope.LabelAmount = Amount;
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetEMIDetailsByAdvanceId',
                params: { EmployeeId: localStorage.getItem('UserId'), AdvanceId: advanceId, DatabaseName: localStorage.getItem('databaseName') },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '28'
                }
            }).then(function (res) {
                if (res.data.length > 0) {
                    debugger;
                    $scope.EMIDetailsByAdanceId = res.data;
                    //ng-click="vm.viewTaxform()"
                    vm.viewEMIForm = true
                }
                else {
                //    alert("No Records Found");
                }
            }, function (err) {
            //    alert('Error Occoured.Please check the internet connectivity..!');

            });

        }

       


       

    }];
    angular
       .module("HRMSApp")
       .controller("ApprovalCtrl", ApprovalCtrl)
})(angular);