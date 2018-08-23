(function (angular, undefined) {
    "use strict";

    var CommonURL = "";
    var App_Key = "";
    var LeaveCtrl = ["$scope", "$http", "$state", "$rootScope", "$filter", function ($scope, $http, $state, $rootScope, $filter) {
        CommonURL = $rootScope.ApiUrl + "Leave/";
        App_Key = $rootScope.App_Key;
        var vm = this;
        var DatabaseName = localStorage.getItem('databaseName');
        var RoleName = localStorage.getItem('RoleName');
        //Header Details
        var UserId = localStorage.getItem('UserId');
        var UsrId = "[" + UserId + "]";
        var RolName = "[" + RoleName + "]";
        var AppKey = "[" + App_Key + "]";

        $scope.alertMessage = "";
        $scope.alertMessageForLeaveApply = "";
        $scope.alertMessageForProgressedLeave = "";
        getLeaveTypes();
      //  search();
        $scope.selectedRow = null;
        $scope.ShowLeaveBalance = false;
        loadCurrentLeaveBalanceUptoLastYear();
        vm.ShowNRImage = false;
        vm.ShowNoLeaveAvailablePopup = false;
        vm.ShowNRImage_ReqLev = false;
        $scope.alertMessageforCancel = "";
        $scope.leaveType = "";
        vm.ShowApprovePopup = false;
        vm.ShowApproveCanPopup = false;
        vm.ShowNRImage_LvStatus = false;
      


        //ApplyLeaves
        vm.ApplyLeaves = function () {
            debugger;
            var UserId = localStorage.getItem('UserId');
            var HierachyId = parseInt(localStorage.getItem('HierachyId'));
            var LocationId = parseInt(localStorage.getItem('LocationId'));
            var today = new Date();

            var spiltFrmDate = $scope.fromDate;
            var FrmDateArr = spiltFrmDate.split("-");
            var splitToDate = $scope.toDate;
            var ToDateArr = splitToDate.split("-");

            if (FrmDateArr[0] > 31 || FrmDateArr[0].length < 2 || FrmDateArr[1].length < 3 || FrmDateArr[2].length != 4) {
                //   alert("Date should be in valid format");
                $scope.alertMessage = "From Date should be in (dd-Mon-yyyy) Format";
            }
            else if (ToDateArr[0] > 31 || ToDateArr[0].length < 2 || ToDateArr[1].length < 3 || ToDateArr[2].length != 4) {
                $scope.alertMessage = "To Date should be in (dd-Mon-yyyy) Format";
            }
            else {
                //if (isNumeric(FrmDateArr[0]) && isNaN(FrmDateArr[1]) && isNumeric(FrmDateArr[2])) {
                //    alert("Date format is wrong");

                //}
                //    allLetter(FrmDateArr[1]);

                //    var regexNum = /\d/;
                //    var regexLetter = /[a-zA-z]/;
                //    if(!regexNum.test (mon) || !regexLetter.test(mon)){
                //    alert('Type alphanumeric character');
                //    return false;
                //}


                var leaveApplyModelEntityList = {
                    EmployeeId: UserId,
                    LeaveTypeId: $scope.leaveType,
                    ApplyDate: today,
                    FromDate: $scope.fromDate,
                    ToDate: $scope.toDate,
                    Days: $scope.radio,
                    Remark: $scope.remark,
                    LeaveId: $scope.LeaveId,
                    DatabaseName: DatabaseName,
                    LocationId: LocationId,
                    HierachyId: HierachyId,

                }


                if ($scope.leaveForm.$valid == false) {
                    document.getElementById("spanLeaveType").style.display = "block";
                    document.getElementById("spanFromDate").style.display = "block";
                    document.getElementById("spanToDate").style.display = "block";
                    document.getElementById("spanDescription").style.display = "block";
                }

                //   if (validateApplyLeave($scope)) {
                if ($scope.leaveForm.$valid) {
                    try {
                        debugger;
                        $http({
                            method: 'POST',
                            dataType: 'JSON',
                            url: CommonURL + 'ApplyLeaves',
                            data: leaveApplyModelEntityList,
                            headers: {
                                'Content-Type': 'application/json',
                                'App_Key': AppKey,
                                'UserId': UsrId,
                                'RoleName': RolName,
                                'Read': 'R',
                                'Write': 'W',
                                'Menu': '2'
                            }

                        }).then(function (res) {
                            debugger;
                            if (res.data > 0) {

                                $scope.alertMessageForLeaveApply = "Successfully Leave Applied !";
                                //  alert("Successfully Leave Applied");
                                //     $state.go("private.applyleaves");
                                //  window.location.href = "Viewshtml/leaveapplication/_applyleave.html";
                                vm.Clear();
                                vm.loadRequestedLeave();
                                vm.loadLeaveBalance();
                                $scope.emptyValidateAlert();
                            }
                            else {
                                //     alert("result func error");

                                //   alert("Already Leave Applied for this Date");

                                $scope.alertMessage = "Already Leave Applied for this Date";
                            }
                        }, function (err) {          //second function "error"
                            //   alert('func err');

                            $scope.alertMessage = "Authorization has been denied";
                        });
                    }
                    catch (err) {
                        //   alert(err.message);
                    }
                }
            }
        }

        vm.ClearAlert = function () {
            $scope.alertMessageForLeaveApply = "";
        }


        function validateApplyLeave($scope) {
            //if (document.getElementById("leaveType").value == "? string: ?") {
            //    alert("Please select Leave Type");
            //    return false;
            //}
            //if ($scope.fromDate == undefined) {
            //    alert("Please select FromDate");
            //    return false;
            //}
            //if ($scope.toDate == undefined) {
            //    alert("Please select ToDate");
            //    return false;
            //}
            //if ($scope.radio == undefined) {
            //    alert("Please select NoOfDays");
            //    return false;
            //}
            //if ($scope.remark == undefined) {
            //    alert("Please Enter Remarks");
            //    return false;
            //}
            //else {
            //    return true;
            //}

        }
        //LeaveTypes
        function getLeaveTypes() {
            var LocationId = parseInt(localStorage.getItem('LocationId'));
            vm.LeaveTypeList = [];
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'getLeaveTypes',
                params: { LocationId: LocationId, DatabaseName: DatabaseName },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '2'
                }
            }).then(function (res) {
                vm.LeaveTypeList = res.data;
            }, function (err) {          //second function "error"
                //   alert("function error");
            });
        }

        //LoadGrid in ApplyLeave

        vm.loadRequestedLeave = function () {

            var UserId = localStorage.getItem('UserId');
            var DatabaseName = localStorage.getItem('databaseName');
            var IsManager = 0;
            var isactive = 1;
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetRequestedLeaves',
                params: { EmpId: UserId, IsManager: IsManager, isactive: isactive, DatabaseName: DatabaseName },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '2'
                }
            }).then(function (res) {
                if (res.data.length > 0) {
                    vm.EmpList = res.data;
                    paginate();
                    vm.ShowNRImage_ReqLev = false;
                    $scope.alertMessageForProgressedLeave = "";
                    return false;
                }
                else {
                    vm.ShowNRImage_ReqLev = true;
                }
            }, function (err) {          //second function "error"
                //  alert('func err');
            });
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

            $scope.data = vm.EmpList;
        }

        //Dropdown to list all employees
        //function search() {

        //    $scope.data = [];
        //    $scope.search = '';
           
        //    $scope.getData = function () {
        //        return $filter('filter')($scope.data, $scope.search)
               
        //    }
        //}
        //Bind datas by clicking edit

        vm.editLeave = function (LeaveId, leaveType, FromDate, ToDate, Remarks, Days) {
            $scope.leaveType = leaveType.toString();
            $scope.fromDate = FromDate;
            $scope.toDate = ToDate;
            $scope.remark = Remarks;
            $scope.LeaveId = LeaveId;
            $scope.radio = Days;
            vm.noOfDays();
        }

        vm.ShowCancelPopup = false;

        //   EmployeeCancelLeave();
        vm.EmployeeCancelLeave = function (LeaveId, LeaveTypeDesc, IsFromWebsite) {
            debugger;
            if (IsFromWebsite == 1) {
                $scope.alertMessageForProgressedLeave = "";
                vm.ShowCancelPopup = true;
                localStorage.setItem('LeaveId', LeaveId);
                $scope.alertMessageforCancel = "";

                var DatabaseName = localStorage.getItem('databaseName');
            }
            else {
                $scope.alertMessageForProgressedLeave = "Already Salary generated, this Leave Request should not be cancelled";
            }

        }

        vm.CancelLeaveByEmpId = function () {
            var LeaveId = localStorage.getItem('LeaveId');
            var DatabaseName = localStorage.getItem('databaseName');
            $http({
                method: 'POST',
                dataType: 'JSON',
                url: CommonURL + 'EmployeeCancelLeave',
                params: { LeaveId: LeaveId, DatabaseName: DatabaseName },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': 'W',
                    'Menu': '2'
                }
            }).then(function (res) {
                //  $scope.EmpList = res.data;

                if (res.data > 0) {
                    //   alert("Leave Cancelled Successfully");
                    //   vm.ShowCancelPopup = true;
                    //  $scope.LeaveCancel = LeaveTypeDesc;
                    vm.ShowCancelPopup = false;
                    vm.loadRequestedLeave();
                    vm.loadLeaveBalance();
                }
            }, function (err) {          //second function "error"
                //   alert('func err');
                $scope.alertMessageforCancel = "Authorisation has been denied";
            });
        }

        var date_diff_indays = function (date1, date2) {
            var dt1 = new Date(date1);
            var dt2 = new Date(date2);
            return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
        }

        $scope.$watch('toDate', function () {
            //$scope.radio = "";
            vm.noOfDays();
        });

        $scope.$watch('fromDate', function () {
            //$scope.radio = "";
            vm.noOfDays();
        });

        $scope.dateValidation = false;
        vm.noOfDays = function () {
            $scope.alertMessage = "";
            var fromdate = new Date($scope.fromDate);
            var todate = new Date($scope.toDate);
            if (todate < fromdate) {
                // alert("To date is greater");
                $scope.dateValidation = true;
            }
            else {
                var day = date_diff_indays(fromdate, todate);
                if (isNaN(day)) {
                    $scope.Fday = 1;
                    $scope.Hday = 0.5;
                }
                else {
                    var days = day + 1;
                    $scope.Fday = days;
                    $scope.Hday = days - 0.5;
                }
                $scope.radio = $scope.Fday;
                $scope.dateValidation = false;
            }

        };


        vm.Clear = function () {
            $scope.leaveType = "";
            $scope.fromDate = "";
            $scope.toDate = "";
            $scope.remark = "";
            $scope.Fday = "1";
            $scope.Hday = "0.5";
            $scope.radio = "";
            //    $scope.fromDateError = "";
            $scope.emptyValidateAlert();

        }

        vm.LeaveDetails_loadLeaveBalance = function (FromDate) {
            $state.go("private.leavebalancereview");
        }

        vm.Clearsearch = function () {
            //    $scope.q = null;
            $scope.search = '';
        }

        vm.ShowLeaveBalance = false;


        vm.LoadRequestedLeavesByEmpId = function (EmployeeId, LeaveId, LocationId, HierachyId) {

            var UserId = localStorage.getItem('UserId');
            var DatabaseName = localStorage.getItem('databaseName');
            var Leaveid = LeaveId;
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetRequestedLeavesByEmployeeId',
                params: { EmpId: EmployeeId, LeaveId: Leaveid, DatabaseName: DatabaseName },
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
                    vm.loadLeaveBalanceApvScreen(EmployeeId, LocationId, HierachyId);
                    vm.ShowLeaveBalance = true;
                    $scope.EmpListByEmpId = res.data;
                }
                else {
                    debugger
                    vm.ShowLeaveBalance = false;
                    //  alert("No Leave available");
                    vm.ShowNoLeaveAvailablePopup = true;
                }

            }, function (err) {          //second function "error"
                //    alert('func err');
            });
        }



        $scope.IsVisible = false;

        $scope.setClickedRow = function (index) {
            $scope.selectedRow = index;
        }


        /// to load grid in leave Approval status

        vm.GetApprovalLeaveOfEmployee = function () {
            debugger
            var UserId = localStorage.getItem('UserId');
            var DatabaseName = localStorage.getItem('databaseName');
            var IsManager = 1;
            var isactive = " 1";
            var active = 1;
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetApprovalLeaveOfEmployee',
                params: { EmpId: UserId, IsManager: IsManager, DatabaseName: DatabaseName, IsActive: isactive, active: active },
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
                debugger
                if (res.data.length > 0) {
                    vm.EmpList = res.data;
                    paginate();
                    vm.ShowNRImage_LvStatus = false;
                }
                else {
                    vm.ShowNRImage_LvStatus = true;
                }
            }, function (err) {          //second function "error"
                //  alert('func err');
            });
        }


        vm.showfooter = false;
        vm.NoLeaveshowfooter = false;
        //Load Current BalanceUpto LastYear in leaveapply screen

        //vm.loadCurrentLeaveBalanceUptoLastYear = function () {
        function loadCurrentLeaveBalanceUptoLastYear() {
            var UserId = parseInt(localStorage.getItem('UserId'));
            var HierachyId = parseInt(localStorage.getItem('HierachyId'));
            var LocationId = parseInt(localStorage.getItem('LocationId'));
            var date = new Date();
            var FromLastYear = date.getFullYear();
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetCurrentLeaveBalanceOfUserUptoLastYear',
                params: { HierarchyId: HierachyId, LocationId: LocationId, EmployeeId: UserId, DatabaseName: DatabaseName, FromLastYear: FromLastYear },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '2'
                }
            }).then(function (res) {
                debugger;
                //  alert(res.data.length);
                if (res.data.length > 0) {
                    vm.CurrentLeaveBalanceListUptoLastYear = res.data;
                    vm.showfooter = true;
                    vm.NoLeaveshowfooter = false;
                    //     vm.loadRequestedLeave();
                }
                else {
                    vm.NoLeaveshowfooter = true;
                }
            }, function (err) {          //second function "error"
                //   alert("function error");
            });
        }


        $scope.emptyValidateAlert = function () {
            //debugger;
            //var Ele = angular.element(document.querySelector('#ValidateAlert'));
            //Ele.empty();

            //---------------------------------------------------------------------------
            //var errorLeaveType = document.getElementById("spanLeaveType");
            //errorLeaveType.parentNode.removeChild(errorLeaveType);

            //var errorFromDate = document.getElementById("spanFromDate");
            //errorFromDate.parentNode.removeChild(errorFromDate);

            //var errorToDate = document.getElementById("spanToDate");
            //errorToDate.parentNode.removeChild(errorToDate);

            //var errorDescription = document.getElementById("spanDescription");
            //errorDescription.parentNode.removeChild(errorDescription);

            //----------------------------------------------------------------------------

            //var myElements = document.getElementsByClassName('.help-block');

            //myElements = Array.prototype.slice.call(myElements); // convert htmlcollection to array
            //myElements = myElements.splice(0, 1); //removes first from working list

            //angular.element(myElements).remove();



            //var elements = [].slice.call(document.querySelectorAll(".help-block"));
            //elements.shift(); // remove first item in the array
            //for (var i = 0; i < elements.length; i++) {
            //    angular.element(elements[i]).remove(); // remove each element from the DOM
            //    }

            //var myEl = angular.element(document.querySelector('#spanLeaveType'));
            //myEl.empty();

            //var myEl = angular.element(document.querySelector('#spanFromDate'));
            //myEl.empty();

            //var myEl = angular.element(document.querySelector('#spanToDate'));
            //myEl.empty();

            //var myEl = angular.element(document.querySelector('#spanDescription'));
            //myEl.empty();


            //$scope.ErrorspanLeaveType = false;
            //$scope.ErrorspanFromDate = false;
            //$scope.ErrorspanToDate = false;
            //$scope.ErrorspanDescription = false;


            document.getElementById("spanLeaveType").style.display = "none";
            document.getElementById("spanFromDate").style.display = "none";
            document.getElementById("spanToDate").style.display = "none";
            document.getElementById("spanDescription").style.display = "none";
        }



        //---------Load Grid in LeaveApproval Screen---------

        vm.loadGrid = function () {
            var IsManager = 1;
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetAppliedLeaves',
                params: { EmpId: UserId, IsManager: IsManager, DatabaseName: DatabaseName },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '[28]'

                }
            }).then(function (res) {
                if (res.data.length > 0) {
                    vm.EmpList = res.data;
                    paginate();
                    vm.ShowNRImage = false;
                }

                else {

                    vm.ShowNRImage = true;

                }
            }, function (err) {          //second function "error"
                //   alert('func err');

            });
        }

        //ApproveLeave
        vm.approveLeave = function (LeaveId, EmployeeId) {
            debugger;
            localStorage.setItem('LeaveId', LeaveId);
            localStorage.setItem('EmployeeId', EmployeeId);
            var LeaveId = localStorage.getItem("LeaveId");
            var EmployeeId = localStorage.getItem("EmployeeId");
            var Name = "name";
            var UserId = localStorage.getItem('UserId');
            $http({
                method: 'POST',
                dataType: 'JSON',
                url: CommonURL + 'ApproveLeavesRequests',
                params: { LeaveId: LeaveId, EmployeeId: EmployeeId, emp: Name, DatabaseName: DatabaseName, AcceptedBy: UserId },
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
                    //alert("Leave approved for :" + EmployeeId);
                    vm.ShowApprovePopup = true;
                    vm.loadGrid();
                }
            }, function (err) {          //second function "error"
                //   alert('func err');
                $scope.alertMessageForLeaveApproval = "Authorization has been denied";
            });
        }

        //CancelLeave
        vm.cancelLeave = function (LeaveId, EmployeeId) {
            debugger
            localStorage.setItem('LeaveId', LeaveId);
            localStorage.setItem('EmployeeId', EmployeeId);
            var LeaveId = localStorage.getItem("LeaveId");
            var EmployeeId = localStorage.getItem("EmployeeId");
            var UserId = localStorage.getItem('UserId');
            $http({
                method: 'POST',
                dataType: 'JSON',
                url: CommonURL + 'LeavesRequestsCancel',
                params: { LeaveId: LeaveId, EmployeeId: EmployeeId, DatabaseName: DatabaseName, AcceptedBy: UserId },
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
                debugger    
                if (res.data > 0) {
                    //  alert("Leave cancelled for :" + EmployeeId);
                    vm.ShowApproveCanPopup = true;
                    
                    vm.loadGrid();
                    alert(vm.ShowApproveCanPopup);
                }
            }, function (err) {          //second function "error"
                //  alert('func err');
                $scope.alertMessageForLeaveApproval = "Authorization has been denied";
            });
        }

        //LoadGrid in LeaveBalance
        vm.loadLeaveBalance = function () {
            var UserId = parseInt(localStorage.getItem('UserId'));
            var HierachyId = parseInt(localStorage.getItem('HierachyId'));
            var LocationId = parseInt(localStorage.getItem('LocationId'));
            var ApplyLeave = 0;
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetLeaveBalanceOfUser',
                params: { HierarchyId: HierachyId, LocationId: LocationId, EmployeeId: UserId, DatabaseName: DatabaseName, ApplyLeave: ApplyLeave },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '2'
                }
            }).then(function (res) {
                debugger;
                vm.LeaveBalanceList = res.data;
                vm.loadRequestedLeave();
            }, function (err) {          //second function "error"
                //   alert("function error");
            });
        }

        //  loadLeaveBalanceApvScreen();
        vm.loadLeaveBalanceApvScreen = function (UserId, LocationId, HierachyId) {
            debugger
            var ApplyLeave = 1;
            //    var UserId = parseInt(localStorage.getItem('UserId'));
            //var HierachyId = parseInt(localStorage.getItem('HierachyId'));
            //var LocationId = parseInt(localStorage.getItem('LocationId'));
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetLeaveBalanceOfUserByEmpId',
                params: { HierarchyId: HierachyId, LocationId: LocationId, EmployeeId: UserId, DatabaseName: DatabaseName, isActive: 1, ApplyLeave: ApplyLeave },
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
                debugger;
                vm.ApLeaveBalanceList = res.data;
            }, function (err) {          //second function "error"
                //    alert("function error");
            });
        }

        function allLetter(inputtxt) {
            debugger
            var letters = /^[A-Za-z]+$/;
            if (inputtxt.value.match(letters)) {
                alert('Your name have accepted : you can try another');
                return true;
            }
            else {
                alert('Please input alphabet characters only');
                return false;
            }
        }

    }];
    angular
       .module("HRMSApp")
       .controller("LeaveCtrl", LeaveCtrl)
})(angular);

