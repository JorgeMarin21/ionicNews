import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interface';
import { LoadingController, IonSegment, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonContent, { static: false }) ionContent: IonContent;
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
  catTrans: any[] = [
    'general',
    'economía',
    'ciencia',
    'deportes',
    'salud',
    'tecnología',
    'entretenimiento'
  ];
  loading: any;
  category: any;
  hide = false;
  constructor(
    private noticiasServices: NoticiasService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.presentLoading('Cargando noticias').then(value => {
      this.category = this.categorias[0];
      this.getNews(this.category);
    }
    );
  }

  onClick(event) {
    this.ionContent.scrollToTop();
    this.hide = false;
    this.noticias = [];
    this.presentLoading('Cargando noticias').then(value => {
      this.category = event.detail.value;
      this.getNews(this.category);
    });
  }

  getNews(cat: string, event?) {
    this.noticiasServices.getCategories(cat).subscribe(
      resp => {
        if (resp.articles.length === 0) {
          this.hide = true;
        } else {
          this.noticias.push(...resp.articles);
        }
        this.loading.dismiss();

      });
    if (event) {
      event.target.complete();
    }
  }

  loadData(event) {
    this.getNews(this.category, event);
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
