import { reactive } from "vue"

export const eventBus = reactive({
    listeners: new Map<string, Array<(...args: any[]) => any>>(),

    on(event: string, callback: (...args: any[]) => any) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, [])
        }
        this.listeners.get(event)!.push(callback)
    },

    emit(event: string, ...args: any[]) {
        if (this.listeners.has(event)) {
            this.listeners.get(event)!.forEach((callback) => callback(...args))
        }
    },

    off(event: string) {
        if (this.listeners.has(event)) {
            this.listeners.delete(event)
        }
    },
})
