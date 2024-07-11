<template>
    <div class="q-pa-md">
        <q-layout view="lHh lpr lFf" container class="window-height shadow-2 rounded-borders">
            <q-header elevated class="bg-blue-6">
                <q-toolbar>
                    <q-btn flat round dense icon="storage" class="q-mr-sm" />
                    <q-toolbar-title>บันทึกข้อมูลกรรมการและที่ปรึกษา</q-toolbar-title>
                    <q-space />
                    <div class="q-pl-sm toolbar-input-btn row no-wrap">
                        <q-input dense v-model="searchedcommitteeName" placeholder="Search name" class="bg-white col" />
                        <!-- <q-btn color="grey-3" text-color="grey-8" icon="search" unelevated /> -->
                        <q-btn flat round dense icon="search" class="q-mr-xs" />
                    </div>
                    <!-- <q-btn flat round dense icon="search" class="q-mr-xs" /> -->
                    <q-btn flat round dense icon="group_remove" />
                </q-toolbar>
            </q-header>

            <q-page-container>
                <q-page class="q-pa-md">
                    <q-form @submit="onSubmitForm" class="q-col-gutter-md">
                        <q-option-group v-model="panel" inline :options="[
                            { label: '1.ข้อมูลส่วนตัว', value: 'tab1' },
                            { label: '2.ประวัติการศึกษา', value: 'tab2' },
                            { label: '3.ประสบการณ์ในการทำงาน', value: 'tab3' },
                            { label: '4.ความสามารถพิเศษ', value: 'tab4' }
                        ]" style="padding-bottom: 10px" />
                        <q-tab-panels v-model="panel" animated class="rounded-borders" style="padding-top: 0px;">
                            <q-tab-panel name="tab1">
                                <q-card class="flat no-shadow no-border" style="padding: 10px;">
                                    <div class="row q-col-gutter-md">
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.clubid" label="รหัสชมรม" readonly />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="searchedclubName" label="ชื่อชมรม/สมาคม" hint="โปรดระบุชื่อชมรม/สมาคม">
                                                <template v-slot:append>
                                                    <q-icon name="search" @click="fetchClubName" />
                                                    <q-menu touch-position transition-show="scale"
                                                        transition-hide="scale" class="my-popup-width">
                                                        <q-list class="my-popup-width">
                                                            <q-item clickable v-close-popup
                                                                v-for="item in clubname" :key="item"
                                                                @click="onSelectClub(item)">
                                                                <q-item-section v-for="(value, key) in item" :key="key">
                                                                    {{ value }}
                                                                    <q-separator />
                                                                </q-item-section>
                                                            </q-item>
                                                        </q-list>
                                                    </q-menu>
                                                </template>
                                            </q-input>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-select label="ตำแหน่งในชมรม" v-model="committeeRecord.reponsibility"
                                                transition-show="scale" transition-hide="scale" filled
                                                :options="propertiesStore.ResponseType"
                                                style="width: auto; padding-top: 2px;" />
                                            <!-- <q-input v-model="committeeRecord.reponsibility" label="ตำแหน่งในชมรม" readonly /> -->
                                        </div>
                                    </div>

                                    <div class="text-h6" style="padding-top: 10px">ข้อมูลส่วนส่วนตัว</div>
                                    <div class="row q-col-gutter-md">
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.name" label="ชื่อ" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.surname" label="นามสกุล" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.occupation" label="ประกอบอาชีพ" />
                                        </div>
                                    </div>
                                    <div class="row q-col-gutter-md">
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.nationality" label="สัญชาติ" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.ethnicity" label="เชื่อชาติ" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.religion" label="ศาสนา" />
                                        </div>
                                    </div>
                                    <div class="row q-col-gutter-md">
                                        <div class="col-12 col-md-4">
                                            <q-select label="สถานภาพ" v-model="committeeRecord.personalstatus"
                                                transition-show="scale" transition-hide="scale" filled
                                                :options="propertiesStore.PersonalStatus"
                                                style="width: auto; padding-top: 15px;" />
                                            <!-- <q-input v-model="committeeRecord.personalstatus" label="สถานภาพ" /> -->
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.birthdate" label="วันเกิด"
                                                mask="####-##-##" hint="Mask: YYYY-MM-DD">
                                                <template v-slot:append>
                                                    <q-icon name="event" class="cursor-pointer">
                                                        <q-popup-proxy cover transition-show="scale"
                                                            transition-hide="scale">
                                                            <q-date v-model="committeeRecord.birthdate"
                                                                mask="YYYY-MM-DD" />
                                                        </q-popup-proxy>
                                                    </q-icon>
                                                </template>
                                            </q-input>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.phoneno" label="เบอร์โทรศัพท์" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.email" label="Email" />
                                        </div>
                                    </div>
                                    <div class="text-h6" style="padding-top: 10px">ข้อมูลบัตรประชาชน</div>
                                    <div class="row q-col-gutter-md">
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.licenseno" label="หมายเลขบัตรประชาชน"
                                                :rules="[
                                                    (val) =>
                                                        (val && propertiesStore.checkThaiID(val)) || 'หมายเลขบัตรประชาชนไม่ถูกต้อง',
                                                ]" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.licensecardissuedplace"
                                                label="ออกให้ ณ" />
                                        </div>
                                    </div>
                                    <div class="row q-col-gutter-md">
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.licensecardissueddate"
                                                label="วันที่ออกบัตร" mask="####-##-##" hint="Mask: YYYY-MM-DD">
                                                <template v-slot:append>
                                                    <q-icon name="event" class="cursor-pointer">
                                                        <q-popup-proxy cover transition-show="scale"
                                                            transition-hide="scale">
                                                            <q-date v-model="committeeRecord.licensecardissueddate"
                                                                mask="YYYY-MM-DD" />
                                                        </q-popup-proxy>
                                                    </q-icon>
                                                </template>
                                            </q-input>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.licensecardexpireddate" label="วันหมตอายุ"
                                                mask="####-##-##" hint="Mask: YYYY-MM-DD" :rules="[
                                                    (val) =>
                                                        (val && committeeRecord.licensecardexpireddate > committeeRecord.licensecardissueddate) || 'วันที่หมดอายุน้อยกว่าวันออกบัตร!',
                                                ]">
                                                <template v-slot:append>
                                                    <q-icon name="event" class="cursor-pointer">
                                                        <q-popup-proxy cover transition-show="scale"
                                                            transition-hide="scale">
                                                            <q-date v-model="committeeRecord.licensecardexpireddate"
                                                                mask="YYYY-MM-DD" />
                                                        </q-popup-proxy>
                                                    </q-icon>
                                                </template>
                                            </q-input>
                                        </div>
                                    </div>
                                    <div class="text-h6" style="padding-top: 10px">ที่อยู่</div>
                                    <div class="row q-col-gutter-md">
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.homeno" label="บ้านเลขที่" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.moo" label="หมู่ที่" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.tambon" label="ตำบล/แขวง" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.district" label="อำเภอ/เขต" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.province" label="จังหวัด" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.zipcode" label="รหัสไปรษณีย์"
                                                mask="#####">
                                                <template v-slot:append>
                                                    <q-icon name="search" @click="fetchAddresses(1)" />
                                                    <q-menu touch-position transition-show="scale"
                                                        transition-hide="scale">
                                                        <q-list class="my-popup-width">
                                                            <q-item clickable v-close-popup
                                                                v-for="item in addresses.message" :key="item"
                                                                @click="onSelectAddress(1, item)">
                                                                <q-item-section v-for="(value, key) in item" :key="key">
                                                                    {{ value }}
                                                                    <q-separator />
                                                                </q-item-section>
                                                            </q-item>
                                                        </q-list>
                                                    </q-menu>
                                                </template>
                                            </q-input>
                                        </div>
                                    </div>
                                    <div class="text-h6" style="padding-top: 10px">สถานที่ติดต่อได้สะดวก</div>
                                    <q-checkbox v-model="useCurrentAddressToContact" @click="onCheckAlternativeAddress"
                                        label="ใช้ที่อยู่เดียวกันกับที่อยู่ด้านบน" />
                                    <div class="row q-col-gutter-md">
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.alternativehomeno" label="บ้านเลขที่" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.alternativemoo" label="หมู่ที่" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.alternativetambon" label="ตำบล/แขวง" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.alternativedistrict" label="อำเภอ/เขต" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.alternativeprovince" label="จังหวัด" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.alternativezipcode" label="รหัสไปรษณีย์"
                                                mask="#####">
                                                <template v-slot:append>
                                                    <q-icon name="search" @click="fetchAddresses(2)" />
                                                    <q-menu touch-position transition-show="scale"
                                                        transition-hide="scale">
                                                        <q-list class="my-popup-width">
                                                            <q-item clickable v-close-popup
                                                                v-for="item in addresses.message" :key="item"
                                                                @click="onSelectAddress(2, item)">
                                                                <q-item-section v-for="(value, key) in item" :key="key">
                                                                    {{ value }}
                                                                    <q-separator />
                                                                </q-item-section>
                                                            </q-item>
                                                        </q-list>
                                                    </q-menu>
                                                </template>
                                            </q-input>
                                        </div>
                                    </div>
                                    <div class="text-h6" style="padding-top: 10px">ข้อมูลบิดา/มารดา</div>
                                    <div class="row q-col-gutter-md">
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.fathername" label="ชื่อบิดา" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.fatheroccupation" label="อาชีพ" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.fatherage" label="อายุ(ปี)" mask="###" />
                                        </div>
                                    </div>
                                    <div class="row q-col-gutter-md">
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.mothername" label="ชื่อมารดา" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.motheroccupation" label="อาชีพ" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.motherage" label="อายุ(ปี)" mask="###" />
                                        </div>
                                    </div>
                                    <div class="text-h6" style="padding-top: 10px">ข้อมูลเกี่ยวกับความพิการ</div>
                                    <div class="row q-col-gutter-md">
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.disabilitycardno"
                                                label="เลขที่บัตรประจำตัวผู้พิการ (ถ้ามี)" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input v-model="committeeRecord.disabledpersonnameincare"
                                                label="เป็นผู้ดูแลคนพิการ ชื่อ/สกุล" />
                                        </div>
                                    </div>
                                    <!-- </q-form> -->
                                </q-card>
                            </q-tab-panel>
                            <q-tab-panel name="tab2">
                                <q-toolbar>
                                    <q-toolbar-title>ข้อมูลประวัติการศึกษา</q-toolbar-title>
                                    <q-btn flat round icon="add" class="q-mr-xs bg-grey-4" @click="addEducation" />
                                </q-toolbar>
                                <q-table flat bordered title-class="text-grey-10" :rows="educationList"
                                    :columns="eduColumns" color="primary" table-header-class="text-grey-9 bg-grey-2"
                                    row-key="educationlevel" :loading="loading">

                                    <template v-slot:body-cell-actions="props">
                                        <q-td :props="props">
                                            <q-btn flat round class="text-red" icon="delete"
                                                @click="removeEducation(props.row)"></q-btn>
                                        </q-td>
                                    </template>
                                    <template v-slot:loading>
                                        <q-inner-loading showing color="primary" />
                                    </template>
                                </q-table>

                            </q-tab-panel>
                            <q-tab-panel name="tab3">
                                <q-toolbar>
                                    <q-toolbar-title>ประสบการณ์ในการทำงาน</q-toolbar-title>
                                    <q-btn flat round icon="add" class="q-mr-xs bg-grey-4" @click="addExperience" />
                                </q-toolbar>

                                <q-table flat bordered title-class="text-grey-10" :rows="experienceList"
                                    :columns="expColumns" color="primary" table-header-class="text-grey-9 bg-grey-2"
                                    row-key="name" :loading="loading">

                                    <template v-slot:body-cell-actions="props">
                                        <q-td :props="props">
                                            <q-btn flat round class="text-red" icon="delete"
                                                @click="removeExperience(props.row)"></q-btn>
                                        </q-td>
                                    </template>
                                    <template v-slot:loading>
                                        <q-inner-loading showing color="primary" />
                                    </template>
                                </q-table>
                            </q-tab-panel>
                            <q-tab-panel name="tab4">
                                <q-toolbar>
                                    <q-toolbar-title>ความสามารถพิเศษ</q-toolbar-title>
                                    <q-btn flat round icon="add" class="q-mr-xs bg-grey-4" @click="addTalent" />
                                </q-toolbar>

                                <q-table flat bordered title-class="text-grey-10" :rows="talentList"
                                    :columns="talentColumns" color="primary" table-header-class="text-grey-9 bg-grey-2"
                                    row-key="name" :loading="loading">
                                    <template v-slot:body-cell-actions="props">
                                        <q-td :props="props">
                                            <q-btn flat round class="text-red" icon="delete"
                                                @click="removeTalent(props.row)"></q-btn>
                                        </q-td>
                                    </template>
                                    <template v-slot:loading>
                                        <q-inner-loading showing color="primary" />
                                    </template>
                                </q-table>
                            </q-tab-panel>
                        </q-tab-panels>
                    </q-form>
                </q-page>
            </q-page-container>
        </q-layout>
        <q-dialog v-model="eduDialog" persistent>
            <q-card style="width: 400px">
                <q-card-section>
                    <q-select label="ระดับการศึกษา" v-model="newEducation.educationlevel" transition-show="scale"
                        transition-hide="scale" filled :options="propertiesStore.EducationLevels"
                        style="width: 350px" />

                    <q-input v-model="newEducation.major" label="สาขา" />
                    <q-input v-model="newEducation.graduatedyear" label="ปีที่จบการศึกษา (พ.ศ.)" />
                    <q-input v-model="newEducation.institute" label="สถาบันการศึกษา" />
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Save" color="primary" @click="saveEducation" />
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="expDialog" persistent>
            <q-card style="width: 350px">
                <q-card-section>
                    <q-input v-model="newExperience.responsibility" label="ตำแหน่ง/หน้าที่รับผิดชอบ" />
                    <q-input v-model="newExperience.organization" label="สถานที่ทำงาน" />
                    <q-input v-model="newExperience.duration" label="ระยะเวลา(ปี)" />
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Save" color="primary" @click="saveExperience" />
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="talentDialog" persistent>
            <q-card style="width: 400px">
                <q-card-section>
                    <q-input v-model="newTalent.description" label="รายละเอียดความสามารถพิเศษ" />
                </q-card-section>
                <q-card-section>
                    <q-select label="ระดับความสามารถ" v-model="newTalent.talentlevel" transition-show="scale"
                        transition-hide="scale" filled :options="propertiesStore.TalentLevel" style="width: 350px" />
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Save" color="primary" @click="saveTalent" />
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { usePropertiesStore } from 'src/stores/properties';
import { useClubStore } from 'src/stores/clubs';
import axios from 'axios';

const propertiesStore = usePropertiesStore();
const clubStore = useClubStore();
const $q = useQuasar();
const useCurrentAddressToContact = ref(false)
const eduDialog = ref(false)
const expDialog = ref(false)
const talentDialog = ref(false)
const searchedclubName = ref('')
const searchedcommitteeName = ref('')
const newEducation = ref({ educationlevel: '', major: '', graduatedyear: '', institute: '' });
const newExperience = ref({ responsibility: '', duration: '', organization: '' });
const newTalent = ref({ talentlevel: '', description: '' });
const educationList = ref([])
const experienceList = ref([])
const talentList = ref([])
const addresses = ref([])
const clubname = ref([])
const panel = ref('tab1')
const committeeRecord = ref({
    committeeid: '',
    clubid: '',
    name: '',
    surname: '',
    nationality: 'ไทย',
    ethnicity: 'ไทย',
    personalstatus: '',
    birthdate: '',
    licenseno: '',
    licensecardissueddate: '',
    licensecardexpireddate: '',
    licensecardissuedplace: '',
    phoneno: '',
    email: '',
    faxno: '',
    fathername: '',
    mothername: '',
    disabilitycardno: '',
    relatedmemberid: '',
    fatheroccupation: '',
    motheroccupation: '',
    reponsibility: '',
    religion: 'พุทธ',
    fatherage: '',
    motherage: '',
    homeno: '',
    moo: '',
    tambon: '',
    district: '',
    province: '',
    zipcode: '',
    alternativehomeno: '',
    alternativemoo: '',
    alternativetambon: '',
    alternativedistrict: '',
    alternativeprovince: '',
    alternativezipcode: '',
    disabledpersonnameincare: '',
    occupation: '',
    educations: [],
    experiences: [],
    talents: []
})
const eduColumns = [
    {
        name: "educationlevel",
        align: "center",
        label: "ระดับการศึกษา",
        field: "educationlevel",
        sortable: true,
        headerStyle: "font-weight: bold; font-size: 14px",
    },
    {
        name: "major",
        align: "left",
        label: "สาขา",
        field: "major",
        sortable: true,
        headerStyle: "font-weight: bold; font-size: 14px",
    },
    {
        name: "graduatedyear",
        align: "left",
        label: "ปีที่จบการศึกษา",
        field: "graduatedyear",
        sortable: true,
        headerStyle: "font-weight: bold; font-size: 14px",
    },
    {
        name: "institute",
        align: "left",
        label: "สถาบันการศึกษา",
        field: "institute",
        sortable: true,
        headerStyle: "font-weight: bold; font-size: 14px",
    },
    { name: "actions", align: "right", label: "" }
]
const expColumns = [
    {
        name: "responsibility",
        align: "center",
        label: "ตำแหน่ง/หน้าที่ความรับผิดชอบ",
        field: "responsibility",
        sortable: true,
        headerStyle: "font-weight: bold; font-size: 14px",
    },
    {
        name: "organization",
        align: "center",
        label: "หน่วยงาน",
        field: "organization",
        sortable: true,
        headerStyle: "font-weight: bold; font-size: 14px",
    },
    {
        name: "duration",
        align: "center",
        label: "ระยะเวลา(ปี)",
        field: "duration",
        sortable: true,
        headerStyle: "font-weight: bold; font-size: 14px",
    },
    { name: "actions", align: "right", label: "" }
]
const talentColumns = [
    {
        name: "description",
        align: "center",
        label: "รายละเอียดความสามารถพิเศษ",
        field: "description",
        sortable: true,
        headerStyle: "font-weight: bold; font-size: 14px",
    },
    {
        name: "talentlevel",
        align: "center",
        label: "ระดับความสามารถ",
        field: "talentlevel",
        sortable: true,
        headerStyle: "font-weight: bold; font-size: 14px",
    },
    { name: "actions", align: "right", label: "" }
]

const addEducation = async () => {
    eduDialog.value = true;
}
const addExperience = async () => {
    expDialog.value = true;
}
const addTalent = async () => {
    talentDialog.value = true;
}
const saveEducation = async () => {
    educationList.value.push({ ...newEducation.value });
    eduDialog.value = false;
    newEducation.value = { educationlevel: '', major: '', graduatedyear: '', institute: '' };
}
const saveExperience = async () => {
    experienceList.value.push({ ...newExperience.value });
    expDialog.value = false;
    newExperience.value = { responsibility: '', duration: '', organization: '' };
}
const saveTalent = async () => {
    talentList.value.push({ ...newTalent.value });
    talentDialog.value = false;
    newTalent.value = { talentlevel: '', description: '' };
}
const removeEducation = async (edu) => {
    educationList.value = educationList.value.filter((ed) => ed.educationlevel !== edu.educationlevel);
}
const removeExperience = async (exp) => {
    experienceList.value = experienceList.value.filter((ex) => ex.organization !== exp.organization);
}
const removeTalent = async (tal) => {
    talentList.value = talentList.value.filter((t) => t.description !== tal.description);
}
const onCheckAlternativeAddress = (isChecked) => {
    if (useCurrentAddressToContact.value == true) {
        committeeRecord.value.alternativemoo = committeeRecord.value.moo;
        committeeRecord.value.alternativehomeno = committeeRecord.value.homeno;
        committeeRecord.value.alternativetambon = committeeRecord.value.tambon;
        committeeRecord.value.alternativedistrict = committeeRecord.value.district;
        committeeRecord.value.alternativeprovince = committeeRecord.value.province;
        committeeRecord.value.alternativezipcode = committeeRecord.value.zipcode;
    } else {
        committeeRecord.value.alternativemoo = '';
        committeeRecord.value.alternativehomeno = '';
        committeeRecord.value.alternativetambon = '';
        committeeRecord.value.alternativedistrict = '';
        committeeRecord.value.alternativeprovince = '';
        committeeRecord.value.alternativezipcode = '';
    }
}
const fetchClubName = async () => {
    try {
        const response = await clubStore.getClubByName(searchedclubName.value);
        clubname.value = clubStore.listclubname;
//        console.log('club name:', clubname.value)
    } catch (err) {
        clubname.value = []
        alert(err)
    }
}
const onSelectClub = (clubinfo) => {
    committeeRecord.value.clubid = clubinfo.clubid
    searchedclubName.value = clubinfo.clubname
}

const fetchAddresses = async (addrno) => {
    let findzipcode;
    if (addrno == 1) findzipcode = committeeRecord.value.zipcode
    else findzipcode = committeeRecord.value.alternativezipcode

    try {
        const response = await axios.get(`${propertiesStore.ApiServer}/${propertiesStore.ApiVersion}/locations/${findzipcode}`);
        addresses.value = response.data;
    } catch (err) {
        addresses.value = []
        alert(err)
    }
};
const onSelectAddress = (addrno, address) => {
    //console.log(address)
    if (addrno == 1) {
        committeeRecord.value.tambon = address.TambonThai;
        committeeRecord.value.province = address.ProvinceThai;
        committeeRecord.value.district = address.DistrictThai;
        if (useCurrentAddressToContact.value == true) {
            committeeRecord.value.alternativemoo = committeeRecord.value.moo;
            committeeRecord.value.alternativehomeno = committeeRecord.value.homeno;
            committeeRecord.value.alternativetambon = committeeRecord.value.tambon;
            committeeRecord.value.alternativedistrict = committeeRecord.value.district;
            committeeRecord.value.alternativeprovince = committeeRecord.value.province;
            committeeRecord.value.alternativezipcode = committeeRecord.value.zipcode;
        }
    } else {
        committeeRecord.value.alternativetambon = address.TambonThai;
        committeeRecord.value.alternativeprovince = address.ProvinceThai;
        committeeRecord.value.alternativedistrict = address.DistrictThai;
    }
};
const onSubmitForm = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + accountStore.user.token)
}

</script>

<style lang="sass">
.my-popup-width 
    width: 400px

.toolbar-input-btn
    border-radius: 10
    border-style: solid
    border-width: 0px 0px 0px 0
    border-color: rgba(0,0,0,.24)
    max-width: 300px
    width: 100%
    padding: 1px
</style>