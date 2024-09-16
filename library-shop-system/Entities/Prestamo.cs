namespace FinalProjectPro1;

public class Prestamo
{
    public required Libro Libro { get; set; }
    public required Usuario Usuario { get; set; }
    public DateTime FechaPrestamo { get; set; }
    public DateTime FechaDevolucion { get; set; }

    public string ToCsv()
    {
        return $"{Libro.Nombre},{Usuario.Nombre},{FechaPrestamo},{FechaDevolucion}";
    }

    public static Prestamo FromCsv(string csvLine, List<Libro> libros, List<Usuario> usuarios)
    {
        var values = csvLine.Split(',');
        var libro = libros.FirstOrDefault(l => l.Nombre == values[0]);
        var usuario = usuarios.FirstOrDefault(u => u.Nombre == values[1]);
        
        return new Prestamo
        {
            Libro = libro,
            Usuario = usuario,
            FechaPrestamo = DateTime.Parse(values[2]),
            FechaDevolucion = DateTime.Parse(values[3])
        };
    }
}
