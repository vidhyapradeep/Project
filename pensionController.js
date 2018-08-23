(function (angular, undefined) {
    "use strict";
    var CommonURL = "";
    var App_Key = "";
    var PensionCtrl = ["$scope", "$http", "$state", "$rootScope", "$filter", function ($scope, $http, $state, $rootScope, $filter) {
        CommonURL = $rootScope.ApiUrl + "Pension/";
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
        vm.GetPensionDetails = function () {
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetPensionDetails',
                params: { Uid: localStorage.getItem('UserId'), DatabaseName: localStorage.getItem('databaseName') },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '12'
                }
            }).then(function (res) {
                if (res.data.length > 0) {
                    $scope.PensionDetails = res.data;
                    vm.ShowNRImage = false;
                }
                else {
                    //  alert("No Records Found");
                    vm.ShowNRImage = true;
                }
            }, function (err) {
              $scope.alertMessage = "Authorization has been denied";
            });
        }
    }];
    angular
       .module("HRMSApp")
       .controller("PensionCtrl", PensionCtrl)
})(angular);
