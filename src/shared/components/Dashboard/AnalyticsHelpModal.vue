<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
      @click="closeModal"
    ></div>
    
    <!-- Modal Container -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative w-full max-w-6xl bg-gray-900 rounded-lg shadow-2xl border border-gray-700">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 class="text-2xl font-bold flex items-center gap-3">
            <Brain class="h-8 w-8 text-purple-400" />
            <span class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Guía del Dashboard de Marketing con IA
            </span>
          </h2>
          <button
            @click="closeModal"
            class="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X class="h-6 w-6 text-gray-400 hover:text-white" />
          </button>
        </div>

        <!-- Content -->
        <div class="p-6 max-h-[70vh] overflow-y-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-300">
            <div>
              <h3 class="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                <Target class="h-6 w-6 text-blue-400" />
                ¿Qué muestra este dashboard?
              </h3>
              <p class="text-sm leading-relaxed mb-4">
                Este panel de control presenta un <strong>análisis completo y en tiempo real</strong> del rendimiento de tus campañas de marketing digital, 
                potenciado por modelos de inteligencia artificial avanzados. Cada gráfico y métrica está diseñado para proporcionarte 
                <em>insights accionables</em> que te permitan optimizar tus estrategias de marketing.
              </p>
              
              <h4 class="font-semibold mb-2 text-yellow-400 flex items-center gap-2">
                <TrendingUp class="h-4 w-4" />
                Gráfico Principal (Líneas):
              </h4>
              <p class="text-xs mb-3">
                Compara predicciones vs realidad para validar la precisión de nuestros modelos de IA en clics, impresiones y presupuesto.
              </p>

              <h4 class="font-semibold mb-2 text-green-400 flex items-center gap-2">
                <PieChart class="h-4 w-4" />
                Gráficos de Distribución (Pie Charts):
              </h4>
              <p class="text-xs mb-3">
                Muestran cómo se distribuyen tus recursos entre canales y estados, identificando oportunidades de optimización.
              </p>

              <h4 class="font-semibold mb-2 text-purple-400 flex items-center gap-2">
                <Zap class="h-4 w-4" />
                Medidor de Precisión:
              </h4>
              <p class="text-xs mb-3">
                Evalúa la confiabilidad de nuestras predicciones para que sepas qué tan fiables son las proyecciones futuras.
              </p>

              <h4 class="font-semibold mb-2 text-orange-400 flex items-center gap-2">
                <BarChart3 class="h-4 w-4" />
                Análisis por Canal y Temporal:
              </h4>
              <p class="text-xs mb-3">
                Identifica los canales más rentables y los mejores días para programar tus campañas.
              </p>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                <Lightbulb class="h-6 w-6 text-yellow-400" />
                Cómo interpretar los datos
              </h3>
              
              <div class="space-y-3">
                <div class="bg-blue-900/20 p-3 rounded border-l-4 border-blue-400">
                  <h4 class="font-semibold text-blue-300 mb-1 flex items-center gap-2">
                    <TrendingUp class="h-4 w-4" />
                    Predicciones vs Realidad
                  </h4>
                  <p class="text-xs">Si las líneas están muy separadas, considera ajustar los parámetros de entrada o revisar los datos históricos.</p>
                </div>

                <div class="bg-green-900/20 p-3 rounded border-l-4 border-green-400">
                  <h4 class="font-semibold text-green-300 mb-1 flex items-center gap-2">
                    <Target class="h-4 w-4" />
                    Distribución de Canales
                  </h4>
                  <p class="text-xs">Identifica qué canales dominas y cuáles podrías explorar más para diversificar tu alcance.</p>
                </div>

                <div class="bg-orange-900/20 p-3 rounded border-l-4 border-orange-400">
                  <h4 class="font-semibold text-orange-300 mb-1 flex items-center gap-2">
                    <DollarSign class="h-4 w-4" />
                    ROI por Canal
                  </h4>
                  <p class="text-xs">Los canales con barras más largas generan más clics por cada dólar invertido. Prioriza estos canales.</p>
                </div>

                <div class="bg-purple-900/20 p-3 rounded border-l-4 border-purple-400">
                  <h4 class="font-semibold text-purple-300 mb-1 flex items-center gap-2">
                    <Calendar class="h-4 w-4" />
                    Tendencias Temporales
                  </h4>
                  <p class="text-xs">Programa tus campañas en los días con mejor rendimiento para maximizar el impacto.</p>
                </div>

                <div class="bg-yellow-900/20 p-3 rounded border-l-4 border-yellow-400">
                  <h4 class="font-semibold text-yellow-300 mb-1 flex items-center gap-2">
                    <Zap class="h-4 w-4" />
                    Precisión del Modelo
                  </h4>
                  <p class="text-xs">Verde (>90%) = Excelente, Amarillo (75-90%) = Bueno, Naranja (50-75%) = Moderado, Rojo (<50%) = Revisar datos.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tips Section -->
          <div class="mt-8 pt-6 border-t border-gray-600">
            <h3 class="text-lg font-semibold mb-4 text-white flex items-center gap-2">
              <Lightbulb class="h-5 w-5 text-yellow-400" />
              Tips para optimizar tus campañas
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gray-800/50 p-4 rounded-lg">
                <h4 class="font-semibold text-green-400 mb-2 flex items-center gap-2">
                  <CheckCircle class="h-4 w-4" />
                  Mejores Prácticas
                </h4>
                <ul class="text-xs space-y-1 text-gray-300">
                  <li>• Revisa los gráficos semanalmente</li>
                  <li>• Ajusta presupuestos según ROI</li>
                  <li>• Programa campañas en días óptimos</li>
                  <li>• Diversifica canales gradualmente</li>
                </ul>
              </div>
              
              <div class="bg-gray-800/50 p-4 rounded-lg">
                <h4 class="font-semibold text-red-400 mb-2 flex items-center gap-2">
                  <AlertTriangle class="h-4 w-4" />
                  Señales de Alerta
                </h4>
                <ul class="text-xs space-y-1 text-gray-300">
                  <li>• Precisión del modelo < 70%</li>
                  <li>• ROI decreciente por semanas</li>
                  <li>• Concentración en un solo canal</li>
                  <li>• Grandes diferencias predicción vs realidad</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex justify-end p-6 border-t border-gray-700">
          <button
            @click="closeModal"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  Brain, 
  X, 
  Target, 
  TrendingUp, 
  PieChart, 
  Zap, 
  BarChart3, 
  Lightbulb, 
  Calendar, 
  DollarSign,
  CheckCircle,
  AlertTriangle
} from 'lucide-vue-next'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.fixed {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style> 