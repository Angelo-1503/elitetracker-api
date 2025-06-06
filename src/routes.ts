import { Router } from 'express';

import packageJson from '../package.json';
import { AuthController } from './controllers/auth.controller';
import { FocusTimeController } from './controllers/focus-time.controller';
import { HabitsController } from './controllers/habits.controller';
import { authMiddleware } from './middlewares/auth.middleware';

export const routes = Router();

const habitsController = new HabitsController();
const focusTimeController = new FocusTimeController();
const authController = new AuthController();

routes.get('/', (request, response) => {
  const { name, description, version } = packageJson;

  return response.status(200).json({ name, description, version });
});

routes.get('/auth', authController.auth);
routes.get('/auth/callback', authController.authCallBack);

routes.use(authMiddleware);

routes.get('/habits', habitsController.index);
routes.get('/habits/:id/metrics', habitsController.metrics);
routes.post('/habits', habitsController.store);
routes.delete('/habits/:id', habitsController.remove);
routes.patch('/habits/:id/toggle', habitsController.toggle);

routes.post('/focus-time', focusTimeController.store);
routes.get('/focus-time/metrics/', focusTimeController.metricsByMonth);
routes.get('/focus-time/', focusTimeController.index);

/**
 * M (Model) -> Responsável por se comunicar com o banco;
 * V (View) -> Mostrar isso para o usuário (react);
 * C (Controller) -> Controla a requisição, chama a model, define as RN's e faz o retorno pro usuário
 */
