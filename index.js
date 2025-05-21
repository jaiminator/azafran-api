const port = 8080;
const express = require('express');
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const { authMiddleware } = require("./middleware/auth");

const recipesRoutes = require("./routes/recipes.routes");
const ingredientsRoutes = require("./routes/ingredients.routes");
const usersRoutes = require("./routes/users.routes");
const { dbConnection } = require('./db');

const main = () => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use("/recipes", authMiddleware, recipesRoutes);
    app.use("/ingredients", authMiddleware, ingredientsRoutes);
    app.use("/users", usersRoutes);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    dbConnection();

    app.listen(port, () => {
        console.log(`App listening on ${port}`);
    });
}

main();