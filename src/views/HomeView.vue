<template>
  <div class="screen">
    <p>{{ onScreen }}</p>
    <!-- est ce qu'on est obligé d'utilisé un computed pour aller chercher une valeur dans le store.state ???-->
  </div>
  <p v-if="screenName == undefined">Inconnnu</p>
  <p v-else>{{ screenName }}</p>
  <div class="keyboard">
    <button @click="addNumber(0)">0</button>
    <button @click="addNumber(1)">1</button>
    <button @click="addNumber(2)">2</button>
    <button @click="addNumber(3)">3</button>
    <button @click="addNumber(4)">4</button>
    <button @click="addNumber(5)">5</button>
    <button @click="addNumber(6)">6</button>
    <button @click="addNumber(7)">7</button>
    <button @click="addNumber(8)">8</button>
    <button @click="addNumber(9)">9</button>

    <div>
      <button @click="erase()">Erase</button>
      <button @click="call()">Call</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  computed: {
    onScreen() {
      return this.$store.state.screen
    },
    screenName() {
      return this.$store.getters.isScreenInContactList
    }
  },
  data() {
    return {

      newCall: {
        name: '',
        phone: null,
        date: null
      }
    }
  },
  methods: {
    addNumber(number) {
      this.$store.commit('addNumber', number)
    },
    erase() {
      this.$store.commit('erase')
    },
    call() {
      var currentDateTime = new Date();
      if(this.onScreen == 0) {
        alert('Veuillez entrer un numéro de téléphone')
        return
      }
      if (this.screenName == undefined) {
        this.newCall.name = 'Inconnu'
        this.newCall.phone = this.onScreen
        this.newCall.date = currentDateTime.toLocaleDateString() + " - " +  currentDateTime.toLocaleTimeString()
        this.$store.commit('addToCallLog', this.newCall)
        alert('Calling '+ this.onScreen +'...')
      } else {
        this.newCall.name = this.screenName
        this.newCall.phone = this.onScreen
        this.newCall.date = currentDateTime.toLocaleDateString() + " - " + currentDateTime.toLocaleTimeString()
        this.$store.commit('addToCallLog', this.newCall)
        alert('Calling '+ this.screenName +' ...')
      }
      
      this.newCall = {
        name: '',
        phone: null,
        date: null
      }
    }

  }
}
</script>
<style>
.screen{
  background-color: #e0e0e0;
  width: 100%;
  max-width: 500px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin: 0 auto;
}
</style>
