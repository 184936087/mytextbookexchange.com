let vm = new Vue({
  el:'#app',
  data:{
    umail:'',
    username:'',
    password1:'',
    password2:'',
    phone:'',
  },
  methods: {
    sign(){
      // xxxx@umail.ucsb.edu
      const _this = this;
      const reg = /^([0-9A-Za-z\-_\.]+)@umail\.ucsb\.edu$/;
      console.log('​sign -> reg.test(this.umail)', reg.test(this.umail));
      if(!reg.test(this.umail)){
        alert('error umail!');
        return;
      };
      if(this.password1 !== this.password2){
        alert('error password!');        
        return;
      }
      $.ajax({
        type: "post",
        url: "/users",
        data: {
          umail:this.umail,
          username:this.username,
          password:this.password1,
          phone:this.phone,
        },
        success: function (response) {
          if(response.ok){
            window.location.href = `congratulate.html?account=${_this.umail}&id=${response.id}&psd=${_this.password1}`;
          }
        }
      });
    }
  }
})