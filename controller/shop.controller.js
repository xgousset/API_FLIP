const shopService = require('../services/shop.services');

exports.saveShop = async (req,res) => {
    const {nom,description} = req.body;
    shopService.createShop(nom,description,(error,data)=>{
        if(error){
            return res.status(500).send("Erreur");
        }
        return res.status(200).send(data);
    });
}

exports.deleteShop = async (req,res) => {
    const id = req.params.id;
    shopService.deleteShop(id,(error,data)=>{
        if(error){
            return res.status(500).send("Erreur");
        }
        return res.status(200).send(data);
    });
}

exports.getShopById = async (req,res) => {
    const id = req.params.id;
    const shop = shopService.fetchSpecificShop(id);
    if(!shop){
        return res.status(404).send("Shop non trouvé");
    }
    return res.status(200).send(shop);
}

exports.getShops = async (req,res) => {
    const shops = shopService.fetchShops();
    return res.status(200).send(shops);
}

exports.updateShop = async (req,res) => {
    const id = req.params.id;
    const {nom,description} = req.body;
    shopService.updateShop(id,nom,description,(error,data)=>{
        if(error){
            return res.status(500).send("Erreur");
        }
        return res.status(200).send(data);
    });
}