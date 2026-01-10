import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
private lastUrl: string | null = null;

  setLastUrl(url: string) {
    this.lastUrl = url;
    // Or optionally: sessionStorage.setItem('lastUrl', url);
  }

  getLastUrl(): string | null {
    return this.lastUrl;
    // Or: return sessionStorage.getItem('lastUrl');
  }

  clear() {
    this.lastUrl = null;
    // Or: sessionStorage.removeItem('lastUrl');
  }
}
