import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage : Storage) { 
    this.storage.create().then(() => {});
    this.cargarFavoritos();
   }

  guardarNoticia (noticia: Article) {
    const exist = this.noticias.find(noti => noti.title === noticia.title);
    if (exist) {
      console.log('ya existe esa noticia');
    } else {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
    }
  }
  async cargarFavoritos () {
    const favorites = await this.storage.get('favoritos');
    if (favorites){
      this.noticias = favorites;
    }
  }
}
