-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: easyrefund
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aprovadores`
--

DROP TABLE IF EXISTS `aprovadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aprovadores` (
  `id_aprovador` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_aprovador`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `aprovadores_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aprovadores`
--

LOCK TABLES `aprovadores` WRITE;
/*!40000 ALTER TABLE `aprovadores` DISABLE KEYS */;
INSERT INTO `aprovadores` VALUES (1,2);
/*!40000 ALTER TABLE `aprovadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cargos`
--

DROP TABLE IF EXISTS `cargos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargos` (
  `id_cargo` int(11) NOT NULL AUTO_INCREMENT,
  `nome_cargo` varchar(45) NOT NULL,
  `id_setor` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_cargo`),
  KEY `id_setor` (`id_setor`),
  CONSTRAINT `cargos_ibfk_1` FOREIGN KEY (`id_setor`) REFERENCES `setores` (`id_setor`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargos`
--

LOCK TABLES `cargos` WRITE;
/*!40000 ALTER TABLE `cargos` DISABLE KEYS */;
INSERT INTO `cargos` VALUES (1,'Desenvolvedor',1),(2,'Analista de RH',2),(3,'Gerente Financeiro',3),(4,'Administrativo',4),(5,'Funcionário',5);
/*!40000 ALTER TABLE `cargos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nfs`
--

DROP TABLE IF EXISTS `nfs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nfs` (
  `id_nf` int(11) NOT NULL AUTO_INCREMENT,
  `anexo_nf` varchar(255) NOT NULL,
  `id_solicitacao` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_nf`),
  KEY `id_solicitacao` (`id_solicitacao`),
  CONSTRAINT `nfs_ibfk_1` FOREIGN KEY (`id_solicitacao`) REFERENCES `solicitacoes` (`id_solicitacao`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nfs`
--

LOCK TABLES `nfs` WRITE;
/*!40000 ALTER TABLE `nfs` DISABLE KEYS */;
/*!40000 ALTER TABLE `nfs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificacoes`
--

DROP TABLE IF EXISTS `notificacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificacoes` (
  `id_notificacao` int(11) NOT NULL AUTO_INCREMENT,
  `mensagem_notif` varchar(250) DEFAULT NULL,
  `dt_criacao_notif` timestamp NOT NULL DEFAULT current_timestamp(),
  `dt_atualizacao` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_usuario` int(11) DEFAULT NULL,
  `id_aprovador` int(11) DEFAULT NULL,
  `id_solicitacao` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_notificacao`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_aprovador` (`id_aprovador`),
  KEY `id_solicitacao` (`id_solicitacao`),
  CONSTRAINT `notificacoes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `notificacoes_ibfk_2` FOREIGN KEY (`id_aprovador`) REFERENCES `aprovadores` (`id_aprovador`),
  CONSTRAINT `notificacoes_ibfk_3` FOREIGN KEY (`id_solicitacao`) REFERENCES `solicitacoes` (`id_solicitacao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificacoes`
--

LOCK TABLES `notificacoes` WRITE;
/*!40000 ALTER TABLE `notificacoes` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setores`
--

DROP TABLE IF EXISTS `setores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `setores` (
  `id_setor` int(11) NOT NULL AUTO_INCREMENT,
  `nome_setor` varchar(45) NOT NULL,
  PRIMARY KEY (`id_setor`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setores`
--

LOCK TABLES `setores` WRITE;
/*!40000 ALTER TABLE `setores` DISABLE KEYS */;
INSERT INTO `setores` VALUES (1,'TI'),(2,'RH'),(3,'Financeiro'),(4,'Administrativo'),(5,'Comercial');
/*!40000 ALTER TABLE `setores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setores_unidades`
--

DROP TABLE IF EXISTS `setores_unidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `setores_unidades` (
  `id_setor` int(11) NOT NULL,
  `id_unidade` int(11) NOT NULL,
  PRIMARY KEY (`id_setor`,`id_unidade`),
  KEY `id_unidade` (`id_unidade`),
  CONSTRAINT `setores_unidades_ibfk_1` FOREIGN KEY (`id_setor`) REFERENCES `setores` (`id_setor`),
  CONSTRAINT `setores_unidades_ibfk_2` FOREIGN KEY (`id_unidade`) REFERENCES `unidades` (`id_unidade`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setores_unidades`
--

LOCK TABLES `setores_unidades` WRITE;
/*!40000 ALTER TABLE `setores_unidades` DISABLE KEYS */;
INSERT INTO `setores_unidades` VALUES (1,1),(1,2),(2,2),(2,3),(3,2),(3,3),(4,1),(5,3);
/*!40000 ALTER TABLE `setores_unidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitacoes`
--

DROP TABLE IF EXISTS `solicitacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitacoes` (
  `id_solicitacao` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) DEFAULT NULL,
  `id_aprovador` int(11) DEFAULT NULL,
  `status_solicitacao` enum('Pendente','Aprovada','Recusada') DEFAULT 'Pendente',
  `dt_criacao_solic` timestamp NOT NULL DEFAULT current_timestamp(),
  `valor_pedido_solic` decimal(10,2) NOT NULL,
  `valor_aprovado_solic` decimal(10,2) DEFAULT NULL,
  `tipo_dedutivel_solic` tinyint(1) DEFAULT NULL,
  `dt_aprovacao` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `descricao` varchar(250) NOT NULL DEFAULT '',
  `categoria` enum('Alimentação','Transporte','Hospedagem','Outros') NOT NULL,
  PRIMARY KEY (`id_solicitacao`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_aprovador` (`id_aprovador`),
  CONSTRAINT `solicitacoes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `solicitacoes_ibfk_2` FOREIGN KEY (`id_aprovador`) REFERENCES `aprovadores` (`id_aprovador`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitacoes`
--

LOCK TABLES `solicitacoes` WRITE;
/*!40000 ALTER TABLE `solicitacoes` DISABLE KEYS */;
/*!40000 ALTER TABLE `solicitacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidades`
--

DROP TABLE IF EXISTS `unidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidades` (
  `id_unidade` int(11) NOT NULL AUTO_INCREMENT,
  `nome_unidade` varchar(45) NOT NULL,
  PRIMARY KEY (`id_unidade`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidades`
--

LOCK TABLES `unidades` WRITE;
/*!40000 ALTER TABLE `unidades` DISABLE KEYS */;
INSERT INTO `unidades` VALUES (1,'Unidade A'),(2,'Unidade B'),(3,'Unidade C');
/*!40000 ALTER TABLE `unidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome_usuario` varchar(45) NOT NULL,
  `cpf_usuario` char(11) DEFAULT NULL,
  `email_usuario` varchar(45) NOT NULL,
  `senha_usuario` varchar(255) NOT NULL,
  `dt_criacao_usuario` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_cargo` int(11) DEFAULT NULL,
  `id_unidade` int(11) DEFAULT NULL,
  `id_setor` int(11) DEFAULT NULL,
  `role_nome` enum('Funcionário','Aprovador','Gerente','Administrador') NOT NULL DEFAULT 'Funcionário',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email_usuario` (`email_usuario`),
  UNIQUE KEY `cpf_usuario` (`cpf_usuario`),
  KEY `id_cargo` (`id_cargo`),
  KEY `id_unidade` (`id_unidade`),
  KEY `id_setor` (`id_setor`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_cargo`) REFERENCES `cargos` (`id_cargo`),
  CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`id_unidade`) REFERENCES `unidades` (`id_unidade`),
  CONSTRAINT `usuarios_ibfk_3` FOREIGN KEY (`id_setor`) REFERENCES `setores` (`id_setor`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Gerente','36172191012','gerente@gmail.com','$2a$10$2Kq14MzlwLgkx7B0uAJrtu/t1U.r82quip8COMhCaM/Be0OKseX6y','2024-11-18 17:02:33',2,2,2,'Gerente'),(2,'aprovador 45','84623532038','aprovador@gmail.com','$2a$10$h8Szvl3NhA/P1gcX3c6Bwejgwb5hsATEukxGLXsR0LjSeDucSCUHm','2024-11-18 17:02:47',2,2,2,'Aprovador'),(3,'funcionário1','99671589057','funcionario@gmail.com','$2a$10$DIiL9UrueAydItuWrdzre.jcpiINpj6.xml1hyhEn7qqymq4mNETW','2024-11-18 17:02:58',1,1,1,'Funcionário');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-22 17:14:19
