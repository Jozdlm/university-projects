/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.lab31082024;

/**
 *
 * @author alumno
 */
public class Particular extends Persona {

    private String CUI;

    public Particular(String CUI, String email, String direccion, String telefono) {
        super(email, direccion, telefono);
        this.CUI = CUI;
    }

    public String getCUI() {
        return CUI;
    }

    public void setCUI(String CUI) {
        this.CUI = CUI;
    }

    @Override
    public String toString() {
        return "Particular{" + "CUI=" + CUI + '}';
    }
}
