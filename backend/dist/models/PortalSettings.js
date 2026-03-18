import mongoose, { Schema } from "mongoose";
const PortalSettingsSchema = new Schema({
    siteName: { type: String, default: "Winsume Lift Portal" },
    tagline: String,
    supportEmail: String,
    supportPhone: String,
    allowRegistration: { type: Boolean, default: true },
    requireEmailVerification: { type: Boolean, default: false },
    enableSocialLogin: { type: Boolean, default: false },
    maintenanceMode: { type: Boolean, default: false },
    allowGuestCheckout: { type: Boolean, default: true },
    enableChat: { type: Boolean, default: true },
    enableNotifications: { type: Boolean, default: true },
    maxFileUploadSizeMb: { type: Number, default: 25 }
}, { timestamps: true });
export const PortalSettings = mongoose.model("PortalSettings", PortalSettingsSchema);
