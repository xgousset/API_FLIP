const fs = require('fs');
const path = require('path');
const chemin = path.join(__dirname,"..","shops.json");
const uuid = require('uuid');



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