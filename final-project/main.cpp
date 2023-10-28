#include <iostream>
#include <conio.h>
#include <fstream>
#include <locale.h>
#include <iomanip>
#include <windows.h>

using namespace std;

std::string nombre1, nombre2, apellido1, apellido2, fechaNacimiento, dpi, direccion, telefono;
double sueldo;

void ingresar();
void mostrar();
void buscarEmpleado();
void eliminarEmpleado();

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
        cout << "4-Eliminar registro de 	empleado\n";
        cout << "5-Salir\n";
        cout << "¿Que deseas realizar?: ";
        cin >> opcion;

        switch (opcion)
        {
        case 1:
            ingresar();
            break;

        case 2:
            mostrar();
            break;

        case 3:
            buscarEmpleado();
            break;

        case 4:
            eliminarEmpleado();
            break;
        }

    } while (opcion != 5);
    return 0;
}

void ingresar()
{

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
        getline(cin, nombre1);
        cout << "Ingrese su segundo nombre: ";
        getline(cin, nombre2);
        cout << "Ingrese su primer apellido: ";
        getline(cin, apellido1);
        cout << "Ingrese su segundo apellido: ";
        getline(cin, apellido2);
        cout << "Ingrese su fecha de nacimiento: ";
        getline(cin, fechaNacimiento);
        cout << "Ingrese su DPI: ";
        getline(cin, dpi);
        cout << "Ingrese su dirección: ";
        getline(cin, direccion);
        cout << "Ingrese su teléfono: ";
        getline(cin, telefono);
        cout << "Ingrese el sueldo: ";
        cin >> sueldo;
        ingreso << dpi << "*" << nombre1 << "*" << nombre2 << "*" << apellido1 << "*" << apellido2 << "*" << fechaNacimiento << "*" << dpi << "*" << direccion << "*" << telefono << "*" << sueldo << "\n";
        cout << "Desea realizar otro ingreso? s/n: \t";
        cin >> respuesta;
    } while (toupper(respuesta) == 'S');
    ingreso.close();
}

//_______________________________MOSTRAR_______________________________

void mostrar()
{
    ifstream proyecto("Empleados.txt", ios::in);
    if (!proyecto)
    {
        cerr << "Error, no se puede abrir el archivo";
        getch();
        return;
    }

    cout << left << setw(20) << "ID"
         << setw(15) << "Nombre 1"
         << setw(15) << "Nombre 2"
         << setw(15) << "Apellido 1"
         << setw(15) << "Apellido 2"
         << setw(15) << "Fecha Nac."
         << setw(20) << "DPI"
         << setw(50) << "Direccion"
         << setw(10) << "Telefono"
         << setw(10) << "Sueldo" << endl;
    cout << string(200, '-') << endl;

    while (proyecto)
    {
        string line;
        getline(proyecto, line); // Lee toda la linea

        if (line.empty())
        {
            continue;
        }

        // Uilizamos stringstream (ss) para obtener los datos separados por un '*'
        stringstream ss(line);
        getline(ss, dpi, '*');
        getline(ss, nombre1, '*');
        getline(ss, nombre2, '*');
        getline(ss, apellido1, '*');
        getline(ss, apellido2, '*');
        getline(ss, fechaNacimiento, '*');
        getline(ss, dpi, '*');
        getline(ss, direccion, '*');
        getline(ss, telefono, '*');
        ss >> sueldo;

        // Verifica que la lectura de los datos es exitosa
        if (!ss.fail())
        {
            cout << left << setw(20) << dpi
                 << setw(15) << nombre1
                 << setw(15) << nombre2
                 << setw(15) << apellido1
                 << setw(15) << apellido2
                 << setw(15) << fechaNacimiento
                 << setw(20) << dpi
                 << setw(50) << direccion
                 << setw(10) << telefono
                 << setw(10) << sueldo << endl;
        }
    }

    proyecto.close();
    getch();
}

//________________BUSCAR____________________

void buscarEmpleado()
{
    cin.ignore();
    system("cls");
    ifstream buscar("Empleados.txt", ios::app);
    if (!buscar)
    {
        cerr << "Error, no se puede abrir el archivo";
        getch();
        exit(0);
    }

    // el string linea jalara toda la linea en nuestro fichero mientras que resultado sera solo el valor del dpi
    string linea, resultado;

    // Variable dpiExt para buscar por el DPI ya que es la unica pieza de informacion unica en el sistema
    // Respuesta es para preguntarle al usuario si desea volver a buscar
    char dpiExt[20], respuesta;
    bool encontrado = false;

    cout << "Ingrese DPI a buscar: (ej. 1234567890101)" << endl;
    cout << "Nota: Por favor ingresar los 13 dígitos de lo contrario no realizará la busqueda correctamente" << endl;
    cin.getline(dpiExt, 20, '\n');

    while (!buscar.eof() && !encontrado)
    {

        // empezamos a recorrer la primera linea
        getline(buscar, linea);

        // asignamos los primeros 13 digitos que corresponden al dpi
        string resultado = linea.substr(0, 13);

        if (resultado == dpiExt)
        { 
            // comparamos el valor ingresado con lo que el fichero contiene y al encontrar una coincidencia lo imprimimos
            cout << "\n";
            cout << linea << endl << endl;

            // una vez hallado cambiamos el valor a true para detener nuestro ciclo repetitivo
            encontrado = true;
        }
    }

    // en caso se llegue al fin del archivo pero el valor no halla sido encontrado imprimimos el mensaje
    if (!encontrado)
    {
        cout << "Datos no encontrados \n";
    }

    // y al final del ciclo independientemente de su resultado preguntamos al usuario si desea volver a buscar
    cout << "Desea Realizar otra busqueda? S/N: \n";
    cin >> respuesta;

    if (toupper(respuesta) == 'S')
    {
        system("cls");
        buscarEmpleado();
    }
    else
    {
        main();
    }
    buscar.close();
}

//-------------------- ELIMINAR EMPLEADO ----------------------------------

void eliminarEmpleado()
{
    string targetDPI = "";

    cout << "Ingrese el DPI del empleado que desea eliminar: ";
    cin >> targetDPI;

    ifstream inputFile("Empleados.txt");
    if (!inputFile)
    {
        cerr << "Error, no se puede abrir el archivo";
        getch();
        return;
    }

    ofstream tempFile("temp.txt");
    if (!tempFile)
    {
        cerr << "Error al crear el archivo temporal";
        getch();
        return;
    }

    string line;
    bool deleted = false;

    while (getline(inputFile, line))
    {
        // Verifica si la linea actual contiene el DPI que deseamos eliminar
        if (line.find(targetDPI) != string::npos)
        {
            deleted = true;
            continue;
        }

        tempFile << line << endl;
    }

    inputFile.close();
    tempFile.close();

    if (deleted)
    {
        remove("Empleados.txt");
        rename("temp.txt", "Empleados.txt");
        cout << "Registro eliminado exitosamente." << endl;
    }
    else
    {
        remove("temp.txt");
        cout << "Registro no encontrado." << endl;
    }
}