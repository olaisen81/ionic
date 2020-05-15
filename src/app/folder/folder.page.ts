import { Component, OnInit } from '@angular/core';
import { NotificaDto } from '../models/dto';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  listTestObj: NotificaDto[];
  listaNotifiche: NotificaDto[];
  constructor() { }

  ngOnInit() {
    this.initList();
    this.listaNotifiche = [];
    Storage.get({ key: "listTestObj" }).then(res => {
      this.listaNotifiche = JSON.parse(res.value);
    })

  }


  async initList() {
    this.listTestObj = [];
    for (let index = 0; index < 50; index++) {
      let obj: NotificaDto = new NotificaDto();
      obj.Title = "Title" + index;
      obj.Body = "Body" + index;
      this.listTestObj.push(obj);

    }

    await Storage.set({
      key: 'listTestObj',
      value: JSON.stringify(this.listTestObj)
    });

  }

  doRefresh(event) {
    Storage.get({ key: "listTestObj" }).then(res => {
      this.listaNotifiche = JSON.parse(res.value);
      event.target.complete();
    })
  }

}

