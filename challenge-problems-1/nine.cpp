#include <iostream>

using namespace std;

int main()
{
    int num_day;

    cout << "Ingrese el número del día:" << endl;
    cin >> num_day;

    switch (num_day)
    {
    case 1:
        cout << "Es día Lunes" << endl;
        break;
    case 2:
        cout << "Es día Martes" << endl;
        break;
    case 3:
        cout << "Es día Miercoles" << endl;
        break;
    case 4:
        cout << "Es día Jueves" << endl;
        break;
    case 5:
        cout << "Es día Viernes" << endl;
        break;
    case 6:
        cout << "Es día Sabado" << endl;
        break;
    case 7:
        cout << "Es día Domingo" << endl;
        break;

    default:
        cout << "Ingrese un número entre el 1 al 7" << endl;
        break;
    }

    return 0;
}