<template>
    <div>
        <h2>Add contact :</h2>
        <form @submit.prevent="addContact">
            <input type="text" placeholder="Name..." v-model="formContact.name">
            <input type="number" placeholder="phone number" v-model="formContact.phone">
            <button type="submit">Add</button>
        </form>
    </div>
</template>
<script>
export default {
    name: 'AddContactView',
    data() {
        return {
            formContact: {
                name: '',
                phone: null
            },
        }
    },
    methods: {
        isContactInList(formPhone) {
            /*
            if(this.$store.state.contactList.length == 0){
                return false
            }
            */
            return (this.$store.state.contactList.find(contact => contact.phone === formPhone) !== undefined)
        },
        addContact() {
            if(this.formContact.name == "" || this.formContact.phone == null) {
                alert("Please fill all fields")
                return
            }

            let phoneNumberRegex = /^(?:\+?(?:33|0)[-. ]?)?\d{9}$/;
            if (!phoneNumberRegex.test(this.formContact.phone)) {
                alert("Please enter a valid phone number")
                return
            }

            //console.log(this.formContact)
            if(this.isContactInList(this.formContact.phone)) {
                alert("This phone number is already in your contact list")
                return
            }

            this.$store.commit('addContact', this.formContact)

            this.formContact = {
                name: '',
                phone: null
            }
            this.$router.push('/contact')
        }
    }
}
</script>
<style>
    
</style>