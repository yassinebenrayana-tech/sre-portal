# sre-portal

## ?? Description du Projet

**sre-portal** est un portail d'auto-service pour les équipes SRE (Site Reliability Engineer) et développeurs. Cette application Angular 21 permet la gestion, la provisionnement et la surveillance d'infrastructures cloud et on-premise en temps réel.

### Fonctionnalités principales :
- ?? Authentification par rôle (Développeur / SRE Admin)
- ?? Tableau de bord avec visualisation des métriques en temps réel
- ?? Inventaire d'infrastructure avec gestion des ressources
- ?? Provisionnement de nouvelles ressources
- ?? Chartes d'analyse CPU et mémoire
- ?? Recherche et filtrage des ressources

---

## ?? Comment Exécuter le Projet

### Prérequis :
- Node.js 18+
- npm 11.6.2+
- Angular CLI 21.2.4

### Étapes :

1. **Cloner le projet** :
`ash
git clone https://github.com/yassinebenrayana-tech/sre-portal.git
cd sre-portal
`

2. **Installer les dépendances** :
`ash
npm install
`

3. **Démarrer le serveur de développement** :
`ash
npm start
`

4. **Accéder à l'application** :
Ouvrez votre navigateur et allez à : **http://localhost:4200/**

5. **Arrêter le serveur** :
Appuyez sur Ctrl+C dans le terminal

---

## ?? Détails Techniques - 10 Points Clés

### 1?? **Directives Structurelles (@If et @For)**

Les directives structurelles sont utilisées dans **item-list.html** :

`html
<!-- @if directive dans item-list.html -->
<span class="count-badge error" *ngIf="filteredResources().filter(r => r.status === 'Error').length > 0">
  {{ filteredResources().filter(r => r.status === 'Error').length }} Error
</span>

<!-- @for directive : affichage des lignes du tableau -->
<table mat-table [dataSource]="filteredResources()">
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef>Resource Name</th>
    <td mat-cell *matCellDef="let r">
      <!-- Boucle sur chaque ressource "r" -->
      <div class="name-text">{{ r.name }}</div>
    </td>
  </ng-container>
</table>
`

**Où utilisée ?** Dans les composants ItemList et Dashboard pour afficher les listes et conditions.

---

### 2?? **Interpolation {{ }}**

L'interpolation est utilisée pour afficher les données dynamiques :

`html
<!-- dashboard.html - Affichage des ressources totales -->
<span class="kpi-value">{{ totalResources() }}</span>

<!-- item-list.html - Affichage du nombre de ressources filtrées -->
<span class="result-count">{{ filteredResources().length }} resource{{ filteredResources().length !== 1 ? 's' : '' }}</span>

<!-- login.html - Affichage du logo -->
<span class="logo-name">{{ 'SRE Hub' }}</span>
`

**Utilisation** : Affiche le résultat d'expressions TypeScript directement dans le HTML.

---

### 3?? **Property Binding [ ]**

La liaison de propriété est utilisée pour lier les données aux attributs HTML :

`html
<!-- dashboard.html - Liaison conditionnelle de classe -->
<div class="health-badge" 
     [class.healthy]="healthPercentage() >= 80" 
     [class.degraded]="healthPercentage() < 80 && healthPercentage() >= 50" 
     [class.critical]="healthPercentage() < 50">
  {{ healthPercentage() }}% Healthy
</div>

<!-- item-list.html - Liaison de valeur -->
[value]="searchQuery()"

<!-- dashboard.html - Liaison de classe dynamique -->
<span class="kpi-value" [class.error]="errorResources() > 0" [class.success]="errorResources() === 0">
  {{ errorResources() }}
</span>
`

**Utilisation** : Change dynamiquement les styles et attributs selon l'état de l'application.

---

### 4?? **Event Binding ( )**

La liaison d'événement capture les interactions utilisateur :

`html
<!-- login.html - Clic sur une carte de rôle -->
<div class="role-card fade-in-delay-1" (click)="login('Developer')">
  <h3>Developer</h3>
</div>

<!-- item-list.html - Saisie de texte pour la recherche -->
<input
  class="search-input"
  type="text"
  placeholder="Search..."
  (input)="onSearch($any($event.target).value)"
/>
`

**Utilisation** : Déclenche des actions TypeScript lorsque l'utilisateur interagit avec l'interface.

---

### 5?? **Two-Way Binding [(ngModel)]**

La liaison bidirectionnelle n'est **pas utilisée** dans ce projet. À la place, on utilise les **signaux Angular** (approach moderne) pour la réactivité :

`	ypescript
// Au lieu de [(ngModel)], on utilise des signaux :
searchQuery = signal('');  // Dans item-list.ts

filteredResources = computed(() => {
  const q = this.searchQuery().toLowerCase().trim();
  // Filtrage automatique quand searchQuery change
});
`

`html
<!-- On utilise l'event binding avec la propriété binding -->
<input
  [value]="searchQuery()"
  (input)="onSearch($any($event.target).value)"
/>
`

**Pourquoi pas [(ngModel)] ?** Parce qu'Angular 21 préfère les **Signals** pour une meilleure performance et réactivité.

---

### 6?? **Configuration du Routage**

La configuration du routage se trouve dans **src/app/app.routes.ts** :

`	ypescript
import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { ItemList } from './components/item-list/item-list'
import { ItemCreate } from './components/item-create/item-create';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'dashboard', component: Dashboard },
    { path: 'inventory', component: ItemList },
    { path: 'deploy', component: ItemCreate },
    { path: '', redirectTo: '/login', pathMatch: 'full' }  // Redirection par défaut
];
`

**Fonctionnement** :
- La route vide redirige vers /login
- Chaque route est mappée à un composant
- Utilisation du routing déclaratif avec standalone components

---

### 7?? **Nombre de Pages/Composants Connectés par le Routage**

**4 composants** sont connectés à travers le routage :

| Route | Composant | Description |
|-------|-----------|-------------|
| /login | Login | Page de connexion avec sélection de rôle |
| /dashboard | Dashboard | Tableau de bord de surveillance |
| /inventory | ItemList | Inventaire des ressources |
| /deploy | ItemCreate | Provisionnement de nouvelles ressources |

**Flux de navigation** :
`
Login ? Dashboard ? Inventory (liste des ressources)
     ?
     Deploy (créer nouvelles ressources)
`

Exemple de navigation dans le code :
`	ypescript
// login.ts
this.router.navigate(['/dashboard']);

// Dans les templates HTML
<a routerLink="/deploy">Provision New</a>
`

---

### 8?? **Affichage d'un Service**

Le service **AuthService** gère l'authentification :

`	ypescript
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
`

**Fichier** : src/app/services/auth.service.ts

---

### 9?? **Logique à l'Intérieur du Service**

Le service **InfrastructureService** contient la logique métier :

`	ypescript
@Injectable({ providedIn: 'root' })
export class InfrastructureService {
  resources = signal<Resource[]>([...]);
  
  // 1. Simulation de fluctuations de métriques en temps réel
  private fluctuateMetrics() {
    this.resources.update(res =>
      res.map(r => {
        if (r.status !== 'Online') return r;
        const cpu = Math.max(5, Math.min(99, r.cpuUsage + (Math.random() * 10 - 5)));
        const mem = Math.max(1, Math.min(32, r.memoryUsage + (Math.random() * 2 - 1)));
        return { ...r, cpuUsage: Math.round(cpu), memoryUsage: Math.round(mem * 10) / 10 };
      })
    );
  }

  // 2. Gestion des ressources : démarrage
  startResource(id: number): void {
    this.updateResourceStatus(id, 'Starting');
    setTimeout(() => {
      this.updateResourceStatus(id, 'Online');
      this.updateResourceMetrics(id, Math.floor(Math.random() * 50) + 10, ...);
    }, 2000);
  }

  // 3. Arrêt d'une ressource
  stopResource(id: number): void {
    this.updateResourceStatus(id, 'Stopping');
    setTimeout(() => {
      this.updateResourceStatus(id, 'Offline');
      this.updateResourceMetrics(id, 0, 0);
    }, 2000);
  }

  // 4. Suppression de ressource
  deleteResource(id: number): void {
    this.resources.update(res => res.filter(r => r.id !== id));
  }

  // 5. Ajout d'une nouvelle ressource
  addResource(resource: Omit<Resource, 'id'>): void {
    const newId = Math.max(...this.resources().map(r => r.id), 0) + 1;
    const newResource: Resource = { ...resource, id: newId };
    this.resources.update(res => [...res, newResource]);
  }
}
`

**Logique métier** :
- ? Gestion des ressources (CRUD)
- ? Simulation de métriques CPU/Mémoire en temps réel
- ? Transitions d'état (Starting ? Online ? Stopping ? Offline)
- ? Validation des limites (CPU: 5-99%, Mémoire: 1-32GB)

**Fichier** : src/app/services/infrastructure.service.ts

---

### ?? **Quel Composant Utilise le Service ?**

Le service **InfrastructureService** est utilisé par **2 composants** :

#### **1. Composant Dashboard** (dashboard.ts)
`	ypescript
export class Dashboard {
  private infrastructureService = inject(InfrastructureService);

  resources = this.infrastructureService.resources;
  
  totalResources = computed(() => this.resources().length);
  onlineResources = computed(() => 
    this.resources().filter(r => r.status === 'Online').length
  );
  
  cpuChartData = computed(() => 
    this.resources()
      .filter(r => r.status === 'Online')
      .map(r => ({ name: r.name, value: r.cpuUsage }))
  );
}
`
**Utilisation** : Affiche les KPIs, graphiques et statistiques en temps réel.

#### **2. Composant ItemList** (item-list.ts)
`	ypescript
export class ItemList {
  private infrastructureService = inject(InfrastructureService);
  
  allResources = this.infrastructureService.resources;
  
  filteredResources = computed(() => {
    const q = this.searchQuery().toLowerCase();
    return this.allResources().filter(r =>
      r.name.toLowerCase().includes(q)
    );
  });
}
`
**Utilisation** : Affiche la liste des ressources avec recherche et filtrage.

**Injection de dépendance** :
`	ypescript
private infrastructureService = inject(InfrastructureService);
`

---

## ?? Structure du Projet

`
sre-portal/
+-- src/
¦   +-- app/
¦   ¦   +-- components/
¦   ¦   ¦   +-- login/           # Composant de connexion
¦   ¦   ¦   +-- dashboard/       # Tableau de bord
¦   ¦   ¦   +-- item-list/       # Liste des ressources
¦   ¦   ¦   +-- item-create/     # Créer une ressource
¦   ¦   +-- services/
¦   ¦   ¦   +-- auth.service.ts      # Service d'authentification
¦   ¦   ¦   +-- infrastructure.service.ts  # Service d'infrastructure
¦   ¦   +-- models/
¦   ¦   ¦   +-- resource.model.ts    # Modèle de données
¦   ¦   +-- app.routes.ts        # Configuration du routage
¦   ¦   +-- app.ts              # Composant racine
¦   +-- main.ts                 # Point d'entrée
¦   +-- styles.scss             # Styles globaux
+-- package.json
+-- angular.json
+-- tsconfig.json
`

---

## ??? Scripts Disponibles

`ash
npm start           # Démarrer le serveur de développement
npm run build       # Compiler le projet pour la production
npm run watch       # Compiler en mode watch
npm test            # Exécuter les tests
npm run serve:ssr   # Serveur avec SSR (Server-Side Rendering)
`

---

## ?? Dépendances Principales

- **Angular 21.2.7** : Framework frontend
- **Angular Material 21.2.5** : Composants UI Material Design
- **Ngx-Charts 23.1.0** : Bibliothèque de graphiques
- **Express 5.1.0** : Serveur Node.js (pour SSR)
- **RxJS 7.8.0** : Programmation réactive

---

## ?? Points Techniques Importants

? **Standalone Components** : Tous les composants sont standalone: true  
? **Signals** : Utilisation des signaux Angular pour la réactivité  
? **Computed** : Propriétés calculées réactives  
? **Injection de dépendances** : Utilisation de inject()  
? **Material Design** : Interface moderne avec Angular Material  
? **Routage déclaratif** : Configuration simple et claire  
? **SCSS** : Styles avancés avec variables  

---

## ?? Licence

Ce projet est privé et appartient à l'équipe SRE.

---

**Auteur** : yassinebenrayana-tech  
**Dernier mise à jour** : Mai 2026
