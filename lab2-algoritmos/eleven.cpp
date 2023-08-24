#include <iostream>

using namespace std;

int sum(int a, int b)
{
    return a + b;
}

int sub(int a, int b)
{
    return a - b;
}

int mul(int a, int b)
{
    return a * b;
}

int divi(int a, int b)
{
    if (b != 0)
    {
        return a / b;
    }

    return 0;
}

int mod(int a, int b)
{
    if (b != 0)
    {
        return a % b;
    }

    return 0;
}

int main()
{
    int num1, num2, option;
    float result;

    cout << "----- MENU -----" << endl;
    cout << "1. Suma" << endl;
    cout << "2. Resta" << endl;
    cout << "3. Producto" << endl;
    cout << "4. División Entera" << endl;
    cout << "5. Módulo" << endl;
    cin >> option;

    switch (option)
    {
    case 1:
        cout << "Ingrese dos números" << endl;
        cin >> num1 >> num2;
        result = sum(num1, num2);
        break;
    case 2:
        cout << "Ingrese dos números" << endl;
        cin >> num1 >> num2;
        result = sub(num1, num2);
        break;
    case 3:
        cout << "Ingrese dos números" << endl;
        cin >> num1 >> num2;
        result = mul(num1, num2);
        break;
    case 4:
        cout << "Ingrese dos números" << endl;
        cin >> num1 >> num2;
        result = divi(num1, num2);
        break;
    case 5:
        cout << "Ingrese dos números" << endl;
        cin >> num1 >> num2;
        result = mod(num1, num2);
        break;

    default:
        cout << "Por favor escoga una opción valida" << endl;
        return 1;
    }

    cout << "El resultado de la operación es: " << result << endl;

    return 0;
}