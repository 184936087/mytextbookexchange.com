let vm = new Vue({
  el:"#app",
  data:{
    books:[]
  },
  methods: {
    refresh(){
      $.get('/sells').then(x => {
        if (x.ok) {
          this.books = x.books;
        } else {
          window.alert(x.msg);
        }
      });
    },
    showData(id){
      $.get('/seller/' + id).then(x => {
        if (x.ok) {
          console.log(x.seller);
          window.alert(
            'umail: ' + x.seller.umail + '\n' +
            'username: ' + x.seller.username + '\n' +
            'phone: ' + x.seller.phone
          );
        } else {
          window.alert(x.msg);
        }
      });
    }
  }
})