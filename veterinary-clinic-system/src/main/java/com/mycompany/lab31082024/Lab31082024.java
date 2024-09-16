/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */
package com.mycompany.lab31082024;

/**
 *
 * @author alumno
 */
public class Lab31082024 {

    public static void main(String[] args) {
        System.out.println("----- VETERINARIA PET -----");

        // INICIALIZACIÓN DE VARIABLES --------------------------
        //Personas Particulares
        Particular persona1 = new Particular("1234567890123", "persona1@correo.com", "12 avenida zona 2 San miguel", "+50299998888");
        Particular persona2 = new Particular("1230987654321", "persona2@correo.com", "4 avenida zona 3 Villa Nueva", "+50212349876");

        //Personas Jurídicas
        Juridica empresa1 = new Juridica("12345678-9", "empresa1@correo.com", "6ta avenida zona 1 Guatemala", "+50233112244");
        Juridica empresa2 = new Juridica("98765432-1", "empresa2@correo.com", "12 calle 33-12 zona 8 Amatitlan", "+50277889966");
        Juridica empresa3 = new Juridica("56789123-4", "empresa3@correo.com", "6ta calle 12ave. Mixco", "+5021122337788");

        // Animales
        Animal animal1 = new Animal(1, "Perro", "Juancho", 1);
        Animal animal2 = new Animal(2, "Gato", "Wicho", 6);
        Animal animal3 = new Animal(3, "Gato", "Fer", 3);
        Animal animal4 = new Animal(4, "Tortuga", "Estrella", 2);
        Animal animal5 = new Animal(5, "Perro", "Alfalfa", 2);
        Animal animal6 = new Animal(6, "Perro", "Relampago", 5);
        Animal animal7 = new Animal(7, "Conejo", "Candido", 4);

        //Veterinario
        Veterinario veterinario = new Veterinario(123321, "Mario Alberto", "Ramirez Gonzalez", "28-08-2023");

        // Auxiliar
        Auxiliar auxiliar = new Auxiliar(543, "Melany Sofia", "Orellana Vasquez", "10-11-2023");

        // PROCEDIMIENTO DE VENTA --------------------------
        veterinario.venderMascota(persona1, animal1);
        auxiliar.venderMascota(empresa2, animal2);
        auxiliar.venderMascota(empresa2, animal3);

        // MOSTRAR OPERACIONES --------------------------
        persona1.MostrarMisMascotas();
        empresa2.MostrarMisMascotas();

    }
}
