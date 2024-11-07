<template>
    
        <v-container class="mx-auto" >
            <!-- <Filter v-model="filters"></Filter> -->
            <Shifts></Shifts>
        </v-container>
    
</template>
<script setup>
/**
 * 
 */
import { computed, onMounted, ref } from 'vue';

/**
 * 
 */
import Filter from "@/components/partials/Filter.vue"
import Shifts from "@/components/partials/Shifts.vue"
/**
 * 
 */
const filters = reactive({});
</script>