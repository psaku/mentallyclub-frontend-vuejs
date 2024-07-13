import { defineStore } from 'pinia'

export const usePropertiesStore = defineStore('properties-info', {
  state: () => ({
    Host: 'localhost',
    Port: '8888',
    ApiVersion: 'api/v1',
    UserRoles: ['Admin', 'Staff'],
    AccountStatus: ['Active', 'Suspended', 'Canceled'],
    MemberStatus: ['เป็นสมาชิก', 'ถูกระงับชั่วคราว', 'ยกเลิก', 'เสียชีวิต'],
    ResponseType: ['ประธานชมรม', 'ที่ปรึกษาชมรม', 'สมาชิกชมรม', 'กรรมการชมรม'],
    EducationLevels: ['ประถมศึกษา', 'มัธยมศึกษา', 'ปริญญาตรี', 'ปริญญาโท', 'ปริญญาเอก'],
    PersonalStatus: ['โสด', 'สมรส', 'หย่า', 'หม้าย'],
    MemberType: ['สมาชิกสามัญ', 'สมาชิกวิสามัญ'],
    TalentLevel: ['พอใช้', 'เชี่ยวชาญ', 'ยอดเยี่ยม'],
    OrdinaryMemberDesc: ['คนพิการทางจิตใจหรือพฤติกรรม(มีบัตรคนพิการประเภท 4)', 'ผู้ดูแลคนพิการทางจิตฯ(มีชื่อหลังบัตรคนพิการประเภท 4)', 'คนพิการทางจิตฯที่มีความพิการอื่นซ้ำซ้อน(ต้องมีประเภท 4 พิการทางจิตและความพิการอื่นที่ซ้ำซ้อน)'],
    ExtraOrdinaryMemberDesc: ['ผู้ป่วยทางจิตใจหรือพฤติกรรม(ไม่มีบัตรคนพิการ)', 'ผู้ดูแล ญาติ ผู้ปกครองผู้ป่วยทางจิตฯ (ไม่มีชื่อหลังบัตรคนพิการ)', 'อาสาสมัคร'],
  }),
  getters: {
    ApiServer(state) {
      return `http://${state.Host}:${state.Port}`
    }
  },
  actions: {
    async checkThaiID(PID) {
      var sum = 0;
      var iPID;
      var validChk;
      var inputChkDigit;
     
      iPID = PID.replace(/-/g, "");

      if (iPID.length != 13) return false;
     
      inputChkDigit = iPID.substr(12, 1);
      var j = 0;
      var pidcut;
      for (var n = 0; n < 12; n++) {
        pidcut = parseInt(iPID.substr(j, 1));
        sum = (sum + ((pidcut) * (13 - n)));
        j++;
      }
      validChk = (11 - (sum % 11))%10;
//      console.log('ThaiID: ', PID, inputChkDigit,  validChk, validChk == inputChkDigit )
      return (validChk == inputChkDigit)
    }
  }
})
