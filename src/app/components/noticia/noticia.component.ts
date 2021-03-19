import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interface';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';



@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() new: Article;
  @Input() indice: number;
  @Input() enFavoritos;
  constructor(
    private inAppBrowser: InAppBrowser,
    public actionSheetController: ActionSheetController,
    public socialSharing: SocialSharing,
    private dataLocalService: DataLocalService
  ) { }

  ngOnInit() { }

  isImg(link: string) {
    return link.includes('http');
  }

  openNew() {
    // const browser = this.inAppBrowser.create(this.new.url);
    const browser = this.inAppBrowser.create(this.new.url, '_system');
    console.log('noticia link ->', this.new.url);
  }

  async dropMenu() {
    const actionSheet = await this.actionSheetController.create({
      translucent: true,
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.new.title,
            this.new.source.name,
            '',
            this.new.url
          );
        }
      },  
      {
        text: (!this.enFavoritos) ? 'Favorito' : 'Eliminar Favorito',
        icon: (!this.enFavoritos) ? 'heart' : 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
          (!this.enFavoritos) ? this.dataLocalService.guardarNoticia(this.new) :  this.dataLocalService.borrarNoticia(this.new);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
