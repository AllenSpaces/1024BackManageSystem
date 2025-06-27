import { createApp, h, ref } from "vue"
import Popup from "./Popup.vue"

type PopupInstance = {
  id: string
  app: any
  vm: HTMLDivElement
  level: number
}

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

    const app = createApp({
      render() {
        return h(
          Popup,
          {
            id,
            visible: true,
            style,
            showCloseBtn,
            level,
            "onUpdate:visible": (val: any) => {
              if (!val) this.close(id)
            },
            closePopup: () => {
              popupManager.close(id)
            },
          },
          {
            default: () => h(component, props),
          },
        )
      },
    }).mount(vm)

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
  },

  closeAll() {
    this.instances.value.forEach((instance) => {
      document.body.removeChild(instance.vm)
    })
    this.instances.value = []
    this.currentLevel = 0
  },
}

export default {
  install(app: any) {
    app.config.globalProperties.$popup = popupManager
    window.$popup = popupManager
  },
}
