const port = 8080;
const express = require('express');
const cors = require('cors');

const recipesRoutes = require("./routes/recipes.routes");
const ingredientsRoutes = require("./routes/ingredients.routes");
const usersRoutes = require("./routes/users.routes");

const main = () => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use("/recipes", recipesRoutes);
    app.use("/recipes", ingredientsRoutes);
    app.use("/users", usersRoutes);

    app.listen(port, () => {
        console.log(`App listening on ${port}`);
    });
}

main();