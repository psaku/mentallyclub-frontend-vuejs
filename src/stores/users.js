import { defineStore } from 'pinia'

export const useUserStore = defineStore('users-info', {
  state: () => ({
    listusers: []
  }),
  actions: {
    async getUsers() {
      
      const userprofile = await localStorage.getItem('user-profile');
      const jsondata = JSON.parse(userprofile);
      //console.log('token', jsondata.token);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${jsondata.token}`);

      try {
        const response = await fetch('http://localhost:8888/api/v1/users', {
          method: 'GET',
          headers: myHeaders
        });
        if (!response.ok) {
          throw new Error(`Error on selection: ${await response.text()}`);
        }

        // Parse JSON response and store data in array
        const userData = await response.json();
        this.listusers = userData.message.map(user=>({id: user.UserID, username: user.Username, role: user.Role, email: user.Email, status: user.Status})); // Handle potential message structure
        //console.log(this.listusers)
      } catch (error) {
        console.log(error)
      }
    },
    async deleteUser(name) {
      
      const userprofile = await localStorage.getItem('user-profile');
      const jsondata = JSON.parse(userprofile);
      //console.log('token', jsondata.token);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${jsondata.token}`);

      try {
        const response = await fetch('http://localhost:8888/api/v1/users/'+name, {
          method: 'DELETE',
          headers: myHeaders
        });
        if (!response.ok) {
          throw new Error(`Error on deletion: ${await response.text()}`);
        }

        // Parse JSON response and store data in array
        const userData = await response.json();
        return true;
        //console.log(this.listusers)
      } catch (error) {
        console.log(error)
        return false
      }
    },
  }
})