import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        sku: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        quantity: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export const Item = mongoose.model("Item", itemSchema);