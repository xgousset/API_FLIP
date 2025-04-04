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
    currentBasket INTEGER REFERENCES panier(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS stand (
     id SERIAL PRIMARY KEY,
     nom_stand VARCHAR(50) NOT NULL,
     id_type INTEGER REFERENCES types_stand(id) ON DELETE CASCADE,
     id_emplacement INTEGER REFERENCES emplacement(id) ON DELETE CASCADE,
     comptes INTEGER[],
     image_path VARCHAR(10000)
);

CREATE TABLE IF NOT EXISTS tournoi (
    id SERIAL PRIMARY KEY,
    id_stand INTEGER REFERENCES stand(id) ON DELETE CASCADE,
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
    venduPar INTEGER NOT NULL REFERENCES stand(id) ON DELETE CASCADE,
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
    FOREIGN KEY (produit_id) REFERENCES produit(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS commentaires (
    id SERIAL PRIMARY KEY,
    id_stand INTEGER REFERENCES stand(id) ON DELETE CASCADE,
    id_utilisateur INTEGER REFERENCES utilisateur(id) ON DELETE CASCADE,
    commentaire TEXT
);

CREATE TABLE IF NOT EXISTS note (
    id SERIAL PRIMARY KEY,
    id_stand INTEGER REFERENCES stand(id) ON DELETE CASCADE,
    id_utilisateur INTEGER REFERENCES utilisateur(id) ON DELETE CASCADE,
    note INTEGER CHECK (note >= 0 AND note <= 5)
);

CREATE TABLE IF NOT EXISTS historique_commandes (
    id SERIAL PRIMARY KEY,
    id_panier INTEGER REFERENCES panier(id) ON DELETE CASCADE,
    id_utilisateur INTEGER REFERENCES utilisateur(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS panier_produit (
    id SERIAL PRIMARY KEY,
    id_panier INTEGER REFERENCES panier(id) ON DELETE CASCADE,
    id_produit INTEGER REFERENCES produit(id) ON DELETE CASCADE,
    quantite INTEGER
);

CREATE TABLE IF NOT EXISTS edition_tournoi (
    id SERIAL PRIMARY KEY,
    id_tournoi INTEGER REFERENCES tournoi(id) ON DELETE CASCADE,
    capacitee INTEGER,
    current_participants INTEGER DEFAULT 0,
    date_edition TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inscription (
    id SERIAL PRIMARY KEY,
    id_utilisateur INTEGER REFERENCES utilisateur(id) ON DELETE CASCADE,
    id_edition_tournoi INTEGER REFERENCES edition_tournoi(id) ON DELETE CASCADE,
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reservationJeu(
    id SERIAL PRIMARY KEY,
    id_jeu INTEGER REFERENCES jeu(id) ON DELETE CASCADE,
    id_utilisateur INTEGER REFERENCES utilisateur(id) ON DELETE CASCADE,
    date_reservation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert test data into emplacement table
INSERT INTO emplacement (coordonnees_x, coordonnees_y, categorie, nom, reserve) VALUES
    (10.5, 20.3, 'A', 'Emplacement 1', FALSE),
    (15.2, 25.6, 'B', 'Emplacement 2', TRUE);

-- Insert test data into types_stand table
INSERT INTO types_stand (intitule, peutReserver, peutVendre, peutAnimer) VALUES
    ('Type 1', TRUE, TRUE, FALSE),
    ('Type 2', FALSE, TRUE, TRUE);

-- Insert test data into stand table
INSERT INTO stand (nom_stand, id_type, id_emplacement, comptes, image_path) VALUES
    ('Stand 1', 1, 1, ARRAY[1, 2], 'path/to/image1.jpg'),
    ('Stand 2', 2, 2, ARRAY[3], 'path/to/image2.jpg');

-- Insert test data into utilisateur table
INSERT INTO utilisateur (identifiant, nom, prenom, mdp, email, type, currentBasket) VALUES
    ('user1', 'Doe', 'John', 'hashed_password1', 'john.doe@example.com', 'type1', NULL),
    ('user2', 'Smith', 'Jane', 'hashed_password2', 'jane.smith@example.com', 'type2', NULL);

-- Insert test data into produit table
INSERT INTO produit (nom_produit, prix_produit, stocks, type_article, aVendre, venduPar, image_path) VALUES
    ('Produit 1', 10.99, 100, 'Type A', TRUE, 1, 'path/to/product1.jpg'),
    ('Produit 2', 15.49, 50, 'Type B', TRUE, 2, 'path/to/product2.jpg');

-- Insert test data into jeu table
INSERT INTO jeu (type, nombre_joueurs_min, nombre_joueurs_max, age_limite, duree, produit_id) VALUES
    ('Jeu 1', 2, 4, 12, 60, 1),
    ('Jeu 2', 1, 2, 8, 30, 2);

-- Insert test data into tournoi table
INSERT INTO tournoi (id_stand, lieu, participants_max, prix_entree, nom_tournoi, description_tournoi, image_path) VALUES
    (1, 'Lieu 1', 20, 5.00, 'Tournoi 1', 'Description du tournoi 1', 'path/to/tournament1.jpg'),
    (2, 'Lieu 2', 30, 10.00, 'Tournoi 2', 'Description du tournoi 2', 'path/to/tournament2.jpg');

-- Insert test data into panier table
INSERT INTO panier (valeur_panier, recuperation_panier, paid) VALUES
    (50.00, '2023-01-01 10:00:00', FALSE),
    (75.00, '2023-01-02 11:00:00', TRUE);

-- Insert test data into commentaires table
INSERT INTO commentaires (id_stand, id_utilisateur, commentaire) VALUES
    (1, 1, 'Great stand!'),
    (2, 2, 'Not bad.');

-- Insert test data into note table
INSERT INTO note (id_stand, id_utilisateur, note) VALUES
    (1, 1, 5),
    (2, 2, 4);

-- Insert test data into historique_commandes table
INSERT INTO historique_commandes (id_panier, id_utilisateur) VALUES
    (1, 1),
    (2, 2);

-- Insert test data into panier_produit table
INSERT INTO panier_produit (id_panier, id_produit, quantite) VALUES
    (1, 1, 2),
    (2, 2, 1);

-- Insert test data into edition_tournoi table
INSERT INTO edition_tournoi (id_tournoi, capacitee, current_participants, date_edition) VALUES
    (1, 20, 10, '2023-02-01 14:00:00'),
    (2, 30, 20, '2023-03-01 15:00:00');

-- Insert test data into inscription table
INSERT INTO inscription (id_utilisateur, id_edition_tournoi, date_inscription) VALUES
    (1, 1, '2023-01-15 12:00:00'),
    (2, 2, '2023-02-15 13:00:00');