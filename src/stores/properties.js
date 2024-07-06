import { defineStore } from 'pinia'

export const usePropertiesStore = defineStore('properties-info', {
  state: () => ({
    ApiServer: 'http://localhost:8888',
    ApiVersion: 'api/v1',
    UserRoles: ['Admin', 'Staff'],
    AccountStatus: ['Active', 'Suspended', 'Canceled'],
    MemberStatus: ['เป็นสมาชิก','ถูกระงับชั่วคราว','ยกเลิก','เสียชีวิต'],
    ResponseType: ['ประธานชมรม','ที่ปรึกษาชมรม','สมาชิกชมรม','กรรมการชมรม'],
    ExperienceType: ['การศึกษา','ประสบการณ์การทำงาน','ความสามารถพิเศษ'],
    PersonalStatus: ['โสด','สมรส','หย่า','หม้าย'],
    MemberType: ['สมาชิกสามัญ','สมาชิกวิสามัญ'],
    OrdinaryMemberDesc: ['คนพิการทางจิตใจหรือพฤติกรรม(มีบัตรคนพิการประเภท 4)','ผู้ดูแลคนพิการทางจิตฯ(มีชื่อหลังบัตรคนพิการประเภท 4)','คนพิการทางจิตฯที่มีความพิการอื่นซ้ำซ้อน(ต้องมีประเภท 4 พิการทางจิตและความพิการอื่นที่ซ้ำซ้อน)'],
    ExtraOrdinaryMemberDesc: ['ผู้ป่วยทางจิตใจหรือพฤติกรรม(ไม่มีบัตรคนพิการ)','ผู้ดูแล ญาติ ผู้ปกครองผู้ป่วยทางจิตฯ (ไม่มีชื่อหลังบัตรคนพิการ)','อาสาสมัคร'],
  }),
  actions: {}
})
