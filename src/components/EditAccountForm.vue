<template>
  <q-card class="edit-account-card">
    <q-card-section class="bg-grey-4 q-pa-md">
      <div class="text-h6">แก้ไขข้อมูลผู้ใช้</div>
      <div class="text-subtitle1">
        กรุณากรอกข้อมูลลงในแบบฟอร์มให้ครบถ้วนเพื่อการแก้ไข
      </div>
    </q-card-section>
    <q-separator inset />
    <q-form @submit="onSubmitForm">
      <q-card-section class="column q-gutter-md">
        <q-input
          label="ชื่อผู้ใช้ "
          v-model="formAccount.username"
          :rules="[
            (val) => (val && val.length > 0) || 'Name must be filled in.',
          ]"
          readonly
        ></q-input>
        <q-input
          label="Email *"
          v-model="formAccount.email"
          :rules="[(val) => validateEmail(val) || 'Must be a valid email.']"
        ></q-input>
        <q-select
          label="บทบาท/หน้าที่"
          v-model="formAccount.role"
          transition-show="scale"
          transition-hide="scale"
          filled
          :options="propertiesStore.UserRoles"
          style="width: 250px"
        />
        <q-select
          label="สถานะ"
          v-model="formAccount.status"
          transition-show="scale"
          transition-hide="scale"
          filled
          :options="propertiesStore.AccountStatus"
          style="width: 250px"
        />
      </q-card-section>
      <q-card-actions align="right" style="padding-right: 15px;">
        <q-btn icon="check_circle" color="primary" type="submit">Update</q-btn>
        <q-btn icon="cancel" @click="$emit('cancel')">Cancel</q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAccountStore } from "../stores/account";
import { usePropertiesStore } from "../stores/properties"
import { useQuasar } from "quasar";

const q = useQuasar();

const props = defineProps(['username', 'email', 'role', 'status'])
const emit = defineEmits(['close'])
const accountStore = useAccountStore();
const propertiesStore = usePropertiesStore();

const formAccount = ref({
  username: '',
  email: '',
  role: '',
  status: ''
});

onMounted(()=>{
  formAccount.value.username = props.username
  formAccount.value.email = props.email
  formAccount.value.role = props.role
  formAccount.value.status = props.status
});

const validateEmail = (email) => {
  return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
};

const showNotify = (msg) => {
  q.notify({
    type: "info",
    color: "primary",
    textColor: 'white',
    message: msg,
    position: 'top-right'
  });
};
const onCancel = () => {}
const onSubmitForm = () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
//  myHeaders.append("Authorization", "Bearer " + accountStore.user.token)

  var body = JSON.stringify({
    "username": formAccount.value.username,
    "email": formAccount.value.email,
    "role": formAccount.value.role,
    "status": formAccount.value.status,
  });
  var requestOptions = {
    method: 'PUT',
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
//    console.log(result)
    if (result.message == 'ok') {      
      showNotify('แก้ไขข้อมูลผู้ใช้ระบบชื่อ ' + formAccount.value.username + ' สำเร็จเรียบร้อย')
      emit('close')
    }
   })
   .catch(err => {
    console.log(err)
    alert(err)
   });
}

</script>

<style lang="scss">
.edit-account-card {
  width: 640px;
  padding-bottom: 5px;
}
.password-criteria {
  background-color: #efefef;
  border-radius: 0.5rem;
}
</style>
