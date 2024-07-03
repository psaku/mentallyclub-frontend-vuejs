import { defineStore } from 'pinia'

export const useAccountStore = defineStore('user-account', {
  state: () => ({
    isLoggedIn: false,
    isAdmin: false,
    user: {
      username: '',
      token: '',
      email: '',
      role: '',
      id: ''
    }
  }),
  actions: {
    async signIn(username, passwd) {
      const userInfo = {
        "username": username,
        "password": passwd,
      };
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      try {
        const response = await fetch('http://localhost:8888/api/v1/login', {
          method: 'POST',
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
        localStorage.setItem('user-profile', JSON.stringify(this.user))
        //console.log(this.user)
      } catch (error) {
        //alert(error + ' or Could not connect to the server.')
        return (error + '/ or Could not connect to the server.')
      }
    },
    async logout() {
      try {
        const response = await fetch('http://localhost:8888/api/v1/logout',{
          method: 'GET',
          headers: { Authorization: `Bearer ${this.user.token}` }
        });
        this.isLoggedIn = false
        this.isAdmin = false
        this.user.username = ''      
        localStorage.removeItem('user-profile')  
      } catch (error) {
        console.error('Error calling logout:', error);
      }
    }
  }
})