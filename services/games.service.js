const pool = require('../database/db');


const fetchGames = async () => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM jeu';
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.log(error);
        return [];
    } finally {
        client.release();
    }
}

const fetchSpecificGame = async (id) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM jeu WHERE id = $1';
        const values = [id];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
};


const createGame = async (name, type, prix, stocks, nbJoueursMin, nbJoueursMax,ageLimite,image, duree) => {
    const client = await pool.connect();
    try {
        const productquery = 'INSERT INTO produit (nom_produit, prix_produit, stocks, type_article, aVendre, venduPar, image_path) VALUES ($1,$2,$3,"jeu", false, $4, $5) RETURNING *';
        const productvalues = [name, type, prix, stocks, image];
        const productresult = await client.query(productquery, productvalues);
        console.log(productresult.rows[0].id);
        const gamequery = 'INSERT INTO jeu (nombre_joueurs_min,nombre_joueurs_max,age_limite,duree,produit_id) VALUES ($1,$2,$3,$4,$5) RETURNING *';
        const gamevalues = [nbJoueursMin,nbJoueursMax,ageLimite,duree,productresult.rows[0].id];
        const gameresult = await client.query(gamequery, gamevalues);
        console.log(gameresult.rows[0]);
        console.log(productresult.rows[0]);

        allResult = {
            product: productresult.rows[0],
            game: gameresult.rows[0]
        }
        return (allResult);
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
}


const updateGame = async (id,nom_produit,description_produit,prix_produit,stocks,nbJoueursMin,nbJoueursMax,ageLimite) => {
    const client = await pool.connect();
    try {
        const productquery = 'UPDATE produit SET nom_produit = $1, description_produit = $2, prix_produit = $3, stocks = $4 WHERE id = $5 RETURNING *';
        const productvalues = [nom_produit,description_produit,prix_produit,stocks,id];
        const productresult = await client.query(productquery, productvalues);
        const gamequery = 'UPDATE jeu SET nombre_joueurs_min = $1, nombre_joueurs_max = $2, age_limite = $3 WHERE produit_id = $4 RETURNING *';
        const gamevalues = [nbJoueursMin,nbJoueursMax,ageLimite,id];
        const gameresult = await client.query(gamequery, gamevalues);
        return (productresult[0],gameresult[0]);
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
}

const deleteGame = async (id) => {
    const client = await pool.connect();
    try {
        const query = 'DELETE FROM jeu WHERE produit_id = $1';
        const values = [id];
        const values2 = [fetchSpecificGame(id).produit_id];
        const result = await client.query(query, values);
        const query2 = 'DELETE FROM produit WHERE id = $1';

        const result2 = await client.query(query2, values2);
        return result2.rows[0];
    }
    catch (error) {
        console.log(error);
        return null;
    }  finally {
        client.release();
    }
}

module.exports = {
    fetchGames,
    fetchSpecificGame,
    createGame,
    updateGame,
    deleteGame
}