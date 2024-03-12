import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select(
        "tasks",
        search
          ? {
              name: search,
              email: search,
            }
          : null
      );

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title || !description) {
        return res.writeRead(400).end(
          JSON.stringify({
            message: "Título e descrição são obrigatórios",
          })
        );
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        completed_at: null,
      };

      database.insert("tasks", task);

      return res.writeHead(200).end(
        JSON.stringify({
          message: "Tarefa criada com sucesso!",
        })
      );
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const { title, description } = req.body;

      const [task] = database.select("tasks", { id });

      if (!task) {
        return res.writeHead(404).end(
          JSON.stringify({
            message: "O registro não existe",
          })
        );
      }

      if (!title || !description) {
        return res.writeRead(400).end(
          JSON.stringify({
            message: "Título e descrição são obrigatórios",
          })
        );
      }

      database.update("tasks", id, {
        ...task,
        title,
        description,
        updated_at: new Date().toISOString(),
      });

      return res.writeHead(200).end(
        JSON.stringify({
          message: "Tarefa editada com sucesso!",
        })
      );
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select("tasks", { id });

      if (!task) {
        return res.writeHead(404).end(
          JSON.stringify({
            message: "O registro não existe",
          })
        );
      }

      database.delete("tasks", id);

      res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select("tasks", { id });

      if (!task) {
        return res.writeHead(404).end(
          JSON.stringify({
            message: "O registro não existe",
          })
        );
      }

      if (task) {
        database.update("tasks", id, {
          ...task,
          completed_at: task.completed_at ? null : new Date().toISOString(),
        });

        return res.writeHead(200).end(
          JSON.stringify({
            message: "Tarefa atualizada com sucesso!",
          })
        );
      } else {
        res.writeHead(404).end();
      }
    },
  },
];
