import { defineStore } from 'pinia'

export const usePropertiesStore = defineStore('properties-info', {
  state: () => ({
    UserRoles: ['Admin', 'Staff'],
    AccountStatus: ['Active', 'Suspended', 'Canceled'],
    MemberStatus: ['เป็นสมาชิก','ถูกระงับชั่วคราว','ยกเลิก','เสียชีวิต'],
    ResponseType: ['ประธานชมรม','ที่ปรึกษาชมรม','สมาชิกชมรม','กรรมการชมรม'],
    ExperienceType: ['การศึกษา','ประสบการณ์การทำงาน','ความสามารถพิเศษ']
  }),
  actions: {}
})
