import User from "../models/User.Model.js"
import jwt from 'jsonwebtoken'
import { apiErrors } from "../utils/Api-errors.js"
import { ProjectMember } from "../models/projectmember.model.js"
import { AvailableUserRole } from "../utils/Constants.js"

const verifyToken = async (req, res, next) => {
  const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

  if (!token) {
    throw new apiErrors(401, "UnAuthorized request")
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry")

    if (!user) {
      throw new apiErrors(401, "Invaid access token")
    }

    req.user = user
    next()
  } catch (error) {
    return next(error)
  }
}

const validateProjectPermission = (roles = []) => {
  return async (req, res, next) => {
    try {
      const { projectId } = req.params

      if (!projectId) {
        throw new apiErrors(400, "project id is missing ")

        const projectmember = await ProjectMember.findOne({
          project: new mongoose.Types.ObjectId(projectId),
          user: new mongoose.Types.ObjectId(req.user._id)
        })
        if (!projectmember) {
          throw new apiErrors(400, "project not found")
        }

        const givenRole = projectmember.role
        req.user.role = givenRole

        if (!roles.includes(givenRole)) {
          throw new apiErrors(403,
            "You do not have permission to perform this action")
        }

        next()
      }
    } catch (error) {
      return next(error)
    }
  }
}


export {
  verifyToken,
  validateProjectPermission
}