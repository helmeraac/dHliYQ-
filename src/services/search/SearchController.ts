import dotenv from "dotenv";
import requestPromise from "request-promise";
import { getRepository } from "typeorm";
import SearchHistory from "../../entity/SearchHistory";

dotenv.config();

export const getRestaurantsByCity = async (id: string) => {
  const key = process.env.ZOMATO_API_KEY;
  const options = {
    headers: {
      'user-key': key
    },
    json: true
  }
  const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${id}&entity_type=city&count=10`;
  const response = await requestPromise(url, options);
  return response;
};

export const getCityId = async (city: string) => {
  const key = process.env.ZOMATO_API_KEY;
  const options = {
    headers: {
      'user-key': key
    },
    json: true
  }
  const url = `https://developers.zomato.com/api/v2.1/cities?q=${city}`;
  const response = await requestPromise(url, options);
  return response;
};

export const createSearchLog = async (userId: number, city: string) => {
  const searchRepository = await getRepository(SearchHistory);

  let search = new SearchHistory();
  search.city = city;
  search.userId = userId;

  await searchRepository.save(search);
};