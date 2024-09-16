// Caso 2/ Desarrollar un programa utilizando diferentes tipos de datos y ciclo IF anidado de ser necesario en C#.
// a.	Pedir una cantidad en denominación en Quetzales, de tres cifras hacia arriba que incluya decimales.
// b.	Desglosar dicho monto en denominaciones de billetes más pequeños
// c.	Indicar en pantalla el resultado de cuantos billetes se utilizara para desglosar la cantidad, debe cuadrar el monto ingresado con el desglose de billetes.
// Escenario: Usando el lenguaje de programación C#, usando estructura IF. 

internal class Program
{
    static double ammount;
    static double newAmmount;

    private static void Main(string[] args)
    {
        Console.WriteLine("Ingrese un monto mayor o igual de tres cifras en el siguiente formato (000.0)");
        ammount = double.Parse(Console.ReadLine() ?? "0.0");
        newAmmount = ammount;

        if (ammount >= 100)
        {
            BreakBill(200);
            BreakBill(100);
            BreakBill(50);
            BreakBill(20);
            BreakBill(10);
            BreakBill(5);
            BreakBill(1);
        }
        else
        {
            Console.WriteLine($"Por favor ingresar un número mayor a 99");
        }
    }

    public static void BreakBill(int fee)
    {
        if (newAmmount >= fee)
        {
            var bills = Math.Floor(newAmmount / fee);
            newAmmount -= (bills * fee);
            Console.WriteLine($"Q{fee}: {bills} billetes");
        }
    }
}