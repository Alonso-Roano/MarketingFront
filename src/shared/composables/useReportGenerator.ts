import { ref } from 'vue'
import { ReportService } from '@/shared/services/reportService'

export function useReportGenerator() {
  const isGenerating = ref(false)

  const generateReport = async (dashboardData: {
    totalCampaigns: number
    totalApprovedBudget: number
    totalImpressions: number
    totalClicks: number
    campaigns: any[]
    chartData: any[]
    predictionAccuracy: number
    channelDistribution: any[]
    channelPerformance: any[]
    weekdayTrends: any[]
  }) => {
    try {
      isGenerating.value = true
      
      if (!dashboardData) {
        throw new Error('Datos del dashboard no proporcionados')
      }

      if (typeof dashboardData.totalCampaigns !== 'number') {
        dashboardData.totalCampaigns = 0
      }

      if (typeof dashboardData.totalApprovedBudget !== 'number') {
        dashboardData.totalApprovedBudget = 0
      }

      if (typeof dashboardData.predictionAccuracy !== 'number') {
        dashboardData.predictionAccuracy = 0
      }

      if (!Array.isArray(dashboardData.campaigns)) {
        dashboardData.campaigns = []
      }

      if (!Array.isArray(dashboardData.channelDistribution)) {
        dashboardData.channelDistribution = []
      }

      if (!Array.isArray(dashboardData.channelPerformance)) {
        dashboardData.channelPerformance = []
      }

      if (!Array.isArray(dashboardData.weekdayTrends)) {
        dashboardData.weekdayTrends = []
      }

      const reportService = new ReportService()
      
      await reportService.generateDashboardReport(dashboardData)
      
      return { success: true, message: 'Reporte generado exitosamente' }
    } catch (error) {
      let errorMessage = 'Error desconocido al generar el reporte'
      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === 'string') {
        errorMessage = error
      }
      
      return { 
        success: false, 
        message: `Error: ${errorMessage}` 
      }
    } finally {
      isGenerating.value = false
    }
  }

  return {
    isGenerating,
    generateReport
  }
} 