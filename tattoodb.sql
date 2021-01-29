CREATE DATABASE tattoo_db;
USE tattoo_db;

CREATE TABLE Artist(
    Artist_ID int NOT NULL AUTO_INCREMENT,
    First_Name VARCHAR(20) NOT NULL,
    Last_Name VARCHAR(20) NOT NULL,
    Contact_Number VARCHAR(11) NOT NULL,
    City VARCHAR(30) NOT NULL,
    Street VARCHAR(30) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    Rate FLOAT NOT NULL,
    CONSTRAINT Artist_ID_PK_Art PRIMARY KEY(Artist_ID)
);

CREATE TABLE Design_Archive(
    Design_ID int NOT NULL AUTO_INCREMENT,
    Design_Name VARCHAR(255) NOT NULL,
    Image_Link varchar(255) NOT NULL,
    Image_Tags varchar(255) NOT NULL,
    Image_Desc varchar(255) NOT NULL,
    CONSTRAINT Design_ID_PK_DA PRIMARY KEY(Design_ID)
);


CREATE TABLE Client(
    Client_ID int NOT NULL AUTO_INCREMENT,
    First_Name VARCHAR(20) NOT NULL,
    Last_Name VARCHAR(20) NOT NULL,
    Contact_Number VARCHAR(11) NOT NULL,
    City VARCHAR(30) NOT NULL,
    Street VARCHAR(30) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    Remarks VARCHAR (50) NOT NULL,
    CONSTRAINT Client_ID_PK_C PRIMARY KEY(Client_ID)
);

CREATE TABLE Project_Records(
    Project_Number INT NOT NULL AUTO_INCREMENT,
    Client_ID INT NOT NULL,
    Design_ID INT NOT NULL,
    Artist_ID INT NOT NULL,
    Status ENUM('Complete','Ongoing') NOT NULL DEFAULT 'Ongoing',
    Color ENUM('B/W','Colored') NOT NULL,
    Size ENUM('Large','Medium','Small') NOT NULL,
    Date_Started date NOT NULL,
    Date_Finished DATE NULL,
    CONSTRAINT Project_Number_PK_PR PRIMARY KEY(Project_Number),
    CONSTRAINT Client_ID_FK_PR FOREIGN KEY (Client_ID) REFERENCES Client(Client_ID),
    CONSTRAINT Design_ID_FK_PR FOREIGN KEY (Design_ID) REFERENCES Design_Archive(Design_ID),
    CONSTRAINT Artist_ID_FK_PR FOREIGN KEY (Artist_ID) REFERENCES Artist(Artist_ID)
);

CREATE TABLE tattoo_session(
    Session_Number int NOT NULL AUTO_INCREMENT,
    Project_Number int NOT NULL,
    Time_Started TIME NOT NULL,
    Time_Finished TIME NULL,
    Session_Date date NOT NULL,
    CONSTRAINT Session_Number_PK_TS PRIMARY KEY(Session_Number),
    CONSTRAINT Project_Number_FK_TS FOREIGN KEY(Project_Number) REFERENCES Project_Records(Project_Number)
);

CREATE TABLE Payment(
    Payment_ID INT NOT NULL AUTO_INCREMENT,
    Client_ID INT NOT NULL,
    Session_Number INT NOT NULL,
    Receipt_ID int Not NULL,
    Date_ date NOT NULL,
    Amount FLOAT NOT NULL,
    CONSTRAINT Payment_ID_PK_R PRIMARY KEY(Payment_ID),
    CONSTRAINT Session_Number_FK_R FOREIGN KEY(Session_Number) REFERENCES tattoo_session(Session_Number),
    CONSTRAINT Client_ID_FK_R FOREIGN KEY(Client_ID) REFERENCES Client(Client_ID)
);

CREATE TABLE admin_accounts(
    admin_ID int NOT NULL AUTO_INCREMENT,
	First_Name varchar(30) NOT NULL,
    Last_Name varchar(30) NOT NULL,
    username varchar(30) NOT NULL,
    admin_pass varchar(255) NOT NULL,
    CONSTRAINT admin_ID_PK_A PRIMARY KEY(admin_ID)
);


CREATE TABLE Appointment(
    Appointment_ID int NOT NULL AUTO_INCREMENT,
    Client_ID int NOT NULL,
    Date_Created date NOT NULL,
    Appointment_Date date NOT NULL,
    Image_Submission VARCHAR(255) NULL,
    Image_Archive_ID int NULL,
    purpose varchar(255) NOT NULL,
    Status varchar(30) NOT NULL,
    CONSTRAINT Appointment_ID_PK_AR PRIMARY KEY(Appointment_ID),
    CONSTRAINT Image_Archive_FK_AR FOREIGN KEY (Image_Archive_ID) REFERENCES Design_Archive(Design_ID),
    CONSTRAINT Client_ID_FK_AR FOREIGN KEY (Client_ID) REFERENCES client(Client_ID)
);

INSERT INTO Design_Archive(Design_Name,Image_Link,Image_Tags,Image_Desc) VALUES('Dummy','Dummy','Dummy','Dummy');
UPDATE Design_Archive SET Design_ID=0 WHERE Design_ID=1;
INSERT INTO Design_Archive(Design_Name,Image_Link,Image_Tags,Image_Desc) VALUES('Tribal','https://www.askideas.com/media/73/Cool-Tribal-Tattoo-Design.jpg','Tribal Cool Awesome Savage','Basic design for starters');
INSERT INTO Design_Archive(Design_Name,Image_Link,Image_Tags,Image_Desc) VALUES('Dragon','https://images-na.ssl-images-amazon.com/images/I/712Z7RdR1SL.jpg','Dragon Fiction Powerful Legend','A Cool Dragon');
INSERT INTO Design_Archive(Design_Name,Image_Link,Image_Tags,Image_Desc) VALUES('Traditional','https://i.pinimg.com/originals/61/d1/92/61d19232ae720c0e7673f898118a0114.jpg','Traditional Mask Legend Japanese','Japanese Traditional Design');
INSERT INTO admin_accounts(First_Name,Last_Name,username,admin_pass) VALUES('Admin','Account','admin','$2b$10$lhNkb8Gk2VXDG/r7fwzQWue.syM2iKGPwQUzMLRlvacLwpj0mlc.K');
