-- INSERT INTO client (client_firstname, client_lastname, client_email, client_password)
-- VAlUES ('Tony', 'Stark', 'tony@starknet.com', 'Iam1ronM@\n');

-- UPDATE client
-- SET client_type = 'Admin'
-- WHERE client_email = 'tony@starknet.com'

-- DELETE FROM client
-- WHERE client_firstname = 'Tony' AND client_lastname = 'Stark'

-- UPDATE inventory 
-- SET inv_description = REPLACE(inv_description,'small', 'A huge')
-- WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- SELECT inv_make, inv_model, classification_name
-- FROM inventory i
-- JOIN classification c
-- ON i.classification_id = c.classification_id
-- WHERE classification_name = 'Sport';

-- UPDATE inventory
-- SET inv_image = REPLACE(inv_image, '/images', '/images/vehicles'),
-- 	inv_thumbnail = REPLACE(inv_thumbnail, '/images', '/images/vehicles');