create table tb_compromissos(
id int primary key auto_increment not null,
descricao varchar(100) not null,
data varchar(18) not null,
hora varchar(15) not null,
cidade varchar(50) not null,
bairro varchar(50) not null,
rua varchar(50) not null,
numero int not null,
usuarioId int not null,
agendaId int not null,
ativo bool not null);

create table tb_agendas(
id int primary key auto_increment not null,
usuarioId int not null,
nome varchar(50) not null,
ativo bool not null);

create table tb_usuarios(
id int primary key auto_increment not null,
user varchar(50) not null,
email varchar(50) not null,
password varchar(20) not null,
ativo boolean not null);