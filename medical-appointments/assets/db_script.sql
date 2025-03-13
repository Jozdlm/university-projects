create table
  if not exists medicamento_medidas (
    id int auto_increment primary key,
    nombre varchar(255) not null,
    constraint unique_name unique (nombre)
  );

create table
  if not exists medicamentos (
    id int auto_increment primary key,
    nombre varchar(255) not null,
    medida_id int default 1 not null,
    activo tinyint (1) default 1 not null,
    constraint fk_medicamentos__medicamento_medidas foreign key (medida_id) references medicamento_medidas (id)
  );

create table
  if not exists usuarios (
    cui varchar(13) not null primary key,
    nombres varchar(255) not null,
    apellidos varchar(255) not null,
    correo varchar(255) not null,
    password varchar(255) null,
    role enum ('ADMIN', 'RECEPCIONISTA', 'MEDICO', 'PACIENTE') default 'PACIENTE' not null,
    constraint usuarios_pk_2 unique (cui)
  );

create table
  if not exists cita (
    id int auto_increment primary key,
    fecha date null,
    hora time null,
    siguiente_cita_fecha date null,
    siguiente_cita_hora time null,
    precio_cita decimal(21, 2) null,
    diagnostico varchar(150) default '' not null,
    estado enum ('PENDIENTE', 'REALIZADA', 'CANCELADA') default 'PENDIENTE' not null,
    id_doctor varchar(13) null,
    id_paciente varchar(13) null,
    id_secretaria varchar(13) null,
    constraint fk_doctor foreign key (id_doctor) references usuarios (cui),
    constraint fk_paciente foreign key (id_paciente) references usuarios (cui),
    constraint fk_secretaria foreign key (id_secretaria) references usuarios (cui)
  );

create table
  if not exists cita_detalle (
    id int auto_increment primary key,
    id_cita int null,
    dosis varchar(2000) null,
    cantidad int default 1 not null,
    medicamento_id int null,
    constraint cita_detalle_ibfk_1 foreign key (id_cita) references cita (id) on update cascade on delete cascade,
    constraint fk_cita_detalle__medicamentos foreign key (medicamento_id) references medicamentos (id)
  );

create index id_cita on cita_detalle (id_cita);