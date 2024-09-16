
internal class Program
{
    private static void Main(string[] args)
    {
        int[] numeros = { 5, 3, 8, 1, 4, 2, 9, 1 };

        Console.WriteLine("Array original:");

        string numerosStr = "";
        foreach (int numero in numeros)
        {
            numerosStr += $"{numero}, ";
        }

        Console.WriteLine(numerosStr);

        // Ordenar el array usando Bubble Sort
        for (int i = 0; i < numeros.Length - 1; i++)
        {
            for (int j = 0; j < numeros.Length - 1 - i; j++)
            {
                if (numeros[j] > numeros[j + 1])
                {
                    // Intercambiar elementos
                    int temp = numeros[j];
                    numeros[j] = numeros[j + 1];
                    numeros[j + 1] = temp;
                }
            }
        }

        Console.WriteLine("\nArray Ordenado: ");

        string menorMayorStr = "";
        foreach (int numero in numeros)
        {
            menorMayorStr += $"{numero}, ";
        }

        Console.WriteLine(menorMayorStr);

        // Ordenar el array usando Bubble Sort
        for (int i = 0; i < numeros.Length - 1; i++)
        {
            for (int j = 0; j < numeros.Length - 1 - i; j++)
            {
                if (numeros[j] < numeros[j + 1])
                {
                    // Intercambiar elementos
                    int temp = numeros[j];
                    numeros[j] = numeros[j + 1];
                    numeros[j + 1] = temp;
                }
            }
        }

        Console.WriteLine("\nArray Ordenado: ");

        string mayorMenorStr = "";
        foreach (int numero in numeros)
        {
            mayorMenorStr += $"{numero}, ";
        }

        Console.WriteLine(mayorMenorStr);
    }
}