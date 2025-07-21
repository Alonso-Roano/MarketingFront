const endpoints = {
  auth: {
    signup: { method: 'POST', url: '/auth/v1/signup' },
    login: { method: 'POST', url: '/auth/v1/token?grant_type=password' },
    refresh: { method: 'POST', url: '/auth/v1/token?grant_type=refresh_token' },
    logout: { method: 'POST', url: '/auth/v1/logout' },
    user: { method: 'GET', url: '/auth/v1/user' },
  },
  landing: {
    listar: { method: 'GET', url: '/functions/v1/landing' },
    obtener: { method: 'GET', url: '/functions/v1/landing/{id}' },
    crear: { method: 'POST', url: '/functions/v1/landing' },
    actualizar: { method: 'PUT', url: '/functions/v1/landing/{id}' },
    eliminar: { method: 'DELETE', url: '/functions/v1/landing/{id}' },
  },
  project: {
    listar: { method: 'GET', url: '/functions/v1/project' },
    obtener: { method: 'GET', url: '/functions/v1/project/{id}' },
    crear: { method: 'POST', url: '/functions/v1/project' },
    actualizar: { method: 'PUT', url: '/functions/v1/project/{id}' },
    eliminar: { method: 'DELETE', url: '/functions/v1/project/{id}' },
  },
  projectData: {
    listar: { method: 'GET', url: '/functions/v1/project-data' },
    obtener: { method: 'GET', url: '/functions/v1/project-data/{id}' },
    crear: { method: 'POST', url: '/functions/v1/project-data' },
    actualizar: { method: 'PUT', url: '/functions/v1/project-data/{id}' },
    eliminar: { method: 'DELETE', url: '/functions/v1/project-data/{id}' },
  },
  projectPrediction: {
    listar: { method: 'GET', url: '/functions/v1/project-prediction' },
    obtener: { method: 'GET', url: '/functions/v1/project-prediction/{id}' },
    crear: { method: 'POST', url: '/functions/v1/project-prediction' },
    actualizar: { method: 'PUT', url: '/functions/v1/project-prediction/{id}' },
    eliminar: { method: 'DELETE', url: '/functions/v1/project-prediction/{id}' },
  },
  MinOS: {
    cargar: { method: 'GET', url: '/minios/get-file' },
  },
  stats: {
    listar: { method: 'GET', url: '/functions/v1/stats' },
  }, 
  modelsAI: {
    // Endpoint de IA que genera-misión-visión
    generateMissionVision: { method: 'POST', url: '/ai21/generar-mision-vision' },

    // APIS DE LOS MODELOS ML:
    marketingImpressionsPredict: { method: 'POST', url: '/modelo/marketing_impressions/predict' },
    marketingImpressionsInfo: { method: 'GET', url: '/modelo/marketing_impressions/info' },

    marketingClicksPredict: { method: 'POST', url: '/modelo/marketing_clicks/predict' },
    marketingClicksInfo: { method: 'GET', url: '/modelo/marketing_clicks/info' },

    marketingMediaCostPredict: { method: 'POST', url: '/modelo/marketing_media_cost/predict' },
    marketingMediaCostInfo: { method: 'GET', url: '/modelo/marketing_media_cost/info' },

    marketingNoDaysPredict: { method: 'POST', url: '/modelo/marketing_no_days/predict' },
    marketingNoDaysInfo: { method: 'GET', url: '/modelo/marketing_no_days/info' },

    marketingBudgetPredict: { method: 'POST', url: '/modelo/marketing_budget/predict' },
    marketingBudgetInfo: { method: 'GET', url: '/modelo/marketing_budget/info' },

    marketingExternalServicePredict: { method: 'POST', url: '/modelo/marketing_external_service/predict' },
    marketingExternalServiceInfo: { method: 'GET', url: '/modelo/marketing_external_service/info' },

    marketingWeekDayPredict: { method: 'POST', url: '/modelo/marketing_week_day/predict' },
    marketingWeekDayInfo: { method: 'GET', url: '/modelo/marketing_week_day/info' },

    marketingChannelNamePredict: { method: 'POST', url: '/modelo/marketing_chanel_name/predict' },
    marketingChannelNameInfo: { method: 'GET', url: '/modelo/marketing_chanel_name/info' },
  },
}

export default endpoints
