<template>
    <v-toolbar title="Filter">

    </v-toolbar>
    Filter on price

    <v-range-slider v-model="filters.range" step="10" thumb-label="always"></v-range-slider>

</template>
<script setup>
/**
 * 
 */
import { computed, onMounted, ref } from 'vue';

/**
 * 
 */
const filters = defineModel();
</script>