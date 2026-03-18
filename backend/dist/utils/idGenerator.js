let inquiryCounter = 1;
let projectCounter = 1;
const pad = (num) => num.toString().padStart(3, "0");
export const generateInquiryId = () => {
    const id = `INQ${pad(inquiryCounter)}`;
    inquiryCounter += 1;
    return id;
};
export const generateProjectId = () => {
    const id = `PRJ${pad(projectCounter)}`;
    projectCounter += 1;
    return id;
};
