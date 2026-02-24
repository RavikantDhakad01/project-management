import { Project } from "../models/project.model.js"
import { apiErrors } from "../utils/Api-errors.js"
import ApiResponse from "../utils/Api-Response.js"
import { Task } from "../models/task.model.js"

const getTasks = async (req, res, next) => {
    try {

        const { projectId } = req.body
        const project = await Project.findById(projectId)

        if (!project) {
            throw new apiErrors(404, "project not found")
        }
        const tasks = await Task.findOne({
            project: new mongoose.Types.ObjectId(projectId)
        }).populate("assignedTo", "avatar username fullName")

        return res.status(200).json(new ApiResponse(200, tasks, "tasks fetched successfully"))

    } catch (error) {
        return next(error)
    }
}

const createTask = async (req, res, next) => {
    try {

    } catch (error) {
        return next(error)
    }
}

const getTaskById = async (req, res, next) => {
    try {

    } catch (error) {
        return next(error)
    }
}


const updateTask = async (req, res, next) => {
    try {

    } catch (error) {
        return next(error)
    }
}


const deleteTask = async (req, res, next) => {
    try {

    } catch (error) {
        return next(error)
    }
}

const createSubTask = async (req, res, next) => {
    try {

    } catch (error) {
        return next(error)
    }
}

const deleteSubTask = async (req, res, next) => {
    try {

    } catch (error) {
        return next(error)
    }
}


const updateSubTask = async (req, res, next) => {
    try {

    } catch (error) {
        return next(error)
    }
}


export {
    createSubTask,
    createTask,
    deleteTask,
    deleteSubTask,
    getTaskById,
    getTasks,
    updateSubTask,
    updateTask,
}