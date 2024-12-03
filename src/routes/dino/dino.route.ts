import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { validInput } from "./dino.input.ts";

export const dino = new Hono().basePath("/dino");
dino
  .get("/", async (c) => {
    const deno = await db.dinosaur.findMany();
    return c.json(deno);
  })
  .post("/", validInput, async (c) => {
    const { name } = c.req.valid("json");
    const deno = await db.dinosaur.create({
      data: {
        id: new Date().getTime().toString(),
        name,
        description: "lorem",
      },
    });

    return c.json(deno);
  })
  .patch("/:id", validInput, async (c) => {
    const { name } = c.req.valid("json");
    const id = c.req.param("id");
    const update = await db.dinosaur.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return c.json(update);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    const update = await db.dinosaur.delete({
      where: {
        id,
      },
    });
    return c.json(update);
  });
