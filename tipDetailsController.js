(function (angular, undefined) {
    "use strict";
    var CommonURL = "";
    var App_Key = "";
    var TipDetailsCtrl = ["$scope", "$http", "$state", "$rootScope", function ($scope, $http, $state, $rootScope) {
        CommonURL = $rootScope.ApiUrl + "TipDetails/";
        App_Key = $rootScope.App_Key;
        var vm = this;

        var DatabaseName = localStorage.getItem('databaseName');
        var RoleName = localStorage.getItem('RoleName');
        var UserId = parseInt(localStorage.getItem('UserId'));
        //Header Details
        var UsrId = "[" + UserId + "]";
        var RolName = "[" + RoleName + "]";
        var AppKey = "[" + App_Key + "]";

        $scope.alertMessage = "";
        vm.ShowNRImage = false;

        vm.LoadSalaryPeriods = function () {
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetSalaryPeriodDetails',
                params: { HierachyId: localStorage.getItem('HierachyId'), DatabaseName: localStorage.getItem('databaseName') },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '16'
                }
            }).then(function (res) {
                if (res.data.length > 0) {
                    $scope.divTip = true;
                    $scope.SalaryPeriods = res.data;
                 //   vm.ShowNRImage = false;
                }
                else {
                    //  alert("No Records Found");
                 //   $scope.alertMessage = "No Records Found";
                    $scope.divTip = true;
                 //   vm.ShowNRImage = true;
                }
            }, function (err) {
              $scope.alertMessage = "Authorization has been denied";
            });
        }
        $scope.divTip = true;
        vm.BtnSubmitClick = function () {

            if ($scope.TipForm.$valid) {
                if ($scope.SelectedPeriod == 'Select' || typeof $scope.SelectedPeriod === "undefined") {
                    //alert('Please select salary period.');
                    $scope.alertMessage = 'Please select salary period.';
                    return;
                }
                $http({
                    method: 'GET',
                    dataType: 'JSON',
                    url: CommonURL + 'GetTipDeatails',
                    params: { EmployeeId: localStorage.getItem('UserId'), HierachyId: localStorage.getItem('HierachyId'), SalaryPeriod: $scope.SelectedPeriod, DatabaseName: localStorage.getItem('databaseName'), LocationId: localStorage.getItem('LocationId') },
                    headers: {
                        'Content-Type': 'application/json',
                        'App_Key': AppKey,
                        'UserId': UsrId,
                        'RoleName': RolName,
                        'Read': 'R',
                        'Write': '',
                        'Menu': '16'
                    }
                }).then(function (res) {
                    if (res.data.length > 0) {
                        $scope.divTip = false;
                        $scope.TipDetails = res.data;
                        vm.ShowNRImage = false;
                    }
                    else {
                        //  alert("No Records Found");
                        //    $scope.alertMessage = "No Records Found";
                        vm.ShowNRImage = true;
                        $scope.divTip = true;
                    }
                }, function (err) {
                  $scope.alertMessage = "Authorization has been denied";
                });
            }
        }
    }];
    angular
       .module("HRMSApp")
       .controller("TipDetailsCtrl", TipDetailsCtrl)
})(angular);
