import { Router } from "express";
import TaskController from "../controller/TaskController.js";
import validate from "../middlewares/validateTask.js";

const task = Router();
const controller = new TaskController();


/**
 * @openapi
 * /task:
 *      get:
 *          summary: Lista todas as tarefas
 *          tags:
 *              - Tasks
 *          responses:
 *              200:
 *                  description: Lista retornada com sucesso
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Task'                        
 */

task.get('/', (req, res, next) => controller.getAll(req, res, next));

/**
 * @openapi
 * /task/{id}:
 *   get:
 *     summary: Busca uma tarefa pelo ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarefa não encontrada
 */
task.get('/:id', validate.validIdParam, (req, res, next) => controller.getOne(req, res, next));

/**
 * @openapi
 * /task:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: Estudar Swagger
 *               description:
 *                 type: string
 *                 example: Aprender documentação OpenAPI
 *               status:
 *                 type: string
 *                 example: a_fazer
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Dados inválidos
 */
task.post('/', validate.validateTaskPost, (req, res, next) => controller.taskCreate(req, res, next));

/**
 * @openapi
 * /task/{id}: 
 *  put:
 *      summary: Atualizar todos os dados de uma tarefa
 *      tags:
 *          - Tasks
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema: 
 *              type: integer
 *            description: ID da tarefa
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/TaskUpdate'
 *      responses:
 *          200:
 *              description: Tarefa atualizada com sucesso 
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 *          404:
 *              description: Tarefa não encontrada
 */
task.put('/:id', validate.validIdParam, validate.validateTaskPut, (req, res, next) => controller.updateAll(req, res, next));

/**
 * @openapi
 * /task/{id}:
 *   patch:
 *     summary: Atualiza o status da tarefa
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskStatusUpdate'
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarefa não encontrada
 */
task.patch('/:id', validate.validIdParam, validate.validateTaskStatus, (req, res, next)=> controller.updateOne(req, res, next));

/**
 * @openapi
 * /task/{id}:
 *   delete:
 *     summary: Remove uma tarefa pelo ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tarefa deletada com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */

task.delete('/:id', validate.validIdParam, (req, res, next) => controller.taskDelete(req, res, next));


export default task;