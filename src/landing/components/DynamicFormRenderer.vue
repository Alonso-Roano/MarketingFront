<template>
  <div class="space-y-6">
    <div v-for="(schema, section) in schemaData" :key="section" class="space-y-4">
      <div class="flex items-center space-x-3 mb-4">
        <div class="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-white font-bold">
          {{ Object.keys(schemaData).indexOf(section) + 2 }}
        </div>
        <h3 class="text-xl font-semibold text-white capitalize">{{ section }}</h3>
        <div class="flex-1 h-px bg-gradient-to-r from-gray-500/70 to-transparent"></div>
      </div>
      
      <div v-for="(field, key) in schema.shape" :key="key" class="space-y-2">
        <label class="block text-sm font-medium text-gray-300">
          {{ formatLabel(key) }}
        </label>
        
        <!-- Render different input types based on schema -->
        <template v-if="field._def.typeName === 'ZodString'">
          <input
            v-model="formData[section][key]"
            type="text"
            class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
            :placeholder="`Enter ${formatLabel(key)}`"
          >
        </template>
        
        <template v-else-if="field._def.typeName === 'ZodNumber'">
          <input
            v-model.number="formData[section][key]"
            type="number"
            class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
            :placeholder="`Enter ${formatLabel(key)}`"
          >
        </template>
        
        <template v-else-if="field._def.typeName === 'ZodBoolean'">
          <label class="inline-flex items-center">
            <input
              v-model="formData[section][key]"
              type="checkbox"
              class="form-checkbox h-5 w-5 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
            >
            <span class="ml-2 text-gray-300">{{ formatLabel(key) }}</span>
          </label>
        </template>
        
        <template v-else-if="field._def.typeName === 'ZodArray' && field._def.type?.shape">
          <div v-for="(_, index) in formData[section][key] || []" :key="index" class="border-l-2 border-purple-500 pl-4 mb-4">
            <button
              type="button"
              @click="removeArrayItem(section, key, index)"
              class="text-red-400 text-sm mb-2 hover:text-red-300 flex items-center"
            >
              <span class="mr-1">×</span> Remove
            </button>
            <div class="space-y-2">
              <div v-for="(_, subKey) in field._def.type.shape" :key="subKey">
                <label class="block text-xs text-gray-400">{{ formatLabel(subKey) }}</label>
                <input
                  v-model="formData[section][key][index][subKey]"
                  type="text"
                  class="w-full px-3 py-1 text-sm bg-gray-700 border border-gray-600 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent text-white"
                  :placeholder="`Enter ${formatLabel(subKey)}`"
                >
              </div>
            </div>
          </div>
          <button
            type="button"
            @click="addArrayItem(section, key, field._def.type)"
            class="text-sm text-purple-400 hover:text-purple-300 flex items-center mt-2"
            :disabled="!field._def.type?.shape"
          >
            <span class="mr-1">+</span> Add {{ formatLabel(key).replace(/s$/, '') }}
          </button>
        </template>
        
        <template v-else-if="field._def.typeName === 'ZodObject' && field.shape">
          <div class="border-l-2 border-purple-500 pl-4 mt-2 space-y-3">
            <div v-for="(_, subKey) in field.shape" :key="subKey" class="space-y-1">
              <label class="block text-sm text-gray-300">{{ formatLabel(subKey) }}</label>
              <input
                v-model="formData[section][key][subKey]"
                type="text"
                class="w-full px-3 py-1 bg-gray-800 border border-gray-700 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent text-white"
                :placeholder="`Enter ${formatLabel(subKey)}`"
              >
            </div>
          </div>
        </template>
      </div>
    </div>
    
    <div class="pt-6">
      <button
        type="submit"
        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
        @click="handleSubmit"
      >
        Generate Landing Page
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

type SchemaField = {
  _def: {
    typeName: string;
    type?: {
      shape?: Record<string, SchemaField>;
    };
  };
  shape?: Record<string, SchemaField>;
};

type SchemaType = Record<string, {
  shape: Record<string, SchemaField>;
}>;

const props = defineProps<{
  schema: SchemaType;
  initialData?: Record<string, any>;
}>();

const emit = defineEmits<{
  (e: 'submit', data: Record<string, any>): void;
}>();

const schemaData = ref<SchemaType>({});
const formData = ref<Record<string, any>>({});

// Initialize form data from schema
const initializeFormData = () => {
  if (!props.schema) return;
  
  Object.entries(props.schema).forEach(([section, sectionSchema]) => {
    if (!formData.value[section]) {
      formData.value[section] = {};
    }
    
    if (sectionSchema.shape) {
      Object.entries(sectionSchema.shape).forEach(([key, field]) => {
        if (formData.value[section][key] === undefined) {
          // Initialize with default values based on field type
          if (field._def.typeName === 'ZodArray') {
            formData.value[section][key] = [];
          } else if (field._def.typeName === 'ZodObject') {
            formData.value[section][key] = {};
          } else if (field._def.typeName === 'ZodBoolean') {
            formData.value[section][key] = false;
          } else if (field._def.typeName === 'ZodNumber') {
            formData.value[section][key] = 0;
          } else {
            formData.value[section][key] = '';
          }
        }
      });
    }
  });
};

// Handle array operations
const addArrayItem = (section: string, key: string, itemType: { shape?: Record<string, SchemaField> }) => {
  if (!formData.value[section][key]) {
    formData.value[section][key] = [];
  }
  
  const newItem: Record<string, any> = {};
  if (itemType?.shape) {
    Object.keys(itemType.shape).forEach((subKey: string) => {
      newItem[subKey] = '';
    });
  }
  
  formData.value[section][key].push(newItem);
};

const removeArrayItem = (section: string, key: string, index: number) => {
  formData.value[section][key].splice(index, 1);
};

// Helper function to format labels
const formatLabel = (str: string): string => {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, match => match.toUpperCase())
    .trim();
};

// Handle form submission
const handleSubmit = (e: Event) => {
  e.preventDefault();
  emit('submit', formData.value);
};

// Watch for schema changes
watch(() => props.schema, (newSchema) => {
  if (newSchema) {
    schemaData.value = newSchema;
    initializeFormData();
  }
}, { immediate: true });

// Initialize with initial data if provided
onMounted(() => {
  if (props.initialData) {
    formData.value = JSON.parse(JSON.stringify(props.initialData));
  }
  initializeFormData();
});

// Expose form data to parent
const getFormData = () => {
  return formData.value;
};

defineExpose({
  getFormData
});
</script>
