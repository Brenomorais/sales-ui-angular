import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { VendasService } from '../vendas/vendas.service';

@Component({
  selector: 'app-vendas-cadastro',
  templateUrl: './vendas-cadastro.component.html',
  styleUrls: ['./vendas-cadastro.component.css']
})
export class VendasCadastroComponent implements OnInit {

  sale: any;
  item: any;
  clients: Array<any>
  products: Array<any>
  @Output() vendaSalva = new EventEmitter;

  constructor(private vendaService: VendasService,
    private messageService: MessageService ) { }

  ngOnInit() {
      this.vendaService.listarClientes()
        .subscribe(response => this.clients = response);
      
      this.vendaService.listarProdutos()
        .subscribe(response => this.products = response);

      this.novaVenda();
  }

  novaVenda(){
    this.sale = { itens: [], freight: 0.0, total: 0.0 };
    this.item = {};
  }

  incluirItem(){
      this.item.total = (this.item.product.price * this.item.amount);

      this.sale.itens.push(this.item);

      this.item = {};

      this.calcularTotal();
  }

  calcularTotal(){
    const totalItens = this.sale.itens
      .map(i => (i.product.price * i.amount))
      .reduce((total, v) => total + v , 0);

      this.sale.total = totalItens + this.sale.freight;
  }

  adicionar(frm: FormGroup) {
    this.vendaService.adicionar(this.sale).subscribe(response => {
      frm.reset();

      this.novaVenda();

      this.messageService.add({ severity: 'success', detail: 'Venda adicionada com sucesso!' });

      this.vendaSalva.emit(response);
    });
  }

}
