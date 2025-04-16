import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-listar-productos',
  imports: [RouterLink],
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.css'
})
export class ListarProductosComponent implements OnInit {
  productos?: Producto[];

  constructor(private _myProduService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this._myProduService.getProductos().subscribe(data => {
      this.productos = data;
    }, error => {
      console.log('Ocurrio un error obteniendo los productos')
    })
  }

  eliminarProducto(id: string | undefined) {
    this._myProduService.deleteProdcuto(id).subscribe(data => {
      this.obtenerProductos();
    }, erorr => {
      console.log('Ocurrio un error eliminando el producto')
    });
  }

  editarProducto(){
    
  }
}
