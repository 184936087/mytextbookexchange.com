let vm = new Vue({
  el:"#app",
  data: {
    books:[
      {
        price:10,
        condition:6,
        id:1,
        information:'this is information',
        nickName:'nick',
        contact:13113334407
      },
      {
        price:10,
        condition:6,
        id:1,
        information:'this is information',
        nickName:'nick',
        contact:13113334407
      },
      {
        price:10,
        condition:6,
        id:1,
        information:'this is information',
        nickName:'nick',
        contact:13113334407
      },
      {
        price:10,
        condition:6,
        id:1,
        information:'this is information',
        nickName:'nick',
        contact:13113334407
      },
    ]
  },
  methods: {
    contact(item){
      alert(item);
    }
  }
})