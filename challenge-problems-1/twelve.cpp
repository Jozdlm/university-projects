#include <iostream>

using namespace std;

int trianglePerimeter()
{
    int side1, side2, side3;

    cout << "Ingrese los lados del triangulo:" << endl;
    cin >> side1 >> side2 >> side3;

    return side1 + side2 + side3;
}

int squarePerimeter()
{
    int side;

    cout << "Ingrese el lado del cuadrado:" << endl;
    cin >> side;

    return side * 4;
}

float circlePerimeter()
{
    const float PI = 3.1416;

    int radius;

    cout << "Ingrese el radio del circulo:" << endl;
    cin >> radius;

    return 2 * PI * radius;
}

int hexagonPerimeter()
{
    int side;

    cout << "Ingrese el lado del hexágono regular:" << endl;
    cin >> side;

    return side * 6;
}

void showMenu()
{
    cout << "----- MENU -----" << endl;
    cout << "¿Qué perímetro desea calcular?:" << endl;
    cout << "1. Triángulo" << endl;
    cout << "2. Cuadrado" << endl;
    cout << "3. Circulo" << endl;
    cout << "4. Hexágono (Regular)" << endl;
    cout << "5. Salir" << endl;
}

int main()
{
    int option;
    float result, perimeter;

    showMenu();
    cin >> option;

    switch (option)
    {
    case 1:
        perimeter = trianglePerimeter();
        cout << "Perímetro: " << perimeter << endl;
        break;
    case 2:
        perimeter = squarePerimeter();
        cout << "Perímetro: " << perimeter << endl;
        break;
    case 3:
        perimeter = circlePerimeter();
        cout << "Perímetro: " << perimeter << endl;
        break;
    case 4:
        perimeter = hexagonPerimeter();
        cout << "Perímetro: " << perimeter << endl;
        break;

    default:
        return 1;
    }

    return 0;
}