#include <iostream>
#include <conio.h>

using namespace std;

int main() {
    int i = 1;
    float total, average;

    cout << "A continuación se le pedirán 10 números:" << endl;
    while (i <= 10)
    {
        int new_value;

        cout << "Ingrese un valor: ";
        cin >> new_value;

        total += new_value;

        i++;
    }

    average = total / 10;

    cout << "Total: " << total << endl;
    cout << "Promedio: " << average << endl;

    getch();

    return 0;
}