import dotenv from "dotenv";
dotenv.config();
const getEnv = (key, defaultValue) => {
    const value = process.env[key] ?? defaultValue;
    if (value === undefined) {
        throw new Error(`Missing required env var: ${key}`);
    }
    return value;
};
const defaultCorsOrigins = () => {
    if (process.env.NODE_ENV === "production") {
        return [
            "https://winsumelift.com",
            "https://www.winsumelift.com",
            "http://winsumelift.com",
            "http://www.winsumelift.com"
        ];
    }
    return ["http://localhost:5173", "http://127.0.0.1:5173"];
};
const corsOriginsFromEnv = process.env.CORS_ORIGIN?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
export const corsAllowedOrigins = corsOriginsFromEnv && corsOriginsFromEnv.length > 0
    ? corsOriginsFromEnv
    : defaultCorsOrigins();
export const env = {
    nodeEnv: process.env.NODE_ENV ?? "development",
    port: Number(process.env.PORT ?? 5000),
    mongoUri: getEnv("MONGODB_URI", "mongodb://localhost:27017/winsume"),
    jwtSecret: getEnv("JWT_SECRET", "dev_jwt_secret_change_me"),
    jwtRefreshSecret: getEnv("JWT_REFRESH_SECRET", "dev_refresh_secret_change_me"),
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "15m",
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? "7d"
};
