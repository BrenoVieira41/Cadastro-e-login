declare namespace Express {
  export interface Request {
     user: import('../../typeorm/entity/User').User
  }
}
