export const landingTemplateMap:any = {
  "hero-landing": () =>
    import("@landing/template/HeroLanding.vue"),

  "complex-landing": () =>
    import("@landing/template/ComplexLanding.vue"),

  "enterprise-landing": ()=>
    import("@/landing/template/NewLanding.vue")
};
