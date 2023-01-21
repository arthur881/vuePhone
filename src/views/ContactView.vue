<template>
    <div>
        <router-link to="/addContact">Add contact here</router-link>

        <h2>Contacts :</h2>
        <p v-if="contacts.length == 0">No contact yet :/</p>

        <input type="text" placeholder="search contact name" v-model="searchTerm" @keyup="searchContact">
        <p v-if="this.err == true">Not found</p>
        <div>
            <ul>
                <li v-for="contact in elementsSorted" :key="contact.name">
                    {{contact.name}} - 0{{contact.phone}}
                    <button @click="call(contact.name, contact.phone)">Call</button>
                </li>
            </ul>
        </div>

        <div v-if="this.elementsSorted.length == 0">
            <ul>
                <li v-for="contact in contacts" :key="contact.name">
                    {{contact.name}} - 0{{contact.phone}}
                    <button @click="call(contact.name, contact.phone)">Call</button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ContactView',
    computed: {
        contacts() {
            //console.log(this.$store.state.contactList)
            return this.$store.state.contactList
        }
    },
    data() {
        return {
            newCall: {
                name: '',
                phone: null,
                date: null
            },
            searchTerm: '',
            elementsSorted: [],
            err: false,
        }
    },
    methods: {
        
        call(contactName, contactPhone) {
            var currentDateTime = new Date()
            this.newCall.name = contactName
            this.newCall.phone = contactPhone
            this.newCall.date = currentDateTime.toLocaleDateString() + " - " +  currentDateTime.toLocaleTimeString()
            this.$store.commit('addToCallLog', this.newCall)
            alert('Calling '+ contactName +'...')

            this.newCall = {
                name: '',
                phone: null,
                date: null
            }
        },
        searchContact() {
            if(this.searchTerm == '') {
                this.elementsSorted = []
                this.err = false
            }else {
                this.elementsSorted = this.contacts.filter((element) => {
                    let elementTransformed = this.ignoreCase ? element.name.toUpperCase() : element.name
                    let searchQueryTransformed = this.ignoreCase ? this.searchQuery.toUpperCase() : this.searchTerm
                    return elementTransformed.includes(searchQueryTransformed)
                })
                this.err = false
                if(this.elementsSorted.length === 0){
                    this.err = true
                }
                
            }
        }
    }
}
</script>
<style scoped>
    div{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>