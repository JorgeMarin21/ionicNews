import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/interface';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(
    private storage : Storage,
    public toastController: ToastController
  ) { 
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
      this.presentToast('La noticia se ha agregado a favoritos con éxito');
    }
  }
  borrarNoticia (noticia: Article) {
    this. noticias = this.noticias.filter( noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
    this.presentToast('La noticia se ha eliminado de favoritos con éxito');
  }
  async cargarFavoritos () {
    const favorites = await this.storage.get('favoritos');
    if (favorites){
      this.noticias = favorites;
    }
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}
