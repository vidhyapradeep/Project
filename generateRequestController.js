(function (angular, undefined) {
    "use strict";

    var CommonURL = "";
    var App_Key = "";
    var generateRequestCtrl = ["$scope", "$http", "$state", "$rootScope", "$filter", function ($scope, $http, $state, $rootScope, $filter) {
        CommonURL = $rootScope.ApiUrl + "GenerateRequest/";
        App_Key = $rootScope.App_Key;
        var vm = this;
        var DatabaseName = localStorage.getItem('databaseName');
        var RoleName = localStorage.getItem('RoleName');
        var UserId = parseInt(localStorage.getItem('UserId'));
        //Header Details
        var UsrId = "[" + UserId + "]";
        var RolName = "[" + RoleName + "]";
        var AppKey = "[" + App_Key + "]";
        var menuid = 0;



        vm.ShowNRImage = false;

        $scope.alertMessage = "";

        if ($state.$current.title != "User Request") {
            GetRequestedMessagesForUser();
        }
        else
        {
            GetRequestedMessagesForManager();
        }
     

        //if (localStorage.getItem('RoleName') == "Employee") {
        //    GetRequestedMessagesForUser();
        //}
        //else if (localStorage.getItem('RoleName') == "Manager") {
        //    GetRequestedMessagesForManager();
        //}
       
        
      
        vm.showUserRequest = false;
        $scope.List = [];

        // vm.GetRequestedMessagesForUser = function () {
        function GetRequestedMessagesForUser() {
            //menuid = 13;
            var UserId = parseInt(localStorage.getItem('UserId'));
            debugger;
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetRequest',
                params: { EmpId: UserId },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '13'
                }
            }).then(function (res) {
                //   alert(res.data.length);
                if (res.data.length > 0) {
                    vm.generateRequestedList = res.data;                                     
                    vm.List = res.data;
                    vm.ShowNRImage = false;
                    paginate();
                }
                else {
                    vm.ShowNRImage = true;
                }
            }, function (err) {
              $scope.alertMessage = "Authorization has been denied";
            });
        }

        vm.InsertMessages = function () {
            debugger;
            if ($scope.generateRequestForm.$valid == false) {
                document.getElementById("spanAddMessage").style.display = "block";
            }

            var UserId = parseInt(localStorage.getItem('UserId'));

            //if (RoleName == 'Employee') {

            //    var Action_Name = "Requested";
            //    var Replied_RequestId = -1;
            //    var Message = $scope.message;
            //}
            //else {
                // var UserId = $scope.employeeID;
                var Action_Name = "Replay";
                var Replied_RequestId = $scope.requestID;
                var Message = $scope.replyMessage;
       //     }
            var MenuKey = "[" + menuid + "]";
            if ($scope.generateRequestForm.$valid) {
                $http({
                    method: 'POST',
                    dataType: 'JSON',
                    url: CommonURL + 'RequestInsert',
                    params: { EmpId: UserId, Action_Name: Action_Name, Message: Message, Replied_RequestId: Replied_RequestId },
                    headers: {
                        'Content-Type': 'application/json',
                        'App_Key': AppKey,
                        'UserId': UsrId,
                        'RoleName': RolName,
                        'Read': 'R',
                        'Write': 'W',
                        'Menu': '21'
                    }
                }).then(function (res) {
                    //    alert(res.data.length);
                    if (res.data > 0) {
                        //  alert("Submitted Successfully");
                        debugger;
                        $scope.alertMessage = "Requested Message Replied Sucessfully";
                       
                        $scope.message = "";
                        $scope.replyMessage = "";
                        vm.showUserRequest = false;

                        // document.getElementById("spanAddMessage").style.display = "none";
                        if (document.getElementById("spanError"))
                        document.getElementById("spanError").style.display = "none";
                      
                        //if (menuid == 13) {
                        //    GetRequestedMessagesForUser();
                        //}
                        //else {
                            GetRequestedMessagesForManager();
                  //      }
                       
                    }
                }, function (err) {
                    $scope.alertMessageForGenReq = "Authorization has been denied";
                });
            }
        }


        vm.InsertMessagesForUser = function () {
            debugger;
            if ($scope.generateRequestForm.$valid == false) {
                document.getElementById("spanAddMessage").style.display = "block";
            }
            var UserId = parseInt(localStorage.getItem('UserId'));
            var Action_Name = "Requested";
            var Replied_RequestId = -1;
            var Message = $scope.message;

            if ($scope.generateRequestForm.$valid) {
                $http({
                    method: 'POST',
                    dataType: 'JSON',
                    url: CommonURL + 'RequestInsert',
                    params: { EmpId: UserId, Action_Name: Action_Name, Message: Message, Replied_RequestId: Replied_RequestId },
                    headers: {
                        'Content-Type': 'application/json',
                        'App_Key': AppKey,
                        'UserId': UsrId,
                        'RoleName': RolName,
                        'Read': 'R',
                        'Write': 'W',
                        'Menu': '13'
                    }
                }).then(function (res) {
                    //    alert(res.data.length);
                    if (res.data > 0) {
                        //  alert("Submitted Successfully");
                        debugger;
                        $scope.alertMessage = "Request Message Submitted Successfully ";
                        $scope.message = "";
                        $scope.replyMessage = "";
                        vm.showUserRequest = false;

                        // document.getElementById("spanAddMessage").style.display = "none";
                        if (document.getElementById("spanError"))
                            document.getElementById("spanError").style.display = "none";                    
                            GetRequestedMessagesForUser();                                  
                    }
                }, function (err) {
                    $scope.alertMessageForGenReq = "Authorization has been denied";
                });
            }

        }





        vm.ClearAlert = function () {
            $scope.alertMessage = "";
            $scope.alertMessageForGenReq = "";
        }

        function GetRequestedMessagesForManager() {
           // menuid = 21;
           // alert(1);
            debugger;
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetRequestedMessagesForManager',
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '21'
                }

            }).then(function (res) {
                //   alert(res.data.length);
                if (res.data.length > 0) {

                    vm.generateRequestList = res.data;
                    vm.List = res.data;
                    paginate();
                    vm.ShowNRImage = false;
                }
                else {
                    vm.ShowNRImage = true;
                }
            }, function (err) {
                $scope.alertMessageForGenReq = "Authorization has been denied";
            });
        }

        vm.getRequestedMsgForManagerByEmpId = function (RequestId, EmpId, Message,ReplayMsg) {
            debugger;
            $scope.alertMessage = "";
            $scope.requestID = RequestId;
            $scope.message = Message;
            $scope.employeeID = EmpId;
            $scope.replyMessage = ReplayMsg;
            vm.showUserRequest = true;
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
                if ($scope.getData() != null)
                 return Math.ceil($scope.getData().length/ $scope.pageSize);
            }

            $scope.data = vm.List;
        }

    }];
    angular
       .module("HRMSApp")
       .controller("generateRequestCtrl", generateRequestCtrl)
})(angular);
