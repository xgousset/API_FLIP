const express = require('express');
const userRouter = require('./routes/users.routes');
const articleRouter = require('./routes/article.router');
const prestataireRouter = require('./routes/prestataire.router');
const emplacementRouter = require('./routes/emplacements.router');
const gameRouter = require('./routes/games.router');
const typeRouter = require('./routes/types.router');
const basketOrderRouter = require('./routes/basketOrder.router');
const tournamentRouter = require('./routes/tournament.router');

const PORT = 3000;
const app = express();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Middleware traitement JSON
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/articles", articleRouter);
app.use("/api/prestataires", prestataireRouter);
app.use("/api/emplacements", emplacementRouter);
app.use("/api/games", gameRouter);
app.use("/api/types", typeRouter);
app.use("/api/basket", basketOrderRouter);
app.use("/api/tournaments", tournamentRouter);

const swaggerOption = {
    swaggerDefinition: (swaggerJsdoc.Options = {
        info: {
            title: "api flip",
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
/** Swagger Initialization - END */

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
