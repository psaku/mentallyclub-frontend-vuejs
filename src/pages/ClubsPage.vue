<script setup>
import { useAccountStore } from "../stores/account";
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useClubStore } from "../stores/clubs";
import CreateClubForm from "../components/CreateClubForm.vue";
import EditClubForm from "../components/EditClubForm.vue";

const accountStore = useAccountStore();
const clubStore = useClubStore();
const q = useQuasar();

const loading = ref(false);
const create_opened = ref(false);
const edit_opened = ref(false);
const confirm_opened = ref(false);
const confirm_message = ref("Are you sure?");
const club_deleted = ref("");

const club = ref({
  clubid: "",
  clubname: "",
  homeno: "",
  moo: "",
  tambon: "",
  district: "",
  province: "",
  phoneno: "",
  zipcode: "",
  clubfoundingdate: "",
  clubpresidentid: ""
});

const visibleColumns = ref(['clubid','clubname','homeno','moo', 'tambon', 'district','province','phoneno','clubfoundingdate','zipcode','actions'])

const columns = [
  {
    name: "clubid",
    align: "center",
    label: "#id",
    field: "clubid",
    sortable: true,
    headerStyle: "font-weight: bold; font-size: 14px",
  },
  {
    name: "clubname",
    align: "left",
    label: "ชื่อชมรม",
    field: "clubname",
    sortable: true,
    headerStyle: "font-weight: bold; font-size: 14px",
  },
  {
    name: "homeno",
    align: "center",
    label: "เลขที่",
    field: "homeno",
    sortable: true,
    headerStyle: "font-weight: bold; font-size: 14px",
  },
  {
    name: "moo",
    align: "center",
    label: "หมู่ที่",
    field: "moo",
    sortable: true,
    headerStyle: "font-weight: bold; font-size: 14px",
  },
  {
    name: "tambon",
    align: "center",
    label: "ตำบล",
    field: "tambon",
    sortable: true,
    headerStyle: "font-weight: bold; font-size: 14px",
  },
  {
    name: "district",
    align: "center",
    label: "อำเภอ",
    field: "district",
    sortable: true,
    headerStyle: "font-weight: bold; font-size: 14px",
  },
  {
    name: "province",
    align: "center",
    label: "จังหวัด",
    field: "province",
    sortable: true,
    headerStyle: "font-weight: bold; font-size: 14px",
  },
  {
    name: "zipcode",
    align: "center",
    label: "รหัสไปรษณีย์",
    field: "zipcode",
    sortable: true,
    headerStyle: "font-weight: bold; font-size: 14px",
  },
  {
    name: "phoneno",
    align: "left",
    label: "เบอร์โทรศัพท์",
    field: "phoneno",
    sortable: true,
    headerStyle: "font-weight: bold; font-size: 14px",
  },
  {
    name: "clubfoundingdate",
    align: "left",
    label: "วันที่ก่อตั้ง",
    field: "clubfoundingdate",
    sortable: true,
    headerStyle: "font-weight: bold; font-size: 14px",
  },
  {
    name: "clubpresidentid",
    align: "left",
    label: "ประธานชมรม",
    field: "clubpresidentid",
    sortable: true,
    headerStyle: "font-weight: bold; font-size: 14px",
  },
  { name: "actions", align: "right", label: "" },
];

const showNotify = (msg) => {
  q.notify({
    type: "info",
    color: 'purple',
    textColor: 'white',
    message: msg,
    position: 'top-right'
  });
};
onMounted(() => {
  fetchClubData();
  console.log(clubStore.listclubs)
});

const onEditClose = () => {
  edit_opened.value = false;
  fetchClubData();
};

const onCreateClose = () => {
  create_opened.value = false;
  fetchClubData();
};

const fetchClubData = async () => {
  loading.value = true;
  await clubStore.getClubs();
  loading.value = false;
};

const openNewClubForm = () => {
  create_opened.value = true;
};

const onEdit = (ev) => {
  console.log(ev)
  club.value.clubid = ev.clubid;
  club.value.clubname = ev.clubname;
  club.value.clubfoundingdate = ev.clubfoundingdate;
  club.value.homeno = ev.homeno;
  club.value.moo = ev.moo;
  club.value.tambon = ev.tambon;
  club.value.district = ev.district;
  club.value.province = ev.province;
  club.value.phoneno = ev.phoneno;
  club.value.zipcode = ev.zipcode;
  club.value.clubpresidentid = ev.clubpresidentid;
  edit_opened.value = true;
};

const showConfirm = (msg) => {
  confirm_message.value = msg;
  confirm_opened.value = true;
};

const onConfirm = async (confirm) => {
  if (confirm) {
    if (await clubStore.deleteClub(club_deleted.value)) {
      showNotify("Delete club id: " + club_deleted.value + " success!");
      fetchClubData();
    }
  }
  confirm_opened.value = false;
};

const onDelete = (ev) => {
  club_deleted.value = ev.clubid;
  showConfirm("คุณต้องการลบข้อมูลชมรมหมายเลข #" + ev.clubid + " ใช่หรือไม่ ?");
};
</script>

<template>
  <div class="q-pa-md">

    <q-dialog v-model="confirm_opened" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="check_circle" color="primary" text-color="white" />
          <span class="q-ml-sm">{{ confirm_message }}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="YES" color="primary" @click="onConfirm(true)" />
          <q-btn flat label="NO" color="primary" @click="onConfirm(false)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="create_opened" class="column items-center justify-center" persistent>
      <create-club-form @cancel="onCreateClose()" />
    </q-dialog>
    <q-dialog v-model="edit_opened" class="column items-center justify-center" persistent>
      <edit-club-form :clubid="club.clubid" :clubname="club.clubname" :homeno="club.homeno" :moo="club.moo"
        :tambon="club.tambon" :district="club.district" :province="club.province" :zipcode="club.zipcode"
        :phoneno="club.phoneno" :clubfoundingdate="club.clubfoundingdate" :clubpresidentid="club.clubpresidentid"
        @cancel="onEditClose()" @close="onEditClose()" />
    </q-dialog>
    <q-table flat bordered title="รายการข้อมูลชมรม" title-class="text-grey-10" :rows="clubStore.listclubs" :visible-columns="visibleColumns"
      :columns="columns" color="primary" table-header-class="text-grey-9 bg-grey-2" row-key="name" :loading="loading">
      <template v-slot:top-left>
        <q-icon name="house" style="font-size: 30px; margin-left: 5px" />
        <div style="font-size: 18px; margin-left: 5px">
          รายการข้อมูลชมรม
        </div>
      </template>
      <!-- Add button slot -->
      <template v-slot:top-right>
        <q-btn @click="openNewClubForm()" icon="add_circle" size="14px" color="primary" label="Add">
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
