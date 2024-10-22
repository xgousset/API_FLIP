const express = require('express');
const userRouter = require('./routes/users.routes');
const articleRouter = require('./routes/article.router');
const shopRouter = require('./routes/shop.router');
const PORT = 3000;
const app = express();

// Middleware traitement JSON
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/articles", articleRouter);
app.use("/api/shops", shopRouter);

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
