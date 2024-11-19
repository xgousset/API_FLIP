const express = require('express');
const userRouter = require('./routes/users.routes');
const articleRouter = require('./routes/article.router');
const PORT = 3000;
const app = express();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Middleware traitement JSON
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/articles", articleRouter);

const swaggerOption = {
    swaggerDefinition: (swaggerJsdoc.Options = {
        info: {
            title: "my-users app",
            description: "API documentation",
            contact: {
                name: "XGOUSSET",
            },
            servers: ["http://localhost:3000/"],
        },
    }),
    apis: ["index.js", "./routes/*.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middlewaires Gestion erreurs
app.use("*", (req, res, next) => {
    const error = new Error("Route non trouvée");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status).send(err.message);
});

app.listen(PORT, () => {
    console.log(`Serveur ecoute sur port ${PORT}`);
})
