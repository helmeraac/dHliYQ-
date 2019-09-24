import { Request, Response } from "express";
import { getRestaurantsByCity, getCityId, createSearchLog } from "./SearchController";
import { authenticate } from "../../middleware/auth";

export default [
  {
    path: "/search/restaurant",
    method: "get",
    handler: [
      authenticate,
      async ({ query, session }: any, res: Response) => {
        if(!query.cityId) {
          res.status(400).send({ error: 'Missing query parameter cityId' })
        }
        await createSearchLog(session.userId, query.cityId);
        await getRestaurantsByCity(query.cityId).then( restaurants => {
          res.status(200).send(restaurants);
        }).catch( error => {
          res.status(500).send({ error })
        });
      }
    ]
  },
  {
    path: "/search/city",
    method: "get",
    handler: [
      authenticate,
      async ({ query }: Request, res: Response) => {
        if(!query.city) {
          res.status(400).send({ error: 'Missing query parameter city' })
        }
        await getCityId(query.city).then( cities => {
          res.status(200).send(cities);
        }).catch( error => {
          res.status(500).send({ error })
        });
      }
    ]
  }
];
