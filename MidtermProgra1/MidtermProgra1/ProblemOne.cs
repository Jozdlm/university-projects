// Caso 1/ Desarrollar un programa que pida dos cadenas con frases o mensajes desde consola, y luego realizar las siguientes operaciones entre ellas:
// a.	Unir ambas cadenas y desplegarlas en pantalla como un solo mensaje.
// b.	Calcular la longitud de cada cadena ingresada.
// c.	Eliminar cuatro caracteres de la primera cadena empezando por la posición 2
// Escenario: Usando el lenguaje de programación C#, debe enviar constancia de la corrida correcta del programa. 

public class ProblemaOne
{
    ProblemaOne()
    {
        Console.WriteLine("Ingresa una cadena de texto");
        string firstString = Console.ReadLine() ?? "";

        Console.WriteLine("Ingresa otra cadena de texto");
        string secondString = Console.ReadLine() ?? "";

        var mergedString = firstString + ", " + secondString;
        Console.WriteLine($"Cadena unidad: {mergedString}");

        Console.WriteLine($"Longitud primera cadena: {firstString.Length}");
        Console.WriteLine($"Longitud segunda cadena: {secondString.Length}");

        var slicedString = firstString.Substring(2, 4);
        Console.WriteLine($"Caracteres eliminados: {slicedString}");
    }
}