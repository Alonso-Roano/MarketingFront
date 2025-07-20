import { complex } from "../schemas/complexLanding.schema";
import { hero } from "../schemas/landingExample.schema";
import { landingPageSchema } from "../schemas/newLanding.schema";


export const landingSchemas:any = {
    "hero-landing": hero,
    "complex-landing": complex,
    "default": landingPageSchema
};
