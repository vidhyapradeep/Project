
(function (angular, undefined) {
    "use strict";

    //header controller
    var MainCtrl = [function () {
        var _this = this;
        _this.showedit = false;
        _this.menuDisable = false;
        _this.menuDisableFun = function () {
            _this.menuDisable = _this.menuDisable == true ? _this.menuDisable = false : _this.menuDisable = true;

        };

    }];



    // var NavbarLeftCtrl = [function () {
    var NavbarLeftCtrl = ["$scope", "$http", "$state", "$rootScope", function ($scope, $http, $state, $rootScope) {
        var App_Key = "";
        App_Key = $rootScope.App_Key;
        var DatabaseName = localStorage.getItem('databaseName');
        var RoleName = localStorage.getItem('RoleName');
        var UserId = parseInt(localStorage.getItem('UserId'));
        //Header Details
        var UsrId = "[" + UserId + "]";
        var RolName = "[" + RoleName + "]";
        var AppKey = "[" + App_Key + "]";

        var CommonURL = $rootScope.ApiUrl + "Menu/";
        $scope.UserName = localStorage.getItem('Name');
        $scope.roleName = localStorage.getItem("RoleName");
        var UserId = localStorage.getItem("UserId");
        var RoleName = localStorage.getItem("RoleName");

        var _this = this;
        _this.leftMenu = [{}];
        var IsActive = parseInt(1);
        var Language = "en";
        $http({
            method: 'GET',
            dataType: 'JSON',
            url: CommonURL + 'GetAllMenu',
            params: { IsActive: IsActive, Language: Language, RoleName: RoleName, UserId: UserId },

        }).then(function (res) {
            _this.leftMenu = res.data;
        });

        _this.getMenuId = function (menuid) {
            alert(menuid);
        }

        //    _this.leftMenu = [{
        //        "menu": "Leave Application Details ",
        //        "subMenu": [
        //            {
        //                'menu': 'Apply Leaves',
        //            }, {
        //                'menu': 'Leave Approval Status',
        //            }, {
        //                'menu': 'Leave Balance Review',
        //            }
        //        ]
        //    }, {
        //        "menu": "Personal Information",
        //        "subMenu": [
        //            {
        //                'menu': 'Personal Details',
        //            }
        //        ]
        //    }, {
        //        "menu": "Payroll and Compensation",
        //        "subMenu": [
        //            {
        //                'menu': 'Compensation History',
        //            },
        //            {
        //                'menu': 'Pay Slip',
        //            },
        //            {
        //                'menu': 'Direct Deposit Detail',
        //            },
        //            {
        //                'menu': 'View Tax Form',
        //            },
        //            {
        //                'menu': 'Pension Deductions',
        //            },
        //            {
        //                'menu': 'Generate Request',
        //            }

        //        ]
        //    }, {
        //        "menu": "Benefits",
        //        "subMenu": [
        //            {
        //                'menu': 'Benefit Summary',

        //            }, {
        //                'menu': 'Tip Details',
        //            }
        //        ]
        //    }, {
        //        "menu": "Learning & Development",
        //        "subMenu": [
        //            {
        //                'menu': 'Training Summary'
        //            }]
        //    }, {
        //        "menu": "Change Password",
        //            "subMenu": [{
        //                'menu': 'Forgot Password'
        //            }]
        //    }];
    }];

    var ContentCtrl = [function () {
        var _this = this;
        _this.name = "Content"

    }];

    // var HeaderCtrl = [function () {
    var HeaderCtrl = ["$scope", "$http", "$state", "$rootScope", function ($scope, $http, $state, $rootScope) {
        var vm = this;
        vm.name = "Header"

        vm.logOut = function () {
            alert(1);
        }


    }];

    var FooterCtrl = [function () {
        var _this = this;

    }];


    var DashboardCtrl = ["$scope", "$http", "$state", "$rootScope", function ($scope, $http, $state, $rootScope) {
        var App_Key = "";
        App_Key = $rootScope.App_Key;
        var DatabaseName = localStorage.getItem('databaseName');
        var RoleName = localStorage.getItem('RoleName');
        var UserId = parseInt(localStorage.getItem('UserId'));
        //Header Details
        var UsrId = "[" + UserId + "]";
        var RolName = "[" + RoleName + "]";
        var AppKey = "[" + App_Key + "]";

        var CommonURL = $rootScope.ApiUrl + "Menu/";
        var _this = this;
        _this.leftMenu = [{}];
        var IsActive = parseInt(1);
        var Language = "en";
        var UserId = localStorage.getItem("UserId");
        var RoleName = localStorage.getItem("RoleName");
        $http({
            method: 'GET',
            dataType: 'JSON',
            url: CommonURL + 'GetAllMenu',
            params: { IsActive: IsActive, Language: Language, RoleName: RoleName, UserId: UserId },

        }).then(function (res) {

            _this.leftMenu = res.data;
        });
    }];


   




    //var ApplyLeaveCtrl = [function () {
    var ApplyLeaveCtrl = ["$scope", "$http", "$state", "$rootScope", function ($scope, $http, $state, $rootScope) {
        var _this = this;

        var CommonURL = $rootScope.ApiUrl + "LabelLanguage/";
        debugger;
            var IsActive = parseInt(1);
            var Language = "en";
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetAllGridLables',
                params: {  Language: Language },

            }).then(function (res) {
                debugger
                _this.trainingsummaryTableTH = res.data[0].trainingSummary //TrainingSummary
                _this.AdvanceStaffStatusApprovalTableTH = res.data[0].advanceApprovalStatus
                _this.editLeaveRequestTableTH = res.data[0].applyLeave
                _this.compensationTableTH = res.data[0].compensationHistory
                _this.bankaccTableTH = res.data[0].bankAccountDetail
                _this.paybackscheduleTableTH = res.data[0].staffAdvancePaybackSchedules
                _this.paybackscheduledetailTableTH = res.data[0].staffAdvanceDetails
                _this.staffAdvanceBalancedetailTableTH = res.data[0].staffAdvanceBalanceDetails
                _this.monthlypayrollTableTH = res.data[0].staffAdvanceUpcomingMonthlyPayrollDeduction
                _this.generateRequestTableTH = res.data[0].generateRequest
                _this.userrequestTableTH = res.data[0].userRequest
                _this.benefitsummaryTableTH = res.data[0].benefitSummary
                _this.leaveappstatusTableTH = res.data[0].leaveApprovalStatus
                _this.leaveapprovalstatusTableTH = res.data[0].leaveApprovalDetails
                _this.AdvanceApprovalTableTH = res.data[0].advanceApproval
                _this.pensionDesuctionsTableTH = res.data[0].pensionDeductions
                _this.summarytabTableTH = res.data[0].tipDetails               
                _this.newUserTableTH = res.data[0].newUser
                _this.rolesandRightsinterfaceTH = res.data[0].rolesAndRights
                _this.assignInterfacesForRolesTableTH = res.data[0].selectRole
                _this.paySlipEarningTableTH = res.data[0].paySlipEarnings
                _this.paySlipTotalDeductionsTableTH = res.data[0].paySlipTotalDeductions
                _this.paySlipNetPayDistributionTableTH = res.data[0].paySlipNetPayDistribution
                _this.paySlipAllowancesTableTH = res.data[0].paySlipAllowances
                _this.paySlipDeductionsTableTH = res.data[0].paySlipDeductions
                _this.paySlipTaxDeductionsTableTH = res.data[0].payslipTaxDeductions
                _this.taxFormTableTH = res.data[0].viewTaxForm
                _this.taxYearEndFormTableTH = res.data[0].taxYearEndForm
                _this.paySlipUgOverTimeHrsTableTH = res.data[0].payslipUgOvertimeHrs
                _this.paySlipUgExceptionTableTH = res.data[0].payslipUgException
                _this.paySlipUgLoanDeductionTableTH = res.data[0].payslipUgLoanDeductions
                _this.paySlipUgTotalDeductionTableTH = res.data[0].payslipUgTotalDeductions
                _this.GetLeaveRequestByEmpIdTableTH = res.data[0].leaveApprovalHistory
                _this.leaveDetails_leaveBalanceTH = res.data[0].leaveApprovalHistoryBalance
                _this.StaffAdvanceBalanceTableTH = res.data[0].staffAdvanceBalance

            });
            


        _this.AdminleftMenu = [

            {
                'menu': 'Admin',
                'flag': true

            }, {
                'menu': 'Administrator',
                'flag': false

            }, {
                'menu': 'Simple User',
                'flag': false

            }, {
                'menu': 'HR Admin',
                'flag': true

            }
        ]






        _this.inboxTableTH = [{
            "th": "Emp Id.",
        }, {
            "th": "Leave Type",
        }, {
            "th": "Applied Date",

        }, {
            "th": "From Date",

        }, {
            "th": "To Date",

        }, {
            "th": "Hours",

        }, {
            "th": "Days",

        }, {
            "th": "Remarks",

        }, {
            "th": "IsActive?",
        }, {
            "th": "Status",
        }
            , {
                "th": "Edit",
            }
        ];

        _this.leaveBalanceTH = [{
            "th": "Emp Id.",
        }, {
            "th": "Employee Name",
        },
        {
            "th": "Join Date",

        },
        {
            "th": "Earned Leaves",

        }, {
            "th": "Leaves Taken",

        }, {
            "th": "Current Leave Balance",

        }, {
            "th": "Holiday Leave",

        }, {
            "th": "Sold Holiday",

        }, {
            "th": "Sold Leave",
        }, {
            "th": "Holidays Leave Balance",
        }
          //, {
          //    "th": "Edit",
          //}
        ];

        //_this.leaveappstatusTableTH = [{
        //    "th": "Emp Id",
        //}, {
        //    "th": "Name ",
        //}, {
        //    "th": "Leave Type",
        //}, {
        //    "th": "Applied Date",
        //}, {
        //    "th": "From Date",
        //}, {
        //    "th": "To Date",
        //}, {
        //    "th": "Hours",
        //}, {
        //    "th": "Days",
        //}, {
        //    "th": "Description",
        //}, {
        //    "th": "Approval Status",
        //}];

        //_this.userrequestTableTH = [{
        //    "th": "S.No",
        //}, {
        //    "th": "Employee Id",
        //}, {
        //    "th": "User Name",
        //}, {
        //    "th": "Message",
        //}, {
        //    "th": "Requested Date",
        //}, {
        //    "th": "Action Type",
        //}, {
        //    "th": "Reply Message",
        //}, {
        //    "th": "Reply Date",
        //}, {
        //    "th": "Edit",
        //}
        //];

     //   _this.leaveDetails_leaveBalanceTH = [
     ////       {
     ////       "th": "Emp Id.",
     ////   }, {
     ////       "th": "Employee Name",
     ////   },
     ////{
     ////    "th": "Join Date",

     ////},
     //{
     //    "th": "Earned Leaves",

     //}, {
     //    "th": "Leaves Taken",

     //}, {
     //    "th": "Holidays Leave Balance",
     //}, {
     //    "th": "Holiday Leave",

     //}, {
     //    "th": "Sold Holiday",

     //}, {
     //    "th": "Sold Leave",
     //}, {
     //    "th": "Current Leave Balance",
     //}
     //  //, {
     //  //    "th": "Edit",
     //  //}
     //   ];


       

        //benefit summary
        //_this.benefitsummaryTableTH = [{
        //    "th": "Employee Name",
        //}, {
        //    "th": "Plan Description",
        //}, {
        //    "th": "Coverage of Participtaion",
        //}, {
        //    "th": "Docter Name",
        //}, {
        //    "th": "Employee Contrbution",
        //}, {
        //    "th": "Company Contrbution",
        //}];

        //_this.benefitsummaryTableTD = [{
        //    "rowID": 1,
        //    'checked': false,
        //    "tr": [
        //        { "td": "Medical" },
        //        { "td": "AwMed HMO Pretax" },
        //        { "td": "Employee Only" },
        //    ]
        //}, {

        //    "tr": [
        //        { "td": "Medical" },
        //        { "td": "AwMed HMO Pretax" },
        //        { "td": "Employee Only" },
        //    ]
        //}, {

        //    "tr": [
        //        { "td": "Medical" },
        //        { "td": "AwMed HMO Pretax" },
        //        { "td": "Employee Only" },
        //    ]
        //}, {
        //    "rowID": 4,
        //    'checked': false,
        //    "tr": [
        //        { "td": "Medical" },
        //        { "td": "AwMed HMO Pretax" },
        //        { "td": "Employee Only" },
        //    ]
        //}







        // ];

        //tip details

        _this.tabView = 0;
        _this.TabFun = function (e) {

            _this.tabView = e;
        }

        //other benefits
        _this.otherbenefitsTableTH = [{
            "th": "Family Insurance",
        }, {
            "th": "Life Insurance ",
        }
        ];

        _this.otherbenefitsTableTD = [{
            "tr": [
                { "td": "Wells Fargo" },
                { "td": "AwMed HMO Pretax" },

            ]
        }
        ];


        //employee options

        //_this.employeeoptionsTableTH = [{
        //    "th": "Pension Contribution",
        //}, {
        //    "th": "EPFO Contribution ",
        //}, {
        //    "th": "401 Contibution ",
        //}, {
        //    "th": "Other Opted Benefits ",
        //}
        //];

        //_this.AdvanceApprovalTableTH = [
        ////    {
        ////    "th": "Advance Id",
        ////}, {
        ////    "th": "Contact Id ",
        ////}, {
        ////    "th": "AdvanceType Id",
        ////}, {
        ////    "th": "Currency Id ",
        ////},
        //{
        //    "th": "Employee Id",
        //}, {
        //    "th": "FullName ",
        //}, {
        //    "th": "Description ",
        //}, {
        //    "th": "Currency",
        //}, {
        //    "th": "Date",
        //}, {
        //    "th": "Amount",
        //}, {
        //    "th": "Remark",
        //}, {
        //    "th": "PaybackCount",
        //},
        ////{
        ////    "th": "IsActive",
        ////},
        //{
        //    "th": "PayBack Schedule",
        //},
        //{
        //    "th": "Select",
        //}
        //];

        //Approval Status Details Header

        //_this.AdvanceStaffStatusApprovalTableTH = [
        ////    {
        ////    "th": "Advance Id",
        ////}, {
        ////    "th": "Contact Id ",
        ////}, {
        ////    "th": "AdvanceType Id",
        ////}, {
        ////    "th": "Currency Id ",
        ////},
        //{
        //    "th": "Employee Id",
        //}, {
        //    "th": "FullName ",
        //}, {
        //    "th": "Description ",
        //}, {
        //    "th": "Currency",
        //}, {
        //    "th": "Date",
        //}, {
        //    "th": "Amount",
        //}, {
        //    "th": "Remark",
        //}, {
        //    "th": "PaybackCount",
        //},
        ////{
        ////    "th": "Status",
        ////},
        //{
        //    "th": "Approval Status",
        //}
        //];

       

        // retirement

        _this.retirementTableTH = [{
            "th": "Mediclain Company",
        }, {
            "th": "Company Pays ",
        }, {
            "th": "Your Contribution ",
        }, {
            "th": "Company Provided ",
        }
        ];

      

        //summary tab

        //_this.summarytabTableTH = [{
        //    "th": "Name",
        //}, {
        //    "th": "Tip Points",
        //}, {
        //    "th": "Amount Per Point",
        //}, {
        //    "th": "Total Amount",
        //}, {
        //    "th": "OT Pay",
        //}, {
        //    "th": "Except Amount",
        //}, {
        //    "th": "Tip OT Amount",
        //}, {
        //    "th": "Topay",
        //}
        //];

        // training summary
 

        //_this.trainingsummaryTableTH = [{
        //    "th": "Course Name",
        //}, {
        //    "th": "Course Start Date ",
        //}, {
        //    "th": "Course End Date ",
        //}, {
        //    "th": "Status ",
        //}, {
        //    "th": "Edit ",
        //}, {
        //    "th": "Delete ",
        //}
        //];

        //_this.trainingsummary = { "eg": ["Course Name", "Course Start Date ", "Course End Date ", "Status ", "Edit ", "Delete "],"tk":["fgdfg","dfgdf"] }
       // debugger;
        //_this.trainingsummaryTableTH = ["Course Name", "Course Start Date ", "Course End Date ", "Status ", "Edit ", "Delete "];

        _this.newuser_companyTH = [
          {
              "th": "User ID",

          }, {
              "th": "Name",

          }, {
              "th": "Company",
          }
        ];

        _this.newuser_roleTH = [
          {
              "th": "User ID",

          }, {
              "th": "Name",

          }, {
              "th": "Role",
          }
        ];

       

        _this.TrainingDetailfn = function () {
            _this.ShowTrainingDetail = true;
        }
        _this.closeTrainingDetailfn = function () {
            _this.ShowTrainingDetail = false;
            _this.ShowTrainingEdit = false;
            _this.Showbankacc = false;
            _this.ShowTrainingSummaryEdit = false;
            _this.ShowLeaveApprovalEdit = false;
            _this.viewTaxForm = false;
            _this.ShowLeaveBalance = false;
            _this.viewEMIForm = false;
            _this.showaddroles = false;
            _this.showaddmenus = false;
            _this.ShowaddTerminal = false;
            _this.ShowDeletePopup = false;

        }
        _this.TrainingEditfn = function () {
            _this.ShowTrainingEdit = true;
        }
        _this.AddTrainingSummaryfn = function () {
            _this.ShowTrainingSummaryEdit = true;
        }
        _this.ShowDeletePopupfn = function () {
            _this.ShowDeletePopup = true;
        }
        _this.LeaveApprovalfn = function () {
            _this.ShowLeaveApprovalEdit = true;
        }

        _this.LeaveBalancefn = function () {
            _this.ShowLeaveBalance = true;
        }

        _this.addTerminalfn = function () {
            _this.ShowaddTerminal = true;
        }
        _this.addrolesfun = function () {
            _this.showaddroles = true
        }
        //delete 
        _this.removeRow = function (idx) {
            _this.trainingsummaryTableTD.splice(idx, 1);
        };

        _this.addmenusfun = function () {
            _this.showaddmenus = true;
        }

        //new user
        //new user

        _this.ShowCompanyPopupfn = function () {
            _this.ShowCompanyPopup = true;
        }
        _this.ShowRolePopupfn = function () {
            _this.ShowRolePopup = true;
        }
        _this.CloseCompanyRolePopupfn = function () {
            _this.ShowCompanyPopup = false;
            _this.ShowRolePopup = false;
        }

        //_this.newUserTableTH = [{
        //    "th": "User ID",
        //}, {
        //    "th": "First Name ",
        //}, {
        //    "th": "Last Name ",
        //}, {
        //    "th": "Password ",
        //},
        ////{
        ////    "th": "Company ",
        ////},
        //{
        //    "th": "Role ",
        //}, {
        //    "th": "Status ",
        //}, {
        //    "th": "Edit ",
        //}
        //];


        _this.newUserTableTD = [{
            "tr": [
                { "td": "112" },
                { "td": "Satpal" },
                { "td": "Singh" },
                { "td": "Abc@123" },
                { "td": "Active" }

            ]
        }];

        //Compensation History
    //    _this.compensationTableTH = [
    //{
    //    "th": "Date of Change ",
    //}, {
    //    "th": "Action ",
    //}, {
    //    "th": "Reason ",
    //}, {
    //    "th": "Annual Salary ",
    //}, {
    //    "th": "Currency ",
    //}, {
    //    "th": "Compensation per Frequency ",
    //}, {
    //    "th": "Currency ",
    //}
    //        , {
    //            "th": "Remarks ",
    //        }
    //    ];

        _this.compensationTableTD = [{
            "tr": [

                { "td": "01/06/2018" },
                { "td": "Pay Rt chg" },
                { "td": "Pay Grade or Range" },
                { "td": "34,611,698" },
                { "td": "USD" },
                { "td": "34,611,698" },
                { "td": "USD" },
                { "td": "34,611,698" },
                { "td": "Biweekly Freq - 12 Month" }

            ]
        }, {
            "tr": [
                { "td": "01/06/2018" },
                { "td": "Pay Rt chg" },
                { "td": "Pay Grade or Range" },
                { "td": "34,611,698" },
                { "td": "USD" },
                { "td": "34,611,698" },
                { "td": "USD" },
                { "td": "34,611,698" },
                { "td": "Biweekly Freq - 12 Month" }

            ]
        }, {
            "tr": [
                { "td": "01/06/2018" },
                { "td": "Pay Rt chg" },
                { "td": "Pay Grade or Range" },
                { "td": "34,611,698" },
                { "td": "USD" },
                { "td": "34,611,698" },
                { "td": "USD" },
                { "td": "34,611,698" },
                { "td": "Biweekly Freq - 12 Month" }

            ]
        }
        ];

        // bank account detail

        //_this.bankaccTableTH = [{
        //    "th": "Bank Name",
        //}, {
        //    "th": "IFSC Code",
        //}, {
        //    "th": "Account Name",
        //}, {
        //    "th": "Account NUmber",
        //},
        //  {
        //      "th": " Edit",
        //  }         
        //];

        //_this.bankaccTableTD = [{
        //    "tr": [

        //        { "td": "Savings" },
        //        { "td": "999999999" },
        //        { "td": "********9999" },
        //        { "td": "Percent" },
        //        { "td": "100%" },
        //        { "td": "1" }
        //    ]
        //}
        //];

        _this.bankacceditfn = function () {
            _this.Showbankacc = true;
        }

        _this.ShowTaxInfo = function () {
            _this.ShowTaxReport = true;
        }



        // view tax form
        //_this.taxFormTableTH = [{
        //    "th": "Tax Year",
        //}, {
        //    "th": "Reporting Company ",
        //}, {
        //    "th": "Tax Form Id ",
        //}, {
        //    "th": "Issue Date ",
        //}, {
        //    "th": " Year End Form",
        //}, {
        //    "th": " View Form ",
        //}];

        //_this.taxFormTableTD = [{
        //    "tr": [

        //        { "td": "2014" },
        //        { "td": "Company Name" },
        //        { "td": "W-2" },
        //        { "td": "01/01/2018" },
        //        { "td": "Year End Form" },
        //        { "td": "View Details" }
        //    ]
        //}
        //];

        // Pension Deductions

        //_this.pensionDesuctionsTableTH = [{
        //    "th": "Pension Description",
        //}, {
        //    "th": "Deducted Month",
        //}, {
        //    "th": "Goal Amount",
        //}, {
        //    "th": "Employer Share(%)",
        //}, {
        //    "th": "Employee Share(%)",
        //}, {
        //    "th": "Employer Contribution",
        //}, {
        //    "th": "Employee Contribution",
        //}];

        //_this.pensionDesuctionsTableTD = [{
        //    "tr": [

        //        { "td": "Count Ordered" },
        //        { "td": "04/14/2014" },
        //        { "td": "04/14/2014" },
        //        { "td": "Current" },
        //        { "td": "" },
        //        { "td": "" },
        //        { "td": "0.00" }
        //    ]
        //}
        //];

        // generate request
        //_this.generateRequestTableTH = [{
        //    "th": "Requested Date",
        //}, {
        //    "th": "Message ",
        //}, {
        //    "th": "Replied By",
        //}, {
        //    "th": "Replied Date",
        //}, {
        //    "th": "Reply",
        //}];

        _this.generateRequestTableTD = [{
            "tr": [
                { "td": "04/14/2014" },
                { "td": "Requested Employment Letter" },
                { "td": "Satpal Singh" },
                { "td": "04/10/2018" },
                { "td": "Current" },

            ]
        }, {
            "tr": [
                { "td": "04/14/2014" },
                { "td": "Requested Employment Letter" },
                { "td": "Satpal Singh" },
                { "td": "04/10/2018" },
                { "td": "Current" },

            ]
        }, {
            "tr": [
                { "td": "04/14/2014" },
                { "td": "Requested Employment Letter" },
                { "td": "Satpal Singh" },
                { "td": "04/10/2018" },
                { "td": "Current" },

            ]
        }, {
            "tr": [
                { "td": "04/14/2014" },
                { "td": "Requested Employment Letter" },
                { "td": "Satpal Singh" },
                { "td": "04/10/2018" },
                { "td": "Current" },

            ]
        }, {
            "tr": [
                { "td": "04/14/2014" },
                { "td": "Requested Employment Letter" },
                { "td": "Satpal Singh" },
                { "td": "04/10/2018" },
                { "td": "Current" },

            ]
        }, {
            "tr": [
                { "td": "04/14/2014" },
                { "td": "Requested Employment Letter" },
                { "td": "Satpal Singh" },
                { "td": "04/10/2018" },
                { "td": "Current" },

            ]
        }, {
            "tr": [
                { "td": "04/14/2014" },
                { "td": "Requested Employment Letter" },
                { "td": "Satpal Singh" },
                { "td": "04/10/2018" },
                { "td": "Current" },

            ]
        }
        ];

        //leaveapprovalstatus

        //_this.editLeaveRequestTableTH = [{
        //    "th": "Emp Id",
        //}, {
        //    "th": "Name ",
        //}, {
        //    "th": "Leave Type",
        //}, {
        //    "th": "Applied Date",
        //}, {
        //    "th": "From Date",
        //}, {
        //    "th": "To Date",
        //}, {
        //    "th": "Hours",
        //}, {
        //    "th": "Days",
        //}, {
        //    "th": "Description",
        //}, {
        //    "th": "Approval Status",
        //}, {
        //    "th": "Cancel",
        //}

        //];

        //_this.GetLeaveRequestByEmpIdTableTH = [
        // //   {
        ////    "th": "Emp Id",
        ////}, {
        ////    "th": "Name ",
        ////},
        //{
        //    "th": "Leave Type",
        //}, {
        //    "th": "Applied Date",
        //}, {
        //    "th": "From Date",
        //}, {
        //    "th": "To Date",
        //}, {
        //    "th": "Hours",
        //}, {
        //    "th": "Days",
        //}, {
        //    "th": "Description",
        //}, {
        //    "th": "Approval Status",
        //},

        //];


        //_this.leaveapprovalstatusTableTH = [{
        //    "th": "Emp Id",
        //}, {
        //    "th": "Name ",
        //}, {
        //    "th": "Leave Type",
        //}, {
        //    "th": "Applied Date",
        //}, {
        //    "th": "From Date",
        //}, {
        //    "th": "To Date",
        //}, {
        //    "th": "Hours",
        //}, {
        //    "th": "Days",
        //}, {
        //    "th": "Description",
        //},
        ////{
        ////    "th": "Is Active?",
        ////},
        //{
        //    "th": "Leave History",
        //}, {
        //    "th": "Select",
        //}];

     

        /*********************************Controller****************************/
        //payback schedules
        //_this.paybackscheduleTableTH = [{
        //    "th": "Salary Period",
        //}, {
        //    "th": "Amount",
        //}, {
        //    "th": "Paid Amount",
        //}, {
        //    "th": "Balance",
        //}
        //];




        //payback schedule details
        //_this.paybackscheduledetailTableTH = [{
        //    "th": "Date",
        //}, {
        //    "th": "Amount",
        //}, {
        //    "th": "Currency",
        //}, {
        //    "th": "Remark",
        //}, {
        //    "th": "Payback Count",
        //}, {
        //    "th": "PayBack Schedule",
        //},
        //{
        //    "th": "Approval Status",
        //}
        //,
        //{
        //    "th": "Cancel Request",
        //}
        //];






        //payback schedule details
        //_this.staffAdvanceBalancedetailTableTH = [{
        //    "th": "Advance Date",
        //}, {
        //    "th": "Currency",
        //}, {
        //    "th": "Amount",
        //}, {
        //    "th": "Paid Amount",
        //}, {
        //    "th": "Balance",
        //}, {
        //    "th": "Status",
        //}, {
        //    "th": "PayBack Schedule",
        //}];



        //monthly payroll
        //_this.monthlypayrollTableTH = [{
        //    "th": "Salary Period",
        //}, {
        //    "th": "Deductable Amount (SRD)",
        //}
        //];
      ;




        //roles & rights
        //_this.rolesandRightsinterfaceTH = [
        //{
        //    "th": "Sno",
        //},
        //{
        //    "th": "Menu Name",
        //},
        //  {
        //      "th": "IsActive",
        //  },
        //    {
        //        "th": "Edit",
        //    }
        //];

   

        //Terminal
        _this.rolesandRightsTH = [{
            "th": "Id",
        }, {

            "th": "Name",





        }, {

            "th": "Description",
        }, {
            "th": "IP Address",



        }, {
            "th": "Mac Address",
        }
        ];



        // visible bar button locations

        _this.visiblebarbuttonTableTH = [{
            "th": "Location Id",
        }, {
            "th": "Location ",
        }, {
            "th": "Location Address ",
        }, {
            "th": "Select Location ",
        }
        ];

        _this.visiblebarbuttonTableTD = [{
            "tr": [

                { "td": "" },
                { "td": "" },
                { "td": "" },
                { "td": "" }

            ]
        }
        ];

        // visible bar button button details

        _this.visiblebarbuttondetailsTableTH = [{
            "th": "Tab",
        }, {
            "th": "Button Caption ",
        }, {
            "th": "Accessible Name ",
        }, {
            "th": "Button Name ",
        }, {
            "th": "Select Button ",
        }
        ];

        _this.visiblebarbuttondetailsTableTD = [{
            "tr": [
                { "td": "" },
                { "td": "" },
                { "td": "" },
                { "td": "" },
                { "td": "" }

            ]
        }
        ];


        // add roles button

        _this.assignInterfacesTableTH = [
        //    {
        //    "th": "IT Admin",
        //}, {
        //    "th": "Terminal ",
        //}, {
        //    "th": "Frm_Terminal ",
        //}, {
        //    "th": "Readable ",
        //}, {
        //    "th": "Writeable ",
        //}
        {
            "th": "Sno",
        },
        {
            "th": "Role Id",
        },
         {
             "th": "Role Name",
         },
          {
              "th": "IsActive",
          }
        ];

       // _this.assignInterfacesForRolesTableTH = [
       //{
       //    "th": "Sno",
       //},
       // {
       //     "th": "Menu Name",
       // },
       //  {
       //      "th": "Readable",
       //  },
       //  {
       //      "th": "Writable",
       //  }
       // ];

        _this.assignInterfacesForMenuTableTH = [

  {
      "th": "Sno",
  },
   {
       "th": "Menu Name",
   },
    {
        "th": "IsActive",
    }
    //{
    //    "th": "MenuId",
    //}
        ];





        //add---------------------

        _this.addFun = function () {
            var addrow = JSON.parse(JSON.stringify(_this.bankaccTableTD[0]));
            addrow.rowID = _this.bankaccTableTD.length + 1;
            angular.forEach(addrow.tr, function (value, key) {
                value.td = '---';
                value.subTd = [];
            });
            _this.bankaccTableTD.push(addrow)
        }

    }];




    angular
        .module("HRMSApp")
        .controller("MainCtrl", MainCtrl)
        .controller("NavbarLeftCtrl", NavbarLeftCtrl)
        .controller("ContentCtrl", ContentCtrl)
        .controller("HeaderCtrl", HeaderCtrl)
        .controller("FooterCtrl", FooterCtrl)
        .controller("DashboardCtrl", DashboardCtrl)
        .controller("ApplyLeaveCtrl", ApplyLeaveCtrl)
   //  .controller("GridLabelCtrl", GridLabelCtrl)


}(angular));




