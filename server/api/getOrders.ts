export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return body;
});
