import type { Express, Request, Response } from 'express';
import SearchController from 'controller/search.controller';
import CountryController from 'controller/country.controller';
import CityController from 'controller/city.controller';
import HotelController from 'controller/hotel.controller';

export const routes = (app: Express) => {
  app.get('/api/healthcheck', (_req: Request, res: Response) => res.sendStatus(200))

  app.get('/api/search', SearchController.search)
  app.get('/api/search/countries', CountryController.search)
  app.get('/api/search/cities', CityController.search)
  app.get('/api/search/hotels', HotelController.search)
}

