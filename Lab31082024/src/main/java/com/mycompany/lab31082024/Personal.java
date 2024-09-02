/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.lab31082024;

/**
 *
 * @author alumno
 */
public abstract class Personal {
    
    protected String nombre;
    protected String apellidos;
    protected String fechaContratacion;
    
    public Personal(String nombre, String apellidos, String fechaContratacion) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.fechaContratacion = fechaContratacion;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getApellidos() {
        return apellidos;
    }
    
    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }
    
    public String getFechaContratacion() {
        return fechaContratacion;
    }
    
    public void setFechaContratacion(String fechaContratacion) {
        this.fechaContratacion = fechaContratacion;
    }
    
    public void venderMascota(Persona persona, Animal mascota) {
        persona.addMascota(mascota);
        mascota.setVendedor(this);
    }
    
    @Override
    public String toString() {
        return "Personal{" + "nombre=" + nombre + ", apellidos=" + apellidos + ", fechaContratacion=" + fechaContratacion + '}';
    }
    
}
