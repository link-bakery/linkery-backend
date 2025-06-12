const getValue = (name: string) => {
  return process.env[name] || '';
};

export default () => ({
  http: {
    port: getValue('LINKERY_BACKEND_PORT'),
  },
  database: {
    host: getValue('LINKERY_BACKEND_DATABASE_HOST'),
    name: getValue('LINKERY_BACKEND_DATABASE_NAME'),
    user: getValue('LINKERY_BACKEND_DATABASE_USER'),
    password: getValue('LINKERY_BACKEND_DATABASE_PASSWORD'),
  },
  jwt: {
    secret: getValue('LINKERY_JWT_SECRET'),
  },
});
