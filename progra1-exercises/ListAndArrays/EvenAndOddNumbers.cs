namespace ListAndArrays;

public class EvenAndOddNumbers
{
    public static void Example()
    {
        List<int> evenNums = new List<int> { };
        List<int> oddNums = new List<int> { };
        List<int> numbers = new List<int> { };


        for (int i = 1; i <= 100; i++)
        {
            numbers.Add(i);
        }

        foreach (int number in numbers)
        {
            if (number % 2 == 0)
            {
                evenNums.Add(number);
            }
            else
            {
                oddNums.Add(number);
            }
        }

        string evenMessage = "Los números pares son: ";
        string oddMessage = "Los números impares son: ";

        foreach (int evenNum in evenNums)
        {
            evenMessage += $"{evenNum}, ";
        }

        foreach (int oddNum in oddNums)
        {
            oddMessage += $"{oddNum}, ";
        }

        Console.WriteLine(evenMessage);
        Console.WriteLine(oddMessage);
    }
}
