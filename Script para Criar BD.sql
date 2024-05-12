create table tb_compromissos(
id int primary key auto_increment not null,
descricao varchar(100) not null,
data date not null,
hora time not null,
usuarioId int not null,
agendaId int not null,
ativo bool not null);

create table tb_agendas(
id int primary key auto_increment not null,
usuarioId int not null,
nome varchar(50) not null,
ativo bool not null);

select * from tb_agendas;

select * from tb_compromissos;