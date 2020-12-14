// 全局组件注册
function registryComponent() {
    const components = require.context('@/components', true, /\.vue|js$/)
    return components.keys().reduce((prev, item) => {
        const componentItem = components(item).default
        if (!componentItem.name) {
            throw '公共组建必须设置name属性'
        }
        prev[componentItem.name] = componentItem
        return prev
    }, {})
}

// console.log(registryComponent())
export default {
    install(Vue){
        const allComponents=registryComponent()
        Object.keys(allComponents).forEach(item=>Vue.component(item,allComponents[item]))
    }
}