import { Request, Response } from "express";
import { createUser, logIn } from "./UserController";

export default [
  {
    path: "/user",
    method: "post",
    handler: async (req: Request, res: Response) => {
      const { name, email, password } = req.body;

      createUser(name, email, password).then( user => {
        res.status(201).send(user);
      }).catch( error => {
        res.status(500).send({ error })
      });
    }
  },
  {
    path: "/login",
    method: "post",
    handler:  async (req: Request, res: Response) => {
      const { email, password } = req.body;

      logIn(email, password).then( token => {
        res.status(201).send(token);
      }).catch( error => {
        res.status(500).send({ error })
      });
    }
  },
];
