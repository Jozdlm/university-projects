namespace FinalProjectPro1;

public class Libro
{
    public required string Nombre { get; set; }
    public required string Autor { get; set; }
    public int AñoPublicacion { get; set; }
    public int AñoEdicion { get; set; }
    public int NumeroEdicion { get; set; }
    public required string Genero { get; set; }
    public int CantidadInventario { get; set; }
    public bool DisponibleParaPrestamo { get { return CantidadInventario > 0; } }

    public string ToCsv()
    {
        return $"{Nombre},{Autor},{AñoPublicacion},{AñoEdicion},{NumeroEdicion},{Genero},{CantidadInventario}";
    }

    public static Libro FromCsv(string csvLine)
    {
        var values = csvLine.Split(',');
        return new Libro
        {
            Nombre = values[0],
            Autor = values[1],
            AñoPublicacion = int.Parse(values[2]),
            AñoEdicion = int.Parse(values[3]),
            NumeroEdicion = int.Parse(values[4]),
            Genero = values[5],
            CantidadInventario = int.Parse(values[6])
        };
    }
}
