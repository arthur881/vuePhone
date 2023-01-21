<template>
    <div>
        <h1>Call log</h1>
        <p v-if="callLog.length == 0">Call log is empty</p>
        <div class="callLogWrapper">
            <div v-for="call in callLog" :key="call.name">
                <CallLog :call="call"/>
                
            </div>
        </div>
        
    </div>
</template>
<script>
import CallLog from '@/components/CallLog.vue';
export default {
    name: 'HystoryView',
    components: {
        CallLog
    },
    computed: {
        callLog() {
            return this.$store.state.callLog
        }
    }
}
</script>
<style scoped>
    .callLogWrapper{
        display: flex;
        flex-direction: column-reverse;
    }
</style>