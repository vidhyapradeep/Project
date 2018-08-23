(function (angular, undefined) {
    "use strict";
    var CommonURL = "";
    var App_Key = "";
    var ViewTaxCtrl = ["$scope", "$http", "$state", "$rootScope", function ($scope, $http, $state, $rootScope) {
        CommonURL = $rootScope.ApiUrl + "ViewTaxForm/";
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
        vm.ShowNoTaxAvailablePopup = false;

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
                    'Menu': '11'
                }
            }).then(function (res) {
                if (res.data.length > 0) {
                    $scope.divTip = true;
                    $scope.SalaryPeriods = res.data;
                    vm.ShowNRImage = false;
                }
                else {
                 //   alert("No Records Found");
                    $scope.divTip = true;
                    vm.ShowNRImage = true;
                }
            }, function (err) {
              $scope.alertMessage = "Authorization has been denied";
            });
        }
        $scope.divTip = true;

        vm.BtnSubmitClick = function () {
            
            if ($scope.TaxForm.$valid) {

                if ($scope.SelectedPeriod == 'Select' || typeof $scope.SelectedPeriod === "undefined") {
                 //   alert('Please select salary period.');
                    return;
                }

                $http({
                    method: 'GET',
                    dataType: 'JSON',
                    url: CommonURL + 'GetTaxDetails',
                    params: { Uid: localStorage.getItem('UserId'), HierachyId: localStorage.getItem('HierachyId'), SalaryPeriod: $scope.SelectedPeriod, DatabaseName: localStorage.getItem('databaseName') },
                    headers: {
                        'Content-Type': 'application/json',
                        'App_Key': AppKey,
                        'UserId': UsrId,
                        'RoleName': RolName,
                        'Read': 'R',
                        'Write': '',
                        'Menu': '11'
                    }
                }).then(function (res) {
                    if (res.data.length > 0) {
                        $scope.divTip = false;
                        $scope.viewTaxDetails = res.data;
                        vm.ShowNRImage = false;
                    }
                    else {
                      //  alert("No Records Found");
                        $scope.divTip = true;
                        vm.ShowNRImage = true;
                    }
                }, function (err) {
                  $scope.alertMessage = "Authorization has been denied";
                });
            }
        }


        $scope.ShowTaxReportLocal = false;
        vm.btnViewTaxDetailsClick = function () {
           
           debugger
            $http({

                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetTaxReportGrid',
                params: { Uid: localStorage.getItem('UserId'), HierachyId: localStorage.getItem('HierachyId') },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '11'
                }
            }).then(function (res) {
                if (res.data.length > 0) {
                    $scope.ShowTaxReportLocal = true;
                    $scope.taxReportDetails = res.data;
                    vm.ShowNoTaxAvailablePopup = false;
                }
                else {
                    //    alert("No Records Found");
                    $scope.ShowTaxReportLocal = false;
                    vm.ShowNoTaxAvailablePopup = true;
                }
            }, function (err) {
              $scope.alertMessage = "Authorization has been denied";
            });
        }

    }];
    angular
       .module("HRMSApp")
       .controller("ViewTaxCtrl", ViewTaxCtrl)
})(angular);
