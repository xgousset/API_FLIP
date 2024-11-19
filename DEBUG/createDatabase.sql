DROP TABLE IF EXISTS correspond_à CASCADE;
DROP TABLE IF EXISTS par CASCADE;
DROP TABLE IF EXISTS participe CASCADE;
DROP TABLE IF EXISTS tournoi CASCADE;
DROP TABLE IF EXISTS panier CASCADE;
DROP TABLE IF EXISTS produits CASCADE;
DROP TABLE IF EXISTS prestataire CASCADE;
DROP TABLE IF EXISTS historique_commandes CASCADE;
DROP TABLE IF EXISTS client CASCADE;
DROP TABLE IF EXISTS emplacement CASCADE;
DROP TABLE IF EXISTS type_prestataire CASCADE;
DROP TABLE IF EXISTS type_produit CASCADE;

CREATE TABLE emplacement (
    id_emplacement SERIAL PRIMARY KEY,
    coordonnees_x VARCHAR(50),
    coordonnees_y VARCHAR(50),
    reservé BOOLEAN
);

CREATE TABLE client (
    id_client SERIAL PRIMARY KEY,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    mdp VARCHAR(50)
);

CREATE TABLE historique_commandes (
    id_historique SERIAL PRIMARY KEY
);

CREATE TABLE prestataire (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50),
    id_type VARCHAR(50) NOT NULL,
    id_emplacement INT UNIQUE,
    FOREIGN KEY (id_emplacement) REFERENCES emplacement (id_emplacement)
);

CREATE TABLE produits (
    id_produit SERIAL PRIMARY KEY,
    nom_produit VARCHAR(50),
    description_produit VARCHAR(50),
    stocks INT,
    prix_produit NUMERIC(15, 2),
    id INT NOT NULL,
    FOREIGN KEY (id) REFERENCES prestataire (id)
);

CREATE TABLE panier (
    id_panier SERIAL PRIMARY KEY,
    valeur_panier NUMERIC(15, 2),
    récupération BOOLEAN,
    id_client INT NOT NULL,
    id_produit INT NOT NULL,
    FOREIGN KEY (id_client) REFERENCES client (id_client),
    FOREIGN KEY (id_produit) REFERENCES produits (id_produit)
);

CREATE TABLE tournoi (
    id_tournoi SERIAL PRIMARY KEY,
    participants_min INT,
    participants_max INT,
    prix_d_entree INT,
    heure_début TIMESTAMP,
    objet_tournoi VARCHAR(50),
    id INT NOT NULL,
    FOREIGN KEY (id) REFERENCES prestataire (id)
);

CREATE TABLE participe (
    id_client INT,
    id_tournoi INT,
    classement INT,
    PRIMARY KEY (id_client, id_tournoi),
    FOREIGN KEY (id_client) REFERENCES client (id_client),
    FOREIGN KEY (id_tournoi) REFERENCES tournoi (id_tournoi)
);

CREATE TABLE par (
    id_client INT,
    id_historique INT,
    PRIMARY KEY (id_client, id_historique),
    FOREIGN KEY (id_client) REFERENCES client (id_client),
    FOREIGN KEY (id_historique) REFERENCES historique_commandes (id_historique)
);

CREATE TABLE correspond_à (
    id_panier INT,
    id_historique INT,
    PRIMARY KEY (id_panier, id_historique),
    FOREIGN KEY (id_panier) REFERENCES panier (id_panier),
    FOREIGN KEY (id_historique) REFERENCES historique_commandes (id_historique)
);
