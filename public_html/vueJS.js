/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// user class
class User {
    constructor(id, img, name, surname, age, bio){
        this.id = id;
        this.img = img;
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.bio = bio;
    }
}

// register modal component
Vue.component('modal', {
  template: '#modal-template'
});

// start app
var app = new Vue({
  el: '#app',
  data: {
    checkedNames: [],
    userList: [],
    
    id: '0',
    img: '',
    name: '',
    surname: '',
    age: '',
    bio: '',
    
    buttonName: '',
    showModal: false,
    boxesUPD: false,
    
    errorList: [],
    errorCodeName: false,
    errorCodeSurname: false,
    errorCodeAge: false,
    errorCodeBio: false
  },
  
  computed: {
      showRecords: function() {
          console.log(this.userList);
      },
      
      checkTheBoxes: function () {
          if(this.checkedNames.length)
              this.boxesUPD = true;
          else
              this.boxesUPD = false;
      }
  },
  
  methods: {
        addRecord: function() {
            let usr = new User (this.id, this.img, this.name, this.surname, this.age, this.bio);
            this.id++;
            this.userList.push(usr);
            this.close();
            return true;
        },
        
        close: function() {
            this.name = "";
            this.surname = "";
            this.age = "";
            this.bio = "";
            this.showModal = false;
        },
        
        buttonCheck: function() {
            if(this.boxesUPD){
                while(this.boxesUPD){
                    for(let i = 0; i < this.userList.length; i++){
                        for( let j = 0; j < this.checkedNames.length; j++)
                            if(this.userList[i] == this.checkedNames[j]){
                                this.userList.splice(i,1);
                                this.checkedNames.splice(j,1);
                            }
                    }
                    this.checkTheBoxes;
                }
            }else{
                this.showModal = true;
            }
        },
        
        handler: function () {
            if (!this.name || !(/^[a-zA-Z]+$/.test(this.name))){
                this.errorCodeName = true;
                this.errorList.push(this.errorCodeName);
            }else
                this.errorCodeName = false;

            if (!this.surname || !(/^[a-zA-Z]+$/.test(this.surname))){
                this.errorCodeSurname = true;
                this.errorList.push(this.errorCodeSurname);
            }
            else
                this.errorCodeSurname = false;
            
            if (!this.age || isNaN(this.age)){
                this.errorCodeAge = true;
                this.errorList.push(this.errorCodeAge);
            }else
                this.errorCodeAge = false;
            
            if (!this.bio){
                this.errorCodeBio = true;
                this.errorList.push(this.errorCodeBio);
            }else
                this.errorCodeBio = false;
            
            if(this.errorList.length == 0){
                this.addRecord();
            }
            
            this.errorList = [];
        }
    }
});