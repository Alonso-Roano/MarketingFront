import jsPDF from 'jspdf'

export interface DashboardData {
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
}

export class ReportService {
  private pdf!: jsPDF
  private pageHeight!: number
  private currentY!: number
  private pageWidth!: number
  private margins = { left: 20, right: 20, top: 20, bottom: 20 }

  constructor() {
    this.initializePDF()
  }

  private initializePDF(): void {
    this.pdf = new jsPDF('p', 'mm', 'a4')
    this.pageHeight = this.pdf.internal.pageSize.height
    this.pageWidth = this.pdf.internal.pageSize.width
    this.currentY = this.margins.top
  }

  async generateDashboardReport(data: DashboardData): Promise<void> {
    try {
      this.addSimpleHeader()
      this.addKPISummary(data)
      this.addChannelAnalysis(data)
      this.addCampaignsTable(data.campaigns)
      this.addSimpleFooter()

      const fileName = `Marketing_Report_${new Date().toISOString().split('T')[0]}.pdf`
      this.pdf.save(fileName)
    } catch (error) {
      throw new Error(`Error generando PDF: ${error instanceof Error ? error.message : error}`)
    }
  }

  private addSimpleHeader(): void {
    try {
      this.pdf.setFillColor(41, 98, 255)
      this.pdf.rect(0, 0, this.pageWidth, 40, 'F')
      
      this.pdf.setTextColor(255, 255, 255)
      this.pdf.setFontSize(24)
      this.pdf.setFont('helvetica', 'bold')
      this.pdf.text('REPORTE DE MARKETING', this.margins.left, 25)
      
      this.pdf.setFontSize(12)
      const fecha = new Date().toLocaleDateString('es-ES')
      this.pdf.text(`Generado: ${fecha}`, this.margins.left, 35)

      this.currentY = 50
    } catch (error) {
      this.currentY = 20
    }
  }

  private addKPISummary(data: DashboardData): void {
    try {
      this.checkPageSpace(80)
      
      this.pdf.setTextColor(0, 0, 0)
      this.pdf.setFontSize(18)
      this.pdf.setFont('helvetica', 'bold')
      this.pdf.text('RESUMEN EJECUTIVO', this.margins.left, this.currentY)
      this.currentY += 15

      const kpis = [
        `Campanas Activas: ${data.totalCampaigns}`,
        `Presupuesto Total: $${Math.round(data.totalApprovedBudget).toLocaleString()}`,
        `Impresiones: ${data.totalImpressions.toLocaleString()}`,
        `Clics: ${data.totalClicks.toLocaleString()}`,
        `Precision IA: ${data.predictionAccuracy.toFixed(1)}%`
      ]

      this.pdf.setFontSize(12)
      this.pdf.setFont('helvetica', 'normal')
      
      kpis.forEach((kpi, index) => {
        if (index % 2 === 0) {
          this.pdf.setFillColor(248, 250, 252)
          this.pdf.rect(this.margins.left, this.currentY - 2, 170, 8, 'F')
        }
        
        this.pdf.setTextColor(0, 0, 0)
        this.pdf.text(kpi, this.margins.left + 5, this.currentY + 3)
        this.currentY += 10
      })

      this.currentY += 10
    } catch (error) {
      this.currentY += 20
    }
  }

  private addChannelAnalysis(data: DashboardData): void {
    try {
      this.checkPageSpace(60)
      
      this.pdf.setTextColor(0, 0, 0)
      this.pdf.setFontSize(16)
      this.pdf.setFont('helvetica', 'bold')
      this.pdf.text('ANALISIS POR CANALES', this.margins.left, this.currentY)
      this.currentY += 15

      if (data.channelDistribution && data.channelDistribution.length > 0) {
        this.pdf.setFontSize(12)
        this.pdf.setFont('helvetica', 'normal')
        
        const total = data.channelDistribution.reduce((sum, item) => sum + (item.value || 0), 0)
        
        data.channelDistribution.forEach((channel, index) => {
          const percentage = total > 0 ? ((channel.value || 0) / total * 100).toFixed(1) : '0.0'
          
          const barWidth = Math.min(80, (channel.value || 0) / total * 80)
          this.pdf.setFillColor(66, 102, 244)
          this.pdf.rect(this.margins.left + 70, this.currentY - 2, barWidth, 4, 'F')
          
          this.pdf.setTextColor(0, 0, 0)
          this.pdf.text(`${channel.label || 'N/A'}: ${percentage}%`, this.margins.left, this.currentY)
          this.currentY += 8
        })
      } else {
        this.pdf.setFontSize(10)
        this.pdf.text('No hay datos de canales disponibles', this.margins.left, this.currentY)
        this.currentY += 10
      }

      this.currentY += 10
    } catch (error) {
      this.currentY += 20
    }
  }

  private addCampaignsTable(campaigns: any[]): void {
    try {
      this.checkPageSpace(80)
      
      this.pdf.setTextColor(0, 0, 0)
      this.pdf.setFontSize(16)
      this.pdf.setFont('helvetica', 'bold')
      this.pdf.text('CAMPANAS ACTIVAS', this.margins.left, this.currentY)
      this.currentY += 15

      if (!campaigns || campaigns.length === 0) {
        this.pdf.setFontSize(12)
        this.pdf.text('No hay campanas disponibles', this.margins.left, this.currentY)
        this.currentY += 20
        return
      }

      this.pdf.setFillColor(51, 65, 85)
      this.pdf.rect(this.margins.left, this.currentY, 170, 8, 'F')
      
      this.pdf.setTextColor(255, 255, 255)
      this.pdf.setFontSize(10)
      this.pdf.setFont('helvetica', 'bold')
      this.pdf.text('Campana', this.margins.left + 2, this.currentY + 5)
      this.pdf.text('Canal', this.margins.left + 70, this.currentY + 5)
      this.pdf.text('Presupuesto', this.margins.left + 110, this.currentY + 5)
      this.pdf.text('Clics', this.margins.left + 150, this.currentY + 5)
      
      this.currentY += 12

      campaigns.slice(0, 10).forEach((campaign, index) => {
        this.checkPageSpace(10)
        
        if (index % 2 === 0) {
          this.pdf.setFillColor(248, 250, 252)
          this.pdf.rect(this.margins.left, this.currentY - 2, 170, 8, 'F')
        }

        this.pdf.setTextColor(0, 0, 0)
        this.pdf.setFontSize(9)
        this.pdf.setFont('helvetica', 'normal')
        
        const nombre = (campaign.nombre || 'N/A').substring(0, 20)
        const canal = campaign.canal || 'N/A'
        const presupuesto = campaign.presupuesto || '0'
        const clics = campaign.clicks || '0'
        
        this.pdf.text(nombre, this.margins.left + 2, this.currentY + 3)
        this.pdf.text(canal, this.margins.left + 70, this.currentY + 3)
        this.pdf.text(`$${presupuesto}`, this.margins.left + 110, this.currentY + 3)
        this.pdf.text(clics.toString(), this.margins.left + 150, this.currentY + 3)
        
        this.currentY += 8
      })

      if (campaigns.length > 10) {
        this.currentY += 5
        this.pdf.setFontSize(9)
        this.pdf.setFont('helvetica', 'italic')
        this.pdf.text(`... y ${campaigns.length - 10} campanas mas`, this.margins.left, this.currentY)
      }

      this.currentY += 15
    } catch (error) {
      this.currentY += 20
    }
  }

  private addSimpleFooter(): void {
    try {
      const footerY = this.pageHeight - 20
      
      this.pdf.setTextColor(128, 128, 128)
      this.pdf.setFontSize(8)
      this.pdf.setFont('helvetica', 'normal')
      this.pdf.text('Marketing Dashboard Report - Generado automaticamente', this.margins.left, footerY)
    } catch (error) {
      
    }
  }

  private checkPageSpace(requiredSpace: number): void {
    if (this.currentY + requiredSpace > this.pageHeight - 30) {
      this.pdf.addPage()
      this.currentY = this.margins.top
    }
  }
}

 