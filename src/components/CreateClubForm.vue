<template>
    <div class="q-pa-md">
        <div class="q-gutter-md row items-start">
            <q-card class="create-form-card">
                <q-card-section class="bg-primary text-grey-2 q-pa-md">
                    <div class="text-h6">เพิ่มเติมข้อมูลชมรม</div>
                </q-card-section>
                <q-separator inset />
                <q-form @submit="onSubmitForm" class="q-gutter-y-md">
                    <q-card-section class="row q-gutter-md">
                        <q-input v-model="formClub.clubname" label="ชื่อชมรม" :rules="[
                            (val) => (val && val.length > 0) || 'Name must be filled in.',
                        ]" />
                        <q-input v-model="formClub.clubfoundingdate" label="วันที่ก่อตั้งชมรม" mask="####-##-##"
                            hint="Mask: YYYY-MM-DD">
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
                        <q-btn icon="check_circle" color="primary" type="submit">Submit</q-btn>
                        <q-btn icon="cancel" @click="$emit('cancel')">Cancel</q-btn>
                    </q-card-actions>
                </q-form>

            </q-card>
        </div>
    </div>

</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAccountStore } from "src/stores/account";
import { usePropertiesStore } from "src/stores/properties";
import { useQuasar } from "quasar";

import axios from 'axios';
const addresses = ref([]);

const q = useQuasar();
const accountStore = useAccountStore();
const propertiesStore = usePropertiesStore();
const formClub = ref({
    clubname: '',
    homeno: '',
    moo: '',
    tambon: '',
    district: '',
    province: '',
    zipcode: '',
    phoneno: '',
    faxno: '',
    clubfoundingdate: '',
    clubpresidentid: ''
});

onMounted(()=>{
    formClub.value.clubfoundingdate = currentDate();
})

const showNotify = (msg) => {
    q.notify({
        type: "info",
        color: "primary",
        textColor: 'white',
        message: msg,
        position: 'top-right'
    });
}

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
const onCancel = () => {}
const onSubmitForm = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + accountStore.user.token)
    // console.log("Date: ", formClub.value.clubfoundingdate)
    var body = JSON.stringify({
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
        method: 'POST',
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
            console.log(result)
            if (result.message == 'ok') {
                showNotify('เพิ่มเติมข้อมูลชมรมชื่อ ' + formClub.value.clubname + ' สำเร็จเรียบร้อย');
            }
        })
        .catch(err => {
            console.log(err)
            alert(err)
        });
}

</script>

<style lang="scss">
.create-form-card {
    width: 640px;
    padding-bottom: 5px;
}

.my-popup-width {
    min-width: 300px !important;
}
</style>