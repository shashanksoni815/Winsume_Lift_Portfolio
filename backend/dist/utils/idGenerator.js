// let inquiryCounter = 1;
// let projectCounter = 1;
// const pad = (num: number): string => num.toString().padStart(3, "0");
// export const generateInquiryId = (): string => {
//   const id = `INQ${pad(inquiryCounter)}`;
//   inquiryCounter += 1;
//   return id;
// };
// export const generateProjectId = (): string => {
//   const id = `PRJ${pad(projectCounter)}`;
//   projectCounter += 1;
//   return id;
// };
import { Inquiry } from "../models/Inquiry.js";
import { Project } from "../models/Project.js";
const pad = (num) => num.toString().padStart(3, "0");
export const generateInquiryId = async () => {
    const last = await Inquiry.findOne({ externalId: /^INQ\d+$/ })
        .sort({ externalId: -1 })
        .select("externalId")
        .lean();
    let next = 1;
    if (last?.externalId) {
        const num = parseInt(last.externalId.replace("INQ", ""), 10);
        if (!isNaN(num))
            next = num + 1;
    }
    // Collision guard
    let candidate = `INQ${pad(next)}`;
    while (await Inquiry.exists({ externalId: candidate })) {
        next += 1;
        candidate = `INQ${pad(next)}`;
    }
    return candidate;
};
export const generateProjectId = async () => {
    const last = await Project.findOne({ externalId: /^PRJ\d+$/ })
        .sort({ externalId: -1 })
        .select("externalId")
        .lean();
    let next = 1;
    if (last?.externalId) {
        const num = parseInt(last.externalId.replace("PRJ", ""), 10);
        if (!isNaN(num))
            next = num + 1;
    }
    // Collision guard
    let candidate = `PRJ${pad(next)}`;
    while (await Project.exists({ externalId: candidate })) {
        next += 1;
        candidate = `PRJ${pad(next)}`;
    }
    return candidate;
};
