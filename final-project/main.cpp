#include <iostream>
#include <conio.h>
#include <fstream>
#include <locale.h>
#include <Windows.h>

using namespace std;
void ingresar();
void displayEmployeeData();

struct Employee
{
    string DPI;
    string FirstName;
    string LastName;
    string DateBirth;
    string Address;
    string Phone;
    double Salary;
};

int main()
{
    SetConsoleOutputCP(CP_UTF8);

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
            displayEmployeeData();
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
    Employee employee;

    ofstream ingreso("Empleados.txt", ios::app);
    char respuesta;

    if (!ingreso)
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
        getline(cin, employee.FirstName);

        cout << "Ingrese su primer apellido: ";
        getline(cin, employee.LastName);

        cout << "Ingrese su fecha de nacimiento: ";
        getline(cin, employee.DateBirth);

        cout << "Ingrese su DPI: ";
        getline(cin, employee.DPI);

        cout << "Ingrese su dirección: ";
        getline(cin, employee.Address);

        cout << "Ingrese su teléfono: ";
        getline(cin, employee.Phone);

        cout << "Ingrese el sueldo: ";
        cin >> employee.Salary;

        ingreso << employee.DPI << "*" << employee.FirstName << "*" << employee.LastName << "*"
                << employee.DateBirth << "*" << employee.Address << "*" << employee.Phone << "*"
                << employee.Salary << endl;

        cout << "Desea realizar otro ingreso? s/n: ";
        cin >> respuesta;
    } while (toupper(respuesta) == 'S');

    ingreso.close();
}

// void loadEmployeeData() {
//     // void employees;
//     ifstream input("Empleados.txt");
//     if (input) {
//         // Employee employee;
//         string line;
//         while (getline(input, line)) {
//             // Parse the line and populate the Employee struct
//             // (you can use a suitable delimiter like '*' for parsing)
//             // Example parsing code:
//             // stringstream ss(line);
//             // getline(ss, employee.DPI, '*');
//             // getline(ss, employee.FirstName, '*');
//             // ... (continue for other fields)
//             // employees.push_back(employee);
//             cout << getline(input, line);
//         }
//         input.close();
//     }
//     // return employees;
// }

void displayEmployeeData() {
    ifstream input("Empleados.txt");
    if (input) {
        string line;
        while (getline(input, line)) {
            cout << line << endl; // Print each line to the console
        }
        input.close();
    }
    getch();
}