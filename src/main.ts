import { createApp } from "vue";
import App from "./App.vue";
import PopupHook from "./Globals/Popup/PopupHook";


createApp(App).use(PopupHook).mount("#app");
