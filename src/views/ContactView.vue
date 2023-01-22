<template>
    <div>
        <router-link to="/addContact">Add contact here</router-link>

        <h2>Contacts :</h2>
        <p v-if="contacts.length == 0">No contact yet :/</p>

        <input class="inputTxt" type="text" placeholder="Search contact name" v-model="searchTerm" @keyup="searchContact">
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
    .inputTxt {
        width: 200px;
        height: 30px;
        border-radius: 5px;
        border: 1px solid #ccc;
        padding: 5px;
        margin: 10px;
        transition: box-shadow 0.3s ease-in-out;
    }
    .inputTxt:focus {
        outline: none;
        box-shadow: 0.2rem 0.8rem 1.6rem rgba(0, 0, 0, 0.2), 0.1rem 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
    }
    button {
        width: 100px;
        height: 30px;
        border-radius: 5px;
        border: 1px solid #ccc;
        padding: 5px;
        margin: 10px;
        transition: box-shadow 0.3s ease-in-out;
    }
    button:hover {
        cursor: pointer;
        box-shadow: 0.2rem 0.8rem 1.6rem rgba(0, 0, 0, 0.2), 0.1rem 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
    }
    ul {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    li {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        list-style: none;
    }

</style>