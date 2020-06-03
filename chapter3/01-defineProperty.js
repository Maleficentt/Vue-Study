// 数据响应式
function defineReactive(obj, key, val) {
  // 递归
  observe(val)
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key)
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set', key, newVal)
        observe(newVal)
        val = newVal
      }
    }
  })
}

// 使一个对象所有属性都被拦截
function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

// 新增属性无法被拦截，特定的api对其做响应式拦截
function  set(obj, key, val) {
  defineReactive(obj, key, val)
}

const obj = { foo: 'foo', bar: 'bar', baz: { a: 1 } }
observe(obj)
// obj.foo
// obj.foo = 'fooooooo'
// obj.bar
// obj.baz = { a: 100 }
// obj.baz.a
// obj.dong = 'dong' // 新属性
set(obj, 'dong', 'dong')
obj.dong

// 思考题：数组响应式怎么做
// 数组原型中有7个可以改变数组的方法，把他们覆盖为可以做拦截通知的方法