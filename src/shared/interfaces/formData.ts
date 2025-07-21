// src/shared/interfaces/formData.ts

export interface FormData {
  no_of_days: number;
  approved_budget: number;
  clicks: number;
  impressions: number;
  ext_service_name_DV360: number;
  ext_service_name_Facebook_Ads: number;
  ext_service_name_Google_Ads: number;
  channel_name_Display: number;
  channel_name_Mobile: number;
  channel_name_Search: number;
  channel_name_Social: number;
  channel_name_Video: number;
  ext_service_name_enc: number;
  channel_name_enc: number;
  weekday_cat_week_day: number;
  weekday_cat_week_end: number;
  weekday_cat_enc: number;
}

export interface MarketingImpressionsPayload {
  no_of_days: number;
  approved_budget: number;
  ext_service_name_DV360: number;
  ext_service_name_Facebook_Ads: number;
  ext_service_name_Google_Ads: number;
  channel_name_Display: number;
  channel_name_Mobile: number;
  channel_name_Search: number;
  channel_name_Social: number;
  channel_name_Video: number;
  weekday_cat_week_day: number;
  weekday_cat_week_end: number;
}

export interface MarketingClicksPayload extends MarketingImpressionsPayload {}

export interface MarketingMediaCostPayload extends MarketingImpressionsPayload {}

export interface MarketingNoDaysPayload {
  clicks: number;
  impressions: number;
  approved_budget: number;
  ext_service_name_enc: number;
  channel_name_enc: number;
  weekday_cat_enc: number;
}

export interface MarketingBudgetPayload {
  clicks: number;
  impressions: number;
  no_of_days: number;
  ext_service_name_enc: number;
  channel_name_enc: number;
  weekday_cat_enc: number;
}

export interface MarketingExternalServicePayload {
  clicks: number;
  impressions: number;
  no_of_days: number;
  approved_budget: number;
  channel_name_enc: number;
  weekday_cat_enc: number;
}

export interface MarketingWeekDayPayload {
  clicks: number;
  impressions: number;
  no_of_days: number;
  approved_budget: number;
  ext_service_name_enc: number;
  channel_name_enc: number;
}

export interface MarketingChannelNamePayload extends MarketingWeekDayPayload {}

export interface ModelPredictionConfig {
  endpoint: string;
  key: string;
  getPayload: (formData: FormData) => any;
}

export interface SelectOption {
  value: number; // El valor numérico que espera el backend (0, 1, 2, etc. o one-hot encoded)
  label: string; // El texto legible para el usuario (ej. "Google Ads", "Lunes a Viernes")
}