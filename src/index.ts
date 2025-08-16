import express from 'express';
import taskRoutes from './routes/routes.js'
import { initDB } from './database/database.js';
import { swaggerUi, swaggerSpec } from './swagger/swagger.js';

const app = express();
app.use(express.json());

const PORT = 3000;

app.use("/tasks", taskRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

async function start(){
    await initDB();

    app.listen(PORT, ()=>{
        
        console.log(`Running API on ${PORT}`);
    })
}


start();

