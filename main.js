const express = require('express');
const userRouter = require('./routes/users.routes');
const articleRouter = require('./routes/article.router');
const prestataireRouter = require('./routes/stand.router');
const emplacementRouter = require('./routes/emplacements.router');
const gameRouter = require('./routes/games.router');
const typeRouter = require('./routes/types.router');
const basketOrderRouter = require('./routes/basketOrder.router');
const tournamentRouter = require('./routes/tournament.router');
const sessionRouter = require('./routes/session.routes');
const cors = require('cors');

const PORT = 3000;
const app = express();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


// Configuration CORS simplifiée
const corsOptions = {
    origin: 'http://localhost:8080', // Autorise uniquement le frontend en développement
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

// Middlewares essentiels
app.use(cors(corsOptions));
app.use(express.json());

// systeme de gestion de session

const session = require('express-session');
app.use(session({
    secret : 'secret',
    resave : false,
    saveUninitialized : true,
    cookie : {secure : false}
}));
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
app.use("/api/session", sessionRouter);
app.use("/api/inscription", require('./routes/inscription.router'));
app.use("/api/commentaires", require('./routes/commentaires.router'));
app.use("/api/notes", require('./routes/notes.touter'));
app.use("/aapi/reservJeu", require('./routes/reservJeu.router'))

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
    apis: ["./main.js", "./routes/*.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
/** Swagger Initialization - END */

app.use("/imgArticles", express.static("images/articles"));
app.use("/imgStand", express.static("images/stands"));
app.use("/imgTournament", express.static("images/tournois"));

//ajoute les chemins vers les images
app.use('/images', express.static('images'));
// Middlewaires Gestion erreurs
app.use("*", (req, res, next) => {
    const error = new Error("Route non trouvée");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    const status = err.status || 500; // Ensure a valid status code is set
    res.status(status).send(err.message || "Internal Server Error");
});

app.listen(PORT, () => {
    console.log(`Serveur ecoute sur port ${PORT}`);
})
