import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  
  private modals: { [key: string]: boolean } = {};

  constructor() {}

  // Mostrar modal por nombre
  showModal(modalName: string): void {
    this.modals[modalName] = true;
  }

  // Ocultar modal por nombre
  hideModal(modalName: string): void {
    this.modals[modalName] = false;
  }

  // Verificar si un modal está visible
  isModalVisible(modalName: string): boolean {
    return !!this.modals[modalName];
  }
}
