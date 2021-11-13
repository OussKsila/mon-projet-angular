import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppareilService {
  constructor(private httpClient: HttpClient) {}
  appareilSubject = new Subject<any[]>();
  private appareils = [];

  emitAppareilSubject() {
    this.appareilSubject.next(this.appareils.slice());
  }
  getAppareilById(id: number) {
    const appareil = this.appareils.find((appareilObject) => {
      return appareilObject.id === id;
    });
    return appareil;
  }
  switchOnAll() {
    for (let appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  }

  switchOffAll() {
    for (let appareil of this.appareils) {
      appareil.status = 'éteint';
    }
    this.emitAppareilSubject();
  }

  switchOnOne(index: number) {
    this.appareils[index].status = 'allumé';
    this.emitAppareilSubject();
  }

  switchOffOne(index: number) {
    this.appareils[index].status = 'éteint';
    this.emitAppareilSubject();
  }
  AddAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: '',
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[this.appareils.length - 1].id + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }
  saveAppareilToServeur() {
    this.httpClient
      .put('adresseFirebase/appareils.json', this.appareils)
      .subscribe(
        () => {
          console.log('Enregistrement terminé');
        },
        (erreur) => {
          console.log('Erreur de sauvegarde ! ' + erreur);
        }
      );
  }

  getAppareilsFromServeur() {
    this.httpClient.get<any[]>('adresseFirebase/appareils.json').subscribe(
      (response) => {
        this.appareils = response;
        this.emitAppareilSubject();
      },
      (erreur) => {
        console.log('Erreur de chargement ! ' + erreur);
      }
    );
  }
}
