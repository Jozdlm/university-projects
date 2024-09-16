namespace FinalExamPro1;

public class Paciente
{
    public required string Nombre { get; set; }
    public required int Edad { get; set; }
    public List<Receta> Recetas { get; set; } = new List<Receta>();

    public void AgregarReceta(Receta receta)
    {
        Recetas.Add(receta);
    }

    public void VerListadoRecetas()
    {
        Console.WriteLine($"Recetas del paciente {Nombre}");
        
        foreach (var receta in Recetas)
        {
            Console.WriteLine($"Medicamento: {receta.Nombre}");
            Console.WriteLine($"Dosis: {receta.Dosis}");
        }
    }
}
