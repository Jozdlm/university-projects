using FinalExamPro1;

internal class Program
{
    private static void Main(string[] args)
    {
        var medico = new Medico()
        {
            Nombre = "Juan de la Cruz",
            Edad = 34
        };

        var paciente = new Paciente()
        {
            Nombre = "Jozuan Han",
            Edad = 22
        };

        medico.RecetarMedicamento(new Receta()
        {
            Nombre = "Paracetamol",
            Dosis = 2,
            TipoDosis = "Tableta"
        }, paciente);

        paciente.VerListadoRecetas();
    }
}