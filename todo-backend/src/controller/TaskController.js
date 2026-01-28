import TaskService from "../services/TaskService.js";

class TaskController {
    constructor() {
        this.taskService = new TaskService();
    }

    async getAll(req, res, next) {
        try {

            const tasks = await this.taskService.getAll()
            res.status(200).json(tasks);

        } catch (error) {
            next(error);
        }
    }

    async getOne(req, res, next) {
        const { id } = req.params
        //console.log(id)
        try {
            const task = await this.taskService.getOne(id);

            res.status(200).json(task)

        } catch (error) {
            next(error);
        }
    }

    async taskCreate(req, res, next) {
        const { title, description, status } = req.body

        try {
            const newTask = await this.taskService.taskCreate(title, description, status);

            res.status(201).json(newTask);

        } catch (error) {
            next(error)
        }
    }

    async updateAll(req, res, next) {
        const { id } = req.params
        const { title, description, status } = req.body

        try {
            const UpdatedTask = await this.taskService.updateAll(id, title, description, status );
            
            res.status(200).json(UpdatedTask);

        } catch (error) {
            next(error)
        }
    }

    async updateOne(req, res, next) {
        const { id } = req.params
        const data = req.body
        try {
            const updateTask = await this.taskService.updateOne(id, data);
            res.status(200).json(updateTask);
        } catch (error) {
            next(error)
        }
    }

    async taskDelete(req, res, next) {
        const { id } = req.params
        try {
            await this.taskService.taskDelete(id);
            res.status(200).send('Deletado com sucesso')

        } catch (error) {
            next(error)
        }
    }

}

export default TaskController;