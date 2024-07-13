<template>
  <q-card class="create-account-card">
    <q-card-section class="bg-primary text-grey-2 q-pa-md">
      <div class="text-h6">Create New Account</div>
      <div class="text-subtitle1">
        Fill out the following form to create your new account.
      </div>
    </q-card-section>
    <q-separator inset />
    <q-form @submit="onSubmitForm">
      <q-card-section class="column q-gutter-md">
        <q-input
          label="User Name *"
          v-model="formAccount.username"
          :rules="[
            (val) => (val && val.length > 0) || 'Name must be filled in.',
          ]"
        ></q-input>
        <q-input
          label="Email *"
          v-model="formAccount.email"
          :rules="[(val) => validateEmail(val) || 'Must be a valid email.']"
        ></q-input>
        <q-select
          label="Role"
          v-model="formAccount.role"
          transition-show="scale"
          transition-hide="scale"
          filled
          :options="propertiesStore.UserRoles"
          style="width: 250px"
        />
        <q-input
          label="Password *"
          type="password"
          v-model="formAccount.password"
          :rules="[
            (val) =>
              validatePassword(val) || 'Password must meet all criteria.',
          ]"
        ></q-input>
        <q-input
          label="Confirm Password *"
          type="password"
          v-model="confirmpassword"
          :disable="!validatePassword(formAccount.password)"
          :rules="[
            (val) =>
              (val && val === formAccount.password) || 'Must match password.',
          ]"
        ></q-input>
        <div class="password-criteria q-pa-sm">
          <div class="text-subtitle2 q-mb-sm">Password Criteria:</div>
          <div>
            <q-icon
              :name="validPassword.length ? 'check_circle' : 'block'"
              :color="validPassword.length ? 'positive' : 'negative'"
            ></q-icon>
            Must be at least 10 characters long.
          </div>
          <div>
            <q-icon
              :name="validPassword.capital ? 'check_circle' : 'block'"
              :color="validPassword.capital ? 'positive' : 'negative'"
            ></q-icon>
            Must contain at least one capital letter.
          </div>
          <div>
            <q-icon
              :name="validPassword.number ? 'check_circle' : 'block'"
              :color="validPassword.number ? 'positive' : 'negative'"
            ></q-icon>
            Must contain at least one number.
          </div>
          <div>
            <q-icon
              :name="validPassword.symbol ? 'check_circle' : 'block'"
              :color="validPassword.symbol ? 'positive' : 'negative'"
            ></q-icon>
            Must contain at least one symbol.
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right" style="padding-right: 15px;">
        <q-btn icon="check_circle" color="primary" type="submit">Create Account</q-btn>
        <q-btn icon="cancel" @click="$emit('cancel')">Cancel</q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { useAccountStore } from "src/stores/account";
import { usePropertiesStore } from "src/stores/properties"
import { useQuasar } from "quasar";

const q = useQuasar();
const accountStore = useAccountStore();
const propertiesStore = usePropertiesStore();

const formAccount = ref({
  username: "test1",
  email: "test1@mail.com",
  role: "staff",
  password: "123456789Z@",
});
const validPassword = ref({
  length: false,
  capital: false,
  number: false,
  symbol: false,
});
const confirmpassword = ref("123456789Z@");

const showNotify = (msg) => {
  q.notify({
    type: "info",
    color: "primary",
    textColor: 'white',
    message: msg,
    position: 'top-right'
  });
};

const validateEmail = (email) => {
  return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
};

const validatePassword = (val) => {
  // Test length

  let passwd = formAccount.value.password;

  validPassword.value.length = passwd.length >= 10;
  // Test capital
  validPassword.value.capital = /^(?=.*[A-Z])/.test(passwd);
  // Test number
  validPassword.value.number = /^(?=.*[0-9])/.test(passwd);
  // Test symbol
  validPassword.value.symbol = /^(?=.*[!@#\$%\^&\*_\-=+])/.test(passwd);
  return (
    validPassword.value.length &&
    validPassword.value.capital &&
    validPassword.value.number &&
    validPassword.value.symbol
  );
};
const onCancel = () => {}

const onSubmitForm = () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
//  myHeaders.append("Authorization", "Bearer " + accountStore.user.token)

  var body = JSON.stringify({
    "username": formAccount.value.username,
    "password": formAccount.value.password,
    "email": formAccount.value.email,
    "role": formAccount.value.role,
    "status": "Active"
  });
  var requestOptions = {
    method: 'POST',
    credentials: 'include',
    headers: myHeaders,
    body: body,
    redirect: 'follow'
  };
//  console.log(body);
  fetch(`${propertiesStore.ApiServer}/${propertiesStore.ApiVersion}/users`, requestOptions)
   .then(response => {
      if (!response.ok) {
         throw new Error("Server Status: " + response.status);
      }
      return response.json()
    })
   .then(result => {
    console.log(result)
    if (result.message == 'ok') {  
      showNotify('เพิ่มเติมข้อมูลผู้ใช้ระบบชื่อ ' + formAccount.value.username + ' สำเร็จเรียบร้อย');    
      // alert('เพิ่มเติมข้อมูลผู้ใช้ระบบชื่อ ' + formAccount.value.username + ' สำเร็จเรียบร้อย')
    }
   })
   .catch(err => {
    console.log(err)
    alert(err)
   });
}

</script>

<style lang="scss">
.create-account-card {
  width: 640px;
  padding-bottom: 5px;
}
.password-criteria {
  background-color: #efefef;
  border-radius: 0.5rem;
}
</style>
