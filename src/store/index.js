import { createStore } from 'vuex'

export default createStore({
  state: {
    contactList: [
      {name: 'papa', phone: 111111111},
      {name: 'maman', phone: 222222222},
      {name: 'mémé', phone: 333333333},
      {name: 'pépé', phone: 444444444},
    ],
    screen: "",
    callLog: []
  },
  getters: {
    isScreenInContactList(state) {
      const contact = state.contactList.find(contact => contact.phone == state.screen)
      if (contact) {
        return contact.name
      }
    }
  },
  mutations: {
    addContact(state, newContact) {
      state.contactList.push(newContact);
    },
    addNumber(state, number) {
      state.screen += number
    },
    erase(state) {
      state.screen = state.screen.slice(0, -1)
    },
    addToCallLog(state, newCall) {
      state.callLog.push(newCall)
    }

  },
  actions: {
  },
  modules: {
  }
})
