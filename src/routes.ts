import { Router } from 'express';

import packageJson from '../package.json';
import { HabitsController } from './controllers/habits.controller';

export const routes = Router();

const habitsController = new HabitsController();

routes.get('/', (request, response) => {
  const { name, description, version } = packageJson;

  return response.status(200).json({ name, description, version });
});

routes.get('/habits', habitsController.index);
routes.post('/habits', habitsController.store);
routes.delete('/habits/:id', habitsController.remove);
routes.patch('/habits/:id/toggle', habitsController.toggle);

/**
 * M (Model) -> Responsável por se comunicar com o banco;
 * V (View) -> Mostrar isso para o usuário (react);
 * C (Controller) -> Controla a requisição, chama a model, define as RN's e faz o retorno pro usuário
 */
