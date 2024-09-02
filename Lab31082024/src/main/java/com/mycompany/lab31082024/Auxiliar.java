/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.lab31082024;

/**
 *
 * @author alumno
 */
public class Auxiliar extends Personal {

    private int codigoEmpleado;

    public Auxiliar(int codigoEmpleado, String nombre, String apellidos, String fechaContratacion) {
        super(nombre, apellidos, fechaContratacion);
        this.codigoEmpleado = codigoEmpleado;
    }

    public int getCodigoEmpleado() {
        return codigoEmpleado;
    }

    public void setCodigoEmpleado(int codigoEmpleado) {
        this.codigoEmpleado = codigoEmpleado;
    }

    @Override
    public String toString() {
        return "Auxiliar{" + "codigoEmpleado=" + codigoEmpleado + "nombre=" + nombre + ", apellidos=" + apellidos + ", fechaContratacion=" + fechaContratacion + '}';
    }

}
