import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ConversorApiService } from '../../../service/conversor-api.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{

  public getCurrencies: any[] = [];

  constructor(
    private conversorApiService: ConversorApiService,
    @Inject(LOCALE_ID) public locale: string
  ) { }

  ngOnInit(): void {
    this.getCurrencyData();
  }

  getCurrencyData(): void{
  this.conversorApiService.getCurrencyConversion().subscribe((data: any[]) => {
    this.getCurrencies = data.map(currencyObj => {
      const key = Object.keys(currencyObj)[0];

      const currencyInfo = currencyObj[key];

      const data = new Date(currencyInfo.timestamp * 1000);
      const horas = data.getHours();
      const minutos = data.getMinutes();
      const segundos = data.getSeconds();

      const horaFormatada = `${horas}:${minutos}:${segundos}`;
    
      return {
        nome: currencyInfo.name.replace('/Real Brasileiro', ''),
        valorAtual: currencyInfo.bid,
        variacao: currencyInfo.pctChange,
        horaConsulta: currencyInfo.create_date,
        horaAtualizacao: horaFormatada,
        isLoading: false
      };
    }
  );
})
 }

 isLoading(index:number): boolean {
   this.conversorApiService.isLoading();
   return this.getCurrencies[index].isLoading;
 }

}
