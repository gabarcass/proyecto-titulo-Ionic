import { Injectable } from '@angular/core';
/* import { AngularFireStorage } from 'angularfire2/storage';
 */import { finalize, buffer } from 'rxjs/operators';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {
  url
  myphoto
  constructor(private camera: Camera,/*  private afStorage: AngularFireStorage */) { }


  choose() {
    const option: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
    this.camera.getPicture(option).then((ImageData) => {
      this.myphoto = 'data:image/jpeg:base64,' + ImageData;
    }, (error) => {
      console.log(error)
      console.log("hola")
    })

  }
  upload(buffer, name) {
    let blob = new Blob([buffer], { type: "image/jpeg" })

    /* let key = 'archivo' + Math.floor(Math.random() * 10000000);
    let ruta = '/' + 'tutor' + '/' + key
    */
    /*    this.afStorage.ref('tutor' + name).put(blob).then((d) => {
         alert("Done")
       }).catch((error) => {
         alert("error")
       }) */

  }
  /*  const subidaTask = this.afStorage.upload(ruta, file)
   subidaTask.snapshotChanges().pipe(
     finalize(() =>
       this.afStorage.ref(ruta).getDownloadURL().subscribe(ref => {
         this.url = ref
       }))
   )
 }*/

}
