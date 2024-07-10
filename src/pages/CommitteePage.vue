<template>
    <div class="q-pa-md">
        <q-layout view="lHh lpr lFf" container class="window-height shadow-2 rounded-borders">
            <q-header elevated class="bg-blue-6">
                <q-toolbar>
                    <q-btn flat round dense icon="storage" class="q-mr-sm" />
                    <q-toolbar-title>บันทึกข้อมูลกรรมการและที่ปรึกษา</q-toolbar-title>
                    <q-space />
                    <div class="q-pl-sm toolbar-input-btn row no-wrap">
                        <q-input dense v-model="search" placeholder="Search name" class="bg-white col" />
                        <!-- <q-btn color="grey-3" text-color="grey-8" icon="search" unelevated /> -->
                        <q-btn flat round dense icon="search" class="q-mr-xs" />
                    </div>
                    <!-- <q-btn flat round dense icon="search" class="q-mr-xs" /> -->
                    <q-btn flat round dense icon="group_remove" />
                </q-toolbar>
            </q-header>

            <q-page-container>
                <q-page class="q-pa-md">
                    <q-form class="q-col-gutter-md">
                        <q-option-group v-model="panel" inline :options="[
                            { label: '1.ข้อมูลส่วนตัว', value: 'tab1' },
                            { label: '2.ประวัติการศึกษา', value: 'tab2' },
                            { label: '3.ประสบการณ์ในการทำงาน', value: 'tab3' },
                            { label: '4.ความสามารถพิเศษ', value: 'tab4' }
                        ]" style="padding-bottom: 10px" />
                        <q-tab-panels v-model="panel" animated class="rounded-borders" style="padding-top: 0px;">

                            <q-tab-panel name="tab1">
                                <q-card class="flat no-shadow no-border" style="padding: 10px;">
                                    <!-- <q-form class="q-col-gutter-md"> -->
                                    <div class="col-12 col-md-4">
                                        <q-input label="ชื่อชมรม/สมาคม" hint="โปรดระบุชื่อชมรม/สมาคม">
                                            <template v-slot:append>
                                                <q-icon name="search" class="cursor-pointer">
                                                    <q-popup-proxy cover transition-show="scale"
                                                        transition-hide="scale">

                                                    </q-popup-proxy>
                                                </q-icon>
                                            </template>
                                        </q-input>

                                    </div>

                                    <div class="text-h6" style="padding-top: 10px">ข้อมูลส่วนส่วนตัว</div>
                                    <div class="row q-col-gutter-md">
                                        <div class="col-12 col-md-4">
                                            <q-input label="ชื่อ" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input label="นามสกุล" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input label="ตำแหน่ง" />
                                        </div>
                                    </div>
                                    <div class="row q-col-gutter-md">
                                        <div class="col-12 col-md-4">
                                            <q-input label="สัญชาติ" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input label="เชื่อชาติ" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input label="ศาสนา" />
                                        </div>
                                    </div>
                                    <div class="row q-col-gutter-md">
                                        <div class="col-12 col-md-4">
                                            <q-input label="สถานภาพ" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input label="วันเกิด" mask="####-##-##" hint="Mask: YYYY-MM-DD">
                                                <template v-slot:append>
                                                    <q-icon name="event" class="cursor-pointer">
                                                        <q-popup-proxy cover transition-show="scale"
                                                            transition-hide="scale">
                                                            <q-date mask="YYYY-MM-DD" />
                                                        </q-popup-proxy>
                                                    </q-icon>
                                                </template>
                                            </q-input>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input label="เบอร์โทรศัพท์" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input label="Email" />
                                        </div>
                                    </div>
                                    <div class="text-h6" style="padding-top: 10px">ข้อมูลบัตรประชาชน</div>
                                    <div class="row q-col-gutter-md">
                                        <div class="col-12 col-md-4">
                                            <q-input label="หมายเลขบัตรประชาชน" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input label="ออกให้ ณ" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input label="วันที่ออกบัตร" mask="####-##-##" hint="Mask: YYYY-MM-DD">
                                                <template v-slot:append>
                                                    <q-icon name="event" class="cursor-pointer">
                                                        <q-popup-proxy cover transition-show="scale"
                                                            transition-hide="scale">
                                                            <q-date mask="YYYY-MM-DD" />
                                                        </q-popup-proxy>
                                                    </q-icon>
                                                </template>
                                            </q-input>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input label="วันหมตอายุ" mask="####-##-##" hint="Mask: YYYY-MM-DD">
                                                <template v-slot:append>
                                                    <q-icon name="event" class="cursor-pointer">
                                                        <q-popup-proxy cover transition-show="scale"
                                                            transition-hide="scale">
                                                            <q-date mask="YYYY-MM-DD" />
                                                        </q-popup-proxy>
                                                    </q-icon>
                                                </template>
                                            </q-input>
                                        </div>
                                    </div>
                                    <div class="text-h6" style="padding-top: 10px">ที่อยู่</div>
                                    <div class="row q-col-gutter-md">
                                        <div class="col-12 col-md-4">
                                            <q-input label="บ้านเลขที่" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input label="หมู่ที่" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input label="ตำบล/แขวง" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input label="อำเภอ/เขต" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input label="จังหวัด" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input label="รหัสไปรษณีย์" />
                                        </div>
                                    </div>
                                    <div class="text-h6" style="padding-top: 10px">สถานที่ติดต่อได้สะดวก</div>
                                    <q-checkbox v-model="useCurrentAddressToContact"
                                        label="ใช้ที่อยู่เดียวกันกับที่อยู่ด้านบน" />
                                    <div class="row q-col-gutter-md">
                                        <div class="col-12 col-md-4">
                                            <q-input label="บ้านเลขที่" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input label="หมู่ที่" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input label="ตำบล/แขวง" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input label="อำเภอ/เขต" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input label="จังหวัด" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input label="รหัสไปรษณีย์" />
                                        </div>
                                    </div>
                                    <div class="text-h6" style="padding-top: 10px">ข้อมูลเกี่ยวกับความพิการ</div>
                                    <div class="row q-col-gutter-md">
                                        <div class="col-12 col-md-4">
                                            <q-input label="เลขที่บัตรประจำตัวผู้พิการ (ถ้ามี)" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <q-input label="เป็นผู้ดูแลคนพิการ ชื่อ/สกุล" />
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
                                            <q-btn flat round class="text-red" icon="delete" @click="removeEducation(props.row)"></q-btn>
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
                                            <q-btn flat round class="text-red" icon="delete" @click="removeExperience(props.row)"></q-btn>
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
                                            <q-btn flat round class="text-red" icon="delete" @click="removeTalent(props.row)"></q-btn>
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
                        transition-hide="scale" filled :options="propertiesStore.TalentLevel"
                        style="width: 350px" />
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
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import { usePropertiesStore } from 'src/stores/properties';

const propertiesStore = usePropertiesStore();
const $q = useQuasar();
const useCurrentAddressToContact = ref(false)
const eduDialog = ref(false)
const expDialog = ref(false)
const talentDialog = ref(false)
const newEducation = ref({ educationlevel: '', major: '', graduatedyear: '', institute: '' });
const newExperience = ref({ responsibility: '', duration: '', organization: '' });
const newTalent = ref({ talentlevel: '', description: '' });
const educationList = ref([])
const experienceList = ref([])
const talentList = ref([])
const panel = ref('tab1')
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
const addTalent = async ()=> {
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
const removeTalent= async (tal) => {
    talentList.value = talentList.value.filter((t) => t.description !== tal.description);
}

</script>

<style lang="sass">
.toolbar-input-btn
    border-radius: 10
    border-style: solid
    border-width: 0px 0px 0px 0
    border-color: rgba(0,0,0,.24)
    max-width: 300px
    width: 100%
    padding: 1px
</style>