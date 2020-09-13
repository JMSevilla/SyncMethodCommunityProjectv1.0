//frontend start contribute by: klarissa(9/13/2020)
<template>
  <div>
    <b-navbar class="test" type="light">
      <b-navbar-brand>
        <img src="../assets/large_syncmethod.png" alt="logo" width="25%">
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <v-btn small outlined color="indigo" @click="onHome()">Home</v-btn>&nbsp;
          <v-btn small outlined color="indigo" @click="onSignin()">Sign in</v-btn>&nbsp;
          <v-btn small color="primary" dark @click="onSignup()">Sign up</v-btn>&nbsp;
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>

<div v-if="show == true">
 <div class="img-wrapper">
      <img src="../assets/large_syncmethod.png" alt="logo" width="20%">
    </div>
    <h1>Core Team starts here.</h1>
</div>
<div v-else>
 
</div>

    <b-modal id="modal-scrollable" title="Sign in" ok-only ok-variant="secondary" hide-footer>
      <div class="container">
        <b-form>
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-1"
              type="email"
              v-model="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Password:"
            label-for="input-1"
            description="We'll never share your password with anyone else."
          >
            <b-form-input
              id="input-1"
              type="password"
              v-model="password"
              required
              placeholder="Enter password"
            ></b-form-input>
          </b-form-group>
          <b-button variant="outline-primary" @click="finish('login')">Sign in</b-button>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>
//end contribute by: klarissa(9/13/2020)

//backend start contribute by: jm (9/13/2020)


<script>
export default {
  name: "Content",
  data: () => ({
    loginTask: {
      email: "",
      password: ""
    },
    show: true
  }),
  
  methods: {
    onSignin: function() {
      this.$bvModal.show("modal-scrollable");
    },
    onSignup: function(){
      this.$router.push({name: 'TDev_Signup'});
      this.show = false;
    },
    onHome: function(){
      this.$router.push({name: 'fronttestdev'});
      this.show = true;
    },
    // (finish) This will be the login request api - jm
    //can penetrate to localhost api but not advisable
    //if server off -> will not work. 
    //can hit localhost api but there is no response only request.
    finish: function(action) {
      const admin = 'Administrator';
      const vm = this;
      this.loginTask.email = vm.email;
      this.loginTask.password = vm.password;
      let email = this.loginTask.email;
      let password = this.loginTask.password;

      if (email != null && password != null) {
        const evt = new FormData();
        evt.append("email", email);
        evt.append("passwordhash", password);

        const apiCallback
         = this.$http.post("api/logmein?action=" + action,evt);
        apiCallback.then(resp => {
          if(resp.data.test === '1'){
            console.log(resp.data);
            console.log(resp.data.test);
            localStorage.setItem('core-email', resp.data.email);
             this.$swal("Successfully login", "Drop", "success");
             if(resp.data.userrole === admin){
               this.$swal("Admin", "Drop", "success");
             }
             else{
                this.$swal("Not Admin", "Drop", "success");
             }
          }
          else{
             this.$swal("Invalid email or password ", "or maybe the server isn't running", "error");
          }
        }).catch(err =>{
          alert(err);
        })
      } else {
        this.$swal("email or password is empty", "Drop", "warning");
      }
    }
  }
};
</script>

//end contribute by: jm (9/13/2020)


<style scoped>
img {
  float: left;
}
.test {
  box-shadow: 0px 1px 10px grey;
}
.wrapper {
  height: 100%;
  /* background-color: lightblue; */
}
.img-wrapper {
  display: flex;
  background-color: gray;
  margin: 2rem auto;
  width: 85%;
  height: 30%;
  justify-content: flex-start;
  align-items: flex-end;
}
</style>

