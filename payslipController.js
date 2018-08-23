(function (angular, undefined) {
    "use strict";
    var CommonURL = "";
    var App_Key = "";
    var PaySlipCtrl = ["$scope", "$http", "$state", "$rootScope", function ($scope, $http, $state, $rootScope) {
        CommonURL = $rootScope.ApiUrl + "PaySlip/";
        App_Key = $rootScope.App_Key;
        var vm = this;
        var DatabaseName = localStorage.getItem('databaseName');
        var RoleName = localStorage.getItem('RoleName');
        var UserId = parseInt(localStorage.getItem('UserId'));
        //Header Details
        var UsrId = "[" + UserId + "]";
        var RolName = "[" + RoleName + "]";
        var AppKey = "[" + App_Key + "]";

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
                    'Menu': '9'
                }
            }).then(function (res) {
                if (res.data.length > 0) {
                    $scope.divSlip = true;
                    $scope.SalaryPeriods = res.data;
                    vm.ShowNRImage = false;
                }
                else {
                    //     alert("No Records Found");
                    vm.ShowNRImage = true;
                    $scope.divSlip = true;
                }
            }, function (err) {
                $scope.alertMessage = "Authorization has been denied";
            });
        }
        $scope.divSlip = true;
        $scope.hidedivSIMBASlip = true;
        vm.BtnSubmitClick = function () {
            debugger;
            if ($scope.PaySlipForm.$valid) {

                if ($scope.SelectedPeriod == 'Select' || typeof $scope.SelectedPeriod === "undefined") {
                    //  alert('Please select salary period.');
                    return;
                }

                if (localStorage.getItem('LocationId') == 11) {

                    $http({
                        method: 'GET',
                        dataType: 'JSON',
                        url: CommonURL + 'GetEmployeePayCheckDetails_Uganda',
                        params: {
                            //SalaryPeriod: $scope.SelectedPeriod,
                            EmployeeId: localStorage.getItem('UserId'),                         
                            HierachyId: localStorage.getItem('HierachyId'),
                            DatabaseName: localStorage.getItem('databaseName'),
                            LocationId: localStorage.getItem('LocationId')
                        },
                        headers: {
                            'Content-Type': 'application/json',
                            'App_Key': AppKey,
                            'UserId': UsrId,
                            'RoleName': RolName,
                            'Read': 'R',
                            'Write': '',
                            'Menu': '9'
                        }
                    }).then(function (res) {
                        if (res.data.length > 0) {
                            $scope.hidedivSIMBASlip = false;
                            $scope.divSlip = true;
                            $scope.UgandaPaySlipDetails = res.data;
                            vm.ShowNRImage = false;


                        }
                        else {
                            //   alert("No Records Found");
                            vm.ShowNRImage = true;
                            $scope.divSlip = true;
                        }
                    }, function (err) {
                        $scope.alertMessage = "Authorization has been denied";
                    });
                }
                else {

                    $http({
                        method: 'GET',
                        dataType: 'JSON',
                        url: CommonURL + 'GetPaySlipDetails',
                        params: {
                            EmployeeId: localStorage.getItem('UserId'),
                            SalaryPeriod: $scope.SelectedPeriod,
                            HierachyId: localStorage.getItem('HierachyId'),
                            DatabaseName: localStorage.getItem('databaseName'),
                            LocationId: localStorage.getItem('LocationId')
                        },
                        headers: {
                            'Content-Type': 'application/json',
                            'App_Key': AppKey,
                            'UserId': UsrId,
                            'RoleName': RolName,
                            'Read': 'R',
                            'Write': '',
                            'Menu': '9'
                        }
                    }).then(function (res) {
                        if (res.data.length > 0) {
                            $scope.divSlip = false;
                            $scope.hidedivSIMBASlip = true;
                            $scope.PaySlipDetails = res.data;
                            vm.ShowNRImage = false;

                        }
                        else {
                            //   alert("No Records Found");
                            vm.ShowNRImage = true;
                            $scope.divSlip = true;
                            $scope.hidedivSIMBASlip = true;
                        }
                    }, function (err) {
                        $scope.alertMessage = "Authorization has been denied";
                    });

                }

            }
        }
    }];
    angular
       .module("HRMSApp")
       .controller("PaySlipCtrl", PaySlipCtrl)
})(angular);
