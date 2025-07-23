<template>
       <div 
                                class="relative cursor-pointer group">
                                <input   type="radio"
  :id="`template-${templateId}`"
  :value="templateId"
  :checked="fValue === templateId"
  @change="handleChange"
  class="sr-only" />
                                <label :for="`template-${templateId}`"
                                    class="block p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group-hover:bg-white/10"
                                    :class="{ 'border-purple-500 bg-purple-500/10': isSelected}">
                                    <div class="flex items-center space-x-3">
                                        <div class="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center"
                                            :class="{ 'border-purple-500': isSelected }">
                                            <div v-if="isSelected"
                                                class="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        </div>
                                        <span class="text-gray-200 font-medium">{{ templateId }}</span>
                                    </div>
                                </label>
                            </div>
</template>

<script lang="ts" setup>
defineProps<{ 
    fValue:string
    templateId:string
    isSelected:boolean
}>()

const emit = defineEmits<{
  (e: 'update:fValue', value: string): void
}>()

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:fValue', target.value)
}
</script>