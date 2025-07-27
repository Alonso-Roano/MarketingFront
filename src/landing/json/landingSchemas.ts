import { complex } from "../schemas/complexLanding.schema";
import { hero } from "../schemas/landingExample.schema";
import { defaultLandingPageSchema } from "../schemas/defaultLandingPage.schema";
import { modernLandingSchema } from "../schemas/modernLanding.schema";


export const landingSchemas:any = {
    "default": defaultLandingPageSchema,
    "modernLanding": modernLandingSchema
};
