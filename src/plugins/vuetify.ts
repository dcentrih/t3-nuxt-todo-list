import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
  theme: {
    defaultTheme: "light",
  },
});

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(vuetify);

  return {
    provide: {
      vuetify,
    },
  };
});
