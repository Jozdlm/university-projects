DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pr_citas_medicas`(_Paciente int)
BEGIN
 /**************************
	Fecha: 2024-10-24
    Autor: Jorge Perez, Dayana Monterroso
    Descripcion: Devuelve las citas en base al paciente.
 **************************/
 
 select 
        c.id AS idCita
        ,c.fecha AS fechaCita
		,c.hora AS horaCita
        ,c.siguiente_cita_fecha AS siguienteCita
        ,c.siguiente_cita_hora  AS siguienteCitaHora
        ,c.precio_cita AS precioCita
        ,c.diagnostico AS diagnostico
        ,cd.dosis AS dosis
        ,cd.cantidad AS cantidad
        ,medic.nombre AS Medicamento
        ,medid.nombre AS unidadMedida
        ,c.estado AS estadoCita
        ,concat(doc.nombres ,' ',doc.apellidos) AS Doctor
		,doc.cui AS IDDoctor
        ,concat(pac.nombres ,' ',pac.apellidos) AS Paciente
		,pac.cui AS idPaciente
		,concat(rec.nombres ,' ',rec.apellidos) AS Secretaria
        ,rec.cui AS idSecretaria 
    from proyecto.cita c
        left join 
	proyecto.cita_detalle cd ON c.id = cd.id_cita 
		left join 
	proyecto.medicamentos medic ON medic.id = cd.medicamento_id
		left join 
	proyecto.medicamento_medidas medid ON medid.id = medic.medida_id 
        left join 
	proyecto.usuarios doc ON c.id_doctor = doc.cui
        left join 
	proyecto.usuarios pac ON c.id_paciente = pac.cui
        left join 
	proyecto.usuarios rec ON c.id_secretaria= rec.cui
    WHERE pac.cui = _Paciente
    order by 1 asc;
END$$
DELIMITER ;
