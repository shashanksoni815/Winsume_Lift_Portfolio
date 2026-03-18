import { Notification, NotificationMeta, NotificationType } from "../models/Notification.js";

export async function notifyAdmin(input: {
  title: string;
  message: string;
  type?: NotificationType;
  category?: string;
  meta?: NotificationMeta;
}): Promise<void> {
  try {
    await Notification.create({
      title: input.title,
      message: input.message,
      type: input.type ?? "info",
      category: input.category ?? "System",
      read: false,
      meta: input.meta
    });
  } catch {
    // Never block primary flows if notifications fail.
  }
}

