export function defineStore(fn: Function) {
    let state = fn()

    return () => {
        if (state) return state
        return (state = fn())
    }
}