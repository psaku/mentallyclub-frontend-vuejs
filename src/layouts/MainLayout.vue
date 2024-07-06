<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8">
      <q-toolbar class="GNL__toolbar">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="~assets/logo.png" />
          </q-avatar>
          สมาคมเพื่อผู้บกพร่องทางจิตแห่งประเทศไทย
        </q-toolbar-title>
        <q-space />
        <q-btn round flat>
          <q-avatar class="bg-grey-4" size="34px">
            <q-icon name="person" color="blue-9" />
            <!-- <img src="https://cdn.quasar.dev/img/boy-avatar.png"> -->
          </q-avatar>
          <!-- <span class="q-mr-xl q-ml-sm">{{ accountStore.user.username  }}</span>           -->
          <q-tooltip>Account</q-tooltip>
          <q-menu auto-close>
            <q-list dense style="min-width: 150px">
              <q-item clickable>
                <q-item-section>
                  <div>
                    <q-icon name="account_box" color="blue-9" size="18px" />
                    Your profile
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable @click="logout()">
                <q-item-section>
                  <div>
                    <q-icon name="logout" color="blue-9" size="18px" />
                    Logout
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <span class="q-mr-xl q-ml-sm" style="font-size: 16px;">{{ accountStore.user.username  }}</span>          

      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" behavior="desktop" bordered>
      <q-scroll-area class="fit">
        <q-list padding class="text-grey-8">
          <q-item class="GNL__drawer-item" v-ripple v-for="link in links1" :key="link.text" clickable
            v-show="link.role.toLowerCase().includes(accountStore.user.role.toLowerCase()) || link.role.toLowerCase() == 'all'">
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label @click="gotoPage(link.page)">{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator inset class="q-my-sm" />
          <q-item class="GNL__drawer-item" v-ripple v-for="link in logoutLink" :key="link.text" clickable
            v-show="link.role.toLowerCase().includes(accountStore.user.role.toLowerCase()) || link.role.toLowerCase() == 'all'">
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label @click="logout()">{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAccountStore } from "../stores/account";

const leftDrawerOpen = ref(false);
const accountStore = useAccountStore();
const router = useRouter();

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const gotoPage = (pagename) => {
  router.push({ path: pagename });
}

const logout = async () => {
  await accountStore.logout();
  router.push({ path: "login" });
};

const links1 = [
  { icon: "people", text: "จัดการข้อมูลผู้ใช้ระบบ", page: "users", role: "Admin" },
  { icon: "house", text: "จัดการข้อมูลชมรม", page: "clubs", role: "Admin,Staff" },
  { icon: "library_add", text: "บันทึกข้อมูลสมาชิกชมรม", page: "", role: "Admin,Staff" },
  { icon: "library_add", text: "บันทึกข้อมูลกรรมการและที่ปรึกษาชมรม", page: "", role: "Admin,Staff" },
  { icon: "pie_chart", text: "Dashboard", page: "", role: "All" },
];
const logoutLink = [{ icon: "logout", text: "Logout", role: "All" }];
</script>

<style lang="sass">
.GNL

  &__toolbar
    height: 64px

  &__toolbar-input
    width: 55%

  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px

    .q-item__section--avatar
      .q-icon
        color: #5f6368

    .q-item__label
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000   

  &__menu-link
    background: white !important    
</style>
