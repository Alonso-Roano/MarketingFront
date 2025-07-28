export const landingTemplateMap:any = {
  "hero-landing": () =>
    import("@landing/template/HeroLanding.vue"),

  "complex-landing": () =>
    import("@landing/template/ComplexLanding.vue"),

  "default": ()=>
    import("@/landing/template/NewLanding.vue"),
  "modernLanding": ()=>
    import("@/landing/template/ModernLanding.vue"),
  "minimalLanding": ()=>
    import("@/landing/template/MinimalLanding.vue"),
    "productShowcase": ()=>
    import("@/landing/template/ProductShowcase.vue"),
    "serviceAgency": ()=>
    import("@/landing/template/ServiceAgency.vue"),
    "educationCourse": ()=>
    import("@/landing/template/EducationCourse.vue"),
    "healthCoach": ()=>
    import("@/landing/template/HealthCoach.vue"),
};
