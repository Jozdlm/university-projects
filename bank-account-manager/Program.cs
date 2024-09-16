class BankAccount
{
    private double Balance = 0;

    public void IncreaseAsset(double ammount)
    {
        Balance = Balance + ammount;
    }

    public void DecreaseAsset(double ammount)
    {
        if (Balance > ammount)
        {
            Balance = Balance - ammount;
        }
        else
        {
            Console.WriteLine("Saldo insuficiente");
        }
    }

    public void ShowBalance()
    {
        Console.WriteLine($"El balance de la cuenta es: {Balance}");
    }
}

internal class Program
{
    private static void Main(string[] args)
    {
        Console.WriteLine("Bienvenido!");
        BankAccount account = new BankAccount();
        Console.Write($"Saldo inicial: ");
        account.ShowBalance();

        // Hacemos depositos
        account.IncreaseAsset(150);
        account.IncreaseAsset(450);

        // Hacemos retiros
        account.DecreaseAsset(37);

        // Mostramos el saldo
        account.ShowBalance();
    }
}