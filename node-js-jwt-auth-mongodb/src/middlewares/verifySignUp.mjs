// create a new User: object.save()
// find a User by id: User.findById(id)
// find User by email: User.findOne({ email: … })
// find User by username: User.findOne({ username: … })
// find all Roles which name in given roles array: Role.find({ name: { $in: roles } }

import { db } from "../models/index.mjs";

const ROLES = db.ROLES
const User = db.user

const checkDuplicateUsernameOrEmail = (async (req, res, next) => {
  const findUsername = await User.findOne({
    
  })
})