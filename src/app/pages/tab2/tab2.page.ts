import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interface';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  noticias: Article[] = [];
  categorias: any[] = [
    'general',
    'business',
    'science',
    'sports',
    'health',
    'technology',
    'entertainment'
  ];
  loading: any;

  constructor(
    private noticiasServices: NoticiasService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.presentLoading('Cargando noticias');
    this.getNews(this.categorias[0]);
  }

  onClick(event) {
     this.noticias = [];
     this.presentLoading('Cargando noticias');
     const cat = event.detail.value;
     this.getNews(cat);
  }

  getNews(cat: string) {
    this.noticiasServices.getCategories(cat).subscribe(
      resp => {
        this.noticias = resp.articles;
        this.loading.dismiss();
      });
  }

  async presentLoading(message: string) {
     this.loading = await this.loadingCtrl.create({
      message
    });
     return this.loading.present();

    // const { role, data } = await this.loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }
}
