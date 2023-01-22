<template>
    <div>
        <h2>Add contact :</h2>
        <form @submit.prevent="addContact">
            <input  class="inputTxt" type="text" placeholder="Name..." v-model="formContact.name">
            <input  class="inputTxt" type="number" placeholder="phone number" v-model="formContact.phone">
            <button  class="inputTxt" type="submit">Add</button>
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
<style scoped>
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
</style>