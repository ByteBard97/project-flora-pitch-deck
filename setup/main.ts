// setup/main.ts
import { defineAppSetup } from "@slidev/types";
import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";
import "vuetify/styles";
import "../styles/vuetify.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineAppSetup(({ app }) => {
  const vuetify = createVuetify({
    components,
    directives,
  });
  app.use(vuetify);
  app.use(FloatingVue);
});
