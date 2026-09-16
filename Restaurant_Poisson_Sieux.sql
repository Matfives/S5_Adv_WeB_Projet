CREATE DATABASE IF NOT EXISTS Restaurant;
USE Restaurant;

DROP TABLE IF EXISTS serve;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS dish;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Restaurants;

CREATE TABLE Restaurants (
	rest_id int auto_increment,
    rest_name varchar(50),
    rest_adress varchar(50),
    rest_size varchar(50),
    rest_phone int,
    rest_hours varchar(50),
	CONSTRAINT pk_restaurants PRIMARY KEY (rest_id)
);

CREATE TABLE Users (
	user_id int auto_increment,
    user_name varchar(50),
    user_type varchar(50),
    user_phone varchar(50),
    user_birthdate varchar(50),
    user_city varchar(50),
    rest_id int not null,
	CONSTRAINT pk_users PRIMARY KEY (user_id),
	CONSTRAINT fk_users_restaurant FOREIGN KEY (rest_id) REFERENCES Restaurants(rest_id)
);

CREATE TABLE dish (
	dish_id int auto_increment,
    dish_type varchar(50),
    dish_name varchar(50),
    dish_price decimal(15,2),
    dish_calories varchar(50),
    dish_ingredients varchar(50),
	CONSTRAINT pk_dish PRIMARY KEY (dish_id)
);

CREATE TABLE orders (
	user_id int,
    dish_id int,
    order_id varchar(50),
	CONSTRAINT pk_orders PRIMARY KEY (user_id, dish_id),
	CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES Users(user_id),
	CONSTRAINT fk_orders_dish FOREIGN KEY (dish_id) REFERENCES dish(dish_id)
);

CREATE TABLE serve (
	user_id int,
    user_id_1 int,
	CONSTRAINT pk_serve PRIMARY KEY (user_id, user_id_1),
	CONSTRAINT fk_serve_livreur FOREIGN KEY (user_id) REFERENCES Users(user_id),
	CONSTRAINT fk_serve_client FOREIGN KEY (user_id_1) REFERENCES Users(user_id)
);

-- ===================== DATA =====================

-- The orders CMD001, CMD002, CMD003, CMD004 and CMD005 are each shared
-- by two different users (same order_id, different user_id).
-- This is allowed because the primary key is based on (user_id, dish_id),
-- not on order_id.

INSERT INTO Restaurants (rest_name, rest_adress, rest_size, rest_phone, rest_hours) VALUES
('Le Gourmet', '12 Rue de Paris', 'Grand', 145236987, '09:00-23:00'),
('Pizza Roma', '5 Avenue Rome', 'Moyen', 145236988, '10:00-22:00'),
('Sushi World', '8 Rue Tokyo', 'Petit', 145236989, '11:00-21:00'),
('Burger House', '20 Rue Chicago', 'Moyen', 145236990, '10:00-23:00'),
('Le Petit Bistro', '3 Rue Lyon', 'Petit', 145236991, '08:00-20:00'),
('Curry Palace', '15 Rue Delhi', 'Grand', 145236992, '11:00-22:00'),
('Taco Fiesta', '7 Rue Mexico', 'Moyen', 145236993, '10:00-23:00'),
('Kebab Express', '9 Rue Ankara', 'Petit', 145236994, '11:00-02:00'),
('Pasta Amore', '4 Rue Milan', 'Moyen', 145236995, '09:00-22:00'),
('Ocean Grill', '18 Rue Marseille', 'Grand', 145236996, '10:00-23:00');

INSERT INTO Users (user_name, user_type, user_phone, user_birthdate, user_city, rest_id) VALUES
('Jean Dupont', 'Client', '0601020304', '1990-05-12', 'Paris', 1),
('Marie Curie', 'Client', '0601020305', '1985-03-21', 'Lyon', 2),
('Ali Ben', 'Livreur', '0601020306', '1995-07-09', 'Marseille', 3),
('Sophie Martin', 'Client', '0601020307', '1992-11-30', 'Paris', 4),
('Karim Said', 'Livreur', '0601020308', '1998-01-15', 'Toulouse', 5),
('Emma Bernard', 'Client', '0601020309', '1988-09-25', 'Nice', 6),
('Lucas Petit', 'Livreur', '0601020310', '1996-02-18', 'Nantes', 7),
('Chloe Robert', 'Client', '0601020311', '1993-06-05', 'Lille', 8),
('Yassine Amar', 'Livreur', '0601020312', '1994-12-01', 'Bordeaux', 9),
('Julie Moreau', 'Client', '0601020313', '1991-04-17', 'Strasbourg', 10);

INSERT INTO dish (dish_type, dish_name, dish_price, dish_calories, dish_ingredients) VALUES
('Entree', 'Salade Cesar', 8.50, '350', 'Salade, Poulet, Parmesan'),
('Plat', 'Pizza Margherita', 12.00, '800', 'Tomate, Mozzarella, Basilic'),
('Plat', 'Sushi Mix', 15.00, '600', 'Riz, Saumon, Thon, Avocat'),
('Plat', 'Burger Classic', 10.00, '900', 'Pain, Boeuf, Salade, Fromage'),
('Dessert', 'Tiramisu', 6.00, '450', 'Mascarpone, Cafe, Cacao'),
('Plat', 'Curry Poulet', 13.50, '700', 'Poulet, Riz, Epices, Lait de coco'),
('Plat', 'Tacos Boeuf', 9.00, '650', 'Tortilla, Boeuf, Fromage, Sauce'),
('Plat', 'Kebab', 8.00, '750', 'Pain, Viande, Salade, Sauce blanche'),
('Plat', 'Pates Carbonara', 11.00, '850', 'Pates, Oeuf, Lardons, Parmesan'),
('Plat', 'Saumon Grille', 16.00, '500', 'Saumon, Citron, Legumes');

-- Les commandes CMD001, CMD002, CMD003, CMD004, CMD005 sont chacune partagees
-- par 2 utilisateurs differents (meme order_id, user_id different) : rien ne
-- l'empeche car la cle primaire porte sur (user_id, dish_id), pas sur order_id.
INSERT INTO orders (user_id, dish_id, order_id) VALUES
(1, 2, 'CMD001'),
(2, 2, 'CMD001'),
(4, 1, 'CMD002'),
(6, 6, 'CMD002'),
(8, 8, 'CMD003'),
(10, 9, 'CMD003'),
(1, 5, 'CMD004'),
(2, 3, 'CMD004'),
(6, 7, 'CMD005'),
(8, 10, 'CMD005');

INSERT INTO serve (user_id, user_id_1) VALUES
(3, 1),
(3, 2),
(5, 4),
(5, 6),
(7, 8),
(7, 10),
(9, 1),
(9, 6),
(3, 4),
(5, 8);


-- ===================== NON-CRUD QUERIES =====================

-- ===================== NON-CRUD QUERIES =====================

-- Query 1: Display the most ordered dishes and their total revenue.
SELECT 
    d.dish_name,
    COUNT(*) AS number_of_orders,
    SUM(d.dish_price) AS total_revenue
FROM orders o
JOIN dish d ON o.dish_id = d.dish_id
GROUP BY d.dish_id, d.dish_name
ORDER BY number_of_orders DESC;


-- Query 2: Display the customers with the highest number of orders
-- and the restaurant they are associated with.
SELECT 
    u.user_name,
    r.rest_name,
    COUNT(o.order_id) AS number_of_orders
FROM Users u
JOIN Restaurants r ON u.rest_id = r.rest_id
JOIN orders o ON u.user_id = o.user_id
WHERE u.user_type = 'Client'
GROUP BY u.user_id, u.user_name, r.rest_name
ORDER BY number_of_orders DESC;