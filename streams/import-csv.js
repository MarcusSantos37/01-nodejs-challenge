import { parse } from "csv-parse";
import { randomUUID } from "node:crypto";
import fs from "node:fs";

(async () => {
  const csvPath = new URL("./tasks.csv", import.meta.url);

  const parsedTasks = fs.createReadStream(csvPath).pipe(
    parse({
      delimiter: ",",
      skip_empty_lines: true,
      fromLine: 2,
    })
  );

  for await (const task of parsedTasks) {
    const [title, description] = task;

    fetch("http://localhost:3333/tasks", {
      method: "POST",
      body: JSON.stringify({
        id: randomUUID(),
        title,
        description,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        completed_at: null,
      }),
    })
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        console.log(data);
      });

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
})();
