#include <iostream>

using namespace std;

int main()
{
    string name;
    int hours, hourly_pay;
    float salary;

    cout << "Ingrese el nombre: ";
    cin >> name;

    cout << "Ingrese las horas trabajadas: ";
    cin >> hours;

    cout << "Ingrese la couta por hora: ";
    cin >> hourly_pay;

    if (hours > 50)
    {
        int surplus = hours - 50;
        int surplus_forty = 10;

        salary = 40 * hourly_pay;
        salary += (surplus_forty * hourly_pay * 2);
        salary += (surplus * hourly_pay * 3);
        salary -= (salary * 0.12);
    }
    else if (hours > 40)
    {
        int surplus = hours - 40;
        salary = 40 * hourly_pay;
        salary += (surplus * hourly_pay * 2);
    }
    else
    {
        salary = hours * hourly_pay;
    }

    cout << "Empleado: " << name << endl;
    cout << "Horas trabajadas: " << hours << endl;
    cout << "Sueldo: " << salary << endl;

    return 0;
}