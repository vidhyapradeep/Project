(function (angular, undefined) {
    "use strict";
    var CommonURL = "";
    var App_Key = "";
    var BankAccountCtrl = ["$scope", "$http", "$state", "$rootScope", "$filter", function ($scope, $http, $state, $rootScope, $filter) {
        CommonURL = $rootScope.ApiUrl + "BankDeposit/";
        App_Key = $rootScope.App_Key;
        var vm = this;
        var DatabaseName = localStorage.getItem('databaseName');
        var RoleName = localStorage.getItem('RoleName');
        var UserId = parseInt(localStorage.getItem('UserId'));
        //Header Details
        var UsrId = "[" + UserId + "]";
        var RolName = "[" + RoleName + "]";
        var AppKey = "[" + App_Key + "]";

        $scope.SelectedBankId = "";
        $scope.alertMessage = "";
        vm.ShowNRImage = false;
        vm.ShowDeletePopup = false;


        vm.LoadUserBankAcountDetails = function () {
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetBankAccountDetails',
                params: { Uid: localStorage.getItem('UserId'), DatabaseName: localStorage.getItem('databaseName') },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '10'
                }
            }).then(function (res) {
                if (res.data.length > 0) {
                    $scope.BankAccountDeatils = res.data;
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
        LoadBanksList();

        vm.BtnAddAccountClick = function () {
            $scope.EmptyValidateAlert();
            $scope.alertMessage = "";
            $scope.Showbankacc = true;
            $scope.SelectedBankId = "";
            $scope.txtRountingNumber = '';
            $scope.txtAccntName = '';
            $scope.txtAccntNumber = ''
            $scope.displayMessage = "";
            var AddFlag = 0;
            localStorage.setItem("AddFlag", AddFlag)
            $scope.alertMessage = "";



        }


        vm.BtnEditAccountClick = function (BankId, RoutingNumber, AccountName, AccountNumber) {
            $scope.Showbankacc = true;
            $scope.SelectedBankId = BankId.toString();
            $scope.txtRountingNumber = RoutingNumber;
            $scope.txtAccntName = AccountName;
            $scope.txtAccntNumber = AccountNumber
            $scope.displayMessage = "";
            var AddFlag = 1;
            localStorage.setItem("AddFlag", AddFlag)
            $scope.alertMessage = "";

        }

        vm.CloseBtnPopUp = function () {
            $scope.Showbankacc = false;
        }

        function LoadBanksList() {
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetBankNamesList',
                params: { DatabaseName: localStorage.getItem('databaseName') },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '10'

                }
            }).then(function (res) {
                if (res.data.length > 0) {
                    //debugger;
                    $scope.BankNamesList = res.data;
                }
                else {
                    //    alert("No Records Found");

                }
            }, function (err) {
                $scope.alertMessage = "Authorization has been denied";
            });
        }

        var RoutingNumber;
        vm.OnSelect_BankName = function () {
            $scope.alertMessage = "";

            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetRoutingName',
                params: { BankId: $scope.SelectedBankId },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '10'
                }
            }).then(function (res) {
                if (res.data.length > 0) {
                    RoutingNumber = res.data;
                    $scope.txtRountingNumber = RoutingNumber;
                }
                else {
                    //     alert("No Records Found");
                }
            }, function (err) {
                $scope.alertMessage = "Authorization has been denied";
            });
            $scope.txtAccntName = '';
            $scope.txtAccntNumber = '';
        }

        vm.btnSaveChangesClick = function () {
            // alert(1);


            if ($scope.BankDetailsForm.$valid == false) {
                document.getElementById("SpanSelectedBankId").style.display = "block";
                document.getElementById("spanAccName").style.display = "block";
                document.getElementById("spanAccNumber").style.display = "block";
            }

            debugger;
            if ($scope.BankDetailsForm.$valid) {

                //if ($scope.SelectedBankId == null || $scope.SelectedBankId === 0 || $scope.SelectedBankId === "Select") {

                //    alert("Please select bank name.");
                //    return;
                //}
                //if ($scope.txtAccntName == null || $scope.txtAccntName === "undefined" || $scope.txtAccntName === "") {

                //    alert("Please enter account name.");
                //    return;
                //}
                //else if ($scope.txtAccntNumber == null || $scope.txtAccntNumber === "undefined" || $scope.txtAccntNumber === "") {

                //    alert("Please enter account number.");
                //    return;
                //}
                $http({
                    method: 'GET',
                    dataType: 'JSON',
                    url: CommonURL + 'UpdateBankDetails',
                    params: { enmployeeId: localStorage.getItem('UserId'), bankId: $scope.SelectedBankId, accountNum: $scope.txtAccntNumber, accountName: $scope.txtAccntName, DatabaseName: localStorage.getItem('databaseName'), AddFlag: localStorage.getItem('AddFlag') },
                    headers: {
                        'Content-Type': 'application/json',
                        'App_Key': AppKey,
                        'UserId': UsrId,
                        'RoleName': RolName,
                        'Read': 'R',
                        'Write': 'W',
                        'Menu': '10'
                    }
                }).then(function (res) {
                    if (res.data.length > 0) {
                        //  alert(res.data);

                        $scope.displayMessage = res.data;
                        vm.LoadUserBankAcountDetails();
                        //   $scope.Showbankacc = false;
                        vm.LoadUserBankAcountDetails();
                        if ($scope.displayMessage != "Bank Details Updated Successfully") {
                            vm.ClearSaveChangesClick();
                        }

                        $scope.EmptyValidateAlert();

                    }
                    else {
                        //   alert("No Records Found");
                    }
                }, function (err) {
                    $scope.alertMessage = "Authorization has been denied";
                });
            }
        }

        vm.ClearSaveChangesClick = function () {
            $scope.SelectedBankId = "";
            $scope.txtRountingNumber = "";
            $scope.txtAccntName = "";
            $scope.txtAccntNumber = "";
        }


        vm.getbtnDeleteBankAccountClick = function (bankId, accountNumber) {
            debugger;
            $scope.alertMessage = "";
            vm.ShowDeletePopup = true;
            localStorage.setItem('BankId', bankId);
            localStorage.setItem('AccountNumber', accountNumber);


        }

        vm.btnDeleteBankAccountClick = function () {
            debugger;
            //confirm("Are you sure to delete this bank account details ?");
            $scope.alertMessage = "";


            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'DeleteBankDetails',
                params: { enmployeeId: localStorage.getItem('UserId'), bankId: localStorage.getItem('BankId'), accountNum: localStorage.getItem('AccountNumber'), DatabaseName: localStorage.getItem('databaseName') },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': 'W',
                    'Menu': '10'
                }
            }).then(function (res) {
                if (res.data.length > 0) {
                    //   alert(res.data);
                    vm.LoadUserBankAcountDetails();
                    vm.ShowDeletePopup = false;
                }
                else {

                    //       alert("No Records Found");
                    $scope.BankAccountDeatils = null;
                    //  vm.LoadUserBankAcountDetails();

                }
            }, function (err) {
                $scope.alertMessage = "Authorization has been denied";
            });
        }

        $scope.EmptyValidateAlert = function () {
            if (document.getElementById("SpanSelectedBankId"))
                document.getElementById("SpanSelectedBankId").style.display = "none";
            if (document.getElementById("spanAccName"))
                document.getElementById("spanAccName").style.display = "none";
            if (document.getElementById("spanAccNumber"))
            document.getElementById("spanAccNumber").style.display = "none";

        }

    }];
    angular
       .module("HRMSApp")
       .controller("BankAccountCtrl", BankAccountCtrl)
})(angular);
