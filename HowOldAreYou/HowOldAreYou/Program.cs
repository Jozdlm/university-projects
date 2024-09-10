internal class Program
{
    private static void Main(string[] args)
    {
        DateTime currDate = DateTime.Now;
        DateTime zeroTime = new DateTime(1, 1, 1);
        DateTime dateOfBirth;

        Console.WriteLine("Ingrese su fecha de nacimiento MM-DD-YYYY");
        string inputDate = Console.ReadLine() ?? "";

        if (DateTime.TryParse(inputDate, out dateOfBirth))
        {
            TimeSpan timeSpan = CalculateAge(currDate, dateOfBirth);
            int personAge = (zeroTime + timeSpan).Year - 1;
            Console.WriteLine($"Tienes la edad de {personAge}");
        }
        else
        {
            Console.WriteLine("Formato de fecha no valido, por favor vuelva a intentar");
        }
    }

    public static TimeSpan CalculateAge(DateTime currYear, DateTime yearOfBirth)
    {
        return currYear - yearOfBirth;
    }
}