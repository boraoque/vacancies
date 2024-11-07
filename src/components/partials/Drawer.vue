<template>
    <v-navigation-drawer v-model="appStore.drawer" width="700" floating location="right">

        <v-container fluid>

            <v-row>

                <v-col class="d-flex justify-space-between">

                    Create/Edit

                </v-col>

            </v-row>

            <v-divider class="my-4"></v-divider>

            <Form v-model:form="data" v-model:shifts="shifts" ref="formref"></Form>

        </v-container>

        <template v-slot:append>

            <v-container fluid>

                <v-divider class="my-4"></v-divider>

                <v-row>

                    <v-col cols="12" md="6">

                        <v-btn @click="deleteShift" variant="outlined" block>Delete</v-btn>

                    </v-col>

                    <v-col cols="12" md="6">

                        <v-btn @click="save" block :disabled="buttonIsDisabled">

                            Save

                        </v-btn>

                    </v-col>

                </v-row>

            </v-container>

        </template>

    </v-navigation-drawer>
</template>
<script setup>
/**
 * 
 */
import { useAppStore } from '@/stores/app';
import { computed, onMounted, ref } from 'vue';
/**
 * 
 */
import Form from "@/components/partials/Form.vue"
/**
 * 
 */
const appStore = useAppStore();

/**
 * 
 */
const data = reactive({});
const shifts = ref([]);
const formref = ref()
//================================================ Methods ================================

function deleteShift() {
    console.log("Deleting")
}

/**
 * 
 */
function save() {

    data.shifts = [...shifts.value]

    let newData = { ...data }
    appStore.vacancies.push(newData)

}


/**
 *
 */
const buttonIsDisabled = computed(() => {

    let statement = formref.value?.formInvalid;

    return statement;
});
</script>