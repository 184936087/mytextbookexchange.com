let vm = new Vue({
  el:"#app",
  data: {
    items: []
  },
  methods: {
    del(id) {
      $.ajax({
        type: "DELETE",
        url: `/books/${id}`,
        success: function (x) {
          if (x.ok) {
            window.location.reload();
          } else {
            window.alert(x.msg);
          }
        }
      });
    }
  }
})