import { defineStore } from 'pinia'
import { usePropertiesStore } from './properties';

export const useClubStore = defineStore('clubs-info', {
  state: () => ({
    listclubs: []
  }),
  actions: {

    adjustUTCDate(utcdate) {
      if (utcdate.endsWith('Z')) {
        // เป็น UTC
        const localDate = new Date(utcdate).toLocaleString("en-US", { timeZone: "Asia/Bangkok" });
        const formattedDate = new Date(localDate).toISOString().slice(0, 10);
        //        console.log(formattedDate); // Output: "2024-07-06"
      } else {
        // ไม่ใช่ UTC
        const formattedDate = new Date(utcdate).toISOString().slice(0, 10);
        //        console.log(formattedDate); // Output: "2024-07-05"
      }
      return formattedDate;
    },
    async getClubs() {
      const propertiesStore = usePropertiesStore()
      const userprofile = await localStorage.getItem('user-profile');
      const jsondata = JSON.parse(userprofile);
      //console.log('token', jsondata.token);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${jsondata.token}`);

      try {
        const response = await fetch(`${propertiesStore.ApiServer}/${propertiesStore.ApiVersion}/clubs`, {
          method: 'GET',
          headers: myHeaders
        });
        if (!response.ok) {
          throw new Error(`Error on selection: ${await response.text()}`);
        }

        // Parse JSON response and store data in array
        const clubData = await response.json();
        console.log('club data=',this.listclubs)
        this.listclubs = clubData.message.map(club => ({
          clubid: club.ClubID,
          clubname: club.ClubName,
          homeno: club.HomeNo,
          moo: club.Moo,
          tambon: club.Tambon,
          district: club.District,
          province: club.Province,
          zipcode: club.Zipcode,
          phoneno: club.PhoneNo,
          clubfoundingdate: club.ClubFoundingDate,
          clubpresidentid: club.ClubPresidentID,
        })); // Handle potential message structure
        console.log('listclubs=',this.listclubs)
      } catch (error) {
        console.log(error)
      }
    },
    async deleteClub(id) {
      const propertiesStore = usePropertiesStore()
      const userprofile = await localStorage.getItem('user-profile');
      const jsondata = JSON.parse(userprofile);
      //console.log('token', jsondata.token);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${jsondata.token}`);

      try {
        const response = await fetch(`${propertiesStore.ApiServer}/${propertiesStore.ApiVersion}/clubs/${id}`, {
          method: 'DELETE',
          headers: myHeaders
        });
        if (!response.ok) {
          throw new Error(`Error on deletion: ${await response.text()}`);
        }

        // Parse JSON response and store data in array
        const clubData = await response.json();
        return true;
      } catch (error) {
        console.log(error)
        return false
      }
    },
  }
})