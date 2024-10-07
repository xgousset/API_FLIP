const fs = require('fs');
const path = require('path');
const chemin = path.join(__dirname,"..","shops.json");
const uuid = require('uuid');
const { fetchShops } = require('./shop.show.services');



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

export {createShop,deleteShop};