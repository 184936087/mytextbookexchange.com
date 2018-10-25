let vm = new Vue({
  el: "#app",
  data: {
    q: {},
    books: []
  },
  methods: {
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
  },
  mounted() {
    const search = window.location.search.substr(1).split('&');
    const _data = {};
    for(const x of search){
      const item = x.split('=');
      _data[decodeURI(item[0])] = decodeURI(item[1]);
    }
    this.q = _data;
    $.post('/search', {
      field: ({
        'book’s name': 'name',
        'course name': 'course',
        'ISBN number': 'isbn'
      })[this.q.option],
      value: this.q.item
    }).then(x => {
      if (x.ok) {
        this.books = x.books;
      } else {
        window.alert(x.msg);
      }
    });
  }
})