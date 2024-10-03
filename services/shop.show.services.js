const fs = require('fs');
const path = require('path');
const chemin = path.join(__dirname,"..","shops.json");


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


export {fetchShops,fetchSpecificShop};