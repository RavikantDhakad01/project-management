import ApiResponse from "../utils/Api-Response.js"
import { apiErrors } from "../utils/Api-errors.js"
import User from "../models/User.Model.js"
import { Project } from "../models/project.model.js"
import { ProjectMember } from "../models/projectmember.model.js"
import mongoose, { Schema } from 'mongoose'
import { UserRolesEnum, AvailableUserRole } from "../utils/Constants.js"


const getProjects = async (req, res, next) => {
    try {
        const projects = await ProjectMember.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.user._id)
                }
            },
            {
                $lookup: {
                    from: "projects",
                    localField: "project",
                    foreignField: "_id",
                    as: "projects",
                    pipeline: [
                        {
                            $lookup: {
                                from: "projectmembers",
                                localField: "_id",
                                foreignField: "project",
                                as: "projectmembers"
                            }
                        },
                        {
                            $addFields: {
                                members: {
                                    $size: "$projectmembers"
                                }
                            }
                        }

                    ]
                }
            },
            {
                $unwind: "$projects"
            },
            {
                $project: {
                    _id: 0,
                    role: 1,
                    project: {
                        name: 1,
                        _id: 1,
                        description: 1,
                        members: 1,
                        createdAt: 1,
                        createdBy: 1
                    }

                }
            }
        ])

        return res.status(200).json(
            new ApiResponse(200, projects, "Projects fetched successfully")
        )
    } catch (error) {
        return next(error)
    }
}

const getProjectById = async (req, res, next) => {
    try {

        const { projectId } = req.body
        const project = await Project.findById(projectId)

        if (!project) {
            throw new apiErrors(404, "project not found")
        }

        return res.status(200).json(new ApiResponse(200, project, "project details fethed successfully"))

    } catch (error) {
        return next(error)
    }
}

const createProject = async (req, res, next) => {
    try {
        const { name, description } = req.body
        const project = await Project.create({
            name,
            description,
            createdBy: new mongoose.Types.ObjectId(req.user?._id)

        })

        if (!project) {
            throw new apiErrors(401, "Unauthorized access")
        }

        await ProjectMember.create({
            user: new mongoose.Types.ObjectId(req.user?._id),
            project: new mongoose.Types.ObjectId(project._id),
            role: UserRolesEnum.ADMIN
        })
        return res.status(200).json(new ApiResponse(200, project, "Project completed successfully"))
    } catch (error) {
        return next(error)
    }
}

const updateProject = async (req, res, next) => {
    try {
        const { name, description } = req.body
        const { projectId } = req.params
        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            {
                name,
                description,
            },
            {
                new: true
            }
        )

        if (!updatedProject) {
            throw new apiErrors(404, "Project not found")
        }
        return res.status(200).json(new ApiResponse(200, updatedProject, "Project updated successfully"))
    }
    catch (error) {
        return next(error)
    }
}



const deleteProject = async (req, res, next) => {
    try {
        const { projectId } = req.params
        const deletedProject = await Project.findByIdAndDelete(projectId)
        if (!deletedProject) {
            throw new apiErrors(404, "Project not found")
        }
        return res.status(200, deletedProject, "Project deleted sucessfully")
    } catch (error) {
        return next(error)
    }
}

const addMembersToProject = async (req, res, next) => {
    try {

    } catch (error) {
        return next(error)
    }
}

const getProjectMembers = async (req, res, next) => {
    try {

    } catch (error) {
        return next(error)
    }
}

const updateMemberRole = async (req, res, next) => {
    try {

    } catch (error) {
        return next(error)
    }
}
const deleteMember = async (req, res, next) => {
    try {

    } catch (error) {
        return next(error)
    }
}

export { getProjects, getProjectById, createProject, updateProject, deleteProject, addMembersToProject, getProjectMembers, updateMemberRole, deleteMember }