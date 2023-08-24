/*3. Escriba un programa que le permita ingresar 3 números y los muestre de mayor a
menor. */

#include <iostream>

using namespace std;

int main()
{
    int num1, num2, num3;
    int max_num, mid_num, min_num;

    cout << "Escriba tres números, se le pediran consecutivamente:" << endl;
    cin >> num1 >> num2 >> num3;

    cout << "Orden de mayor a menor:" << endl;

    if (num1 > num2 && num1 > num3)
    {
        max_num = num1;

        if (num2 > num3)
        {
            mid_num = num2;
            min_num = num3;
        }
        else
        {
            mid_num = num3;
            min_num = num2;
        }
    }
    else if (num2 > num1 && num2 > num3)
    {
        max_num = num2;

        if (num1 > num3)
        {
            mid_num = num1;
            min_num = num3;
        }
        else
        {
            mid_num = num3;
            min_num = num1;
        }
    }
    else
    {
        max_num = num3;

        if (num1 > num2)
        {
            mid_num = num1;
            min_num = num2;
        }
        else
        {
            mid_num = num2;
            min_num = num1;
        }
    }

    cout << max_num << endl;
    cout << mid_num << endl;
    cout << min_num << endl;

    return 0;
}