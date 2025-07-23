export const landingTemplateMap:any = {
  "hero-landing": () =>
    import("@landing/template/HeroLanding.vue"),

  "complex-landing": () =>
    import("@landing/template/ComplexLanding.vue"),

  "default": ()=>
    import("@/landing/template/NewLanding.vue")
};
