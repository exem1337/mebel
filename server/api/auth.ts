import { users } from '#shared/constants/baseDictionaires.const';

export default defineEventHandler(async (event) => {
  const { login, password } = await readBody(event);

  return users.find((user) => user.login === login && user.password === password);
});
