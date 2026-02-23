import { Router } from "express";
import { getProjects, getProjectById, createProject, updateProject, deleteProject, addMembersToProject, getProjectMembers, updateMemberRole, deleteMember } from "../controllers/project.controllers"

import { createProjectvalidator, addMemberToProjectValidator } from "../validators/index.js"

import { validate } from "../middlewares/validator.middleware.js"
import { verifyToken, validateProjectPermission } from "../middlewares/auth.middleware.js"
import { UserRolesEnum, AvailableUserRole } from "../utils/Constants.js"


const router = Router()

router.use(verifyToken)

router
    .route("/")
    .get(getProjects)
    .post(createProjectvalidator(), validate, createProject)


router
    .route("/:projectId")
    .get(validateProjectPermission(AvailableUserRole), getProjectById)
    .put(validateProjectPermission([UserRolesEnum.ADMIN]), createProjectvalidator(), validate, updateProject)
    .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteProject)

router
    .route("/:projectId/members")
    .get(validateProjectPermission(AvailableUserRole),getProjectMembers)
    .post(validateProjectPermission([UserRolesEnum.ADMIN]), addMemberToProjectValidator(), validate, addMembersToProject)

router
    .route("/:projectId/members/:userId")
    .put(validateProjectPermission([UserRolesEnum.ADMIN]), updateMemberRole)
    .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteMember)

export default router