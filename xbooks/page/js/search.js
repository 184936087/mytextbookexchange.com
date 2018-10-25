let vm = new Vue({
  el:'#app',
  data:{
    options:['book’s name','course name','ISBN number'],
    option:'book’s name',
    placeTxt:'',
    searchItem:'',
  },
  watch: {
    option(v){
      if(v === 'course name'){
        this.placeTxt = 'no space，use capital letter';
      }else{
        this.placeTxt = '';
      }
    }
  },
  methods: {
    search(option,item){
      if(this.option==='course name'&&this.searchItem.indexOf(' ')!=-1){
        alert('no space，use capital letter');
        return;
      }
      window.location.href = `searchResult.html?option=${option}&item=${item}`;
    }
  }
})