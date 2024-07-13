<template>
    <div class="q-pa-md">
        <div class="q-gutter-md row items-start">
            <q-card class="edit-form-card">
                <q-card-section class="bg-grey-4 q-pa-md">
                    <div class="text-h6">แก้ไขข้อมูลชมรม</div>
                </q-card-section>
                <q-separator inset />
                <q-form @submit="onSubmitForm" class="q-gutter-y-md">
                    <q-card-section class="row q-gutter-md">
                        <q-input v-model="formClub.clubname" label="ชื่อชมรม" :rules="[
                            (val) => (val && val.length > 0) || 'Name must be filled in.',
                        ]" />
                        <q-input v-model="formClub.clubfoundingdate" label="วันที่ก่อตั้งชมรม" mask="####-##-##"
                        hint="Mask: YYYY-MM-DD" style="width: auto">
                            <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                        <q-date v-model="formClub.clubfoundingdate" mask="YYYY-MM-DD" />
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                        <q-input v-model="formClub.phoneno" label="เบอร์โทรศัพท์" />
                        <q-input v-model="formClub.clubpresidentid" label="ประธานชมรม">
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                        </q-input>
                    </q-card-section>
                    <div class="q-pl-md text-h6">สถานที่ตั้งชมรม</div>
                    <q-card-section class="row q-gutter-md">
                        <q-input v-model="formClub.homeno" label="เลขที่" :rules="[
                            (val) => (val && val.length > 0) || 'Homeno must be filled in.',
                        ]" />
                        <q-input v-model="formClub.moo" label="หมู่ที่" :rules="[
                            (val) => (val && val.length > 0) || 'Moo must be filled in.',
                        ]" />
                        <div class="column">
                            <q-input v-model="formClub.zipcode" label="รหัสไปรษณีย์" mask="#####"
                            hint="Mask: #####" :rules="[
                                (val) => (val && val.length > 0) || 'Zipcode must be filled in.',
                            ]">
                                <template v-slot:append>
                                    <q-icon name="search" @click="fetchAddresses" />
                                    <q-menu touch-position transition-show="scale" transition-hide="scale">
                                        <q-list class="my-popup-width">
                                            <q-item clickable v-close-popup v-for="item in addresses.message"
                                                :key="item" @click="onSelectAddress(item)">
                                                <q-item-section v-for="(value, key) in item" :key="key">
                                                    {{ value }}
                                                    <q-separator />
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                    </q-menu>
                                </template>
                            </q-input>
                            <q-input v-model="formClub.tambon" label="ตำบล" />
                            <q-input v-model="formClub.district" label="อำเภอ" />
                            <q-input v-model="formClub.province" label="จังหวัด" />
                        </div>
                    </q-card-section>
                    <q-card-actions align="right" style="padding-right: 15px;">
                        <q-btn icon="check_circle" color="primary" type="submit">Update</q-btn>
                        <q-btn icon="cancel" @click="$emit('cancel')">Cancel</q-btn>
                    </q-card-actions>
                </q-form>
            </q-card>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAccountStore } from "../stores/account";
import { usePropertiesStore } from "../stores/properties";
import { useQuasar } from "quasar";
import axios from "axios";

const addresses = ref([]);
const props = defineProps(['clubid', 'clubname', 'clubfoundingdate', 'homeno', 'moo', 'tambon', 'district', 'province', 'phoneno', 'zipcode', 'clubpresidentid'])
const emit = defineEmits(['close'])
const q = useQuasar();
const accountStore = useAccountStore();
const propertiesStore = usePropertiesStore();
const formClub = ref({
    clubid: '',
    clubname: '',
    homeno: '',
    moo: '',
    tambon: '',
    district: '',
    province: '',
    zipcode: '',
    phoneno: '',
    clubfoundingdate: '',
    clubpresidentid: ''
});

onMounted(() => {
    console.log('zipcode=', props.zipcode)
    console.log('clubname=', props.clubname)
    formClub.value.clubid = props.clubid
    formClub.value.clubname = props.clubname
    formClub.value.homeno = props.homeno
    formClub.value.moo = props.moo
    formClub.value.tambon = props.tambon
    formClub.value.district = props.district
    formClub.value.province = props.province
    formClub.value.phoneno = props.phoneno
    formClub.value.zipcode = props.zipcode
    formClub.value.clubfoundingdate = formatDate(props.clubfoundingdate)
    formClub.value.clubpresidentid = props.clubpresidentid
    console.log(formClub)
});

const showNotify = (msg) => {
    q.notify({
        type: "info",
        color: "primary",
        textColor: 'white',
        message: msg,
        position: 'top-right'
    });
}

const formatDate = (dateString) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
const onCancel = () => {}
const currentDate = () => {
    let ts = Date.now();
    let date_time = new Date(ts);
    let year = date_time.getFullYear();
    let month = String(date_time.getMonth() + 1).padStart(2, '0');
    let date = String(date_time.getDate()).padStart(2, '0');

    return `${year}-${month}-${date}`;
}

const fetchAddresses = async () => {
    const response = await axios.get(`${propertiesStore.ApiServer}/${propertiesStore.ApiVersion}/locations/${formClub.value.zipcode}`);
    addresses.value = response.data;
};
const onSelectAddress = (address) => {
    //console.log(address)
    formClub.value.tambon = address.TambonThai;
    formClub.value.province = address.ProvinceThai;
    formClub.value.district = address.DistrictThai;
};

const onSubmitForm = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
//    myHeaders.append("Authorization", "Bearer " + accountStore.user.token)
    // console.log("Date: ", formClub.value.clubfoundingdate)
    var body = JSON.stringify({
        "clubid": formClub.value.clubid,
        "clubname": formClub.value.clubname,
        "clubfoundingdate": (formClub.value.clubfoundingdate == "" ? currentDate() : formClub.value.clubfoundingdate),
        "homeno": formClub.value.homeno,
        "moo": formClub.value.moo,
        "tambon": formClub.value.tambon,
        "district": formClub.value.district,
        "province": formClub.value.province,
        "phoneno": formClub.value.phoneno,
        "zipcode": formClub.value.zipcode,
        "clubpresidentid": formClub.value.clubpresidentid
    });
    var requestOptions = {
        method: 'PUT',
        credentials: 'include',
        headers: myHeaders,
        body: body,
        redirect: 'follow'
    };

    fetch(`${propertiesStore.ApiServer}/${propertiesStore.ApiVersion}/clubs`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("Server Status: " + response.status);
            }
            return response.json()
        })
        .then(result => {
            //            console.log(result)
            if (result.message == 'ok') {
                showNotify('แก้ไขข้อมูลชมรม ' + formClub.value.clubname + ' สำเร็จเรียบร้อย');
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
.edit-form-card {
    width: 640px;
    padding-bottom: 5px;
}

.my-popup-width {
    min-width: 300px !important;
}
</style>