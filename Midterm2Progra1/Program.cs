internal class Program
{
    private static void Main(string[] args)
    {
        double weight, height;
        double imc = 0;

        Console.WriteLine("--------- CALCULADORA DE IMC ---------");
        Console.WriteLine("Ingrese su peso (KG): ");
        weight = double.Parse(Console.ReadLine() ?? "");

        Console.WriteLine("Ingrese su altura: ");
        height = double.Parse(Console.ReadLine() ?? "");

        if (weight > 0 && height > 0)
        {
            imc = weight / (height * 2);
        }

        if (imc > 30)
        {
            Console.WriteLine("ALERTA: Tienes obesidad");
        }
        else if (imc > 25 && imc <= 30)
        {
            Console.WriteLine("Tienes sobrepeso");
        }
        else if (imc > 18.5 && imc <= 25)
        {
            Console.WriteLine("Felicidades, tienes un peso normal");
        }
        else if (imc < 18.5)
        {
            Console.WriteLine("ALERTA: tienes bajo peso");
        }
    }
}