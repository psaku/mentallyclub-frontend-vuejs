<script setup>
import { useAccountStore } from "../stores/account";
import { useUserStore } from "../stores/users";
import { onMounted, onUnmounted, ref } from "vue";
// import { useRouter } from "vue-router";
import CreateAccountForm from "../components/CreateAccountForm.vue";
import EditAccountForm from "../components/EditAccountForm.vue";

const accountStore = useAccountStore();
const userStore = useUserStore();
// const router = useRouter();

const loading = ref(false);
const create_opened = ref(false);
const edit_opened = ref(false);
const user = ref({
  username: '',
  role: '',
  status: '',
  email: ''
})

const columns = [
  {
    name: "id",
    align: "center",
    label: "#id",
    field: "id",
    sortable: true,
    headerStyle: "font-weight: bold; font-size: 14px",
  },
  {
    name: "Username",
    align: "left",
    label: "User name",
    field: "username",
    sortable: true,
    headerStyle: "font-weight: bold; font-size: 14px",
  },
  {
    name: "Role",
    align: "center",
    label: "Role",
    field: "role",
    sortable: true,
    headerStyle: "font-weight: bold; font-size: 14px",
  },
  {
    name: "Email",
    align: "left",
    label: "Email",
    field: "email",
    sortable: true,
    headerStyle: "font-weight: bold; font-size: 14px",
  },
  {
    name: "Status",
    align: "center",
    label: "Status",
    field: "status",
    sortable: true,
    headerStyle: "font-weight: bold; font-size: 14px",
  },
  { name: "actions", align: "right", label: "" },
];

onMounted(() => {
  fetchUserData();
});

const onEditClose = () => {
  edit_opened.value = false;
  fetchUserData();
}

const onCreateClose = () => {
  create_opened.value = false;
  fetchUserData();
}

const fetchUserData = async () => {
  loading.value = true;
  await userStore.getUsers();
  loading.value = false;
};

// const gotoPage = (pagename) => {
//   router.push({ path: pagename });
// };

const openNewUserForm = () => {
  create_opened.value = true;
};

const onEdit = (ev) => {
  user.value.username = ev.username;
  user.value.role = ev.role;
  user.value.status = ev.status;
  user.value.email = ev.email;
  edit_opened.value = true;
//  alert(ev.username);
};

const onDelete = async (ev) => {
  if (await userStore.deleteUser(ev.username)) {
    alert('Delete user name: ' + ev.username + ' success!');
    fetchUserData();
  }
};
</script>

<template>
  <div class="q-pa-md">
    <q-dialog
      v-model="create_opened"
      class="column items-center justify-center"
      persistent
    >
      <create-account-form @cancel="onCreateClose()" />
    </q-dialog>
    <q-dialog
      v-model="edit_opened"
      class="column items-center justify-center"
      persistent
    >
      <edit-account-form :username="user.username" :role="user.role" :email="user.email" :status="user.status" @cancel="onEditClose()" @close="onEditClose()" />
    </q-dialog>    
    <q-table
      flat
      bordered
      title="รายการข้อมูลผู้ใช้ระบบ"
      title-class="text-grey-10"
      :rows="userStore.listusers"
      :columns="columns"
      color="primary"
      table-header-class="text-grey-9 bg-grey-2"
      row-key="name"
      :loading="loading"
    >
      <template v-slot:top-left>
        <q-icon name="people" style="font-size: 30px; margin-left: 5px" />
        <div style="font-size: 18px; margin-left: 5px">
          รายการข้อมูลผู้ใช้ระบบ
        </div>
      </template>
      <!-- Add button slot -->
      <template v-slot:top-right>
        <q-btn
          @click="openNewUserForm()"
          icon="add_circle"
          size="14px"
          color="primary"
          label="Add"
        >
        </q-btn>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="mode_edit" @click="onEdit(props.row)"></q-btn>
          <q-btn icon="delete" @click="onDelete(props.row)"></q-btn>
        </q-td>
      </template>
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>
  </div>
</template>
