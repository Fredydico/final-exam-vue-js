<template>
    <ul class="list-group">
        <product-form-header></product-form-header>
        <product-form-body :isEdit="isEdit" :detailData="detailData"></product-form-body>
    </ul>
</template>

<script setup>
    import ProductFormHeader from "./ProductFormHeader.vue";
    import ProductFormBody from "./ProductFormBody.vue";

    const props = defineProps({
        isEdit: { type: Boolean, default: false},
        detailData: { type: Object, default: () => ({}) }
    })
</script>