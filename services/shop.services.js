const fs = require('fs');
const path = require('path');
const chemin = path.join(__dirname,"..","shops.json");
const uuid = require('uuid');


//prend une liste de magasins et renvoie tous les magasins
const fetchShops = () => {
    let shops = [];
    try{
        const data = fs.readFileSync(chemin);
        const dataStr = data.toString();
        shops = JSON.parse(dataStr);
    }catch(error){
        console.log(error);
    }
    return shops;
}

//sélectionne un magasin spécifique par son id à partir de la liste de magasins
const fetchSpecificShop = (id) => {
    let shops = fetchShops();
    let shop = shops.find(shop => shop.id === id);
    return shop;
}


//crée un nouveau magasin avec un nom et une description
const createShop = (nom,description,callback) => {
    let shops = [];
    try{
        const data = fs.readFileSync(chemin);
        const dataStr = data.toString();
        shops = JSON.parse(dataStr);
    }catch(error){
        console.log(error);
        return callback(error);
    }

    const newShop = {id: uuid.v4(), nom:nom, description:description};
    shops.push(newShop);

    try {
        fs.writeFileSync(chemin,JSON.stringify(shops));
        return callback(null,"écriture réussie");
    }catch (error){
        console.log(error);
        return callback(error);
    }
}


//supprime un magasin spécifique par son id à partir de la liste de magasins
const deleteShop = (id,callback) => {
    let shops = fetchShops();
    let shop = shops.find(shop => shop.id === id);
    if (!shop) {
        return callback("Magasin non trouvé");
    }
    shops = shops.filter(shop => shop.id !== id);
    try {
        fs.writeFileSync(chemin,JSON.stringify(shops));
        return callback(null,"suppression réussie");
    }catch (error){
        console.log(error);
        return callback(error);
    }

}


const updateShop = (id,nom,description,callback) => {
    let shops = fetchShops();
    let shop = shops.find(shop => shop.id === id);
    if (!shop) {
        return callback("Magasin non trouvé");
    }
    shop.nom = nom;
    shop.description = description;
    try {
        fs.writeFileSync(chemin,JSON.stringify(shops));
        return callback(null,"mise à jour réussie");
    }catch (error){
        console.log(error);
        return callback(error);
    }
}

module.exports = {createShop,deleteShop,updateShop ,fetchShops,fetchSpecificShop};