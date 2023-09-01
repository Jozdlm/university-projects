#include <iostream>
#include <conio.h>

using namespace std;

int main() {
    int over = 0;
    int under = 0;

    cout << "Ingrese las notas de 10 alumnos:" << endl;
    for (int i = 0; i < 10; i++)
    {
        int score;

        cout << "Ingrese una nota: ";
        cin >> score;

        if (score < 7)
        {
            under++;
        } else {
            over++;
        }
    }

    cout << "Resultados de las notas ----" << endl;
    cout << "Alumnos con nota mayor o igual a 7: " << over << endl;
    cout << "Alumnos con nota menor a 7: " << under << endl;

    return 0;
}