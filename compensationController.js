(function (angular, undefined) {
    "use strict";
    var CommonURL = "";
    var App_Key = "";
    var CompansationCtrl = ["$scope", "$http", "$state", "$rootScope", "$filter", function ($scope, $http, $state, $rootScope, $filter) {
        CommonURL = $rootScope.ApiUrl + "Compansation/";
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

        vm.GetCompansationDetails = function () {
            debugger
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetEmployeeCompansationDetails',
                params: { Uid: localStorage.getItem('UserId'), FromDate: $scope.FromDateComp, ToDate: $scope.ToDateComp, DatabaseName: localStorage.getItem('databaseName') },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '8'
                }
            }).then(function (res) {
                if (res.data.length > 0) {

                    $scope.CompnasationDetails = res.data;
                    $scope.CompnasationProfileDetails = res.data;
                    // $scope.tblFoot = true;
                    vm.ShowNRImage = false;
                }
                else {
                    //   alert("No Records Found");
                    vm.ShowNRImage = true;
                }
            }, function (err) {
              $scope.alertMessage = "Authorization has been denied";
            });
        }


        vm.SubmitBtnClick = function () {

            if ($scope.CompnasationForm.$valid) {








                if ($scope.FromDateComp == null) {
                    // alert("Please Select FromDate.");
                    return;
                }
                var spiltFrmDate = $scope.FromDateComp;
                //alert(spiltFrmDate)
                if (spiltFrmDate != undefined)
                var FrmDateArr = spiltFrmDate.split("-");

                var splitToDate = $scope.ToDateComp;
                //alert(splitToDate)
                if (splitToDate  != undefined)
                var ToDateArr = splitToDate.split("-");

                if (FrmDateArr[0] > 31 || FrmDateArr[0].length < 2 || FrmDateArr[1].length < 3 || FrmDateArr[2].length != 4) {
                    //   alert("Date should be in valid format");
                    $scope.alertMessage = "From Date should be in (dd-Mon-yyyy) Format";
                }
                else if ((splitToDate  != undefined) && (ToDateArr[0] > 31 || ToDateArr[0].length < 2 || ToDateArr[1].length < 3 || ToDateArr[2].length != 4)) {
                    $scope.alertMessage = "To Date should be in (dd-Mon-yyyy) Format";
                }
                else {
                    $http({
                        method: 'GET',
                        dataType: 'JSON',
                        url: CommonURL + 'GetEmployeeCompansationDetails',
                        params: { Uid: localStorage.getItem('UserId'), FromDate: $scope.FromDateComp, ToDate: $scope.ToDateComp, DatabaseName: localStorage.getItem('databaseName') },
                        headers: {
                            'Content-Type': 'application/json',
                            'App_Key': AppKey,
                            'UserId': UsrId,
                            'RoleName': RolName,
                            'Read': 'R',
                            'Write': '',
                            'Menu': '8'
                        }
                    }).then(function (res) {
                        if (res.data.length > 0) {
                            //$scope.tblFoot = false;
                            $scope.CompnasationDetails = res.data;
                            vm.ShowNRImage = false;
                        }
                        else {
                            $scope.CompnasationDetails = null;
                            $scope.tblFoot = true;
                            $scope.tblData = "No Records Found";
                            //    alert("No Records Found");
                            vm.ShowNRImage = true;
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
       .controller("CompnCtrl", CompansationCtrl)
})(angular);
