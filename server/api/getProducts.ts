import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const dataFromClient = body;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return dataFromClient;
})
