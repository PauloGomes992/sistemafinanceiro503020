import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export interface ErrorDialogData {
  title: string;
  message: string;
  details?: string;
}

export interface SuccessDialogData {
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  confirm(data: ConfirmDialogData): Observable<boolean> {
    if (!this.isBrowser) {
      return of(true);
    }

    const result = confirm(`${data.title}\n\n${data.message}`);
    return of(result);
  }

  showError(data: ErrorDialogData): Observable<void> {
    if (!this.isBrowser) {
      return of(undefined);
    }

    alert(`❌ ${data.title}\n\n${data.message}${data.details ? '\n\nDetalhes: ' + data.details : ''}`);
    return of(undefined);
  }

  showSuccess(data: SuccessDialogData): Observable<void> {
    if (!this.isBrowser) {
      return of(undefined);
    }

    alert(`✅ ${data.title}\n\n${data.message}`);
    return of(undefined);
  }

  quickConfirm(title: string, message: string): Observable<boolean> {
    return this.confirm({ title, message });
  }

  quickError(title: string, message: string, details?: string): Observable<void> {
    return this.showError({ title, message, details });
  }

  quickSuccess(title: string, message: string): Observable<void> {
    return this.showSuccess({ title, message });
  }
}
