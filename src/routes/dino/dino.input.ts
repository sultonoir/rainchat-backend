import { validator } from "hono/validator";
import { z } from "zod";

export const createDenoInput = z.object({
  name: z.string(),
});

export const validInput = validator("json", (value, c) => {
  const parsed = createDenoInput.safeParse(value);
  if (!parsed.success) {
    return c.text("Invalid!", 401);
  }
  return parsed.data;
});
