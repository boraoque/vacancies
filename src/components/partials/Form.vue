<template>
    <v-form>
        <v-row>

            <v-col cols="12">
                <v-label class="mb-2"> Title </v-label>
                <v-text-field label="Title" v-model="form.title" @blur="v$.title.$touch"
                    :error-messages="v$.title.$errors.map((e) => e.$message)"></v-text-field>
            </v-col>

            <v-col cols="12">
                <v-label class="mb-2"> Description </v-label>
                <v-textarea label="Description" v-model="form.description" @blur="v$.description.$touch"
                    :error-messages="v$.description.$errors.map((e) => e.$message)"></v-textarea>
            </v-col>

            <v-col cols="12">
                <v-label class="mb-2"> Dates </v-label>

                <v-date-input v-model="form.dates" label="Select date(s)" multiple prepend-icon="" clearable
                    append-inner-icon="$calendar" :error-messages="v$.dates.$errors.map((e) => e.$message)"
                    @blur="v$.dates.$touch"></v-date-input>

            </v-col>

            <template v-for="(shift, index) in shifts" :key="index">

                <v-col cols="12">

                    <div class="d-flex justify-space-between pa-1">
                        <v-label class="mb-2"> {{ formatDate(shift.date) }} </v-label>

                        <v-btn size="x-small" icon="mdi-close" @click="removeShift(index, shift.date)"></v-btn>
                    </div>

                    <v-card variant="tonal" class="pa-3">
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-label class="mb-2"> Start time </v-label>
                                <v-select v-model="shift.start" :items="timeOptions" density="compact"
                                    append-inner-icon="mdi-clock"></v-select>

                            </v-col>

                            <v-col cols="12" md="4">
                                <v-label class="mb-2"> End time </v-label>

                                <v-select v-model="shift.end" :items="timeOptions" density="compact"
                                    append-inner-icon="mdi-clock"></v-select>

                            </v-col>

                            <v-col cols="12" md="4">
                                <v-label class="mb-2"> Price </v-label>

                                <v-text-field v-model="shift.price" required type="number" density="compact"
                                    append-inner-icon="mdi-currency-eur"></v-text-field>
                            </v-col>

                        </v-row>
                        <v-row>

                            <v-col cols="12">
                                <v-select v-model="shift.type" label="Type" required :items="shiftTypes"
                                    density="compact"></v-select>
                            </v-col>

                        </v-row>

                    </v-card>

                </v-col>
            </template>


        </v-row>
    </v-form>
</template>
<script setup>
/**
 * 
 */
import { computed, onMounted, ref } from 'vue';
/**
 * Validations
 */
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, maxLength, minLength } from "@vuelidate/validators";
/**
 * Calendar
 */
import { VDateInput } from 'vuetify/labs/VDateInput'
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

import { useDate } from '@/composables/useDate.js';

/**
 * 
 */
const form = defineModel('form');
const menu = ref(false)
const shifts = defineModel('shifts');
const { formatDate, areDatesSame } = useDate();
const shiftTypes = [
    { title: 'Consulation', value: 'consulation' },
];
/**
 * 
 * @param attribute 
 */
const getRequiredMessage = (attribute) => {
    return attribute + " is required.";
};

/**
 * Set rules
 */
const rules = {
    title: {
        required: helpers.withMessage(getRequiredMessage("Title"), required),
    },
    description: {
        required: helpers.withMessage(
            getRequiredMessage("Description"),
            required
        ),
    },
    dates: {
        required: helpers.withMessage(
            getRequiredMessage("Dates"),
            required
        ),
        minLength: helpers.withMessage('At least one date must be selected', minLength(1)),
        maxLength: helpers.withMessage("Max selected dates is 10", maxLength(10)),
    },
};

const v$ = useVuelidate(rules, form);

//================================================================ Methods =================================================================

/**
 * 
 */
function adjustShifts() {

    let dates = [...form.value.dates];
    let array = [...shifts.value];

    dates.forEach(date => {

        // Check if the date is already in the array
        if (!array.some(item => areDatesSame(item.date, date))) {
            // If not, add it to the array with the desired structure
            array.push({ date: date });
        }
    });

    // Remove dates that are in 'array' but not in 'dates'
    array = array.filter(item => dates.some(date => areDatesSame(item.date, date)));

    shifts.value = array;
}

/**
 * 
 * @param index 
 * @param date 
 */
function removeShift(index, date) {

    shifts.value.splice(index, 1);

    let updatedDates = form.value.dates.filter(d => !areDatesSame(d, date));

    form.value.dates = updatedDates;
}


//================================================================ Computed =================================================================
/**
 * 
 */
const formatedDates = computed(() => {

    return form.value.dates?.map(date => date.toLocaleDateString("en-GB")).join(", ");
})

/**
 * 
 */
const timeOptions = computed(() => {
    const timeOptions = [];
    const step = 15; // minutes
    let hour = 0;
    let minute = 0;

    while (hour < 24) {
        // Format hour and minute as "HH:MM"
        const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        timeOptions.push(time);

        // Increment by step
        minute += step;
        if (minute === 60) {
            minute = 0;
            hour += 1;
        }
    }

    return timeOptions;
})

/**
 *
 */
const formInvalid = computed(() => {
    return v$.value.$invalid;
});

/**
 * 
 */
watch(
    () => form.value.dates,
    (newValue, oldValue) => {
        adjustShifts();
    },
    { deep: true }
);

/**
 * EXPOSE THE METHODS
 */
defineExpose({
    formInvalid,
});
</script>