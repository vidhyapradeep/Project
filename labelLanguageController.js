(function (angular, undefined) {
    "use strict";

    var CommonURL = "";
    var LabelCtrl = ["$scope", "$http", "$state", "$rootScope", "$filter", function ($scope, $http, $state, $rootScope, $filter) {
        CommonURL = $rootScope.ApiUrl + "LabelLanguage/";
        var vm = this;
        var DatabaseName = localStorage.getItem('databaseName');
        vm.defaultLang = 'en';
        changelanguage();


        //vm.changelanguage = function () {
        function changelanguage() {
            debugger;
            var IsActive = parseInt(1);
            var Language = vm.defaultLang;
            $http({
                method: 'GET',
                dataType: 'JSON',
                url: CommonURL + 'GetAllLables',
                params: { IsActive: IsActive, Language: Language },
            }).then(function (res) {
                if (res.data) {
                    vm.LabelText = {
                        PHUserName: res.data[0].label,
                        PHPassword: res.data[1].label,
                        ForgetPassword: res.data[2].label,
                        SignUp: res.data[3].label,
                        Login: res.data[4].label,
                        PHEmployeeID: res.data[5].label,
                        PHGovtId: res.data[6].label,
                        PHDateFormat: res.data[7].label,
                        PHEmail: res.data[8].label,
                        PHMobile: res.data[9].label,
                        PHCountry: res.data[10].label,
                        PHRegUserName: res.data[11].label,
                        PHConfirmPassword: res.data[12].label,
                        LabUserId: res.data[13].label,
                        LabEmail: res.data[14].label,
                        LabMobile: res.data[15].label,
                        LabOtp: res.data[16].label,
                        BtnOtp: res.data[17].label,
                        LabApplyLeave: res.data[18].label,
                        LabCurrentLeaveBalance: res.data[19].label,
                        LabLeaveType: res.data[20].label,
                        LabFromDate: res.data[21].label,
                        LabToDate: res.data[22].label,
                        LabDescription: res.data[23].label,
                        LabNoOfDays: res.data[24].label,
                        LabLeaveDetails: res.data[25].label,
                        LabPersonalDetails: res.data[26].label,
                        LabName: res.data[27].label,
                        LabAddress: res.data[28].label,
                        LabEditSave: res.data[29].label,
                        LabUploadLatestPhoto: res.data[30].label,
                        LabUploadPhoto: res.data[31].label,
                        LabSavePhoto: res.data[32].label,
                        LabContactDetails: res.data[33].label,
                        LabContactType: res.data[34].label,
                        LabPhoneNumber: res.data[35].label,
                        LabPreferred: res.data[36].label,
                        LabEmergencyContact: res.data[37].label,
                        LabRelationshiptoEmp: res.data[38].label,
                        LabPrimaryContact: res.data[39].label,
                        LabMaritalStatus: res.data[40].label,
                        LabMarriageDate: res.data[41].label,
                        LabPreferredNameChange: res.data[42].label,
                        LabPrimaryName: res.data[43].label,
                        LabPreferredName: res.data[44].label,
                        LabDisability: res.data[45].label,
                        LabVeteranStatus: res.data[46].label,
                        LabSelectDetails: res.data[47].label,
                        LabCompensationHistory: res.data[48].label,
                        LabEmployeeJobInformation: res.data[49].label,
                        LabJobTitle: res.data[50].label,
                        LabDepartment: res.data[51].label,
                        LabPayrollStatus: res.data[52].label,
                        LabEmployeeId: res.data[53].label,
                        LabSalaryHistory: res.data[54].label,
                        HdPaySlip: res.data[55].label,
                        LabSelectSalaryPeriod: res.data[56].label,
                        HdBankAccountDetail: res.data[57].label,
                        HdViewTaxForm: res.data[58].label,
                        HdPensionDeductions: res.data[59].label,
                        HdStaffAdvanceRequest: res.data[60].label,
                        LabDate: res.data[61].label,
                        LabAmount: res.data[62].label,
                        LabRemark: res.data[63].label,
                        LabPaybackCount: res.data[64].label,
                        HdPaybackSchedules: res.data[65].label,
                        HdAdvanceDetails: res.data[66].label,
                        HdCancelAdvRequest: res.data[67].label,
                        LabCurrency: res.data[68].label,
                        LabSalaryCurrency: res.data[69].label,
                        HdStaffAdvanceBalance: res.data[70].label,
                        LabEmployeeName: res.data[71].label,
                        HdMonthlyPayrollDeductions: res.data[72].label,
                        HdAdvanceBalanceDetails: res.data[73].label,
                        HdLoanHistory: res.data[74].label,
                        HdGenerateRequest: res.data[75].label,
                        LabMessage: res.data[76].label,
                        LabRequestDetails: res.data[77].label,
                        HdUserRequest: res.data[78].label,
                        HdTipDetails: res.data[79].label,
                        HdBenefitSummary: res.data[80].label,
                        HdTrainingSummary: res.data[81].label,
                        LabCourseName: res.data[82].label,
                        LabCourseStartDate: res.data[83].label,
                        LabCourseEndDate: res.data[84].label,
                        LabStatus: res.data[85].label,
                        HdCancelTrainingDetails: res.data[86].label,
                        HdSalarySlip: res.data[87].label,
                        LabMonth: res.data[88].label,
                        LabYear: res.data[89].label,
                        LabDesignation: res.data[90].label,
                        LabPaymentMode: res.data[91].label,
                        LabTotWorkingDays: res.data[92].label,
                        LabLeaveBalance: res.data[93].label,
                        LabOverTime: res.data[94].label,
                        LabVacation: res.data[95].label,
                        LabBonus: res.data[96].label,
                        LabOtherAllowance: res.data[97].label,
                        LabRateCompensation: res.data[98].label,
                        LabTotal: res.data[99].label,
                        LabAov: res.data[100].label,
                        LabLoan: res.data[101].label,
                        LabAdvance: res.data[102].label,
                        LabPenalty: res.data[103].label,
                        LabMedical: res.data[104].label,
                        LabWageTax: res.data[105].label,
                        LabWageTaxOT: res.data[106].label,
                        LabTaxable: res.data[107].label,
                        LabCurrent: res.data[108].label,
                        HdNetPayDistrubution: res.data[109].label,
                        LabEndBalance: res.data[110].label,
                        HdHoursAndEarnings: res.data[111].label,
                        HdAllowances: res.data[112].label,
                        HdDeductions: res.data[113].label,
                        HdTaxDeductions: res.data[114].label,
                        HdTotalDeductions: res.data[115].label,
                        HdTaxForm: res.data[116].label,
                        HdYearEndForm: res.data[116].label,
                        LabSalaryHours: res.data[117].label,
                        LabOverTimeHr: res.data[118].label,
                        LabOverTimeUg: res.data[119].label,
                        LabExceptionsUg: res.data[120].label,
                        LabPaySlipNcns: res.data[121].label,
                        LabPaySlipSickCall: res.data[123].label,
                        LabPaySlipLate: res.data[124].label,
                        HdPaySlipLoanDeductions: res.data[125].label,
                        LabOtherDeductions: res.data[126].label,
                        LabSalaryAdvance: res.data[127].label,
                        LabPaye: res.data[128].label,
                        LabNssf: res.data[129].label,
                        LabLst: res.data[130].label,
                        LabUnionFee: res.data[131].label,                     
                    }

                }


            });
        }

    }];
    angular
       .module("HRMSApp")
       .controller("LabelCtrl", LabelCtrl)
})(angular);
