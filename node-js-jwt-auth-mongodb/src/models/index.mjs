import mongoose from "mongoose";
import User from "./user.model.mjs"
import Role from "./role.mdole.mjs"

mongoose.Promise = global.Promise

export const db = {};

db.moongose = mongoose;

db.user = User;

db.role = Role

db.ROLES = ["user", "admin", "moderator"]

