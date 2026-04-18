import { Item } from "../models/item.models.js";
import { User } from "../models/user.models.js"
import { asyncHandler } from "../utils/async-handler.js"
import { ApiError } from "../utils/api-error.js"
import { ApiResponse } from "../utils/api-response.js"
import mongoose from "mongoose";


const createItem = asyncHandler(async (req, res) => {
    const { name, sku, quantity, price, category } = req?.body

    const item = await Item.create(
        {
            name,
            category,
            price,
            quantity,
            sku,
            user: new mongoose.Types.ObjectId(req?.user._id)
        }
    )

    if (!item) {
        throw new ApiError(404, "Item not found")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, item, "Item successfully created")
        )
})

const getItems = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const result = await Item.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(req?.user._id)
            }
        },
        {
            $facet: {
                items: [
                    { $sort: { createdAt: -1 } },
                    { $skip: skip },
                    { $limit: limit }
                ],
                totalCount: [
                    { $count: "count" }
                ]
            }
        }
    ])

    if (!result.length) {
        throw new ApiError(404, "Items not found with this account")
    }

    const items = result[0].items;
    const totalItems = result[0].totalCount[0]?.count || 0;

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    page,
                    limit,
                    totalItems,
                    totalPages: Math.ceil(totalItems / limit),
                    items
                },
                "Items fetched successfully"
            )
        )
})

const getItemById = asyncHandler(async (req, res) => {
    const { itemId } = req.params

    const item = await Item.aggregate([
        {
            $match: {
                "_id": new mongoose.Types.ObjectId(itemId),
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            username: 1,
                            email: 1,
                        }
                    }
                ]
            }
        }
    ])

    if (!item.length) {
        throw new ApiError(404, "Item not found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                item,
                "Item fetched successfully",
            )
        )
})

const updateItem = asyncHandler(async (req, res) => {
    const { name, quantity, price, sku, category } = req.body
    const { itemId } = req.params

    const updatedItem = await Item.findByIdAndUpdate(
        itemId,
        {
            name,
            quantity,
            category,
            sku,
            price,
        },
        {
            returnDocument: "after",
        }
    )

    if (!updatedItem) {
        throw new ApiError(404, "Item not found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedItem,
                "Item updated successfully",
            )
        )
})

const deleteItem = asyncHandler(async (req, res) => {
    const { itemId } = req.params

    const deletedItem = await Item.findByIdAndDelete(itemId)

    if (!deletedItem) {
        throw new ApiError(404, "Item not found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                deletedItem,
                "Item deleted successfully",
            )
        )
})

export {
    getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
}