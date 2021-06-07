import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    img{
      width: 100%;
      border-radius: 10px;
    }
    `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego:'',
    characters:'',
    first_appearance:'',
    publisher: Publisher.DCComics,
    alt_img:''
  }

  constructor( private heroesSeervice: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar,
               public dialog: MatDialog ) { }

  ngOnInit(): void {

    if(!this.router.url.includes('editar')){
      return;
    }

    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.heroesSeervice.getHeorePorId(id))
    )
      .subscribe( heroe => this.heroe = heroe );

  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0){
      return;
    }

    if(this.heroe.id){
      //Actualizar
      this.heroesSeervice.actualizarHeroe( this.heroe )
          .subscribe( heroe =>  this.mostrarSnak('Registro Actualizado') );
    }else{
      //Crear
      this.heroesSeervice.agregarHeroe(this.heroe)
        .subscribe( heroe =>{
          this.router.navigate(['/heroes/editar', heroe.id ]);
          this.mostrarSnak('Registro Creado');
        });
    }

    
  }

  borrarHeroe(){

    const dialog = this.dialog.open(ConfirmarComponent,{
      width: '300px',
      data: {...this.heroe}
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if(result){
          this.heroesSeervice.borrarrHeroe(this.heroe.id!)
              .subscribe(resp => {
                this.router.navigate(['/heroes']);
                this.mostrarSnak('Registro Borrado');
              });
          }
      }
    )

  }
  
  mostrarSnak(mensaje:string){
    this.snackBar.open(mensaje, 'Ok!', {
      duration: 2500
    });

}

}
