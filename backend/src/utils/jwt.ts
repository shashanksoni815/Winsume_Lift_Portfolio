import jwt, { type SignOptions, type Secret } from "jsonwebtoken";
import { env } from "../config/env.js";

export interface JwtPayload {
  sub: string;
  role: "admin" | "manager" | "user";
}

export const signAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.jwtSecret as Secret, {
    expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"]
  });
};

export const signRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.jwtRefreshSecret as Secret, {
    expiresIn: env.jwtRefreshExpiresIn as SignOptions["expiresIn"]
  });
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.jwtSecret) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.jwtRefreshSecret) as JwtPayload;
};

