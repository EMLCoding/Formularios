import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent{

  // Este es el objeto creado para recibir los valores del HTML
  forma:FormGroup;

  // ESte objeto tiene un objeto dentro con dos variables
  usuario: Object = {
    nombrecompleto: {
      nombre: "Eduardo",
      apellidos: "Martin"
    },
    correo: "eduardo.casa@hotmail.com",
    pasatiempos: [/* "Jugar", "Leer", "Dormir" */]
  }

  constructor() {

    // Con "Validators.required" se obliga a que se introduzca algun valor en la pag web. Tienen que ir primero las comillas simple,
    // como si fueramos a introducir algun string, seguido de una "," y luego ya el Validators que se necesite.
    // Cuando se quieran poner dos o mas validadores hay que ponerlos entre [].
    this.forma = new FormGroup({
      // Como el objeto usuario tiene un objeto dentro de si mismo es necesario poner otro "FormGroup"
      'nombrecompleto': new FormGroup({
        'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'apellidos': new FormControl('', Validators.required),
      }),
      'correo': new FormControl('', [Validators.required, Validators.pattern("a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'pasatiempos': new FormArray([
        new FormControl('Jugar', Validators.required)
      ]),
      'username': new FormControl('', Validators.required, this.existeUsuario),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl(),
    })

    // De esta forma se pueden cargar los datos de un objeto en un formulario (SIEMPRE Y CUANDO TENGAN LA MISMA ESTRUCTURA)
    //this.forma.setValue(this.usuario);

    // Es otra forma de aplicarle los validadores a una variable del formulario
    this.forma.controls['password2'].setValidators([
      Validators.required,this.noigual.bind(this.forma)
    ])

    /* Esta funcion se dispara cada vez que se hace un cambio(se escribe algo) en el campo username del formulario
     "valueChanges" devuelve un "observador" y por eso se puede usar "subscribe" */
    this.forma.controls['username'].valueChanges.subscribe( resultado => {
      console.log(resultado);
    })
    /* Esta funcion es para ir comprobando el estado cada vez que se escribe algo en el campo username del formulario */
    this.forma.controls['username'].statusChanges.subscribe( resultado => {
      console.log(resultado);
    })
   }

   agregarPasatiempos(){
     // Se pone todo entre () y se añade el "<FormArray>" para indicar que se comporte como un Array y asi tengamos el metodo "push" para añadir nuevos elementos al array
     (<FormArray>this.forma.controls['pasatiempos']).push(
       new FormControl('Leer', Validators.required)
     );
   }

   // Con este metodo se va a comprobar si la segunda vez que se introduce la contraseña se introduce la misma o no
   noigual( control:FormControl): { [s:string]:boolean} {
     // Este forma no tiene que ver con el del formulario, pero se le guarda el formulario (es "this" por el ".bind" del Validador) para que no de errores
     let forma:any = this;
     if( control.value !== forma.controls['password1'].value){
       return {
         noiguales:true
       }
     }
     return null;
   }

   // Metodo de proceso asíncrono
   // Este metodo devuelve una promise O un Observable
   existeUsuario ( control:FormControl): Promise<any>|Observable<any>{
     // Este metodo lo que hace es que cuando se introduce un usuario en el formulario, pasado 3 segundos, va a comprobar si el usuario
     // es distinto de "strider", si lo es el formulario se vuelve valido, sino sera invalido
      let promesa = new Promise(
        (resolve,reject)=>{
          setTimeout(()=>{
            if( control.value === "strider" ){
              resolve( {existe:true} )
            }else{
              resolve(null);
            }
          },3000)
        }
      )
      return promesa;
   }

   guardarCambios(){
     console.log(this.forma);
     //De esta forma resetea el formulario volviendo a poner los valores del usuario
     this.forma.reset(this.usuario);
   }


}
