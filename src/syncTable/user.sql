create table `user`(
  id int primary key auto_increment,
  username varchar(255),
  passwrod varchar(255),
  avatar varchar(255),
  birth varchar(255),
  province varchar(255),
  jobExp varchar(255),
  email varchar(255),
  wx varchar(255),
  college varchar(255),
  major varchar(255),
  schoolYear varchar(255),
  level varchar(255),
  skills text,
  jobs text
)