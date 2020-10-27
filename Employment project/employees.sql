-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 23, 2019 at 06:36 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employment`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `surname` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `gender` varchar(6) COLLATE utf8_unicode_ci NOT NULL,
  `qualification` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `salary` int(11) NOT NULL,
  `joinDate` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birthDate` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `phone_number` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `imagePath` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `changeFilePath` char(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `name`, `surname`, `gender`, `qualification`, `salary`, `joinDate`, `birthDate`, `phone_number`, `imagePath`, `changeFilePath`) VALUES
(1, 'John', 'Smith', 'male', 'Computer Engineer', 40000000, '2019-11-19', '2019-11-09', '01059355955', 'frame.JPG', 'John.JPG'),
(2, 'Johnna', 'Scarlet', 'female', 'Designer', 40000000, '2019-11-19', '2019-11-09', '01080615955', 'frame.JPG', 'Johnna.JPG'),
(5, 'Smith', 'Janathan', 'male', 'banker', 2147483647, '2019-11-21', '2019-11-10', '234234242342', 'banker.jpg', 'Smith.jpg'),
(8, 'hansan', 'kim', 'male', 'businessman', 2147483647, '2019-11-20', '2019-11-10', '234234242342', 'Capturecc.JPG', 'hansan.JPG'),
(15, 'Martin ', 'Van', 'male', 'Banker', 500000, '2019-11-21', '1978-05-10', '01056354654', 'banker.jpg', 'Martin .jpg'),
(16, 'Williams', 'Smith', 'male', 'Doctor', 43454343, '2019-11-22', '1966-05-01', '01056354654', 'doctor.jpg', 'Williams.jpg'),
(17, 'Brown', 'Davis', 'male', 'Manager', 15455546, '2019-11-21', '1985-01-10', '0105465465465', 'managerman.jpg', 'Brown.jpg'),
(18, 'Killer', 'Watson ', 'male', 'Manager', 2147483647, '2019-11-21', '2019-11-08', '453534453', 'managerman.jpg', 'Killer.jpg'),
(19, 'Kerson', 'Huffman', 'male', 'manager', 456465454, '2019-11-22', '1986-03-10', '01065765464', 'maanger3.jpg', 'Kerson.jpg'),
(20, 'Sara', 'Mintah', 'female', 'Nurse', 456465454, '2019-11-21', '1986-03-10', '01065765464', 'nurse.jpg', 'Sara.jpg'),
(21, 'Wilson', 'Scarlet', 'female', 'Nurse', 456465454, '2019-11-21', '1986-03-10', '01065765464', 'nurse.jpg', 'Wilson.jpg'),
(23, 'Bale', 'Vinson', 'male', 'Driver', 2147483647, '1999-11-21', '1959-10-02', '23423423423', 'managerman.jpg', 'Bale.jpg'),
(24, 'John', 'Smith', 'male', 'Banker', 34224324, '2019-11-21', '1968-05-03', '23423423', 'banker.jpg', 'John.jpg'),
(30, 'Chesonwong', 'Kim', 'male', 'Assistant', 54654654, '2015', '1995-12-13', '164684654', 'managerman.jpg', 'Chesonwong.jpg'),
(31, 'Kaley', 'Moorith', 'female', 'businesswoman', 2147483647, '2006-06-10', '1990-05-10', '010254687686', 'managerw.jpg', 'Kaley.jpg'),
(32, 'jihyon', 'kim ', 'male', 'teacher', 43534543, '2010-05-10', '1966-06-11', '0105635465465', 'managerman.jpg', 'jihyon.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
