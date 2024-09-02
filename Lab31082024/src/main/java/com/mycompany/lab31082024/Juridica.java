/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.lab31082024;

/**
 *
 * @author alumno
 */
public class Juridica extends Persona {

    private String NIT;

    public Juridica(String NIT, String email, String direccion, String telefono) {
        super(email, direccion, telefono);
        this.NIT = NIT;
    }

    public String getNIT() {
        return NIT;
    }

    public void setNIT(String NIT) {
        this.NIT = NIT;
    }

    @Override
    public String toString() {
        return "Juridica{" + "NIT=" + NIT + '}';
    }

}
