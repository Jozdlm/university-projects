// See https://aka.ms/new-console-template for more information
using System;

class Libro
{
    // Propiedades del libro
    public string Titulo { get; set; }
    public string Autor { get; set; }
    public int AnioPublicacion { get; set; }
    public bool EstaPrestado { get; private set; }
    public string User { get; set; }

    // Constructor
    public Libro(string titulo, string autor, int anioPublicacion)
    {
        Titulo = titulo;
        Autor = autor;
        AnioPublicacion = anioPublicacion;
        EstaPrestado = false; // Inicialmente el libro no está prestado
    }

    // Método para mostrar la información del libro
    public void MostrarInformacion()
    {
        Console.WriteLine("Título: " + Titulo);
        Console.WriteLine("Autor: " + Autor);
        Console.WriteLine("Año de Publicación: " + AnioPublicacion);
        Console.WriteLine("Estado: " + (EstaPrestado ? "Prestado" : "Disponible"));
        if (EstaPrestado)
        {
            Console.WriteLine($"Prestado a {User}");
        }
        Console.WriteLine();
    }

    // Método para prestar el libro
    public void Prestar(string user)
    {
        if (!EstaPrestado)
        {
            EstaPrestado = true;
            User = user;
            Console.WriteLine("El libro \"" + Titulo + "\" ha sido prestado.");
        }
        else
        {
            Console.WriteLine("El libro \"" + Titulo + "\" ya está prestado.");
        }
    }

    // Método para devolver el libro
    public void Devolver()
    {
        if (EstaPrestado)
        {
            EstaPrestado = false;
            User = "";
            Console.WriteLine("El libro \"" + Titulo + "\" ha sido devuelto.");
        }
        else
        {
            Console.WriteLine("El libro \"" + Titulo + "\" no está prestado.");
        }
    }
}

class User
{
    public required string Name { get; set; }
}

class Program
{
    static void Main()
    {
        // Creamos algunos libros
        Libro libro1 = new Libro("Cien años de soledad", "Gabriel García Márquez", 1967);
        Libro libro2 = new Libro("El Hobbit", "J.R.R. Tolkien", 1937);
        Libro libro3 = new Libro("Los 7 Hábitos de los Adolecentes Efectivos", "Sean Covey", 2021);
        Libro libro4 = new Libro("El Señor Presidente", "Miguel Angel Asturias", 1967);

        // Creamos algunos usuarios
        User user1 = new User { Name = "Jozuan" };
        User user2 = new User { Name = "Yareli" };

        // Mostramos la información de los libros
        Console.WriteLine("Información de los libros:");
        Console.WriteLine("-------------------------");
        libro1.MostrarInformacion();
        libro2.MostrarInformacion();

        // Prestamos un libro
        libro1.Prestar(user1.Name);
        Console.WriteLine();

        // Mostramos la información actualizada
        Console.WriteLine("Información de los libros después de prestar uno:");
        Console.WriteLine("-----------------------------------------------");
        libro1.MostrarInformacion();
        libro2.MostrarInformacion();

        // Devolvemos el libro prestado
        libro1.Devolver();
        Console.WriteLine();

        // Mostramos la información actualizada
        Console.WriteLine("Información de los libros después de devolver el libro prestado:");
        Console.WriteLine("--------------------------------------------------------------");
        libro1.MostrarInformacion();
        libro2.MostrarInformacion();
        libro3.MostrarInformacion();
        libro4.MostrarInformacion();
    }
}