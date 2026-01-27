import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "API para gerenciamento de tarefas",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
    components: {
    schemas: {
      Task: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1
          },
          title: {
            type: "string",
            example: "Documentar a Api corretamente"
          },
          status: {
            type: "string",
            example: "concluido"
          },
          createdAt: {
            type: "string",
            format: "date-time"
          },
          updatedAt: {
            type: "string",
            format: "date-time"
          }
        }
      },
      TaskCreate: {
        type: "object",
        required: ["title", "description"],
        properties: {
          title: {
            type: "string",
            example: "Estudar Swagger"
          },
          description: {
            type: "string",
            example: "Documentar todas as rotas da API"
          }
        }
      },
      TaskUpdate:{
        type: "object",
        properties: {
          title: {
            type: "string",
            example: "Título atualizado"
          },
          description: {
            type: "string",
            example: "Descrição atualizada"
          },
          status: {
            type: "string",
            example: "concluido"
          }
        }
      },
      TaskStatusUpdate: {
        type: "object",
        properties: {
          status: {
            type: "string",
            example: "concluido"
          }
        }
      }
    }
  },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options)
export default swaggerSpec; 
