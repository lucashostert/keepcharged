import { Component, OnInit } from '@angular/core';
import { MapOptions, MapOptionsClusterOptionsIcons } from '../../../../models/MapOptions';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-mapa-opcoes',
  templateUrl: './mapa-opcoes.component.html',
  styleUrls: ['./mapa-opcoes.component.scss']
})
export class MapaOpcoesComponent implements OnInit {
  public showpreloader = false;
  public mapOptions: MapOptions;
  public mapOptionsIcons: MapOptionsClusterOptionsIcons;
  public mapTypes: string[];

  public constructor() {
    this.mapOptions = new MapOptions();
    this.mapTypes = this.mapOptions.getTypes();
    this.mapOptionsIcons = new MapOptionsClusterOptionsIcons();
  }

  public ngOnInit() {
  }

  public showInputError(field: NgModel) {
    return field.invalid && (field.touched);
  }

  public save() {
  }
}
