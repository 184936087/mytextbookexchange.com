let vm = new Vue({
  el:"#app",
  data:{
    user:{},
    name:'123'
  },
  mounted () {
    const search = window.location.search.substr(1).split('&');
    const _data = {};
    for(const x of search){
      const item = x.split('=');
      _data[item[0]] = item[1];
    }
    this.user = _data;
    console.log(this.user);
  }
})