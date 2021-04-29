CREATE TABLE usuario (
  userID INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  userName VARCHAR(50) NULL,
  userSurname VARCHAR(50) NULL,
  userMail VARCHAR(255) NULL,
  userPassword VARCHAR(255) NULL,
  createdAt DATE NULL,
  updatedAt DATE NULL,
  PRIMARY KEY(userID)
);

CREATE TABLE hotel (
  hotelID INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  hotetName VARCHAR(100) NULL,
  categoria INTEGER(1) UNSIGNED NULL,
  precio INTEGER(8) UNSIGNED NULL,
  createdAt DATE NULL,
  updatedAt DATE NULL,
  PRIMARY KEY(hotelID)
);

CREATE TABLE image (
  idimage INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  hotel_hotelID INTEGER UNSIGNED NOT NULL,
  urlData VARCHAR(255) NULL,
  createdAt DATE NULL,
  updatedAt DATE NULL,
  PRIMARY KEY(idimage),
  INDEX image_FKIndex1(hotel_hotelID),
  FOREIGN KEY(hotel_hotelID)
    REFERENCES hotel(hotelID)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE calificacion (
  idcalificacion INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_userID INTEGER UNSIGNED NOT NULL,
  hotel_hotelID INTEGER UNSIGNED NOT NULL,
  estrellas INTEGER(1) UNSIGNED NULL,
  comentario VARCHAR(255) NULL,
  createdAt DATE NULL,
  updatedAt DATE NULL,
  PRIMARY KEY(idcalificacion),
  INDEX calificacion_FKIndex1(hotel_hotelID),
  INDEX calificacion_FKIndex2(usuario_userID),
  FOREIGN KEY(hotel_hotelID)
    REFERENCES hotel(hotelID)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(usuario_userID)
    REFERENCES usuario(userID)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);


