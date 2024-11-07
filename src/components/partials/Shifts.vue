<template>
    <v-toolbar title="Shifts">
        <v-btn @click="appStore.drawer = true">
            New shift
        </v-btn>

    </v-toolbar>

    <template v-for="(vacancy, index) in appStore.vacancies" :key="index">

        <v-card class="my-2">

            <div class="d-flex justify-space-between pa-2">
                <v-card-title>{{ vacancy.title }} </v-card-title>

                <v-btn @click="ediVacancy" size="x-small" icon="mdi-pencil"></v-btn>
            </div>

            <v-card-subtitle>{{ vacancy.description }}</v-card-subtitle>

            <v-card-text>

                <template v-for="shift in vacancy.shifts" :key="shift">

                    <v-row>
                        <v-col>
                            {{ formatDate(shift.date) }}
                        </v-col>
                        <v-col>
                            {{ shift.start }}
                        </v-col>
                        <v-col>
                            {{ shift.end }}
                        </v-col>
                        <v-col>
                            <span class="text-capitalize">{{ shift.type }}</span>
                        </v-col>
                        <v-col>
                            {{ '€' + shift.price }}
                        </v-col>

                    </v-row>

                </template>

            </v-card-text>

        </v-card>

    </template>

</template>
<script setup>
/**
 * 
 */
import { useAppStore } from '@/stores/app';
import { useDate } from '@/composables/useDate.js';

/**
* 
*/
const appStore = useAppStore();
const { formatDate } = useDate();

function ediVacancy() {

}

</script>