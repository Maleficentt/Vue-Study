// 声明store类
let Vue
class Store {
  constructor(options) {
    this._vm = new Vue({
      data: {
        $$state: options.state
      },
      computed: {}
    })

    // first blood
    this.getters = {}
    Object.keys(options.getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return options.getters[key](this.state)
        }
      })
    })

    // 保存mutations
    this._mutations = options.mutations
    this._actions = options.actions
    this._getters = options.getters

    // 锁死commit, dispatch函数this指向
    const store = this
    const { commit, dispatch } = store
    this.commit = function boundCommit(type, payload) {
      commit.call(store, type, payload)
    }
    this.dispatch = function boundDispatch(type, payload) {
      dispatch.call(store, type, payload)
    }
  }


  // 存取器使之成为只读
  get state() {
    return this._vm._data.$$state
  }

  handleComputed() {
    const result = {}
    // const _this = this
    console.log(this.state)
    // Object.keys(getters).forEach(key => {
    //   result[key] = getters[key](_this.state)
    // })
    return result
  }
  set state(v) {
    console.error('please use replaceState to reset state')
  }

  // 修改状态
  commit(type, payload) {
    // 1.获取mutation
    const entry = this._mutations[type]
    if (!entry) {
      console.error('no mutation')
      return
    }
    entry(this.state, payload)
  }

  // 执行异步任务或复杂逻辑
  dispatch(type, payload) {
    // 1.获取actions
    const entry = this._actions[type]
    if (!entry) {
      console.error('no action')
      return
    }
    entry(this, payload)
  }
}
// 实现install方法
function install(_Vue) {
  Vue = _Vue
  // 1.挂载store
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default { Store, install }