import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { router } from "./router/router";
import { loadFonts } from "./plugins/webfontloader";

loadFonts();
const app = createApp(App);
app.use(vuetify);
app.use(router);
app.use(createPinia());
app.mount("#app");
