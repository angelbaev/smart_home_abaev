-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: 27 окт 2019 в 16:51
-- Версия на сървъра: 10.3.16-MariaDB
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `id11226845_smart_home`
--

-- --------------------------------------------------------

--
-- Структура на таблица `accounts`
--

CREATE TABLE `accounts` (
  `_id` varchar(32) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(32) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `__v` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Схема на данните от таблица `accounts`
--

INSERT INTO `accounts` (`_id`, `username`, `password`, `isActive`, `createdAt`, `__v`) VALUES
('5d7fd1c89659b011f0932cad', 'system', '202cb962ac59075b964b07152d234b70', 1, '2019-10-21 19:45:40', 0),
('5d7fd1d09659b011f0932cae', 'abaev', '202cb962ac59075b964b07152d234b70', 1, '2019-10-21 19:46:27', 0);

-- --------------------------------------------------------

--
-- Структура на таблица `controls`
--

CREATE TABLE `controls` (
  `_id` varchar(32) NOT NULL,
  `device` varchar(32) NOT NULL,
  `name` varchar(255) NOT NULL,
  `commandOn` varchar(65) NOT NULL,
  `commandOff` varchar(65) NOT NULL,
  `state` enum('on','off') NOT NULL DEFAULT 'off',
  `isActive` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `__v` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Схема на данните от таблица `controls`
--

INSERT INTO `controls` (`_id`, `device`, `name`, `commandOn`, `commandOff`, `state`, `isActive`, `createdAt`, `updatedAt`, `__v`) VALUES
('5d83c071cada9018d0c59650', '5d82952ab44c231ad4800d57', 'Аквариум помпа за въздух', 'relay10a_on', 'relay10a_off', 'on', 1, '2019-10-21 20:13:38', '2019-10-21 20:13:38', 0),
('5d83c086cada9018d0c59651', '5d82952ab44c231ad4800d57', 'Kонвектор tesy', 'relay30a_on', 'relay30a_off', 'off', 1, '2019-10-21 20:14:16', '2019-10-21 20:14:16', 0);

-- --------------------------------------------------------

--
-- Структура на таблица `devices`
--

CREATE TABLE `devices` (
  `_id` varchar(32) NOT NULL,
  `account` varchar(32) NOT NULL,
  `name` varchar(255) NOT NULL,
  `ip` varchar(25) NOT NULL,
  `port` varchar(25) NOT NULL,
  `commands` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `__v` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Схема на данните от таблица `devices`
--

INSERT INTO `devices` (`_id`, `account`, `name`, `ip`, `port`, `commands`, `isActive`, `createdAt`, `updatedAt`, `__v`) VALUES
('5d82952ab44c231ad4800d57', '5d7fd1d09659b011f0932cae', 'A.Baev Smart Home', '78.83.99.29', '3355', '', 1, '2019-10-21 20:02:03', '2019-10-21 20:02:03', 0);

-- --------------------------------------------------------

--
-- Структура на таблица `histories`
--

CREATE TABLE `histories` (
  `_id` varchar(32) NOT NULL,
  `account` varchar(32) NOT NULL,
  `device` varchar(32) NOT NULL,
  `mobileDevice` varchar(32) NOT NULL,
  `command` varchar(65) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `__v` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Схема на данните от таблица `histories`
--

INSERT INTO `histories` (`_id`, `account`, `device`, `mobileDevice`, `command`, `createdAt`, `updatedAt`, `__v`) VALUES
('2e18990dc0230db44ab47531aaeaa736', '5d7fd1d09659b011f0932cae', '5d82952ab44c231ad4800d57', '', '', '2019-10-26 21:35:14', '2019-10-26 21:35:14', 0),
('2e2b47e27343287c7ef7039b5f9dd8e6', '5d7fd1d09659b011f0932cae', '5d82952ab44c231ad4800d57', '', '', '2019-10-27 14:12:45', '2019-10-27 14:12:45', 0),
('597ff3ae7101c2c79f197435650dbddb', '5d7fd1d09659b011f0932cae', '5d82952ab44c231ad4800d57', '', '', '2019-10-27 13:49:03', '2019-10-27 13:49:03', 0),
('619bb8d1e0fdeae23417a0e0ffe76d40', '5d7fd1d09659b011f0932cae', '5d82952ab44c231ad4800d57', '', '', '2019-10-26 21:18:15', '2019-10-26 21:18:15', 0),
('9726091e88f1c7e9c00466689113a9f4', '5d7fd1d09659b011f0932cae', '5d82952ab44c231ad4800d57', '', '', '2019-10-27 07:07:32', '2019-10-27 07:07:32', 0),
('aacd1567103975491bab7df0a49e33cd', '5d7fd1d09659b011f0932cae', '5d82952ab44c231ad4800d57', '', '', '2019-10-26 21:35:16', '2019-10-26 21:35:16', 0),
('ce0e92b7e821fec82affc8c3b526a3db', '5d7fd1d09659b011f0932cae', '5d82952ab44c231ad4800d57', '', '', '2019-10-26 21:18:08', '2019-10-26 21:18:08', 0),
('f74cce5af64a7a65e0d164aececa9f2b', '5d7fd1d09659b011f0932cae', '5d82952ab44c231ad4800d57', '', '', '2019-10-26 21:17:58', '2019-10-26 21:17:58', 0);

-- --------------------------------------------------------

--
-- Структура на таблица `mobiledevices`
--

CREATE TABLE `mobiledevices` (
  `_id` varchar(32) CHARACTER SET utf8 NOT NULL,
  `account` varchar(32) CHARACTER SET utf8 NOT NULL,
  `model` varchar(255) CHARACTER SET utf8 NOT NULL,
  `type` varchar(25) CHARACTER SET utf8 NOT NULL,
  `uuid` varchar(65) CHARACTER SET utf8 NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `__v` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Схема на данните от таблица `mobiledevices`
--

INSERT INTO `mobiledevices` (`_id`, `account`, `model`, `type`, `uuid`, `createdAt`, `updatedAt`, `__v`) VALUES
('5d964dffa2c5e500434e4d2b', '5d7fd1d09659b011f0932cae', 'HTC Desire 526G dual sim', 'Phone', '75c66c52220307a3', '2019-10-21 20:30:12', '2019-10-21 20:30:12', 0),
('5d99e07cc8691900432f731f', '5d7fd1d09659b011f0932cae', 'SM-A202F', 'Phone', '8df8b2b5b2931b98', '2019-10-21 20:30:51', '2019-10-21 20:30:51', 0);

-- --------------------------------------------------------

--
-- Структура на таблица `tokens`
--

CREATE TABLE `tokens` (
  `_id` varchar(32) NOT NULL,
  `account` varchar(32) NOT NULL,
  `token` varchar(32) NOT NULL,
  `expireAt` datetime NOT NULL DEFAULT current_timestamp(),
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `__v` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Схема на данните от таблица `tokens`
--

INSERT INTO `tokens` (`_id`, `account`, `token`, `expireAt`, `createdAt`, `__v`) VALUES
('0861d616a321bc12290082b5f22a0013', '4bd90f86ec662ede689120c91a2f0cf2', '235b9037b6f9d1008a54f84062d23edd', '2019-10-27 01:06:04', '2019-10-26 21:09:00', 0),
('08f0c6fbd9fca43c8bdcb7d2527e663c', '5d7fd1d09659b011f0932cae', 'b44db573d23a759fb00d15c2ac575ec9', '2019-10-27 19:47:07', '2019-10-27 16:50:04', 0),
('0a42b568796892835fc36ca336ca0e9f', '4bd90f86ec662ede689120c91a2f0cf2', 'bc3dd30191ff66d3fafb54f70a607df9', '2019-10-27 01:04:24', '2019-10-26 21:07:20', 0),
('0ef86190e9d36d64b45dbc4c7b2a9619', '4bd90f86ec662ede689120c91a2f0cf2', '87885024b1840af4118e325846d73af6', '2019-10-27 01:09:38', '2019-10-26 21:12:34', 0),
('24e366db084b409983ff00159c5e97bb', '5d7fd1d09659b011f0932cae', '78f6873b56d0d6a652e02c575eeb5abf', '2019-10-27 01:32:10', '2019-10-26 21:35:06', 0),
('386ee1bce4bb1cdb75b2be08a456d0ce', '5d7fd1d09659b011f0932cae', '3cc6cf85dd95032bfb5f6f21fee16fa7', '2019-10-27 01:37:51', '2019-10-26 21:40:46', 0),
('3b7ccf185277de9c2fb4c9128c86c33d', '5d7fd1d09659b011f0932cae', '2f7170f73d372c844059cd49ee74e48f', '2019-10-27 01:31:53', '2019-10-26 21:34:49', 0),
('43bbb6fdca1976d7ac3b3de3b21b5257', '4bd90f86ec662ede689120c91a2f0cf2', '44db21d7c00f658fc8b597e31b18ebb1', '2019-10-27 01:11:58', '2019-10-26 21:14:54', 0),
('4e93a425c58d619c2af2656944313311', '4bd90f86ec662ede689120c91a2f0cf2', '60a59cc2a134e9024aa76e4c9ed854a2', '2019-10-27 01:03:11', '2019-10-26 21:06:07', 0),
('5439087b378e96fba1d10a274f28fd60', '5d7fd1d09659b011f0932cae', '7123ab9d093d28fed0129051ca20297b', '2019-10-26 21:54:33', '2019-10-26 17:57:29', 0),
('5498b99c54f0a0bd768549cc8d9915b7', '5d7fd1d09659b011f0932cae', '3cc6cf85dd95032bfb5f6f21fee16fa7', '2019-10-27 01:37:51', '2019-10-26 21:40:46', 0),
('552c1a78f1e7378b5fca9b864cfaf2ff', '4bd90f86ec662ede689120c91a2f0cf2', '4fcff2743b38385cd45d38a21b7301c5', '2019-10-27 01:01:09', '2019-10-26 21:04:05', 0),
('665507dc650f56ac3933a0fabea9adac', '5d7fd1d09659b011f0932cae', '7205947da59ad5be3e79c4fea3297526', '2019-10-27 01:39:03', '2019-10-26 21:41:59', 0),
('74f0ecfc57f251c8cce5df6a1f402d73', '4bd90f86ec662ede689120c91a2f0cf2', '7f556eeecdb06fa1c6988fecf59cc637', '2019-10-27 01:00:30', '2019-10-26 21:03:26', 0),
('75ccc9a8a756e9bbd415c8f7f195526d', '5d7fd1d09659b011f0932cae', 'ec9ccc227d69136937215d040117336e', '2019-10-27 10:04:28', '2019-10-27 07:07:25', 0),
('79e502ace8aa19b87a30c49fa790ddba', '5d7fd1d09659b011f0932cae', '9a709c00113268741c00c817eb0f085e', '2019-10-27 01:16:03', '2019-10-26 21:18:59', 0),
('7ab5b2e5d0f64994580e751ed07b5308', '4bd90f86ec662ede689120c91a2f0cf2', 'a379e1614509e7820e818237b8648eb3', '2019-10-27 01:12:25', '2019-10-26 21:15:21', 0),
('8110aa0bc6d94b76378064876b45440e', '5d7fd1d09659b011f0932cae', '87d8dd5b3e515b90586bc23d142161c2', '2019-10-27 16:46:02', '2019-10-27 13:48:59', 0),
('82462045ede9d421583a0b03385ca2dc', '4bd90f86ec662ede689120c91a2f0cf2', '324fff719a399bec80ea1e65f7090387', '2019-10-27 01:04:31', '2019-10-26 21:07:27', 0),
('8aa0e4b061de3704a1e677c9f8078bb5', '4bd90f86ec662ede689120c91a2f0cf2', '823c52b4a873a81c72f3f493a5fcd956', '2019-10-27 01:06:07', '2019-10-26 21:09:03', 0),
('8e8f490fd1bd7cfa2ecc97eac3918337', '5d7fd1d09659b011f0932cae', 'e9e4d97844205d6b2b116ae69ce33794', '2019-10-27 01:14:50', '2019-10-26 21:17:46', 0),
('99497e4b20adc03023bd20c4635a262e', '4bd90f86ec662ede689120c91a2f0cf2', '115a14cfbeb1dd8e5d909946990e0e2a', '2019-10-27 01:04:34', '2019-10-26 21:07:30', 0),
('a5a7a06585f43683bb2b91e9f9edb7fb', '5d7fd1d09659b011f0932cae', '52a0c42e1a42a89fca72b5001aaee5a1', '2019-10-27 00:23:14', '2019-10-26 20:26:10', 0),
('a91a61a0aa29d9a8fb1833065269a2a6', '5d7fd1d09659b011f0932cae', '94742d7f88b6192c308282d277c963e9', '2019-10-27 01:38:33', '2019-10-26 21:41:29', 0),
('c1f7ad2c45d169a32d6c6b174ab26c86', '4bd90f86ec662ede689120c91a2f0cf2', '7720f36e209a40c093c9c2184b5c3fa3', '2019-10-27 01:09:35', '2019-10-26 21:12:31', 0),
('c31da25570c1d1672126386442cd0a11', '5d7fd1d09659b011f0932cae', '34369b802e952a900d77addfdf6c5c90', '2019-10-27 01:15:56', '2019-10-26 21:18:51', 0),
('ceb16abf336095d18b55230331766b14', '5d7fd1d09659b011f0932cae', '5b8c2704df52fac6ad51bba46bb5a2cf', '2019-10-27 17:09:45', '2019-10-27 14:12:41', 0),
('e28bf59688cbe1d11f3062dee371a7cb', '4bd90f86ec662ede689120c91a2f0cf2', '60464217ff66097c1d1e7f45e59d786d', '2019-10-27 01:04:21', '2019-10-26 21:07:17', 0),
('ea66662d14d3f3d3aeaaf819adc735a1', '5d7fd1d09659b011f0932cae', '9eb6223a8b6bdd8eb12ee7b6d883a717', '2019-10-27 01:15:53', '2019-10-26 21:18:49', 0),
('ebdc458b0eb6099d93534619a3b0cbe7', '5d7fd1d09659b011f0932cae', '23352febddc159db6365f262cf555053', '2019-10-25 21:13:41', '2019-10-25 18:57:53', 0),
('ef59efcf8b809c10d0508ec210c6b5bd', '5d7fd1d09659b011f0932cae', 'c671cd6be91e2a9dff4678f44cfb940b', '2019-10-27 01:14:53', '2019-10-26 21:17:49', 0),
('fad5ced20d5dafb410082759e7ea38bf', '5d7fd1d09659b011f0932cae', '3cc6cf85dd95032bfb5f6f21fee16fa7', '2019-10-27 01:37:51', '2019-10-26 21:40:46', 0),
('fe9734b908ec3296496fd2ebe94fd2ce', '5d7fd1d09659b011f0932cae', '8cc8fe5591f2ad79020ed9dd3cd6f89e', '2019-10-27 01:17:00', '2019-10-26 21:19:56', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `controls`
--
ALTER TABLE `controls`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `mobiledevices`
--
ALTER TABLE `mobiledevices`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
