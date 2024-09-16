/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.lab31082024;

/**
 *
 * @author alumno
 */
public class Animal {

    private int codigo;
    private String tipo;
    private String nombre;
    private int edad;
    private Personal vendedor;

    public Animal(int codigo, String tipo, String nombre, int edad) {
        this.codigo = codigo;
        this.tipo = tipo;
        this.nombre = nombre;
        this.edad = edad;
    }

    public int getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

    public Personal getVendedor() {
        return vendedor;
    }

    public void setVendedor(Personal vendedor) {
        this.vendedor = vendedor;
    }

    @Override
    public String toString() {
        return "Animal{" + "codigo=" + codigo + ", tipo=" + tipo + ", nombre=" + nombre + ", edad=" + edad + ", vendedor=" + vendedor + '}';
    }

}
