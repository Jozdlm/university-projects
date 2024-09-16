/*3. Escriba un programa que le permita ingresar 3 números y los muestre de mayor a
menor. */

#include <iostream>

using namespace std;

int max(int a, int b)
{
    if (a > b)
        return a;
    else
        return b;
}

int min(int a, int b)
{
    if (a < b)
        return a;
    else
        return b;
}

int main()
{
    int num1, num2, num3;
    int max_num, mid_num, min_num;

    cout << "Escriba tres números, se le pediran consecutivamente:" << endl;
    cin >> num1 >> num2 >> num3;

    cout << "Orden de mayor a menor:" << endl;

    max_num = max(num1, max(num2, num3));
    min_num = min(num1, min(num2, num3));

    mid_num = num1 + num2 + num3 - max_num - min_num;

    cout << max_num << endl;
    cout << mid_num << endl;
    cout << min_num << endl;

    return 0;
}