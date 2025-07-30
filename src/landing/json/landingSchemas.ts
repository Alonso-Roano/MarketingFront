import { defaultLandingPageSchema } from "../schemas/defaultLandingPage.schema";
import { modernLandingSchema } from "../schemas/modernLanding.schema";
import { minimalLandingSchema } from "../schemas/minimalLanding.schema";
import { productShowcaseSchema } from "../schemas/productShowcase.schema";
import { serviceAgencySchema } from "../schemas/serviceAgency.schema";
import { educationCourseSchema } from "../schemas/educationCourse.schema";
import { healthCoachSchema } from "../schemas/healthCoach.schema";

export const landingSchemas:any = {
    "default": defaultLandingPageSchema,
/*     "modernLanding": modernLandingSchema,
    "minimalLanding": minimalLandingSchema,
    "productShowcase": productShowcaseSchema,
    "serviceAgency": serviceAgencySchema,
    "educationCourse": educationCourseSchema,
    "healthCoach": healthCoachSchema, */
};
