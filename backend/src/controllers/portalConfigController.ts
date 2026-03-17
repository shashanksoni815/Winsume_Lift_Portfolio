import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { PortalConfig, PortalSettings, ThemeSettings, PageConfig } from "../models/PortalConfig.js";

const DEFAULT_PORTAL_SETTINGS: PortalSettings = {
  siteName: "WINSUME LIFT INDIA",
  tagline: "Luxury Vertical Lift Solutions",
  heroHeading: "The Art of Vertical Mastery",
  supportEmail: "support@winsumelift.com",
  supportPhone: "+91 1800 123 4567",
  projectsCompleted: 200,
  citiesServed: 15,
  yearsExperience: 6,
  satisfactionRate: 98,
  allowRegistration: true,
  requireEmailVerification: true,
  enableSocialLogin: false,
  maintenanceMode: false,
  allowGuestCheckout: true,
  enableChat: false,
  enableNotifications: true,
  maxFileUploadSize: 10,
  homePortfolioProjectIds: ["manhattan-penthouse", "corporate-tower-mumbai", "luxury-villa-delhi", "heritage-hotel-jaipur"],
  ourWorkFeaturedProductIds: [],
  homeCollectionsProductIds: []
};

const DEFAULT_THEME_SETTINGS: ThemeSettings = {
  primaryColor: "#1a3332",
  secondaryColor: "#2a4544",
  accentColor: "#f97316",
  backgroundColor: "#ffffff",
  textColor: "#1a1a1a",
  fontFamily: "Inter",
  logoUrl: "",
  faviconUrl: ""
};

const DEFAULT_PAGES_CONFIG: PageConfig[] = [
  { id: "home", name: "Home", path: "/", enabled: true, visible: true, order: 1, requiredAuth: false },
  { id: "collection", name: "Collection", path: "/collection", enabled: true, visible: true, order: 2, requiredAuth: false },
  { id: "our-work", name: "Our Work", path: "/our-work", enabled: true, visible: true, order: 3, requiredAuth: false },
  { id: "services", name: "Services", path: "/services", enabled: true, visible: true, order: 4, requiredAuth: false },
  { id: "about", name: "About", path: "/about", enabled: true, visible: true, order: 5, requiredAuth: false },
  { id: "contact", name: "Contact", path: "/contact", enabled: true, visible: true, order: 6, requiredAuth: false },
  { id: "inquiry", name: "Inquiry Form", path: "/inquiry", enabled: true, visible: false, order: 7, requiredAuth: false },
  { id: "my-engagements", name: "My Engagements", path: "/my-engagements", enabled: true, visible: false, order: 8, requiredAuth: true }
];

async function getOrCreateConfig() {
  let config = await PortalConfig.findOne();
  if (!config) {
    config = await PortalConfig.create({
      portalSettings: DEFAULT_PORTAL_SETTINGS,
      themeSettings: DEFAULT_THEME_SETTINGS,
      pagesConfig: DEFAULT_PAGES_CONFIG
    });
  }
  return config;
}

export const getPortalConfig = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const config = await getOrCreateConfig();
    res.json({
      id: config.id,
      portalSettings: config.portalSettings,
      themeSettings: config.themeSettings,
      pagesConfig: config.pagesConfig
    });
  } catch (err) {
    next(err);
  }
};

export const updatePortalConfig = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { portalSettings, themeSettings, pagesConfig } = req.body as {
      portalSettings?: Partial<PortalSettings>;
      themeSettings?: Partial<ThemeSettings>;
      pagesConfig?: PageConfig[];
    };

    const config = await getOrCreateConfig();

    if (portalSettings) {
      config.portalSettings = { ...config.portalSettings, ...portalSettings };
    }
    if (themeSettings) {
      config.themeSettings = { ...config.themeSettings, ...themeSettings };
    }
    if (Array.isArray(pagesConfig)) {
      config.pagesConfig = pagesConfig;
    }

    await config.save();

    res.json({
      id: config.id,
      portalSettings: config.portalSettings,
      themeSettings: config.themeSettings,
      pagesConfig: config.pagesConfig
    });
  } catch (err) {
    next(err);
  }
};

export const resetPortalConfig = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const config = await getOrCreateConfig();
    config.portalSettings = DEFAULT_PORTAL_SETTINGS;
    config.themeSettings = DEFAULT_THEME_SETTINGS;
    config.pagesConfig = DEFAULT_PAGES_CONFIG;
    await config.save();

    res.json({
      id: config.id,
      portalSettings: config.portalSettings,
      themeSettings: config.themeSettings,
      pagesConfig: config.pagesConfig
    });
  } catch (err) {
    next(err);
  }
};

