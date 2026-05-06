import { Injectable, signal } from '@angular/core';

export type Role = 'Developer' | 'SRE Admin' | null;

export interface User {
  username: string;
  role: Role;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<User | null>(null);

  login(username: string, role: Role) {
    this.currentUser.set({ username, role });
  }

  logout() {
    this.currentUser.set(null);
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  hasRole(role: Role): boolean {
    return this.currentUser()?.role === role;
  }
}
