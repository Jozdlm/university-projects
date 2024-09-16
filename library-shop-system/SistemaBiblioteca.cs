using FinalProjectPro1;

public class SistemaBiblioteca
{
    private List<Usuario> usuarios = new List<Usuario>();
    private List<Libro> libros = new List<Libro>();

    private const string UsuariosFilePath = "usuarios.txt";
    private const string LibrosFilePath = "libros.txt";
    private const string PrestamosFilePath = "prestamos.txt";

    public SistemaBiblioteca()
    {
        CargarDatos();
        VerificarAdministradorPredeterminado();
    }

    public void Iniciar()
    {
        while (true)
        {
            Console.Clear();
            Console.WriteLine("Bienvenido al Sistema de Gestión de Biblioteca");
            Console.WriteLine("1. Iniciar sesión como Administrador");
            Console.WriteLine("2. Iniciar sesión como Consultor");
            Console.Write("Seleccione una opción: ");
            var opcion = Console.ReadLine();

            Console.Write("Usuario: ");
            var nombreUsuario = Console.ReadLine();
            Console.Write("Contraseña: ");
            var contraseña = Console.ReadLine();

            var usuario = usuarios.FirstOrDefault(u => u.Nombre == nombreUsuario && u.Contraseña == contraseña);

            if (usuario == null)
            {
                Console.WriteLine("Usuario o contraseña incorrectos.");
                Console.ReadKey();
                continue;
            }

            if (opcion == "1" && usuario.EsAdministrador)
            {
                MenuAdministrador(usuario);
            }
            else if (opcion == "2" && !usuario.EsAdministrador)
            {
                MenuConsultor(usuario);
            }
            else
            {
                Console.WriteLine("Opción inválida.");
                Console.ReadKey();
            }
        }
    }

    private void MenuAdministrador(Usuario usuario)
    {
        while (true)
        {
            Console.Clear();
            Console.WriteLine("Menú Administrador");
            Console.WriteLine("1. Crear Usuario");
            Console.WriteLine("2. Cambiar Contraseña");
            Console.WriteLine("3. Cargar Libro");
            Console.WriteLine("4. Ver Usuarios");
            Console.WriteLine("5. Ver Libros de Usuarios");
            Console.WriteLine("6. Modificar Libro");
            Console.WriteLine("7. Salir");
            Console.Write("Seleccione una opción: ");
            var opcion = Console.ReadLine();

            switch (opcion)
            {
                case "1":
                    CrearUsuario();
                    break;
                case "2":
                    CambiarContraseña();
                    break;
                case "3":
                    CargarLibro();
                    break;
                case "4":
                    VerUsuarios();
                    break;
                case "5":
                    VerLibrosDeUsuarios();
                    break;
                case "6":
                    ModificarLibro();
                    break;
                case "7":
                    GuardarDatos();
                    return;
                default:
                    Console.WriteLine("Opción inválida.");
                    Console.ReadKey();
                    break;
            }
        }
    }

    private void CrearUsuario()
    {
        Console.Write("Nombre del nuevo usuario: ");
        var nombre = Console.ReadLine();
        Console.Write("Contraseña: ");
        var contraseña = Console.ReadLine();
        Console.Write("Es administrador (s/n): ");
        var esAdmin = Console.ReadLine().ToLower() == "s";

        usuarios.Add(new Usuario { Nombre = nombre, Contraseña = contraseña, EsAdministrador = esAdmin });
        Console.WriteLine("Usuario creado con éxito.");
        Console.ReadKey();
    }

    private void CambiarContraseña()
    {
        Console.Write("Nombre del usuario: ");
        var nombre = Console.ReadLine();
        var usuario = usuarios.FirstOrDefault(u => u.Nombre == nombre);
        if (usuario == null)
        {
            Console.WriteLine("Usuario no encontrado.");
            Console.ReadKey();
            return;
        }

        Console.Write("Nueva contraseña: ");
        var nuevaContraseña = Console.ReadLine();
        usuario.Contraseña = nuevaContraseña;
        Console.WriteLine("Contraseña cambiada con éxito.");
        Console.ReadKey();
    }

    private void CargarLibro()
    {
        Console.Write("Nombre del libro: ");
        var nombre = Console.ReadLine();
        Console.Write("Autor: ");
        var autor = Console.ReadLine();
        Console.Write("Año de Publicación: ");
        var añoPublicacion = int.Parse(Console.ReadLine());
        Console.Write("Año de Edición: ");
        var añoEdicion = int.Parse(Console.ReadLine());
        Console.Write("Número de Edición: ");
        var numeroEdicion = int.Parse(Console.ReadLine());
        Console.Write("Género: ");
        var genero = Console.ReadLine();
        Console.Write("Cantidad en Inventario: ");
        var cantidadInventario = int.Parse(Console.ReadLine());
        Console.Write("Reseña: ");
        var reseña = Console.ReadLine();

        libros.Add(new Libro
        {
            Nombre = nombre,
            Autor = autor,
            AñoPublicacion = añoPublicacion,
            AñoEdicion = añoEdicion,
            NumeroEdicion = numeroEdicion,
            Genero = genero,
            CantidadInventario = cantidadInventario,
            Reseña = reseña
        });

        Console.WriteLine("Libro cargado con éxito.");
        Console.ReadKey();
    }

    private void VerUsuarios()
    {
        Console.WriteLine("Usuarios:");
        foreach (var usuario in usuarios)
        {
            Console.WriteLine($"Nombre: {usuario.Nombre}, Administrador: {usuario.EsAdministrador}");
        }
        Console.ReadKey();
    }

    private void VerLibrosDeUsuarios()
    {
        foreach (var usuario in usuarios)
        {
            Console.WriteLine($"Usuario: {usuario.Nombre}");
            if (usuario.Prestamos.Any())
            {
                foreach (var prestamo in usuario.Prestamos)
                {
                    Console.WriteLine($" - Libro: {prestamo.Libro.Nombre}, Fecha de Préstamo: {prestamo.FechaPrestamo}, Fecha de Devolución: {prestamo.FechaDevolucion}");
                }
            }
            else
            {
                Console.WriteLine(" - No tiene libros prestados.");
            }
        }
        Console.ReadKey();
    }

    private void ModificarLibro()
    {
        Console.Write("Nombre del libro a modificar: ");
        var nombre = Console.ReadLine();
        var libro = libros.FirstOrDefault(l => l.Nombre.Equals(nombre, StringComparison.OrdinalIgnoreCase));
        if (libro == null)
        {
            Console.WriteLine("Libro no encontrado.");
            Console.ReadKey();
            return;
        }

        Console.WriteLine("Deje en blanco los campos que no desee modificar.");
        Console.Write($"Nombre actual: {libro.Nombre}, Nuevo nombre: ");
        var nuevoNombre = Console.ReadLine();
        Console.Write($"Autor actual: {libro.Autor}, Nuevo autor: ");
        var nuevoAutor = Console.ReadLine();
        Console.Write($"Año de Publicación actual: {libro.AñoPublicacion}, Nuevo año de publicación: ");
        var nuevoAñoPublicacionStr = Console.ReadLine();
        Console.Write($"Año de Edición actual: {libro.AñoEdicion}, Nuevo año de edición: ");
        var nuevoAñoEdicionStr = Console.ReadLine();
        Console.Write($"Número de Edición actual: {libro.NumeroEdicion}, Nuevo número de edición: ");
        var nuevoNumeroEdicionStr = Console.ReadLine();
        Console.Write($"Género actual: {libro.Genero}, Nuevo género: ");
        var nuevoGenero = Console.ReadLine();
        Console.Write($"Cantidad en Inventario actual: {libro.CantidadInventario}, Nueva cantidad en inventario: ");
        var nuevaCantidadInventarioStr = Console.ReadLine();
        Console.Write($"Reseña actual: {libro.Reseña}, Nueva reseña: ");
        var nuevaReseña = Console.ReadLine();

        libro.Nombre = string.IsNullOrWhiteSpace(nuevoNombre) ? libro.Nombre : nuevoNombre;
        libro.Autor = string.IsNullOrWhiteSpace(nuevoAutor) ? libro.Autor : nuevoAutor;
        libro.AñoPublicacion = string.IsNullOrWhiteSpace(nuevoAñoPublicacionStr) ? libro.AñoPublicacion : int.Parse(nuevoAñoPublicacionStr);
        libro.AñoEdicion = string.IsNullOrWhiteSpace(nuevoAñoEdicionStr) ? libro.AñoEdicion : int.Parse(nuevoAñoEdicionStr);
        libro.NumeroEdicion = string.IsNullOrWhiteSpace(nuevoNumeroEdicionStr) ? libro.NumeroEdicion : int.Parse(nuevoNumeroEdicionStr);
        libro.Genero = string.IsNullOrWhiteSpace(nuevoGenero) ? libro.Genero : nuevoGenero;
        libro.CantidadInventario = string.IsNullOrWhiteSpace(nuevaCantidadInventarioStr) ? libro.CantidadInventario : int.Parse(nuevaCantidadInventarioStr);
        libro.Reseña = string.IsNullOrWhiteSpace(nuevaReseña) ? libro.Reseña : nuevaReseña;

        Console.WriteLine("Libro modificado con éxito.");
        Console.ReadKey();
    }

    private void MenuConsultor(Usuario usuario)
    {
        while (true)
        {
            Console.Clear();
            Console.WriteLine("Menú Consultor");
            Console.WriteLine("1. Consultar Disponibilidad de Libro");
            Console.WriteLine("2. Ver Historial de Préstamos");
            Console.WriteLine("3. Reservar Libro");
            Console.WriteLine("4. Devolver Libro");
            Console.WriteLine("5. Salir");
            Console.Write("Seleccione una opción: ");
            var opcion = Console.ReadLine();

            switch (opcion)
            {
                case "1":
                    ConsultarDisponibilidadLibro();
                    break;
                case "2":
                    VerHistorialPrestamos(usuario);
                    break;
                case "3":
                    ReservarLibro(usuario);
                    break;
                case "4":
                    DevolverLibro(usuario);
                    break;
                case "5":
                    GuardarDatos();
                    return;
                default:
                    Console.WriteLine("Opción inválida.");
                    Console.ReadKey();
                    break;
            }
        }
    }

    private void ConsultarDisponibilidadLibro()
    {
        Console.Write("Nombre del libro: ");
        var nombreLibro = Console.ReadLine();
        var libro = libros.FirstOrDefault(l => l.Nombre.Equals(nombreLibro, StringComparison.OrdinalIgnoreCase));
        if (libro == null)
        {
            Console.WriteLine("Libro no encontrado.");
        }
        else
        {
            Console.WriteLine($"Libro: {libro.Nombre}, Autor: {libro.Autor}, Disponible: {libro.DisponibleParaPrestamo}, Cantidad: {libro.CantidadInventario}, Reseña: {libro.Reseña}");
        }
        Console.ReadKey();
    }

    private void VerHistorialPrestamos(Usuario usuario)
    {
        Console.WriteLine("Historial de Préstamos:");
        foreach (var prestamo in usuario.Prestamos)
        {
            Console.WriteLine($"Libro: {prestamo.Libro.Nombre}, Fecha de Préstamo: {prestamo.FechaPrestamo}, Fecha de Devolución: {prestamo.FechaDevolucion}");
        }
        Console.ReadKey();
    }

    private void ReservarLibro(Usuario usuario)
    {
        Console.Write("Nombre del libro a reservar: ");
        var nombreLibro = Console.ReadLine();
        var libro = libros.FirstOrDefault(l => l.Nombre.Equals(nombreLibro, StringComparison.OrdinalIgnoreCase));

        if (libro == null || !libro.DisponibleParaPrestamo)
        {
            Console.WriteLine("Libro no disponible para reserva.");
        }
        else
        {
            libro.CantidadInventario--;
            var prestamo = new Prestamo
            {
                Libro = libro,
                Usuario = usuario,
                FechaPrestamo = DateTime.Now,
                FechaDevolucion = DateTime.Now.AddDays(14)
            };
            usuario.Prestamos.Add(prestamo);
            Console.WriteLine("Libro reservado con éxito.");
        }
        Console.ReadKey();
    }

    private void DevolverLibro(Usuario usuario)
    {
        Console.Write("Nombre del libro a devolver: ");
        var nombreLibro = Console.ReadLine();
        var prestamo = usuario.Prestamos.FirstOrDefault(p => p.Libro.Nombre.Equals(nombreLibro, StringComparison.OrdinalIgnoreCase));
        if (prestamo == null)
        {
            Console.WriteLine("No tiene este libro en préstamo.");
        }
        else
        {
            prestamo.Libro.CantidadInventario++;
            usuario.Prestamos.Remove(prestamo);
            Console.WriteLine("Libro devuelto con éxito.");
        }
        Console.ReadKey();
    }

    private void GuardarDatos()
    {
        File.WriteAllLines(UsuariosFilePath, usuarios.Select(u => u.ToCsv()));
        File.WriteAllLines(LibrosFilePath, libros.Select(l => l.ToCsv()));
        File.WriteAllLines(PrestamosFilePath, usuarios.SelectMany(u => u.Prestamos).Select(p => p.ToCsv()));
    }

    private void CargarDatos()
    {
        if (File.Exists(UsuariosFilePath))
        {
            var usuariosCsv = File.ReadAllLines(UsuariosFilePath);
            usuarios = usuariosCsv.Select(Usuario.FromCsv).ToList();
        }

        if (File.Exists(LibrosFilePath))
        {
            var librosCsv = File.ReadAllLines(LibrosFilePath);
            libros = librosCsv.Select(Libro.FromCsv).ToList();
        }

        if (File.Exists(PrestamosFilePath))
        {
            var prestamosCsv = File.ReadAllLines(PrestamosFilePath);
            var prestamos = prestamosCsv.Select(line => Prestamo.FromCsv(line, libros, usuarios)).ToList();
            foreach (var prestamo in prestamos)
            {
                prestamo.Usuario.Prestamos.Add(prestamo);
            }
        }
    }

    private void VerificarAdministradorPredeterminado()
    {
        if (!usuarios.Any(u => u.EsAdministrador))
        {
            var admin = new Usuario
            {
                Nombre = "admin",
                Contraseña = "admin",
                EsAdministrador = true
            };
            usuarios.Add(admin);
            GuardarDatos();
            Console.WriteLine("Usuario administrador predeterminado creado: Usuario = admin, Contraseña = admin");
            Console.ReadKey();
        }
    }
}