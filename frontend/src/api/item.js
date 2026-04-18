import { apiRequest } from "../utils/apiRequest.js";

const itemURL = "/api/v1/items";

export const createItem = (itemData) =>
    apiRequest(itemURL, "POST", itemData, true);

export const getItems = (page = 1, limit = 10) =>
    apiRequest(`${itemURL}?page=${page}&limit=${limit}`, "GET", null, true);

export const getItemById = (itemId) =>
    apiRequest(`${itemURL}/${itemId}`, "GET", null, true);

export const updateItem = (itemId, updatedData) =>
    apiRequest(`${itemURL}/${itemId}`, "PUT", updatedData, true);

export const deleteItem = (itemId) =>
    apiRequest(`${itemURL}/${itemId}`, "DELETE", null, true);