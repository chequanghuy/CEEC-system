-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2020 at 10:24 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `userinfomationdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `personalinfo`
--

CREATE TABLE `personalinfo` (
  `Name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ID` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `CardID` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Location` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Age` int(11) DEFAULT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `personalinfo`
--

INSERT INTO `personalinfo` (`Name`, `ID`, `password`, `CardID`, `Location`, `Age`, `admin`) VALUES
('', '', '', '0', '', 0, 0),
('tên 1', '1', '123', '', 'nơi ở 1', 18, 0),
('tên 10', '123', '123456', '0', 'ádad', 19, 0),
('tesst', '123455555', 'password', 'idcard', 'loca', 12, 1),
('tesst', '1234555553', 'password', 'idcard', 'loca', 12, 1),
('namefull', '123456789', 'password', 'idcard', 'loca', 12, 0),
('tên 2', '2', '123', '', 'nơi ở 2', 18, 0),
('asdasd', '2114', 'asa', 'idcard', 'asdas', 23, 1),
('asdasd', '21141', 'asa', 'idcard', 'asdas', 23, 1),
('asdasd', '211418', 'asa', 'idcard', 'asdas', 23, 1),
('asdasd', '2114181', 'asa', 'idcard', 'asdas', 23, 1),
('sdfsdf', '2312', 'ffsdf', '0', 'sfsdf', 32, 0),
('tên 3', '3', '123', '', 'nơi ở 3', 18, 0),
('tên 4', '4', '123', '', 'nơi ở 4', 18, 0),
('tên 4', 'ID 4', '', '', 'nơi ở 4', 18, 0),
('tên 5', 'ID 5', '', '', 'nơi ở 5', 18, 0),
('tên 6', 'ID 6', '', '', 'nơi ở 6', 18, 0),
('tên 7', 'ID 7', '', '', 'nơi ở 7', 18, 0),
('tên 8', 'ID 8', '', '', 'nơi ở 8', 18, 0),
('tên 9', 'ID 9', '', '', 'nơi ở 9', 18, 0),
('undefined', 'undefined', 'undefined', '0', 'undefined', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `personalinfo`
--
ALTER TABLE `personalinfo`
  ADD PRIMARY KEY (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
CREATE TABLE `members` (
  `mssv` varchar(10),
  `name` varchar(100),
  
  `gender` bit,
  `birthday` datetime,
  `sdt` varchar(12),
  `facebook` text,
  `role` tinyint,
  `image` text,
  CONSTRAINT PK_members PRIMARY KEY (`mssv`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
CREATE TABLE `devices` (
  `deviceID` int,
  `name` varchar(50),
  `feature` varchar(100),
  `owner` varchar(10),
  `description` text,
  `status` tinyint,
  `image` text,
  CONSTRAINT PK_devices PRIMARY KEY (`deviceID`),
  CONSTRAINT FK_devices_members FOREIGN KEY (`owner`) REFERENCES members(`mssv`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
CREATE TABLE `loans` (
  `loanID` int,
  `date` datetime,
  `mssv` varchar(10),
  `numberDevices` int,
  CONSTRAINT PK_loans PRIMARY KEY (`loanID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
CREATE TABLE `loandetail` (
  `loanID` int,
  `deviceID` int,
  `datebegin` datetime,
  `dateend` datetime,
    
  CONSTRAINT PK_loandetail PRIMARY KEY (`loanID`, `deviceID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
CREATE TABLE `returns` (
  `returnID` int,
   `loanID` int,
  `date` datetime,
  `mssv` varchar(10),
  `fine` int,
  CONSTRAINT PK_returns PRIMARY KEY (`returnID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci
-- CREATE TABLE `returndetail` (
--   `returnID` int,
--   `deviceID` int,
--   `daysnumber` int,
--   `fine` int,
--   CONSTRAINT PK_returndetail PRIMARY KEY (`returnID`),
--   CONSTRAINT FK_returndetail_devices FOREIGN KEY (`deviceID`) REFERENCES devices(`deviceID`),
--   CONSTRAINT FK_returndetail_returns FOREIGN KEY (`returnID`) REFERENCES returns(`returnID`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

