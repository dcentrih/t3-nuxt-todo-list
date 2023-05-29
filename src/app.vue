<script setup lang="ts">
const { $vuetify } = useNuxtApp();

const isDark = computed(() => $vuetify.theme.global.current.value.dark);
const currentTheme = computed(() => $vuetify.theme.global.name.value);

const toggleTheme = () => {
  $vuetify.theme.global.name.value =
    currentTheme.value === "dark" ? "light" : "dark";
  localStorage.setItem(
    "color-scheme",
    currentTheme.value === "dark" ? "dark" : "light"
  );
};

onMounted(() => {
  const theme = localStorage.getItem("color-scheme");
  if (theme) {
    $vuetify.theme.global.name.value = theme;
  }
});
</script>

<template>
  <v-layout style="min-height: 100vh">
    <v-app-bar flat color="transparent">
      <v-spacer></v-spacer>
      <v-btn icon color="orange-darken-4" @click="toggleTheme">
        <v-icon
          :color="isDark ? 'primary' : 'orange'"
          :icon="isDark ? 'mdi-weather-night' : 'mdi-weather-sunny'"
        ></v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container style="height: 100%">
        <v-row align-content="center" justify="center" style="height: 100%">
          <NuxtPage />
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>
