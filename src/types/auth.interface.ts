export {};

declare global {
  namespace Express {
    interface Request {
      currentUser?: { name: string; email: string };
    }
  }
}
