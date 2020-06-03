import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  noticias: Article[] = [];
  hide = false;

  constructor(private noticiasService: NoticiasService) { }

  ngOnInit() {
    this.getNews();
  }
  loadData(event) {
    console.log(event);
    this.getNews(event);
  }
  getNews(event?) {
    this.noticiasService.getTopHeadLines().subscribe(respuesta => {
      console.log('Noticias mama: \n', respuesta);
      if (respuesta.articles.length > 0) {
        this.noticias.push(...respuesta.articles); // usado para  manejar cadauno de los objetos del arreglo de forma independitente
      } else {
        this.hide = true;
      }
      // // this.noticias = respuesta.articles; se sobreescribe
      // this.noticias.push(...respuesta.articles); // usado para  manejar cadauno de los objetos del arreglo de forma independitente
    });
    if (event) {
      event.target.complete();
    }
  }
}
