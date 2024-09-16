/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.lab31082024;

import java.util.ArrayList;

/**
 *
 * @author alumno
 */
public abstract class Persona {

    private String email;
    private String direccion;
    private String telefono;
    private ArrayList<Animal> mascotas;

    public Persona(String email, String direccion, String telefono) {
        this.email = email;
        this.direccion = direccion;
        this.telefono = telefono;
        this.mascotas = new ArrayList<Animal>();
    }

    public ArrayList<Animal> getMascotas() {
        return mascotas;
    }

    public void addMascota(Animal mascota) {
        this.mascotas.add(mascota);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    @Override
    public String toString() {
        return "Persona{" + "email=" + email + ", direccion=" + direccion + ", telefono=" + telefono + ", mascotas=" + mascotas + '}';
    }

    public void MostrarMisMascotas() {
        System.out.println("-----------------------------------");
        System.out.println("Soy " + email);
        System.out.println("Mis mascotas son las siguientes:");
        
        for(Animal mascota: mascotas) {
            System.out.println(mascota.toString());
        }
    }
    
}
