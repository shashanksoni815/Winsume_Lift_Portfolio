import { Schema, model } from "mongoose";
const portalSettingsSchema = new Schema({
    siteName: { type: String, required: true },
    tagline: { type: String, required: true },
    heroHeading: { type: String },
    supportEmail: { type: String, required: true },
    supportPhone: { type: String, required: true },
    projectsCompleted: { type: Number, default: 200 },
    citiesServed: { type: Number, default: 15 },
    yearsExperience: { type: Number, default: 6 },
    satisfactionRate: { type: Number, default: 98 },
    homePortfolioProjectIds: { type: [String], default: [] },
    ourWorkFeaturedProductIds: { type: [String], default: [] },
    homeCollectionsProductIds: { type: [String], default: [] },
    allowRegistration: { type: Boolean, default: true },
    requireEmailVerification: { type: Boolean, default: true },
    enableSocialLogin: { type: Boolean, default: false },
    maintenanceMode: { type: Boolean, default: false },
    allowGuestCheckout: { type: Boolean, default: true },
    enableChat: { type: Boolean, default: false },
    enableNotifications: { type: Boolean, default: true },
    maxFileUploadSize: { type: Number, default: 10 }
}, { _id: false });
const themeSettingsSchema = new Schema({
    primaryColor: { type: String, default: "#1a3332" },
    secondaryColor: { type: String, default: "#2a4544" },
    accentColor: { type: String, default: "#f97316" },
    backgroundColor: { type: String, default: "#ffffff" },
    textColor: { type: String, default: "#1a1a1a" },
    fontFamily: { type: String, default: "Inter" },
    logoUrl: { type: String, default: "" },
    faviconUrl: { type: String, default: "" }
}, { _id: false });
const pageConfigSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    path: { type: String, required: true },
    icon: { type: String },
    enabled: { type: Boolean, default: true },
    visible: { type: Boolean, default: true },
    order: { type: Number, default: 1 },
    requiredAuth: { type: Boolean, default: false }
}, { _id: false });
const portalConfigSchema = new Schema({
    portalSettings: { type: portalSettingsSchema, required: true },
    themeSettings: { type: themeSettingsSchema, required: true },
    pagesConfig: { type: [pageConfigSchema], default: [] }
}, {
    timestamps: true
});
export const PortalConfig = model("PortalConfig", portalConfigSchema);
