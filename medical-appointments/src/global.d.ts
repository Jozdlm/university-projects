declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_PORT: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      JWT_KEY: string;
    }
  }
}

// Makes the file a module, so TypeScript treats it correctly
export {};
