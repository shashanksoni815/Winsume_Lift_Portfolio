import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/User.js";
import { hashPassword } from "./utils/hash.js";
dotenv.config();
const mongoUri = process.env.MONGODB_URI ?? "mongodb://localhost:27017/winsume";
const ADMIN_EMAIL = "admin@winsumelift.com";
const ADMIN_PASSWORD = "Admin@123";
const ADMIN_NAME = "Winsume Admin";
async function seed() {
    await mongoose.connect(mongoUri);
    // eslint-disable-next-line no-console
    console.log("Connected:", mongoUri);
    const passwordHash = await hashPassword(ADMIN_PASSWORD);
    const existing = await User.findOne({ email: ADMIN_EMAIL });
    if (existing) {
        existing.passwordHash = passwordHash;
        existing.role = "admin";
        existing.status = "active";
        existing.fullName = ADMIN_NAME;
        await existing.save();
        // eslint-disable-next-line no-console
        console.log("Updated existing user to admin:", ADMIN_EMAIL);
    }
    else {
        await User.create({
            email: ADMIN_EMAIL,
            passwordHash,
            role: "admin",
            status: "active",
            fullName: ADMIN_NAME
        });
        // eslint-disable-next-line no-console
        console.log("Created admin:", ADMIN_EMAIL);
    }
    // eslint-disable-next-line no-console
    console.log("Login with:");
    // eslint-disable-next-line no-console
    console.log("  Email:   ", ADMIN_EMAIL);
    // eslint-disable-next-line no-console
    console.log("  Password:", ADMIN_PASSWORD);
    await mongoose.disconnect();
}
seed().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
});
