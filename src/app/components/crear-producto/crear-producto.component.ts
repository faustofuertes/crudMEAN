import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';


@Component({
  selector: 'app-crear-producto',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  id: string | null;
  titulo = 'Crear producto'

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _myProduService: ProductoService,
    private aRouter: ActivatedRoute
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required]
    })
    this.id = aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto() {
    const nuevoProdu = {
      nombre: this.productoForm.value.nombre,
      categoria: this.productoForm.value.categoria,
      ubicacion: this.productoForm.value.ubicacion,
      precio: this.productoForm.value.precio,
    }

    if (this.id !== null) {
      this._myProduService.editarProducto(this.id, nuevoProdu).subscribe(data => {
        this.router.navigate(['/lista-elementos']);
      }, error => {
        console.log('Se produjo un error editando el producto.')
      })
    } else {
      this._myProduService.postProducto(nuevoProdu).subscribe(data => {
        this.router.navigate(['/lista-elementos']);
      }, error => {
        console.log('Ocurrio un error agregando el producto.')
      })
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar producto';
      this._myProduService.getProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          nombre: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio
        }
        )
      })
    }
  }

}
