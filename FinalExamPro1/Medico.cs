namespace FinalExamPro1;

public class Medico
{
    public required string Nombre {get; set;}
    public required int Edad {get; set;}

    public void RecetarMedicamento(Receta receta, Paciente paciente) {
        paciente.AgregarReceta(receta);
    }
}
