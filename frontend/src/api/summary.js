import { apiRequest } from "../utils/apiRequest.js";

const summaryURL = "/api/v1/dashboard/summary";

export const getSummary = () =>
    apiRequest(summaryURL, "GET", null, true);