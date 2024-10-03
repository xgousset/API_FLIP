const fs = require('fs');
const path = require('path');
const { fetchShops, fetchSpecificShop } = require('./services/shop.show.services');
const shops = path.join(__dirname,"..","shops.json");
const articles = path.join(__dirname,"..","articles.json");

//prend une liste de magasins et renvoie tous les articles d'un magasin spécifique
const fetchArticlesSpecificShop = (id,callback) => {
    let shop = fetchSpecificShop(id);
    let articles = [];
    try{
        const data = fs.readFileSync(articles);
        const dataStr = data.toString();
        articles = JSON.parse(dataStr);
    }catch(error){
        return callback(error);
    }
    return callback (articles.filter(article => article.shopId === id));
}



const fetchAllArticles = () => {
    let articles = [];
    try{
        const data = fs.readFileSync(articles);
        const dataStr = data.toString();
        articles = JSON.parse(dataStr);
    }catch(error){
        console.log(error);
    }
    return articles;
}