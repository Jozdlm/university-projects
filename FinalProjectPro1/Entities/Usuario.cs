namespace FinalProjectPro1;

public class Usuario
{
    public required string Nombre { get; set; }
    public required string Contraseña { get; set; }
    public bool EsAdministrador { get; set; }
    public List<Prestamo> Prestamos { get; set; } = new List<Prestamo>();

    public string ToCsv()
    {
        return $"{Nombre},{Contraseña},{EsAdministrador}";
    }

    public static Usuario FromCsv(string csvLine)
    {
        var values = csvLine.Split(',');
        return new Usuario
        {
            Nombre = values[0],
            Contraseña = values[1],
            EsAdministrador = bool.Parse(values[2])
        };
    }
}
