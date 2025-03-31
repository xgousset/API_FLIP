DROP TABLE IF EXISTS emplacement CASCADE;
DROP TABLE IF EXISTS types_stand CASCADE;
DROP TABLE IF EXISTS stand CASCADE;
DROP TABLE IF EXISTS tournoi CASCADE;
DROP TABLE IF EXISTS produit CASCADE;
DROP TABLE IF EXISTS jeu CASCADE;
DROP TABLE IF EXISTS panier CASCADE;
DROP TABLE IF EXISTS utilisateur CASCADE;
DROP TABLE IF EXISTS historique_commandes CASCADE;
DROP TABLE IF EXISTS panier_produit CASCADE;
DROP TABLE IF EXISTS edition_tournoi CASCADE;
DROP TABLE IF EXISTS inscription CASCADE;


CREATE TABLE IF NOT EXISTS emplacement (
     id SERIAL PRIMARY KEY,
     coordonnees_x NUMERIC,
     coordonnees_y NUMERIC,
     reserve BOOLEAN DEFAULT FALSE -- Par défaut, un emplacement n'est pas réservé
);

CREATE TABLE IF NOT EXISTS types_stand (
    id SERIAL PRIMARY KEY,
    intitule VARCHAR(50) NOT NULL,
    peutReserver BOOLEAN DEFAULT TRUE,
    peutVendre BOOLEAN DEFAULT TRUE,
    peutAnimer BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS stand (
    id SERIAL PRIMARY KEY,
    nom_stand VARCHAR(50) NOT NULL,
    id_type INTEGER REFERENCES types_stand(id),
    id_emplacement INTEGER REFERENCES emplacement(id),
    description TEXT,
    image_path VARCHAR(10000)
);

CREATE TABLE IF NOT EXISTS tournoi (
    id SERIAL PRIMARY KEY,
    id_stand INTEGER REFERENCES stand(id),
    participants_min INTEGER,
    participants_max INTEGER,
    prix_entree NUMERIC,
    heure_debut TIMESTAMP,
    objet_tournoi TEXT,
    nom_tournoi VARCHAR(100),
    description_tournoi TEXT,
    image_path VARCHAR(10000)
);

CREATE TABLE IF NOT EXISTS produit (
    id SERIAL PRIMARY KEY,
    nom_produit VARCHAR(100) NOT NULL,
    description_produit TEXT,
    prix_produit NUMERIC,
    stocks INTEGER,
    type_article VARCHAR(100),
    image_path VARCHAR(10000)
);

CREATE TABLE IF NOT EXISTS jeu (
    id SERIAL PRIMARY KEY,
    nombre_joueurs_min INTEGER,
    nombre_joueurs_max INTEGER,
    age_limite INTEGER,
    produit_id INTEGER NOT NULL,
    FOREIGN KEY (produit_id) REFERENCES produit(id)
);

CREATE TABLE IF NOT EXISTS panier (
      id SERIAL PRIMARY KEY,
      valeur_panier NUMERIC DEFAULT 0,
      recuperation_panier TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      paid BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS utilisateur (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    mdp VARCHAR(255) NOT NULL, -- Considérer un hachage pour la sécurité
    email VARCHAR(100),
    niveau_autorisation  INTEGER DEFAULT 0,
    currentBasket INTEGER REFERENCES panier(id)
);


CREATE TABLE IF NOT EXISTS historique_commandes (
    id SERIAL PRIMARY KEY,
    id_panier INTEGER REFERENCES panier(id),
    id_utilisateur INTEGER REFERENCES utilisateur(id)
);

-- Table pour gérer la relation entre produits et paniers (exemple de table intermédiaire)
CREATE TABLE IF NOT EXISTS panier_produit (
    id SERIAL PRIMARY KEY,
    id_panier INTEGER REFERENCES panier(id),
    id_produit INTEGER REFERENCES produit(id),
    quantite INTEGER
);

CREATE TABLE IF NOT EXISTS edition_tournoi (
    id SERIAL PRIMARY KEY,
    id_tournoi INTEGER REFERENCES tournoi(id),
    capacitee INTEGER,
    date_edition TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inscription (
     id SERIAL PRIMARY KEY,
    id_utilisateur INTEGER REFERENCES utilisateur(id),
    id_edition_tournoi INTEGER REFERENCES edition_tournoi(id),
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert emplacements
INSERT INTO emplacement (coordonnees_x, coordonnees_y, reserve) VALUES (10.5, 20.3, FALSE);
INSERT INTO emplacement (coordonnees_x, coordonnees_y, reserve) VALUES (15.2, 25.7, TRUE);
INSERT INTO emplacement (coordonnees_x, coordonnees_y, reserve) VALUES (12.8, 22.1, FALSE);

-- Insert types of stand
INSERT INTO types_stand (intitule, peutReserver,peutVendre,peutAnimer) VALUES ('Food Stand', true, true, false);
INSERT INTO types_stand (intitule, peutReserver,peutVendre,peutAnimer) VALUES ('Game Stand', true, true, false);
INSERT INTO types_stand (intitule, peutReserver,peutVendre,peutAnimer) VALUES ('Merchandise Stand', true, true, false);



-- Insert stands
INSERT INTO stand (nom_stand, id_type, id_emplacement, description) VALUES ('Food Stand 1', 1, 1, 'Sells various food items');
INSERT INTO stand (nom_stand, id_type, id_emplacement, description) VALUES ('Tournoi Stand 1', 2, 3, 'Sells various game items');
-- Insert tournoi
INSERT INTO tournoi(id_stand, participants_min, participants_max, prix_entree, heure_debut, objet_tournoi, nom_tournoi, description_tournoi)
VALUES (2, 1, 3, 12.00, '2025-03-14 10:30:00', 'un tournoi', 'tournoi 1', 'un tournoi');