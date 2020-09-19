// 在这里, 编写你的vue代码
(function () {
  new Vue({
    el: '#todoapp',
    data: {
      todoName: '',
      todos: JSON.parse(localStorage.getItem('todos')) || [],
      now: -1
    },
    methods: {
      //添加todo
      addTodo () {
        this.todos.unshift({
          id: +new Date(),
          name: this.todoName,
          state: false
        })

        //输入后，清空输入框
        this.todoName = ''
      },
      //删除todo
      delTodo (id) {
        this.todos = this.todos.filter(item => item.id !== id)
      },
      //双击label标签，显示编辑框
      showEdit (id) {
        this.now = id 
      },
      //enter键隐藏编辑框
      hideEdit () {
        this.now = -1
      },
      //点击清除已完成，则清除已完成
      clearCompleted () {
        this.todos = this.todos.filter(item => !item.state)
      }
    },
    computed: {
      //根据todos，动态显示底部
      isShowFooter () {
        return this.todos.length > 0
      },
      //计算未完成的todo的数量
      leftCount () {
        return this.todos.filter(item => !item.state).length
      },
      //只要有一个完成的，就显示清除已完成的按钮
      isShowClear () {
        // console.log(this.todos.some(item => item.state))
        return this.todos.some(item => item.state)
      },
      /* //当全部是完成状态，则isCheckedAll为选中状态
      isCheckedAll () {
        // console.log(this.todos.every(item => item.state))
        return this.todos.every(item => item.state) 
      } */
      isCheckedAll: {
        get () {
          return this.todos.every(item => item.state) && this.todos.length > 0
        },
        set (val) {
          this.todos.forEach(item => item.state = val)
        }
      }
    },
    //深度监视
    watch: {
      todos: {
        deep: true,
        handler (newVal) {
          localStorage.setItem('todos', JSON.stringify(newVal))
        }
      }
    }
  })
})()