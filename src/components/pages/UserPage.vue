<template>
    <div class="container-md my-5 py-5">
        <div class="row">
            <user-menu @changeComponent="$router.push($event)"></user-menu>
            <div class="col-lg-9">
                <component :is="component[getRoute]"></component>
            </div>
        </div>
    </div>
</template>

<script setup>
    import UserMenu from '../user/UserMenu.vue';
    import ChangePassword from '../user/ChangePassword.vue';
    import PersonalInfo from '../user/PersonalInfo.vue';
    import UserProduct from '../user/UserProduct.vue';
    import TransactionHistory from '../user/TransactionHistory.vue';
    import { useRoute } from 'vue-router';
    import { computed } from 'vue';

    const route = useRoute();

    const component = {
        'personal-info': PersonalInfo,
        'change-password': ChangePassword,
        'user-product': UserProduct,
        'transaction-history': TransactionHistory
    }

    const getRoute = computed(() => {
        return route.params.component
    })
    
</script>