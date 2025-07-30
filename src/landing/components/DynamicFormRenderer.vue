<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div v-for="(url, index) in urls" :key="url" class="group relative space-y-3 bg-black/35 p-4 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/10">
      <!-- Visual indicator -->
      <div class="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {{ index + 1 }}
      </div>
      
      <div class="flex justify-between items-start">
        <div>
          <label :for="`${url}-input`" class="block text-sm font-medium text-gray-300 mb-1">
            {{ getLabelForUrl(url, index) }}
          </label>
          <div class="text-xs text-gray-400 mb-2">
            {{ getFieldDescription(url) }}
          </div>
        </div>
        
        <!-- Visual preview -->
        <div class="ml-4 flex-shrink-0 bg-gray-800/50 p-1.5 rounded-lg border border-gray-700/50">
          <div class="w-16 h-10 flex items-center justify-center text-gray-400">
            <template v-if="inputTypes[url] === 'url'">
              <div class="text-center">
                <div class="mx-auto w-6 h-6 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19V6.413L11.2071 14.2071L9.79289 12.7929L17.585 5H13V3H21Z"></path>
                  </svg>
                </div>
                <div class="text-[9px] uppercase tracking-wider">Enlace</div>
              </div>
            </template>
            <template v-else>
              <div class="text-center">
                <div class="mx-auto w-6 h-6 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 11.1L12 14L19 11.1V13C19 15.7614 16.7614 18 14 18H10C7.23858 18 5 15.7614 5 13V11.1ZM5 8V5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V8L12 11L5 8ZM3 5C3 3.34315 4.34315 2 6 2H18C19.6569 2 21 3.34315 21 5V13C21 16.866 17.866 20 14 20H10C6.13401 20 3 16.866 3 13V5Z"></path>
                  </svg>
                </div>
                <div class="text-[9px] uppercase tracking-wider">Imagen</div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- URL Input -->
      <div v-if="inputTypes[url] === 'url'" class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
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
              'flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 hover:border-purple-400 hover:bg-purple-500/10',
              errors.includes(url) 
                ? 'border-red-500 bg-red-500/10 hover:bg-red-500/20' 
                : 'border-purple-500/50 bg-white/5 hover:bg-purple-500/5 hover:shadow-md hover:shadow-purple-500/10'
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

const getFieldDescription = (url: string): string => {
  const lowerUrl = url.toLowerCase();
  
  if (lowerUrl.includes('logo')) {
    return 'Logotipo principal de tu sitio web';
  } else if (lowerUrl.includes('hero')) {
    return 'Imagen principal de la sección hero';
  } else if (lowerUrl.includes('banner') || lowerUrl.includes('header')) {
    return 'Imagen del encabezado o banner';
  } else if (lowerUrl.includes('cta') || lowerUrl.includes('calltoaction')) {
    return 'Enlace para el botón de llamada a la acción';
  } else if (lowerUrl.includes('avatar') || lowerUrl.includes('profile')) {
    return 'Foto de perfil o avatar';
  } else if (lowerUrl.includes('background')) {
    return 'Imagen de fondo para la sección';
  } else if (lowerUrl.includes('product') || lowerUrl.includes('servicio')) {
    return 'Imagen del producto o servicio';
  } else if (lowerUrl.includes('icon')) {
    return 'Ícono para la sección';
  } else if (lowerUrl.includes('testimonial')) {
    return 'Foto del testimonio';
  } else if (lowerUrl.includes('gallery')) {
    return 'Imagen para la galería';
  } else if (lowerUrl.includes('url') || lowerUrl.includes('link')) {
    return 'Enlace externo o interno';
  }
  
  return 'Campo personalizado';
}
</script>