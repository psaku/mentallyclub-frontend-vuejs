import { defineStore } from 'pinia'
import { usePropertiesStore } from './properties';

export const useAccountStore = defineStore('user-account', {
  state: () => ({
    isLoggedIn: false,
    isAdmin: false,
    user: {
      username: '',
      token: '',
      email: '',
      role: '',
      id: '',
      lastaccessed:''
    }
  }),
  actions: {
    async signIn(username, passwd) {
      const propertiesStore = usePropertiesStore()
      const userInfo = {
        "username": username,
        "password": passwd,
      };
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      console.log(propertiesStore.ApiServer)
      try {
        const response = await fetch(`${propertiesStore.ApiServer}/${propertiesStore.ApiVersion}/login`, {
          method: 'POST',
          credentials: 'include',
          headers: myHeaders,
          body: JSON.stringify(userInfo),
        });
        if (!response.ok) {
          throw new Error(`${await response.text()}`);
        }

        const res = await response.json();

        this.isLoggedIn = true
        this.isAdmin = res.role == 'admin'? true: false
        this.user.id = res.id
        this.user.username = username
        this.user.token = res.token
        this.user.email = res.email
        this.user.role = res.role
        this.user.lastaccessed = res.lastaccessed
//        localStorage.setItem('user-profile', JSON.stringify(this.user))
        
      } catch (error) {
        //alert(error + ' or Could not connect to the server.')
        return (error + '/ or Could not connect to the server.')
      }
    },
    async logout() {
      const propertiesStore = usePropertiesStore()
      try {
        const response = await fetch(`${propertiesStore.ApiServer}/${propertiesStore.ApiVersion}/logout`,{
          method: 'GET',
          credentials: 'include',
          headers: { Authorization: `Bearer ${this.user.token}` }
        });
        this.isLoggedIn = false
        this.isAdmin = false
        this.user.username = ''      
//        localStorage.removeItem('user-profile')  
      } catch (error) {
        console.error('Error calling logout:', error);
      }
    }
  }
})