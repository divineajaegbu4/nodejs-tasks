import mongoose from "mongoose";

export const Role = mongoose.model(
    "Role", // moongose will converts it to plural (roles) 
    new mongoose.Schema({
        name: string
    })
)