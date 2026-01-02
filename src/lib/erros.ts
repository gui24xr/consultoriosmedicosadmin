export class DatabaseError extends Error {
  constructor(public message: string, public code?: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}