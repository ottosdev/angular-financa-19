import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private count = 0;
  loading = signal(false);

  start() {
    this.count++;
    this.loading.set(true);
  }

  stop() {
    this.count--;
    if (this.count <= 0) {
      this.count = 0;
      this.loading.set(false);
    }
  }
}
