import { app } from "./app.js";
import { env, validateEvaluationEnvironment } from "./config/env.js";

validateEvaluationEnvironment();

app.listen(env.port, "0.0.0.0", () => {
  console.log(`API disponible en http://0.0.0.0:${env.port}`);
});
