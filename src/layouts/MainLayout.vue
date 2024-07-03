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
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      behavior="desktop"
      bordered
    >
      <q-scroll-area class="fit">
        <q-list padding class="text-grey-8">
          <q-item
            class="GNL__drawer-item"
            v-ripple
            v-for="link in links1"
            :key="link.text"
            clickable
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label @click="gotoPage(link.page)">{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator inset class="q-my-sm" />
          <q-item
            class="GNL__drawer-item"
            v-ripple
            v-for="link in logoutLink"
            :key="link.text"
            clickable
          >
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
  { icon: "account_box", text: "แก้ไขข้อมูลส่วนตัว", page: "" },
  { icon: "people", text: "จัดการข้อมูลผู้ใช้ระบบ", page: "users" },
  { icon: "house", text: "จัดการข้อมูลชมรม", page: "" },
  { icon: "library_add", text: "บันทึกข้อมูลสมาชิกชมรม", page: "" },
  { icon: "pie_chart", text: "Dashboard", page: "" },
];
const logoutLink = [{ icon: "logout", text: "Logout" }];
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
</style>
