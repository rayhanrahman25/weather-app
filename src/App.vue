<template>
  <div
    class="flex flex-col min-h-screen font-Roboto bg-weather-primary"
  >
    <SiteNavigation />
    <RouterView />
    <HomeView/>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "./components/SiteNavigation.vue";
import HomeView from "./components/HomeView.vue";
</script>

<style lang="scss" scoped></style>