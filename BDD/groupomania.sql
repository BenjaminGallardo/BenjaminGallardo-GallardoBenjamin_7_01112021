-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 26 nov. 2021 à 09:54
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(250) NOT NULL,
  `commentText` text NOT NULL,
  `publication_id` int(11) NOT NULL,
  `date` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=130 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `userId`, `commentText`, `publication_id`, `date`) VALUES
(127, '100', 'C\'est très moderne !', 132, '26 novembre 2021 à 10:03'),
(126, '111', 'Oui tout à fait ! ', 132, '26 novembre 2021 à 10:02'),
(124, '111', 'C\'est un beau bâtiment d\'entreprise.', 131, '26 novembre 2021 à 10:00'),
(125, '109', 'C\'est ici que vous avez travaillé pour créer notre réseau social ?', 132, '26 novembre 2021 à 10:01'),
(123, '110', 'C\'est très moderne ! C\'est génial.', 131, '26 novembre 2021 à 09:58'),
(128, '100', 'Pour y être rentré, c\'est vraiment grand ^^', 131, '26 novembre 2021 à 10:03');

-- --------------------------------------------------------

--
-- Structure de la table `publication`
--

DROP TABLE IF EXISTS `publication`;
CREATE TABLE IF NOT EXISTS `publication` (
  `id` int(250) NOT NULL AUTO_INCREMENT,
  `userId` varchar(250) NOT NULL,
  `textField` text,
  `imageUrlPublication` varchar(250) DEFAULT NULL,
  `date` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=136 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `publication`
--

INSERT INTO `publication` (`id`, `userId`, `textField`, `imageUrlPublication`, `date`) VALUES
(131, '109', 'J\'ai le plaisir de vous présenter les nouveaux locaux de Groupomania !', 'http://localhost:3001/images/Immeuble.jpg1637916937741.jpg', '26 novembre 2021 à 09:55'),
(132, '111', 'Ce sont les bureaux des développeurs web !', 'http://localhost:3001/images/Bureaux.jpg1637917227621.jpg', '26 novembre 2021 à 10:00');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(150) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `bio` text,
  `imageUrl` varchar(250) DEFAULT 'http://localhost:3001/images/Image_profile-default.png1637830252800.png',
  `admin` varchar(10) NOT NULL DEFAULT 'false',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=113 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `bio`, `imageUrl`, `admin`) VALUES
(111, 'Benjamin Gallardo', 'Benjamin.Gallardo1@outlook.fr', '$2b$10$CfDtiV.efjE6C6qZg1fGleI0JNTIXzg9LyU4cFWdLHrA8oZ84wALy', 'Etudiant en développement web chez Openclassrooms !', 'http://localhost:3001/images/Ben.jpg1637917143534.jpg', 'false'),
(100, 'Elsa Stone (Admin)', 'Elsa.Stone@hotmail.com', '$2b$10$1QdkLj8pr71H74O/Aa3rt.8teVWq5HX1MfYrJiZWOyM52sDBjuOyS', 'Chargée de communication !', 'http://localhost:3001/images/chargé-communication-else.jpg1637913955025.jpg', 'true'),
(109, 'Bruce Harquin', 'BruceHarquin@gmail.com', '$2b$10$G1x2qB.LJPt2CLb1YUR1z.cfBcmnOQtRMnvN6GwVkjRh6op7nvkRC', 'PDG de Groupomania', 'http://localhost:3001/images/Bruce_Harquin.jpg1637916811405.jpg', 'false'),
(110, 'Capucine Tollmache', 'Capucine.Tollmache@hotmail.fr', '$2b$10$IRoCuaJJJtNu6yI2jrDnB.Alusz85XyDONStawGdJevAP0nTxj.sC', 'Chargée des ressources humaines !', 'http://localhost:3001/images/Capucine_Tollmache.jpg1637917016130.jpg', 'false');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
