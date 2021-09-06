import { Application } from 'express';
import { BaseRouter } from '@shared/abstract/router.base';
import { UrlRouter } from './url';

const initRouters = (app: Application): BaseRouter[] => {
  const routers: BaseRouter[] = [];
  routers.push(new UrlRouter(app));
  return routers;
};

export { initRouters };
