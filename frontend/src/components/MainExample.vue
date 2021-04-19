<template lang="html">
  <div class="field">
    <sui-form>
      <Message ref="message" visible="false"/>
    </sui-form>
    <sui-segment>
      <sui-grid
        :columns="2"
        relaxed="very"
        stackable
        vertical-align="middle"
      >
        <sui-grid-column>
          <sui-form>
            <sui-form-field> 
              <sui-header size="large" icon="docker">Docker Example</sui-header>
            </sui-form-field> 
            <sui-form-field>          
              <label>Name</label>          
              <sui-input v-model="name" placeholder="Nome" icon="user" />
            </sui-form-field> 
            <sui-form-field>
              <label>E-mail</label>        
              <sui-input v-model="email" placeholder="E-mail" icon="at" />
            </sui-form-field>
            <sui-form-field><br><br><br>
            </sui-form-field>
          </sui-form>
          <sui-container>
            <br>
            <div v-if="!selected">
              <sui-button primary v-on:click="saveUser()">
                <sui-icon name="save" />
                Save
              </sui-button>
            </div>
            <div v-else="selected">
              <sui-button primary v-on:click="saveUser()">
                <sui-icon name="save" />
                Save
              </sui-button>
              <sui-button secondary v-on:click="clear">
                <sui-icon name="undo" />
                Undo
              </sui-button>          
            </div>
          </sui-container>
        </sui-grid-column>
        
        <sui-grid-column>
          <sui-form v-if="selected">
            <sui-form-field>          
              <label>E-mail from</label>          
              <sui-input v-model="sender" placeholder="E-mail de" icon="address card" />
            </sui-form-field> 
            <sui-form-field>
              <label>E-mail to</label>        
              <sui-input v-model="address" placeholder="E-mail para" icon="address card outline" />
            </sui-form-field>
            <sui-form-field>          
              <label>Subject</label>          
              <sui-input v-model="subject" placeholder="Assunto" icon="address book" />
            </sui-form-field> 
            <sui-form-field>
              <label>Message</label>  
              <textarea v-model="text" rows="2" icon="pencil alternate"></textarea>      
            </sui-form-field>
          </sui-form>
          <sui-container>
            <br>
            <div v-if="selected">
              <sui-button primary v-on:click="sendMail()">
                <sui-icon name="envelope outline" />
                Send
              </sui-button>
              <sui-button secondary v-on:click="clear">
                <sui-icon name="undo" />
                Undo
              </sui-button>          
            </div>
          </sui-container>
        </sui-grid-column>
     </sui-grid>
    </sui-segment>

    <template lang="html">
      <sui-table color="grey" inverted selectable>
        <sui-table-header>
          <sui-table-row>
            <sui-table-headerCell colspan="5">Tabela de Usuários</sui-table-headerCell>
          </sui-table-row>
        </sui-table-header>

        <sui-table-header>         
          <sui-table-row>
            <sui-table-header-cell>Name</sui-table-header-cell>
            <sui-table-header-cell>E-mail</sui-table-header-cell>
            <sui-table-header-cell></sui-table-header-cell>
            <sui-table-header-cell></sui-table-header-cell>
          </sui-table-row>
        </sui-table-header>
        <sui-table-body>
          <sui-table-row v-for="(user, index) in items" :key="index">
            <sui-table-cell v-for="(col, idxCol) in columns" :key="idxCol">{{user[col]}}</sui-table-cell>
            <sui-table-cell collapsing>
              <sui-icon name="edit" v-on:click="selectUser(user)" />
            </sui-table-cell>
            <sui-table-cell collapsing>
              <sui-icon name="trash" v-on:click="deleteUser(user.id, user.name)" />
            </sui-table-cell>
          </sui-table-row>
        </sui-table-body>
      </sui-table>
    </template>

  </div>
</template>
<script>
import api from "@/api";
import Message from "./generics/Message";

export default {
  name: "MainExample",
  components: {
    Message
  },
  data() {
    return {
      id: 0,
      name: "",
      email: "",

      sender: "",
      address: "",
      subject: "",
      text: "",

      columns: ["name", "email"],
      items: [],
      selected: false
    };
  },
  async created() {
    this.getUsers()
  },
  methods: {
    async saveUser() {
      let body = {
        name: this.name,
        email: this.email
      };

      try {
        if(this.selected){
          let post = await api.updateUser(this.id, body);
          this.$refs.message.showAlertMessage(`Usuário ${this.name} salvo.`, "Sucesso!");
          this.selected = false
        } else {
          let post = await api.insertUser(body);
          this.$refs.message.showAlertMessage(`Usuário ${this.name} salvo.`, "Sucesso!");          
        }

        this.getUsers()        
      } catch (error) {
        this.$refs.message.showAlertMessage(error, "Atenção!");
      }
    }, 
    async sendMail(){

      let body = {
        sender: this.sender,
        address: this.address,
        subject: this.subject,
        text: this.text
      }

      try {
        let send = await api.sendMessage(body)
        this.$refs.message.showAlertMessage(error, "Mensagem Enviada!");
      } catch (error) {
        this.$refs.message.showAlertMessage(error, "Atenção!");
      }
    },
    async deleteUser(id, name) {
      try {
        let post = await api.deleteUser(id);
        this.$refs.message.showAlertMessage(`Usuário ${name} excluído.`, "Sucesso!");
        this.getUsers()
      } catch (error) {
        this.$refs.message.showAlertMessage(error, "Atenção!");
      }
    },
    async getUsers(){
      this.items = []
      let dataItens = await api.getUserAll();
      for (let ar of dataItens) {
        this.items.push({ id: ar._id, name: ar.name, email: ar.email });
      }
    },    
    selectUser(user){
      this.selected = true
      this.id = user.id
      this.name = user.name
      this.email = user.email
      this.address = user.email 
    },
    clear(){
      this.selected = false
      this.id = 0

      this.name = ""
      this.email = ""

      this.sender = ""
      this.address = ""
      this.subject = ""
      this.text = ""
    }
  }
};
</script>
