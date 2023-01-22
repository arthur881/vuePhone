<template>
  <div class="screen">
    <p>{{ onScreen }}</p>
    <!-- est ce qu'on est obligé d'utilisé un computed pour aller chercher une valeur dans le store.state ???-->
  </div>
  <p v-if="screenName == undefined">Inconnnu</p>
  <p v-else>{{ screenName }}</p>
  <div class="keyboard">
    <button @click="addNumber(1)">1</button>
    <button @click="addNumber(2)">2</button>
    <button @click="addNumber(3)">3</button>
    <button @click="addNumber(4)">4</button>
    <button @click="addNumber(5)">5</button>
    <button @click="addNumber(6)">6</button>
    <button @click="addNumber(7)">7</button>
    <button @click="addNumber(8)">8</button>
    <button @click="addNumber(9)">9</button>
    <button @click="addNumber(0)">0</button>
  </div>
  <div class="keyboardBottom">
    <button @click="erase()">Erase</button>
    <button @click="call()">Call</button>
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
<style scoped>
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
.keyboard {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  
}
.keyboardBottom{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  width: 100%;
  max-width: 500px;
  margin-top: 30px;
}
button {  
  align-items: center;
  appearance: none;
  background-color: #fff;
  border-radius: 24px;
  border-style: none;
  box-shadow: rgba(0, 0, 0, .2) 0 3px 5px -1px,rgba(0, 0, 0, .14) 0 6px 10px 0,rgba(0, 0, 0, .12) 0 1px 18px 0;
  box-sizing: border-box;
  color: #3c4043;
  cursor: pointer;
  display: inline-flex;
  fill: currentcolor;
  font-size: 14px;
  font-weight: 500;
  height: 48px;
  justify-content: center;
  letter-spacing: .25px;
  line-height: normal;
  max-width: 100%;
  min-width: 110px;
  overflow: visible;
  padding: 2px 24px;
  position: relative;
  text-align: center;
  text-transform: none;
  transition: box-shadow 280ms cubic-bezier(.4, 0, .2, 1),opacity 15ms linear 30ms,transform 270ms cubic-bezier(0, 0, .2, 1) 0ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: auto;
  z-index: 0;
  }
  button:hover {
    background: #F6F9FE;
    color: #174ea6;
  }
</style>
