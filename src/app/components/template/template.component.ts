import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  //Con esta linea de estilos se esta diciendo que cuando tenga el campo ng-invalid y ng-touched en true se recubra el input con un borde rojo
  //ng-invalid y ng-touched son dos valores que devuelve cualquier form(se puede ver por consola). El ng-invalid depende del required y ng-touched de si ha sido tocado o no
  //con el ":not(form)" se consigue que este estilo aplique en todos los elementos HTML menos en los que sean "<form>"
  styles: [`
    .ng-invalid.ng-touched:not(form){
      border: 1px solid red;
    }
  `]
})
export class TemplateComponent implements OnInit {

  usuario:any = {
    nombre: null,
    apellido: null,
    correo: null,
    pais:"",
    sexo:null,
    acepta:false,
  };

  paises = [{
    codigo:"JPA",
    nombre:"Japón",
  },
  {
    codigo:"ESP",
    nombre:"España"
  }]


  constructor() { }

  ngOnInit() {
    console.log("Antes de cambiar el usuario",this.usuario.correo);
  }

  //Metodo llamado cuando se hace Submit en el formulario
  guardar( formu:NgForm ){
    console.log("Formulario guardado");
    console.log("Impresión del Formulario: ",formu);
    //Con formu.value se puede trabajar con los datos introducidos por el usuario
    console.log("Impresión de los datos introducidos: ", formu.value);
    /* console.log(this.usuario.nombre);
    this.usuario.nombre= formu.value.nombre;
    console.log(this.usuario.nombre); */
    console.log("Despues de cambiar el usuario:",this.usuario.correo);

  }

}
