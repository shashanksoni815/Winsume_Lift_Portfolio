import { Schema, model, Document } from "mongoose";

export type NotificationType = "success" | "warning" | "info" | "error";

export interface NotificationMeta {
  entityType?: string;
  entityId?: string;
  action?: string;
  actorUserId?: string;
}

export interface NotificationDocument extends Document {
  title: string;
  message: string;
  type: NotificationType;
  category: string;
  read: boolean;
  meta?: NotificationMeta;
  createdAt: Date;
  updatedAt: Date;
}

const notificationMetaSchema = new Schema<NotificationMeta>(
  {
    entityType: { type: String },
    entityId: { type: String },
    action: { type: String },
    actorUserId: { type: String }
  },
  { _id: false }
);

const notificationSchema = new Schema<NotificationDocument>(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["success", "warning", "info", "error"], default: "info" },
    category: { type: String, default: "System" },
    read: { type: Boolean, default: false },
    meta: { type: notificationMetaSchema, default: undefined }
  },
  { timestamps: true }
);

export const Notification = model<NotificationDocument>("Notification", notificationSchema);

