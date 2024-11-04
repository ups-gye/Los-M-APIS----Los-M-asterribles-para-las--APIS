--@Author: Giovanny Jacome

USE [master]
GO
IF DB_ID('vuelo') IS NOT NULL
	set noexec on

CREATE DATABASE [vuelo];
GO

USE [vuelo]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Vuelo](
	[Codigo] [varchar](20) NOT NULL,
	[Origen] [varchar](50) NOT NULL,
	[Destino] [varchar](50) NOT NULL,
	[NumerpPasajero] [int] NOT NULL,
	[Estado] [varchar](3) NOT NULL,
	CONSTRAINT [PK_Vuelo] PRIMARY KEY CLUSTERED 
	(
		[Codigo] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO