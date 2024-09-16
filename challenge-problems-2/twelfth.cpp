#include <iostream>
#include <conio.h>

using namespace std;

int main()
{
    int over = 0;
    int between = 0;
    int under = 0;

    int shotdown = 1;

    while (shotdown != 0) {
        int salary = 0;

        cout << "Ingrese el sueldo del trabajador: ";
        cin >> salary;

        if (salary > 5000)
        {
            under++;
        }
        else if (salary < 5000 && salary > 1000)
        {
            between++;
        }
        else
        {
            over++;
        }
        
        cout << "Desea añadir otro sueldo? (1 o 0)" << endl;
        cin >> shotdown;
    }

    cout << "---- Salarios en la empresa ----" << endl;
    cout << "Empleados con sueldo mayor a 5000: " << over << endl;
    cout << "Empleados con sueldo entre 1000 y 5000: " << between << endl;
    cout << "Empleados con sueldo menor a 1000: " << under << endl;

    return 0;
}