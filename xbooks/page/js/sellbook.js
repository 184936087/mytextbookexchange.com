let vm = new Vue({
  el: "#app",
  data: {
    book: {
      name: '',
      isbn: '',
      course: '',
      condition: '',
      price: '',
      image: '',
    }
  },
  methods: {
    sellBook() {
      for(const x in this.book){
        if(x === 'course'){
          continue;
        }
        if(!this.book[x]){
          alert(`${x} is empty!`);
          return;
        }
      }


      console.log(this.book);
      $.ajax({
        type: "post",
        url: "/books",
        data: this.book,
        success: function(x) {
          if (x.ok) {
            console.log(x.id);
            window.alert('ok!');
          } else {
            window.alert(x.msg);
          }
        }
      });
    }
  }
})