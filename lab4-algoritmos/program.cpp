#include <iostream>
#include <conio.h>
#include <cmath>
#include <stdlib.h>

using namespace std;

// 1. Que mediante una función calcule el cuadrado de un número cualquiera y lo muestre en pantalla.
void calcularCuadr()
{
    int numero;

    cout << "Ingrese el numero a evaluar: ";
    cin >> numero;

    cout << "Su cuadrado es: " << pow(numero, 2);
}

// 2. Que realice la media de dos números, utilizar una función
void media()
{
    system("cls");
    int n1, n2;
    cout << "Ingrese un numero: ";
    cin >> n1;
    cout << "Ingrese otro numero: ";
    cin >> n2;
    cout << "La media de dos numeros es: " << (n1 + n2) / 2 << "\n";
}

// 3. Que pida por pantalla un número del 1 al 10 y mediante un procedimiento muestre por pantalla
// el número escrito en letras.
void NumeroLetras()
{
    system("cls");
    int n1;
    string Letras[10]{"Uno", "Dos", "Tres", "Cuatro", "Cinco", "Seis", "Siete", "Ocho", "Nueve", "Diez"};
    cout << "Ingrese un numero del 1 al 10: ";
    cin >> n1;
    if (n1 > 0 and n1 < 11)
    {
        cout << Letras[n1 - 1] << "\n";
    }
    else
    {
        cout << "Este numero no entra en el rango\n";
    }
}

// 4. Que pida por pantalla una temperatura en grados Celsius, muestre un menú para convertirlos a
//  Fahrenheit o Kelvin y muestre el equivalente por pantalla, utilizar funciones.
void convertCelsiusTo()
{
    system("cls");

    float celsius, fahrenheit, kelvin;
    bool validOption = false;
    int option = 0;

    cout << "Ingrese una temperatura en grados Celsius: " << endl;
    cin >> celsius;

    do
    {
        cout << "--- Menu Conversiones ---" << endl;
        cout << "1. Fahrenheit" << endl;
        cout << "2. Kelvin" << endl;
        cin >> option;

        switch (option)
        {
        case 1:
            fahrenheit = ((9.0 / 5.0) * celsius) + 32;
            cout << "Conversion a Fahrenheit: " << fahrenheit << endl;
            validOption = true;
            break;
        case 2:
            kelvin = celsius + 273.15;
            cout << "Conversion a Kelvin: " << kelvin << endl;
            validOption = true;
            break;
        default:
            cout << "Por favor seleccione una opción valida" << endl;
            validOption = false;
            break;
        }
    } while (!validOption);
}

// 5. Que muestre por pantalla si un número es par o impar, utilizar una función.
void calcularNum()
{
    int numero;

    cout << "Ingrese numero a evaluar: ";
    cin >> numero;

    if (numero % 2 == 0)
    {
        cout << "El numero es par";
    }
    else if (numero % 2 != 0)
    {
        cout << "El numero es impar";
    }
}

// 6. Que muestre una tabla de multiplicar de un número cualquiera por pantalla, el número se pedirá
// en el programa principal
void multAnyNumber()
{
    int base, result;
    cout << "Ingrese cualquier número: ";
    cin >> base;

    cout << base << " * 1 = " << base * 1 << endl;
    cout << base << " * 2 = " << base * 2 << endl;
    cout << base << " * 3 = " << base * 3 << endl;
    cout << base << " * 4 = " << base * 4 << endl;
    cout << base << " * 5 = " << base * 5 << endl;
    cout << base << " * 6 = " << base * 6 << endl;
    cout << base << " * 7 = " << base * 7 << endl;
    cout << base << " * 8 = " << base * 8 << endl;
    cout << base << " * 9 = " << base * 9 << endl;
    cout << base << " * 10 = " << base * 10 << endl;
    cout << base << " * 11 = " << base * 11 << endl;
    cout << base << " * 12 = " << base * 12 << endl;
}

// 7. Que verifique que un carácter introducido es un número, utilizar funciones
void IdentificarNumero()
{
    system("clear");
    string numero;
    cout << "Ingrese numero: ";
    cin >> numero;
    try
    {
        double n1 = stod(numero);
        cout << "El '" << n1 << "', si es un numero\n";
    }
    catch (exception e)
    {
        cout << "El '" << numero << "' No es un numero\n";
    }
}

// 8. Que transforme un número del 0 al 999 a números romanos, utilizar funciones.
void convertir()
{

    // declaro los array con los valores a utilizar separados por centena,decena y unidad
    string unidad[10] = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};
    string decena[10] = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
    string centena[10] = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
    int numero, cent, dec, uni;

    // pido el numero al usuario
    cout << "Ingrese numero a convertir: ";
    cin >> numero;

    // divido el numero dado en Unidades, Decenas y Centenas
    cent = (numero / 100) % 10;
    dec = (numero / 10) % 10;
    uni = numero % 10;

    if (numero == 0 || numero > 999)
    {
        // Condiciono el numero a evaluar
        cout << "Numero fuera de rango";
    }
    else
    {
        /*De lo contrario imprimo el numero en romanos, notese que si en algun momento centena,decena o unidad da 0
        se imprimira la posicion 0 del array el cual es un espacio en blanco*/
        cout << centena[cent] << decena[dec] << unidad[uni];
    }
}

// 9. Diseñar una función que calcule el área y el perímetro de una circunferencia. Utiliza dicha función
// en un programa principal que lea el radio de una circunferencia y muestre su área y perímetro.
void calcularCir()
{
    double area, perimetro, radio;
    const double PI = M_PI;
    cout << "Ingrese radio del circulo: ";
    cin >> radio;

    area = PI * pow(radio, 2);
    perimetro = 2 * PI * radio;

    cout << "Su perimetro es: " << perimetro << "\n El area es: " << area;
}

/* 10.
    Crear una subrutina llamada “Login”, que recibe un nombre de usuario y una contraseña y te
    devuelve Verdadero si el nombre de usuario es “usuario1” y la contraseña es “secreto”. Además,
    recibe el número de intentos que se ha intentado hacer login y si no se ha podido hacer login
    incremente este valor. Crear un programa principal donde se pida un nombre de usuario y una
    contraseña y se intente hacer login, solamente tenemos tres oportunidades para intentarlo.
*/
void login()
{
    system("clear");
    int n1 = 1;
    string usuario, contra;
    const string usuario1 = "usuario1", contra1 = "secreto";
    while (n1 != 4)
    {
        cout << "Intento " << n1 << ", de 3\n";
        cout << "Ingrese nombre de usuario: ";
        cin >> usuario;
        cout << "Ingrese Contraseña: ";
        cin >> contra;
        if ((usuario == usuario1) and (contra == contra1))
        {
            n1 = 4;
            cout << "Verdadero\n";
            break;
        }
        n1 += 1;
        system("clear");
    }
}

void showMenu()
{
    int option = 0;

    do
    {
        system("cls");
        cout << "---------- MENU PRINCIPAL ----------" << endl;
        cout << "1. Calcular cuadrado." << endl;
        cout << "2. Media de dos números." << endl;
        cout << "3. Mostar número en letras." << endl;
        cout << "4. Conversion de grados Celsius." << endl;
        cout << "5. Comparar si un número es par o impar." << endl;
        cout << "6. Mostrar la tabla de multiplicar." << endl;
        cout << "7. Comparar si es un número." << endl;
        cout << "8. Convertir un número a num. romanos." << endl;
        cout << "9. Calcular área y perímetro." << endl;
        cout << "10. Iniciar Sesión." << endl;
        cin >> option;

        switch (option)
        {
        case 1:
            calcularCuadr();
            break;
        case 2:
            media();
            break;
        case 3:
            NumeroLetras();
            break;
        case 4:
            convertCelsiusTo();
            break;
        case 5:
            calcularNum();
            break;
        case 6:
            multAnyNumber();
            break;
        case 7:
            IdentificarNumero();
            break;
        case 8:
            convertir();
            break;
        case 9:
            calcularCir();
            break;
        case 10:
            login();
            break;

        default:
            cout << "Selecciona una opción válida" << endl;
            break;
        }
    } while (option > 10 || option <= 0);
}

int main()
{
    system("cls");
    setlocale(LC_ALL, "");
    showMenu();

    return 0;
}
