import "jsr:@std/dotenv/load";
import { PrismaClient } from "../../generated/client/deno/edge.ts";

const DATABASE_URL = Deno.env.get("DATABASE_URL");

export const db = new PrismaClient({
  datasourceUrl: DATABASE_URL,
});
