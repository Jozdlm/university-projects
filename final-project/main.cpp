#include <iostream>
#include <conio.h>
#include <fstream>
#include <locale.h>

using namespace std;
void ingresar();

struct Employee
{
    char DPI[13];
    char FirstName[50];
    char LastName[50];
    char DateBirth[10];
    char Address[50];
    char Phone[9];
    double Salary;
};


int main()
{
    setlocale(LC_ALL, "");

    int opcion;
    do
    {
        system("cls");
        cout << "---Nomina de Empleados---\n\n";
        cout << "1-Ingresar nuevo empleado\n";
        cout << "2-Ver Empleados\n";
        cout << "3-Buscar un empleado\n";
        cout << "4-Eliminar registro de empleado\n";
        cout << "5-Salir\n";
        cout << "¿Que deseas realizar?: ";
        cin >> opcion;

        switch (opcion)
        {
        case 1:
            ingresar();
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        }

    } while (opcion != 5);
    return 0;
}

void ingresar()
{
    char nombre[15];
    char apellido[15];
    char fechaNacimiento[15];
    char dpi[20];
    char direccion[50];
    char telefono[9];
    double sueldo;
    ofstream ingreso("Empleados.txt", ios::app);
    char respuesta;
    if (!ingresar)
    {
        cerr << "Error, no se puede abrir el archivo";
        getch();
        exit(0);
    }
    do
    {
        cin.ignore();
        system("cls");
        cout << "\nINGRESO DE DATOS: \n\n";
        cout << "Ingrese su primer nombre: ";
        cin.getline(nombre, 15, '\n');
        cout << "Ingrese su primer apellido: ";
        cin.getline(apellido, 15, '\n');
        cout << "Ingrese su fecha de nacimiento: ";
        cin.getline(fechaNacimiento, 15, '\n');
        cout << "Ingrese su DPI: ";
        cin.getline(dpi, 20, '\n');
        cout << "Ingrese su dirección: ";
        cin.getline(direccion, 50, '\n');
        cout << "Ingrese su teléfono: ";
        cin.getline(telefono, 9, '\n');
        cout << "Ingrese el sueldo: ";
        cin >> sueldo;
        ingreso << dpi << "*" << nombre << "*" << "*" << apellido << "*" << "*" << fechaNacimiento << "*" << dpi << "*" << direccion << "*" << telefono << "*" << sueldo << "\n";
        cout << "Desea realizar otro ingreso? s/n: \t";
        cin >> respuesta;
    } while (toupper(respuesta) == 'S');
    ingreso.close();
}
