(function (angular, undefined) {
    'use strict'

    var TrainingSummaryCtrl = ["$scope", "$http", "$state", "$rootScope", "$filter", function ($scope, $http, $state, $rootScope, $filter) {
        var CommonURL = "";
        var App_Key = "";
        CommonURL = $rootScope.ApiUrl + "TrainingSummary/";
        App_Key = $rootScope.App_Key;
        var _this = this;
        var DatabaseName = localStorage.getItem('databaseName');
        var RoleName = localStorage.getItem('RoleName');
        var UserId = parseInt(localStorage.getItem('UserId'));
        //Header Details
        var UsrId = "[" + UserId + "]";
        var RolName = "[" + RoleName + "]";
        var AppKey = "[" + App_Key + "]";

        $scope.Status = "";
        $scope.statusUpdate = "";
        $scope.alertMessage = "";
        $scope.alertMessageForUpdate = "";
        $scope.ShowNRImage = false;

        _this.CourseStatusArr = [
             { id: -1, name: '' },
          { id: 0, name: 'Enroll' },
          { id: 1, name: 'Completed' },

        ];

        getCourseNameList();
        _this.ShowDeletePopupfnc = false;

        $scope.AddTraining = function () {
            // alert("inside function");
            $scope.alertMessage = "";
        }
        $scope.ClearAlertForUpdate = function () {
            // alert("inside function");
            $scope.alertMessageForUpdate = "";
        }

        function getCourseNameList() {
            var isActive = 1
            _this.courseNameList = [];
            $scope.selected = null;
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetCourseNameList',
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '18'
                }
            }).then(function (res) {
                if (res.data.length > 0) {
                    _this.courseNameList = res.data;
                }

            }, function (err) {
                //      $scope.alertMessage = "Authorization has been denied";
            });
        }


        //$scope.$emit('GetTraining');

        getTrainingDetails();

        //$scope.$on('GetTraining', function () {
        //  $scope.getTrainingDetails()
        //})

        function getTrainingDetails() {
            debugger;
            var UserId = parseInt(localStorage.getItem('UserId'));

            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'getTrainingSummary',
                params: { DatabaseName: DatabaseName, UserId: UserId },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': '',
                    'Menu': '18'
                }
            }).then(function (res) {
                if (res.data.length > 0) {
                    _this.TrainingDetails = res.data;
                    $scope.TrainingInfoDetails = _this.TrainingDetails;
                    $scope.ShowNRImage = false;
                }
                else {
                    $scope.ShowNRImage = true;
                }

            }, function (err) {
                //      $scope.alertMessage = "Authorization has been denied";
            });
        }
        $scope.getTraining = function () {
            getTrainingDetails();

        }

        $scope.dateValidation = false;

        /*------Add New Training------*/
        $scope.AddTrainingDetails = function () {
            debugger;
            $scope.alertMessage = null;
            if ($scope.addDetailsForm.$valid==false) {
                 $scope.ResetDisplay();
            }
            if ($scope.addDetailsForm.$valid) {
                _this.duplicateCourse = false;
                _this.GreaterDate = false;
                var UserId = parseInt(localStorage.getItem('UserId'));
                var CourseId = document.getElementById("ddlCourseName").value;
                var CourseStartDate = document.getElementById("txtStartDate").value;
                var CourseEndDate = document.getElementById("txtEndDate").value;
                var Status;
                var spiltFrmDate = CourseStartDate;
                var FrmDateArr = spiltFrmDate.split("-");
                var splitToDate = CourseEndDate;
                var ToDateArr = splitToDate.split("-");
                //alert(spiltFrmDate.length);

                if(spiltFrmDate.length >0 && (FrmDateArr[0] > 31 || FrmDateArr[0].length < 2 || FrmDateArr[1].length < 3 || FrmDateArr[2].length != 4)) {
                    //   alert("Date should be in valid format");
                    $scope.errorMessageForUpdate = "Start Date should be in (dd-Mon-yyyy) Format";
                }
                else if (splitToDate.length > 0 && (ToDateArr[0] > 31 || ToDateArr[0].length < 2 || ToDateArr[1].length < 3 || ToDateArr[2].length != 4)) {
                    $scope.errorMessageForUpdate = "End Date should be in (dd-Mon-yyyy) Format";
                }
                else {

                    if (document.getElementById("ddlStatus").value == "0")
                    { Status = false; }
                    else
                    { Status = true; }

                    //if (!!$scope.TrainingInfoDetails.find(x => x.courseId == CourseId)) {
                    //    $scope.errorMessage = 'Course Name already exists';
                    //    _this.duplicateCourse = true;
                    //    return true;
                    //}
                    //else {
                    //    $scope.errorMessage = '';
                    //}
                    var startdate = new Date($scope.StartDate);
                    var enddate = new Date($scope.EndDate);
                    if (enddate < startdate) {
                        $scope.dateValidation = true;
                        _this.GreaterDate = true;
                    }
                    else {
                        $scope.dateValidation = false;
                        _this.GreaterDate = false;
                    }
                    var Active = "1";
                    if (_this.duplicateCourse == false && _this.GreaterDate == false) {
                        $http({
                            method: 'POST',
                            dataType: 'JSON',
                            url: CommonURL + 'addTrainingDetails',
                            params: {
                                DatabaseName: DatabaseName, UserId: UserId, CourseId: CourseId, CourseStartDate: $scope.StartDate, CourseEndDate: $scope.EndDate, Status: Status, isActive: 1, Active: Active
                            },
                            headers: {
                                'Content-Type': 'application/json',
                                'App_Key': AppKey,
                                'UserId': UsrId,
                                'RoleName': RolName,
                                'Read': 'R',
                                'Write': 'W',
                                'Menu': '18'
                            }
                        }).then(function (res) {
                            debugger;
                            if (res.data.length > 0) {
                                $scope.errorMessageForUpdate = "";
                                $scope.alertMessage = res.data[0].message;
                                if (res.data[0].message != "Course Name Already Exists") {
                                    _this.ClearAddTrainingDetails();
                                }
                                _this.ShowTrainingSummaryEdit == false
                                $scope.getTraining();
                                $scope.Reset();
                            }
                        }, function (err) {
                            $scope.errorMessageForUpdate = "Authorization has been denied";
                        });
                    }
                }
            }
        }

        _this.ClearAddTrainingDetails = function () {
            //  document.getElementById
            $scope.StartDate = "";
            $scope.EndDate = "";
            $scope.courseSelect = "";
            $scope.Status = "";

        }
        $scope.objectIndex = '';
        $scope.edit = function (courseId, startdate, enddate, status) {
            debugger;
            $scope.errorMessageForUpdate = "";
            //$scope.objectIndex = course;
            $scope.courseIdUpdate = courseId;
            $scope.startdateUpdate = startdate;
            $scope.enddateUpdate = enddate;

            if (status == false)
            { $scope.statusUpdate = "0" } else { $scope.statusUpdate = "1" }
            //$scope.statusUpdate = status.toString();
        }


        /*-------Update Training Summary------*/
        $scope.UpdateTrainingDetails = function () {
            debugger;
            $scope.alertMessageForUpdate = "";
            if ($scope.updateDetailsForm.$valid== false) {
                $scope.ResetUpdateDisplay();
            }
            if ($scope.updateDetailsForm.$valid) {
                _this.duplicateCourse = false;
                _this.updateGreaterDate = false;
                //debugger;
                var UserId = parseInt(localStorage.getItem('UserId'));
                var CourseId = $scope.courseIdUpdate;
                var SelectedCourseId = parseInt(localStorage.getItem('CourseId'));
                var CourseStartDate = document.getElementById("txtStartDateUpdate").value;
                var CourseEndDate = document.getElementById("txtEndDateUpdate").value;
                var Status;
                var spiltFrmDate = CourseStartDate;
                var FrmDateArr = spiltFrmDate.split("-");
                var splitToDate = CourseEndDate;
                var ToDateArr = splitToDate.split("-");
                if(spiltFrmDate.length >0 && (FrmDateArr[0] > 31 || FrmDateArr[0].length < 2 || FrmDateArr[1].length < 3 || FrmDateArr[2].length != 4)) {
                    //   alert("Date should be in valid format");
                    $scope.errorMessageForUpdate = "Start Date should be in (dd-Mon-yyyy) Format";
                }
                else if (splitToDate.length > 0 && (ToDateArr[0] > 31 || ToDateArr[0].length < 2 || ToDateArr[1].length < 3 || ToDateArr[2].length != 4)) {
                    $scope.errorMessageForUpdate = "End Date should be in (dd-Mon-yyyy) Format";
                }
                else {

                    if (document.getElementById("ddlStatusUpdate").value == "0")
                        Status = false;
                    else Status = true;

                    var startdate = new Date($scope.startdateUpdate);
                    var enddate = new Date($scope.enddateUpdate);
                    if (enddate < startdate) {
                        $scope.dateValidationUpdate = true;
                        _this.updateGreaterDate = true;
                    }
                    else {
                        $scope.dateValidationUpdate = false;
                        _this.updateGreaterDate = false;
                    }
                    debugger;
                    if (_this.updateGreaterDate == false) {
                        $http({
                            method: 'POST',
                            dataType: 'JSON',
                            url: CommonURL + 'UpdateTrainingDetails',
                            params: {
                                DatabaseName: DatabaseName, UserId: UserId, CourseId: CourseId, CourseStartDate: $scope.startdateUpdate, CourseEndDate: $scope.enddateUpdate, Status: Status
                            },
                            headers: {
                                'Content-Type': 'application/json',
                                'App_Key': AppKey,
                                'UserId': UsrId,
                                'RoleName': RolName,
                                'Read': 'R',
                                'Write': 'W',
                                'Menu': '18'
                            }
                        }).then(function (res) {

                            if (res.data > 0) {
                                $scope.alertMessageForUpdate = "Records Updated Successfully";
                                $scope.errorMessageForUpdate = "";
                                //_this.ClearUpdateTrainingDetails();
                                $scope.getTraining();
                                $scope.ResetUpdate();
                            }

                        }, function (err) {
                            $scope.errorMessageForUpdate = "Authorization has been denied";
                        });
                    }
                }
            }
        }

        _this.ClearUpdateTrainingDetails = function () {

            $scope.courseIdUpdate = "";
            $scope.startdateUpdate = "";
            $scope.enddateUpdate = "";
            $scope.statusUpdate = "";

        }

        /*------Delete Training Summary-------*/
        $scope.DeleteTrainingByCourseId = function (course) {
            //debugger;
            _this.ShowDeletePopupfnc = true;
            localStorage.setItem('CourseId', course.courseId);

        }


        $scope.DeleteTrainingDetails = function () {
            debugger;
            var UserId = parseInt(localStorage.getItem('UserId'));
            var CourseId = parseInt(localStorage.getItem('CourseId'));

            $http({
                method: 'POST',
                dataType: 'JSON',
                url: CommonURL + 'deleteTrainingDetails',
                params: {
                    DatabaseName: DatabaseName, UserId: UserId, CourseId: CourseId
                },
                headers: {
                    'Content-Type': 'application/json',
                    'App_Key': AppKey,
                    'UserId': UsrId,
                    'RoleName': RolName,
                    'Read': 'R',
                    'Write': 'W',
                    'Menu': '18'
                }
            }).then(function (res) {
                $scope.getTraining();
                _this.ShowDeletePopupfnc = false;
                _this.ClearUpdateTrainingDetails();
            }, function (err) {
                $scope.errorMessageFordelete = "Authorization has been denied";
            });

        }


        /*-----Reset Function----*/
        $scope.Reset = function () {

            //$scope.courseSelect = "";      //for adding new records
            _this.duplicateCourse = true;
            $scope.errorMessage = "";
            //var errorCourse = document.getElementById("spanErrorCourse");
            //errorCourse.parentNode.removeChild(errorCourse);
            //var errorStartdate = document.getElementById("spanErrorStartdate");
            //errorStartdate.parentNode.removeChild(errorStartdate);
            //var errorEnddate = document.getElementById("spanErrorEnddate");
            //errorEnddate.parentNode.removeChild(errorEnddate);

            //var errorStatus = document.getElementById("spanStatus");
            //errorStatus.parentNode.removeChild(errorStatus);

            //$scope.dateValidation = false;
            //var errordate = document.getElementById("spanDateValidation");
            //errordate.parentNode.removeChild(errordate);


            $scope.dateValidation = false;
            if (document.getElementById("spanErrorCourse"))
                document.getElementById("spanErrorCourse").style.display = 'none';
            if (document.getElementById("spanErrorStartdate"))
                document.getElementById("spanErrorStartdate").style.display = 'none';
            if (document.getElementById("spanErrorEnddate"))
                document.getElementById("spanErrorEnddate").style.display = 'none';

            if (document.getElementById("spanStatus"))
                document.getElementById("spanStatus").style.display = 'none';

            if (document.getElementById("spanDateValidation"))
                document.getElementById("spanDateValidation").style.display = 'none';

        }

        $scope.ResetUpdate = function () {

            //var errorStart = document.getElementById("spanCourseStartDate");
            //errorStart.parentNode.removeChild(errorStart);
            //var errorEnd = document.getElementById("spanCourseEndDate");
            //errorEnd.parentNode.removeChild(errorEnd);

            //var errorCourseUpdate = document.getElementById("spanCourseUpdate");
            //errorCourseUpdate.parentNode.removeChild(errorCourseUpdate);

            //var errorStatusUpdate = document.getElementById("spanStatusUpdate");
            //errorCourseUpdate.parentNode.removeChild(errorStatusUpdate);

            if (document.getElementById("spanCourseStartDate"))
                document.getElementById("spanCourseStartDate").style.display = 'none';
            if (document.getElementById("spanCourseEndDate"))
                document.getElementById("spanCourseEndDate").style.display = 'none';
            if (document.getElementById("spanCourseUpdate"))
                document.getElementById("spanCourseUpdate").style.display = 'none';

            if (document.getElementById("spanStatusUpdate"))
                document.getElementById("spanStatusUpdate").style.display = 'none';
        }


        $scope.ResetUpdateDisplay = function () {

            if (document.getElementById("spanCourseStartDate"))
                document.getElementById("spanCourseStartDate").style.display = 'block';
            if (document.getElementById("spanCourseEndDate"))
                document.getElementById("spanCourseEndDate").style.display = 'block';
            if (document.getElementById("spanCourseUpdate"))
                document.getElementById("spanCourseUpdate").style.display = 'block';

            if (document.getElementById("spanStatusUpdate"))
                document.getElementById("spanStatusUpdate").style.display = 'block';
        }

        $scope.ResetDisplay = function () {

            if (document.getElementById("spanErrorCourse"))
                document.getElementById("spanErrorCourse").style.display = 'block';
            if (document.getElementById("spanErrorStartdate"))
                document.getElementById("spanErrorStartdate").style.display = 'block';
            if (document.getElementById("spanErrorEnddate"))
                document.getElementById("spanErrorEnddate").style.display = 'block';

            if (document.getElementById("spanStatus"))
                document.getElementById("spanStatus").style.display = 'block';

            //if (document.getElementById("spanDateValidation"))
            //    document.getElementById("spanDateValidation").style.display = 'none';

        }

    }];


    angular
      .module("HRMSApp")
      .controller("TrainingSummaryCtrl", TrainingSummaryCtrl)
})(angular)
