<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div v-for="(url, index) in urls" :key="url" class="space-y-3 bg-black/35 p-4 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-colors duration-200">
      <div class="flex justify-between items-center">
        <label :for="`${url}-input`" class="block text-sm font-medium text-gray-300">
          {{ getLabelForUrl(url, index) }}
        </label>
        <div v-if="isImageField(url)" class="flex items-center space-x-2 text-xs">
  
          <button 
            type="button"
            @click="inputTypes[url] = 'file'"
            class="px-2 py-1 rounded-md transition-colors"
            :class="inputTypes[url] === 'file' ? 'bg-gray-700/50 text-white' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'"
          >
            Subir Archivo
          </button>
        </div>
      </div>

      <!-- URL Input -->
      <div v-if="inputTypes[url] === 'url'" class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
          </svg>
        </div>
        <input
          :id="`${url}-url`"
          type="url"
          :name="`${url}-url`"
          @input="handleUrlInput($event, url)"
          :value="fValue[url]?.url || ''"
          :class="[
            'w-full pl-10 pr-4 py-3 bg-white/5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-200',
            errors.includes(url) ? 'border-red-500 bg-red-500/10' : 'border-gray-700/50 hover:border-gray-600/50'
          ]"
          :placeholder="`Ingresa la URL para ${getLabelForUrl(url, index, true).toLowerCase()}`"
        />
        <div v-if="errors.includes(url)" class="mt-1 text-sm text-red-400 flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <span>Este campo es requerido</span>
        </div>
      </div>

      <!-- File Upload -->
      <div v-else class="space-y-2">
        <div class="flex items-center justify-center w-full">
          <label 
            :for="`${url}-file`" 
            :class="[
              'flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200',
              errors.includes(url) 
                ? 'border-red-500 bg-red-500/10 hover:bg-red-500/20' 
                : 'border-gray-600 bg-white/5 hover:bg-white/10'
            ]">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg class="w-8 h-8 mb-2 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p class="mb-2 text-sm text-gray-400">
                <span class="font-semibold">Haz clic para subir</span> o arrastra y suelta
              </p>
              <p class="text-xs text-gray-500">PNG, JPG o JPEG (MAX. 5MB)</p>
            </div>
            <input 
              :id="`${url}-file`" 
              type="file" 
              class="hidden" 
              accept="image/*"
              @change="handleFileUpload($event, url)"
            />
          </label>
        </div>
        
        <!-- Preview -->
        <div v-if="fValue[url]?.file" class="mt-2">
          <div v-if="errors.includes(url)" class="mb-2 text-sm text-red-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <span>Este campo es requerido</span>
          </div>
          <div class="relative group">
            <img :src="fValue[url].preview" class="h-20 w-20 object-cover rounded-md border border-gray-700" />
            <button 
              type="button" 
              @click="clearFile(url)"
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            <p class="text-xs text-gray-400 mt-1 truncate">{{ fValue[url].file.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
<!--   <span class=" text-white">{{ values }}</span>
 --></template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { LABELS_URLS_TEMPLATE } from '../rules/rulesUrlTemplate';
const errors = ref<string[]>([]);
const values=ref<Record<string, any>>({});
const props = defineProps<{
  urls: string[]
  fValue: Record<string, any>
  templateId: string
}>()

const emit = defineEmits(["update:fValue",'validation-change'])

// Check if a URL should be treated as an image field
const isImageField = (url: string): boolean => {
  const imageKeywords = ['avatar', 'image', 'background', 'photo', 'foto', 'imagen', 'fondo'];
  const ctaKeywords = ['cta', 'link', 'enlace', 'botón', 'button', 'url', 'primary', 'secondary'];
  
  const lowerUrl = url.toLowerCase();
  
  // If it's explicitly a CTA field, it's not an image
  if (ctaKeywords.some(keyword => lowerUrl.includes(keyword))) {
    return false;
  }
  
  // If it has image-related keywords, it's an image
  return imageKeywords.some(keyword => lowerUrl.includes(keyword));
};

// Initialize input types based on field names and existing values
const inputTypes = ref<Record<string, 'url' | 'file'>>({});

// Initialize input types and format existing values
onMounted(() => {
  props.urls.forEach(url => {
    if (props.fValue[url]?.file) {
      inputTypes.value[url] = 'file';
    } else if (props.fValue[url]?.url) {
      inputTypes.value[url] = 'url';
    } else {
      // Set default input type based on field name
      inputTypes.value[url] = isImageField(url) ? 'file' : 'url';
        values.value = {
          ...values.value,
          [url]: {
          type: isImageField(url) ? 'file' : 'url'
          }
        };
      }
    
  });
});
/* watch values */
watch(values,(newValues)=>{
  emit("update:fValue",newValues);
},{deep:true })

const handleUrlInput = (e: Event, url: string) => {
  const target = e.target as HTMLInputElement;
  values.value = {
    ...values.value,
    [url]: {
      ...values.value[url],
      url: target.value,
      type: 'url'
    }
  };
  
  // Update errors
  const newErrors = [...errors.value];
  if (!target.value.trim()) {
    if (!newErrors.includes(url)) {
      newErrors.push(url);
    }
  } else {
    const index = newErrors.indexOf(url);
    if (index > -1) {
      newErrors.splice(index, 1);
    }
  }
  errors.value = newErrors;
  emit('validation-change', newErrors);
};
watch(errors, (newErrors) => {
  emit('validation-change', newErrors),{
    deep:true
  };
});

const handleFileUpload = (e: Event, url: string) => {  
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    const preview = e.target?.result as string;
    values.value = {
      ...values.value,
      [url]: {
        file,
        preview,
        type: 'file',
        name: file.name
      }
    };
    
    // Remove from errors if exists
    const newErrors = errors.value.filter(error => error !== url);
    if (JSON.stringify(newErrors) !== JSON.stringify(errors.value)) {
      errors.value = newErrors;
      emit('validation-change', newErrors);
    }
    
    target.value = '';
  };
  
  reader.readAsDataURL(file);
};

const clearFile = (url: string) => {
  values.value = { 
    ...values.value,
    [url]: {}
  };
  
  // Add to errors when clearing file
  if (!errors.value.includes(url)) {
    const newErrors = [...errors.value, url];
    errors.value = newErrors;
    emit('validation-change', newErrors);
  }
};

// Handle input type changes
watch(inputTypes, (newTypes, oldTypes) => {
  const newValue = { ...props.fValue };
  let hasChanges = false;

  for (const url in newTypes) {
    // Only process if the type actually changed
    if (oldTypes && newTypes[url] !== oldTypes[url]) {
      // When switching from URL to file, save the current URL
      if (newTypes[url] === 'file' && newValue[url]?.url) {
        newValue[url] = {
          ...newValue[url],
          previousUrl: newValue[url].url,
          url: '',
          preview: ''
        };
        hasChanges = true;
      }
      // When switching from file to URL, clear the file data
      else if (newTypes[url] === 'url' && newValue[url]?.file) {
        // If there was a URL before, restore it
        const previousUrl = newValue[url].previousUrl || '';
        newValue[url] = {
          url: previousUrl,
          type: 'url'
        };
        hasChanges = true;
      }
    }
  }

  if (hasChanges) {

    emit("update:fValue", newValue);
    emit('validation-change');
  }
}, { deep: true });

const getLabelForUrl = (url: string, index: number, forPlaceholder = false): string => {
  const templateId = props.templateId || 'default';
  const labels = LABELS_URLS_TEMPLATE[templateId] || [];
  
  // Si existe un label personalizado para este índice, usarlo
  if (labels[index]) {
    return forPlaceholder 
      ? labels[index].split(' ').slice(0, 2).join(' ')
      : labels[index];
  }
  
  // Si no hay label personalizado, usar el nombre del campo formateado
  return formatUrlToLabel(url, forPlaceholder);
}

const formatUrlToLabel = (url: string, forPlaceholder = false): string => {
  // Convertir snake_case o kebab-case a texto legible
  let formatted = url
    .replace(/[_\-]/g, ' ')
    .replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    });
  
  // Si es para placeholder, hacerlo más corto
  if (forPlaceholder) {
    return formatted.split(' ')[0] || 'URL';
  }
  
  return formatted;
}
</script>