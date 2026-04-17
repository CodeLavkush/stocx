import { Item } from "../models/item.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

const getSummary = asyncHandler(async (req, res) => {
    const summary = await Item.aggregate([
        {
            $group: {
                "_id": null,
                "totalQuantity": {
                    $sum: "$quantity"
                },
                "totalItems": {
                    $sum: 1
                }
            }
        }
    ])

    if (!summary) {
        throw new ApiError(404, "Summary failed to generate")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                summary,
                "Summary fetched successfully",
            )
        )
})

export {
    getSummary,
}