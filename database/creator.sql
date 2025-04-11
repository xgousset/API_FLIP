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
DROP TABLE IF EXISTS reservationJeu CASCADE;

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



CREATE TABLE IF NOT EXISTS utilisateur (
                                           id SERIAL PRIMARY KEY,
                                           identifiant VARCHAR(100) NOT NULL,
                                           nom VARCHAR(50) NOT NULL,
                                           prenom VARCHAR(50) NOT NULL,
                                           mdp VARCHAR(255) NOT NULL, -- Considérer un hachage pour la sécurité
                                           email VARCHAR(100),
                                           role varchar(100)
);

CREATE TABLE IF NOT EXISTS panier (
                                      id SERIAL PRIMARY KEY,
                                      valeur_panier NUMERIC DEFAULT 0,
                                      recuperation_panier TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                      paid BOOLEAN DEFAULT FALSE,
                                      id_utilisateur INTEGER REFERENCES utilisateur(id) ON DELETE CASCADE,
                                      type VARCHAR(100) DEFAULT 'jeu'
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
                                           nomEquipe VARCHAR(100),
                                           date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reservationJeu(
                                             id SERIAL PRIMARY KEY,
                                             id_jeu INTEGER REFERENCES jeu(id) ON DELETE CASCADE,
                                             id_utilisateur INTEGER REFERENCES utilisateur(id) ON DELETE CASCADE,
                                             date_reservation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insérer les types de stands
INSERT INTO types_stand (intitule, peutReserver, peutVendre, peutAnimer)
VALUES
    ('Jeux Famille', TRUE, TRUE, FALSE),
    ('Jeux Stratégie', TRUE, TRUE, FALSE),
    ('Jeux de Cartes', TRUE, TRUE, FALSE),
    ('Jeux Enfants', TRUE, TRUE, FALSE),
    ('Restaurant', TRUE, TRUE, FALSE),
    ('Activité', TRUE, TRUE, FALSE);



-- Insérer des emplacements
INSERT INTO emplacement (coordonnees_x, coordonnees_y, categorie, nom, reserve)
VALUES
    (10, 20, 'Grande Salle', 'Emplacement A1', FALSE),
    (15, 25, 'Grande Salle', 'Emplacement B1', FALSE),
    (20, 30, 'Grande Salle', 'Emplacement C1', FALSE),
    (25, 35, 'Grande Salle', 'Emplacement D1', FALSE),
    (35, 40, 'Extérieur', 'Emplacement A2', FALSE),
    (30, 40, 'Extérieur', 'Emplacement B2', FALSE);

-- Insérer les stands
INSERT INTO stand (nom_stand, id_type, id_emplacement, comptes, image_path)
VALUES
    ('Stand Jeux Famille', (SELECT id FROM types_stand WHERE intitule = 'Jeux Famille'),
     (SELECT id FROM emplacement WHERE nom = 'Emplacement A1'), '{}', 'stand1.jpg'),

    ('Stand Stratégie', (SELECT id FROM types_stand WHERE intitule = 'Jeux Stratégie'),
     (SELECT id FROM emplacement WHERE nom = 'Emplacement B1'), '{}', 'stand2.jpg'),

    ('Stand Cartes', (SELECT id FROM types_stand WHERE intitule = 'Jeux de Cartes'),
     (SELECT id FROM emplacement WHERE nom = 'Emplacement C1'), '{}', 'stand3.jpg'),
    ('Stand Jeux Enfants', (SELECT id FROM types_stand WHERE intitule = 'Jeux Enfants'),
     (SELECT id FROM emplacement WHERE nom = 'Emplacement D1'), '{}', 'stand4.jpg'),

    ('Derya', (SELECT id FROM types_stand WHERE intitule = 'Restaurant'),
     (SELECT id FROM emplacement WHERE nom = 'Emplacement A2'), '{}', 'Derya.png'),

    ('L orientale', (SELECT id FROM types_stand WHERE intitule = 'Restaurant'),
     (SELECT id FROM emplacement WHERE nom = 'Emplacement B2'), '{}', 'Lorientale.png'),

    ('Dream Bubble', (SELECT id FROM types_stand WHERE intitule = 'Restaurant'),
     (SELECT id FROM emplacement WHERE nom = 'Emplacement C2'), '{}', 'dreambubble.png'),

    ('Activité', (SELECT id FROM types_stand WHERE intitule = 'Activité'),
     (SELECT id FROM emplacement WHERE nom = 'Emplacement D1'), '{}', 'stand4.png');


-- Insérer des produits vendus par les stands de jeux
INSERT INTO produit (nom_produit, prix_produit, stocks, type_article, aVendre, venduPar, image_path)
VALUES
    ('Monopoly', 25.99, 10, 'Jeu de société', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Stand Jeux Famille'), 'monopoly.jpg'),

    ('Catan', 34.50, 15, 'Jeu de société', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Stand Stratégie'), 'catan.jpg'),

    ('Uno', 9.99, 30, 'Cartes', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Stand Cartes'), 'uno.jpg'),

    ('Croque-Carotte', 31.90, 30, 'Jeu de société', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Stand Jeux Enfants'), 'croque_carotte.jpg'),

    ('Cluedo', 27.99, 8, 'Jeu de société', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Stand Jeux Famille'), 'cluedo.jpg'),

    ('La Bonne Paye', 22.00, 12, 'Jeu de société', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Stand Jeux Famille'), 'bonne_paye.jpg'),

    ('Risk', 39.99, 7, 'Jeu de stratégie', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Stand Stratégie'), 'risk.jpg'),

    ('7 Wonders', 44.90, 10, 'Jeu de stratégie', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Stand Stratégie'), '7wonders.jpg'),

    ('Le Président', 5.50, 50, 'Cartes', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Stand Cartes'), 'jeu_president.jpg'),

    ('Saboteur', 13.99, 25, 'Cartes', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Stand Cartes'), 'saboteur.jpg'),

    ('Docteur Maboul', 28.00, 20, 'Jeu enfant', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Stand Jeux Enfants'), 'docteur_maboule.jpg'),

    ('Qui est-ce ?', 26.50, 18, 'Jeu enfant', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Stand Jeux Enfants'), 'qui_est_ce.jpg');

-- Insérer des produits vendus par les stands de restauration (Derya)
INSERT INTO produit (nom_produit, prix_produit, stocks, type_article, aVendre, venduPar, image_path)
VALUES
    ('Tacos', 8, 18, 'Nourriture', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Derya'), 'tacos.png'),

    ('Crêpes turque', 10, 30, 'Nourriture', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Derya'), 'crepe_turc.png'),

    ('Kebab', 9, 50, 'Nourriture', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Derya'), 'kebab.png'),

    ('Frites', 3.50, 100, 'Nourriture', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Derya'), 'frites.png'),

    ('Oasis', 3.50, 50, 'Boisson', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Derya'), 'oasis.png'),

    ('Coca', 3, 45, 'Boisson', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Derya'), 'coca.png'),

    ('Coca zéro', 4, 50, 'Boisson', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Derya'), 'coca_zero.png'),

    ('Fuzetea', 2.50, 60, 'Boisson', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Derya'), 'fuzetea.png');

-- Insérer des produits vendus par les stands de restauration (L'orientale)
INSERT INTO produit (nom_produit, prix_produit, stocks, type_article, aVendre, venduPar, image_path)
VALUES
    ('Burger', 8, 32, 'Nourriture', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'L orientale'), 'burger.png'),

    ('Couscous Maison', 12, 20, 'Nourriture', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'L orientale'), 'couscous.png'),

    ('Kebab', 9, 45, 'Nourriture', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'L orientale'), 'kebab.png'),

    ('Frites', 2.80, 70, 'Nourriture', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'L orientale'), 'frites.png'),

    ('Coca', 3, 55, 'Boisson', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'L orientale'), 'coca.png'),

    ('Coca zéro', 4, 50, 'Boisson', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'L orientale'), 'coca_zero.png'),

    ('Fanta', 3.50, 30, 'Boisson', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'L orientale'), 'fanta.png');


-- Insérer des produits vendus par les stands de restauration (L'orientale)
INSERT INTO produit (nom_produit, prix_produit, stocks, type_article, aVendre, venduPar, image_path)
VALUES
    ('Churros', 4.50, 50, 'Nourriture', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Dream Bubble'), 'churros.png'),

    ('Cookies', 1.50, 150, 'Nourriture', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Dream Bubble'), 'cookies.png'),

    ('Barbapapa', 3.20, 25, 'Nourriture', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Dream Bubble'), 'barbapapa.png'),

    ('Crêpe nutella', 6, 25, 'Nourriture', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Dream Bubble'), 'crepe_nutella.png'),

    ('Crêpe aux sucres', 5, 25, 'Nourriture', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Dream Bubble'), 'crepe_sucre.png'),

    ('Coca', 3.50, 35, 'Boisson', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Dream Bubble'), 'coca.png'),

    ('Coca zéro', 4, 50, 'Boisson', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Dream Bubble'), 'coca_zero.png'),

    ('Orangina', 3, 55, 'Boisson', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Dream Bubble'), 'orangina.png'),

    ('Fanta', 3.50, 30, 'Boisson', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Dream Bubble'), 'fanta.png');

-- Insérer des produits vendus par les stands de restauration (Derya)
INSERT INTO produit (nom_produit, prix_produit, stocks, type_article, aVendre, venduPar, image_path)
VALUES
    ('Woopy', 1.50, 150, 'Souvenir', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Stand Jeux Famille'), 'souvenir_woopys.png'),

    ('Chapeau de paille', 2, 50, 'Souvenir', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Stand Jeux Famille'), 'souvenir_chapeau.png'),

    ('Aimant flip', 5, 60, 'Souvenir', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Stand Jeux Famille'), 'souvenir_aimant_flip.png'),

    ('Lunette Flip Up', 4.50, 65, 'Souvenir', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Stand Jeux Famille'), 'souvenir_lunette.png'),

    ('Stylo personnalisable', 5, 70, 'Souvenir', TRUE,
     (SELECT id FROM stand WHERE nom_stand = 'Stand Jeux Famille'), 'souvenir_stylo.png');


-- Insérer des jeux associés aux produits
INSERT INTO jeu (type, nombre_joueurs_min, nombre_joueurs_max, age_limite, duree, produit_id)
VALUES
    ('Stratégie', 2, 6, 8, 90, (SELECT id FROM produit WHERE nom_produit = 'Monopoly')),
    ('Gestion', 3, 4, 10, 120, (SELECT id FROM produit WHERE nom_produit = 'Catan')),
    ('Cartes', 2, 10, 7, 30, (SELECT id FROM produit WHERE nom_produit = 'Uno')),
    ('Adresse', 2, 4, 8, 20, (SELECT id FROM produit WHERE nom_produit = 'Croque-Carotte')),
    ('Déduction', 3, 6, 8, 45, (SELECT id FROM produit WHERE nom_produit = 'Cluedo')),
    ('Gestion', 2, 6, 8, 30, (SELECT id FROM produit WHERE nom_produit = 'La Bonne Paye')),
    ('Stratégie', 2, 6, 10, 120, (SELECT id FROM produit WHERE nom_produit = 'Risk')),
    ('Stratégie', 2, 7, 10, 45, (SELECT id FROM produit WHERE nom_produit = '7 Wonders')),
    ('Cartes', 2, 4, 6, 20, (SELECT id FROM produit WHERE nom_produit = 'Le Président')),
    ('Cartes', 3, 10, 8, 30, (SELECT id FROM produit WHERE nom_produit = 'Saboteur')),
    ('Adresse', 1, 4, 6, 20, (SELECT id FROM produit WHERE nom_produit = 'Docteur Maboul')),
    ('Déduction', 2, 4, 6, 25, (SELECT id FROM produit WHERE nom_produit = 'Qui est-ce ?'));

-- Insérer des utilisateurs
INSERT INTO utilisateur (identifiant, nom, prenom, mdp, email, role)
VALUES
    ('user1', 'Dupont', 'Jean', 'hashed_mdp_123', 'jean.dupont@email.com', 'Utilisateur'),
    ('user2', 'Martin', 'Sophie', 'hashed_mdp_456', 'sophie.martin@email.com', 'Utilisateur');

-- Insérer un panier pour les utilisateurs
INSERT INTO panier (valeur_panier, recuperation_panier, paid, id_utilisateur,type)
VALUES
    (0, CURRENT_TIMESTAMP, FALSE,1,'jeu'),
    (0, CURRENT_TIMESTAMP, FALSE,1,'souvenir');

-- Associer des produits au panier
INSERT INTO panier_produit (id_panier, id_produit, quantite)
VALUES
    (1, (SELECT id FROM produit WHERE nom_produit = 'Monopoly'), 1),
    (1, (SELECT id FROM produit WHERE nom_produit = 'Uno'), 2),
    (1, (SELECT id FROM produit WHERE nom_produit = 'La Bonne Paye'), 2),
    (2, (SELECT id FROM produit WHERE nom_produit = 'Cluedo'), 1),
    (2, (SELECT id FROM produit WHERE nom_produit = 'Catan'), 1),
    (2, (SELECT id FROM produit WHERE nom_produit = 'Docteur Maboule'), 2);

-- Insérer un tournoi
INSERT INTO tournoi (id_stand, lieu, participants_max, prix_entree, nom_tournoi, description_tournoi, image_path)
VALUES
    ((SELECT id FROM stand WHERE nom_stand = 'Stand Jeux Famille'), 'Salle A', 16, 5.00,
     'Monopoly', 'Un grand tournoi de Monopoly pour tous les âges.', 'monopoly.jpg'),

    ((SELECT id FROM stand WHERE nom_stand = 'Activité'), 'Domaine des loges', 10, 5.00,
     'Molkky', 'Participez à un tournoi de Molkky, le célèbre jeu de quilles finlandaises.', 'Molkky.jpg'),

    ((SELECT id FROM stand WHERE nom_stand = 'Activité'), 'Domaine des loges', 8, 5.00,
     'Corn Hole', 'Affrontez d''autres participants dans un tournoi de Corn Hole.', 'corn_hole.jpg'),

    ((SELECT id FROM stand WHERE nom_stand = 'Activité'), 'Château de Parthenay', 10, 20.00,
     'Paintball', 'Une bataille de paintball en équipe dans un cadre unique.', 'tournois_paintball.png'),

    ((SELECT id FROM stand WHERE nom_stand = 'Activité'), 'Place du drapeau', 6, 3.00,
     'Basketball', 'Un tournoi de basketball 3 contre 3.', 'tournois_basketball.png'),

    ((SELECT id FROM stand WHERE nom_stand = 'Activité'), 'Palais des congrès', 12, 5.00,
     'Rocket League', 'Un tournoi e-sport de Rocket League pour les passionnés de jeux vidéo.', 'tournois_rocketleague.png'),

    ((SELECT id FROM stand WHERE nom_stand = 'Stand Cartes'), 'Salle A', 100, 5.00,
     'Uno', 'Un grand tournoi de Uno pour tous les âges.', 'uno.jpg');

-- Insérer une édition de tournoi
INSERT INTO edition_tournoi (id_tournoi, capacitee, current_participants, date_edition)
VALUES
    ((SELECT id FROM tournoi WHERE nom_tournoi = 'Monopoly'), 100, 0, CURRENT_TIMESTAMP),
    ((SELECT id FROM tournoi WHERE nom_tournoi = 'Molkky'), 55, 0, CURRENT_TIMESTAMP),
    ((SELECT id FROM tournoi WHERE nom_tournoi = 'Corn Hole'), 50, 0, CURRENT_TIMESTAMP),
    ((SELECT id FROM tournoi WHERE nom_tournoi = 'Paintball'), 50, 0, CURRENT_TIMESTAMP),
    ((SELECT id FROM tournoi WHERE nom_tournoi = 'Basketball'), 50, 0, CURRENT_TIMESTAMP),
    ((SELECT id FROM tournoi WHERE nom_tournoi = 'Rocket League'), 50, 0, CURRENT_TIMESTAMP),
    ((SELECT id FROM tournoi WHERE nom_tournoi = 'Uno'), 150, 0, CURRENT_TIMESTAMP);

-- Insérer des commentaires
INSERT INTO commentaires (id_stand, id_utilisateur, commentaire)
VALUES
    ((SELECT id FROM stand WHERE nom_stand = 'Stand Jeux Famille'),
     (SELECT id FROM utilisateur WHERE identifiant = 'user1'), 'Super stand, très accueillant !'),
    ((SELECT id FROM stand WHERE nom_stand = 'Stand Jeux Enfants'),
     (SELECT id FROM utilisateur WHERE identifiant = 'user1'), 'Stand accueillant, mes enfants ont adorés !'),
    ((SELECT id FROM stand WHERE nom_stand = 'Stand Stratégie'),
     (SELECT id FROM utilisateur WHERE identifiant = 'user2'), 'Les jeux sont vraiment intéressants !'),
    ((SELECT id FROM stand WHERE nom_stand = 'Stand Cartes'),
     (SELECT id FROM utilisateur WHERE identifiant = 'user2'), 'Stand sympathique avec de bons jeux de cartes !');

-- Insérer des notes
INSERT INTO note (id_stand, id_utilisateur, note)
VALUES
    ((SELECT id FROM stand WHERE nom_stand = 'Stand Jeux Famille'),
     (SELECT id FROM utilisateur WHERE identifiant = 'user1'), 5),
    ((SELECT id FROM stand WHERE nom_stand = 'Stand Jeux Enfants'),
     (SELECT id FROM utilisateur WHERE identifiant = 'user1'), 5),
    ((SELECT id FROM stand WHERE nom_stand = 'Stand Stratégie'),
     (SELECT id FROM utilisateur WHERE identifiant = 'user2'), 4),
    ((SELECT id FROM stand WHERE nom_stand = 'Stand Cartes'),
     (SELECT id FROM utilisateur WHERE identifiant = 'user2'), 4);

-- Insérer des réservations de jeux
INSERT INTO reservationJeu (id_jeu, id_utilisateur)
VALUES
    ((SELECT id FROM jeu WHERE type = 'Stratégie' LIMIT 1), (SELECT id FROM utilisateur WHERE identifiant = 'user1')),
    ((SELECT id FROM jeu WHERE type = 'Cartes' LIMIT 1), (SELECT id FROM utilisateur WHERE identifiant = 'user1')),
    ((SELECT id FROM jeu WHERE type = 'Déduction' LIMIT 1), (SELECT id FROM utilisateur WHERE identifiant = 'user1')),
    ((SELECT id FROM jeu WHERE type = 'Gestion' LIMIT 1), (SELECT id FROM utilisateur WHERE identifiant = 'user2')),
    ((SELECT id FROM jeu WHERE type = 'Adresse' LIMIT 1), (SELECT id FROM utilisateur WHERE identifiant = 'user2'));