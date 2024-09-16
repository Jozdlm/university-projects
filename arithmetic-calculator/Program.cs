
internal class Program
{
    private static void Main(string[] args)
    {
        showMenu();
        var selectedOption = int.Parse(Console.ReadLine() ?? "");
        var n1 = 0.0;
        var n2 = 0.0;

        if (selectedOption > 0 && selectedOption <= 5)
        {
            Console.WriteLine("Ingresar el primer número");
            n1 = double.Parse(Console.ReadLine() ?? "");

            Console.WriteLine("Ingresar el segundo número");
            n2 = double.Parse(Console.ReadLine() ?? "");
        }

        switch (selectedOption)
        {
            case 1:
                Console.WriteLine($"La suma de los números {n1} y {n2} es {Sum(n1, n2)}");
                break;
            case 2:
                Console.WriteLine($"La resta de los números {n1} y {n2} es {Sub(n1, n2)}");
                break;
            case 3:
                Console.WriteLine($"La multiplicación de los números {n1} y {n2} es {Mult(n1, n2)}");
                break;
            case 4:
                Console.WriteLine($"La división de los números {n1} y {n2} es {Div(n1, n2)}");
                break;
            case 5:
                Console.WriteLine($"La potencia de los números {n1} y {n2} es {Power(n1, n2)}");
                break;
            default:
                Console.WriteLine("No fue selecionada ninguna opción, saliendo del programa...");
                break;
        }
    }

    public static void showMenu()
    {
        Console.Clear();
        Console.WriteLine("Bienvenido!");
        Console.WriteLine("Que operación deseas realizar");
        Console.WriteLine("-----------------------------");
        Console.WriteLine("1. Suma");
        Console.WriteLine("2. Resta");
        Console.WriteLine("3. Multiplicación");
        Console.WriteLine("4. División");
        Console.WriteLine("5. Potencia");
    }

    public static double Sum(double n1, double n2)
    {
        return n1 + n2;
    }

    public static double Sub(double n1, double n2)
    {
        return n1 - n2;
    }

    public static double Mult(double n1, double n2)
    {
        return n1 * n2;
    }

    public static double Div(double n1, double n2)
    {
        if (n2 > 0)
        {
            return n1 / n2;
        }

        throw new InvalidDataException("El segundo número debe ser mayor que 0");
    }

    public static double Power(double n1, double n2)
    {
        return Math.Pow(n1, n2);
    }
}