<template>
    <div class="wrapper">
        <div class="top">
            <h3>{{ call.name }}</h3>
            <p>{{ call.phone }}</p>
        </div>
        <p>{{ call.date }}</p>
    </div>
</template>
<script>
export default {
    name: 'CallLog',
    props: [
        'call'
    ]
}
</script>
<style scoped>
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-bottom: 1px solid #333;
        margin-left: 20px;
    }
    .top {
        display: flex;
        flex-direction: column;
    }
</style>