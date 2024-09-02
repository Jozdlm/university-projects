/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.lab31082024;

/**
 *
 * @author alumno
 */
public class Veterinario extends Personal {

    private int numeroColegiado;

    public Veterinario(int numeroColegiado, String nombre, String apellidos, String fechaContratacion) {
        super(nombre, apellidos, fechaContratacion);
        this.numeroColegiado = numeroColegiado;
    }

    public int getNumeroColegiado() {
        return numeroColegiado;
    }

    public void setNumeroColegiado(int numeroColegiado) {
        this.numeroColegiado = numeroColegiado;
    }

    @Override
    public String toString() {
        return "Veterinario{" + "numeroColegiado=" + numeroColegiado + "nombre=" + nombre + ", apellidos=" + apellidos + ", fechaContratacion=" + fechaContratacion + '}';
    }

}
