import { Item } from "../models/item.models";
import { ApiError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";
import { asyncHandler } from "../utils/async-handler";

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