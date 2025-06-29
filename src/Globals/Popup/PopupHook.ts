import { createApp, h, ref } from "vue"
import Popup from "./Popup.vue"

const popupManager = {
  instances: ref<PopupInstance[]>([]),
  currentLevel: 0,

  generateId(): string {
    return "popup_" + Date.now() + "_" + Math.floor(Math.random() * 10000)
  },

  open({ style, showCloseBtn }: any, { component, props }: any) {
    const id = this.generateId()
    const level = ++this.currentLevel


    const vm = document.createElement("div")
    vm.id = id
    vm.style.zIndex = String(1000 + level)
    document.body.appendChild(vm)

    const app = createApp(
      () => h(
        Popup,
        {
          visible: true,
          style,
          showCloseBtn,
          closePopup: () => {
            this.close(id)
          },
        },
        {
          default: () => h(component, props),
        },
      )
    ).mount(vm)

    const instance = { id, app, vm, level }
    this.instances.value.push(instance)

    return id
  },

  close(id: string) {
    const index = this.instances.value.findIndex((item) => item.id === id)
    if (index !== -1) {
      const instance = this.instances.value[index]

      document.body.removeChild(instance.vm)

      this.instances.value.splice(index, 1)
    }
  }
}

export default {
  install(app: any) {
    app.config.globalProperties.$popup = popupManager
    window.$popup = popupManager
  },
}
