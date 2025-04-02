DROP TABLE IF EXISTS emplacement CASCADE;
DROP TABLE IF EXISTS types_stand CASCADE;
DROP TABLE IF EXISTS stand CASCADE;
DROP TABLE IF EXISTS tournoi CASCADE;
DROP TABLE IF EXISTS produit CASCADE;
DROP TABLE IF EXISTS jeu CASCADE;
DROP TABLE IF EXISTS panier CASCADE;
DROP TABLE IF EXISTS utilisateur CASCADE;
DROP TABLE IF EXISTS commentaires CASCADE;
DROP TABLE IF EXISTS note CASCADE;
DROP TABLE IF EXISTS historique_commandes CASCADE;
DROP TABLE IF EXISTS panier_produit CASCADE;
DROP TABLE IF EXISTS edition_tournoi CASCADE;
DROP TABLE IF EXISTS inscription CASCADE;


CREATE TABLE IF NOT EXISTS emplacement (
    id SERIAL PRIMARY KEY,
    coordonnees_x NUMERIC,
    coordonnees_y NUMERIC,
    categorie VARCHAR(50),
    nom VARCHAR(50),
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
    comptes INTEGER[],
    image_path VARCHAR(10000)
);

CREATE TABLE IF NOT EXISTS tournoi (
    id SERIAL PRIMARY KEY,
    id_stand INTEGER REFERENCES stand(id),
    lieu VARCHAR(100),
    participants_max INTEGER,
    prix_entree NUMERIC,
    nom_tournoi VARCHAR(100),
    description_tournoi TEXT,
    image_path VARCHAR(10000)
);

CREATE TABLE IF NOT EXISTS produit (
    id SERIAL PRIMARY KEY,
    nom_produit VARCHAR(100) NOT NULL,
    prix_produit NUMERIC,
    stocks INTEGER,
    type_article VARCHAR(100),
    aVendre BOOLEAN DEFAULT TRUE,
    venduPar INTEGER REFERENCES stand(id),
    image_path VARCHAR(10000)
);

CREATE TABLE IF NOT EXISTS jeu (
    id SERIAL PRIMARY KEY,
    type varchar(100),
    nombre_joueurs_min INTEGER,
    nombre_joueurs_max INTEGER,
    age_limite INTEGER,
    duree int,
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
    identifiant VARCHAR(100) NOT NULL,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    mdp VARCHAR(255) NOT NULL, -- Considérer un hachage pour la sécurité
    email VARCHAR(100),
    type varchar(100),
    currentBasket INTEGER REFERENCES panier(id)
);

CREATE TABLE IF NOT EXISTS commentaires (
    id SERIAL PRIMARY KEY,
    id_stand INTEGER REFERENCES stand(id),
    id_utilisateur INTEGER REFERENCES utilisateur(id),
    commentaire TEXT
);

CREATE TABLE IF NOT EXISTS note (
    id SERIAL PRIMARY KEY,
    id_stand INTEGER REFERENCES stand(id),
    id_utilisateur INTEGER REFERENCES utilisateur(id),
    note INTEGER CHECK (note >= 0 AND note <= 5)
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
    current_participants INTEGER DEFAULT 0,
    date_edition TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inscription (
     id SERIAL PRIMARY KEY,
    id_utilisateur INTEGER REFERENCES utilisateur(id),
    id_edition_tournoi INTEGER REFERENCES edition_tournoi(id),
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
