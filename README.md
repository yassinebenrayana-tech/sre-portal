# SRE Portal - Portail d'Auto-Service Infrastructure

## 🎯 Description du Projet

**SRE Portal** est une plateforme d'auto-service moderne conçue pour les équipes **Site Reliability Engineering (SRE)** et les développeurs. Construite avec **Angular 21** et **Material Design**, cette application permet la gestion complète du cycle de vie des infrastructures cloud et on-premise.

### 📋 Objectif Principal
Fournir un portail self-service qui démocratise l'accès aux ressources d'infrastructure tout en maintenant les standards SRE, la sécurité et la traçabilité des déploiements.

### 👥 Utilisateurs Cibles
- **Développeurs** : Provisionnement et monitoring de ressources pour leurs projets
- **SRE Admins** : Gestion complète de la plateforme et supervision des déploiements

---

## ✨ Fonctionnalités Principales

### 🔐 Authentification et Autorisation
- **Connexion par rôle** : Sélection simple entre "Developer" et "SRE Admin"
- **Contrôle d'accès basé sur les rôles (RBAC)** : Permissions granulaires selon le profil utilisateur
- **Session persistante** : Maintien de la session utilisateur pendant la navigation

### 📊 Tableau de Bord Intelligent
- **Métriques en temps réel** : Visualisation des ressources actives, en erreur, hors ligne
- **Graphiques interactifs** : Charts CPU/Mémoire avec ngx-charts
- **Indicateurs de santé** : Pourcentage de disponibilité des services
- **Navigation fluide** : Accès rapide aux différentes sections

### 📋 Gestion d'Inventaire
- **Vue d'ensemble complète** : Liste paginée de toutes les ressources déployées
- **Recherche avancée** : Filtrage par nom, type, région ou statut
- **Informations détaillées** : CPU, RAM, localisation, statut opérationnel
- **Actions contextuelles** : Démarrage/arrêt des ressources selon leur état

### 🚀 Provisionnement de Ressources
- **Formulaire guidé** : Processus en 3 étapes pour le déploiement
- **Standards de nommage SRE** : Validation automatique des conventions (prod/dev/test)
- **Choix de configuration** : Type de ressource, région, taille de compute
- **Prévisualisation** : Aperçu avant déploiement avec estimation des ressources

### 🏗️ Types de Ressources Supportés
- **Clusters Kubernetes** : Pour les applications conteneurisées
- **Bases PostgreSQL** : Bases de données relationnelles managées
- **Machines Virtuelles** : Serveurs génériques pour workloads variés

### 🌍 Régions Disponibles
- **AWS-Paris** : Région Europe de l'Ouest
- **Azure-London** : Région Europe du Nord
- **GCP-Frankfurt** : Région Europe Centrale
- **On-Premise** : Infrastructure locale

---

## 🖼️ Captures d'Écran

### Instructions pour ajouter les captures d'écran :
1. **Démarrer l'application** : `npm start`
2. **Naviguer vers chaque page** et prendre des captures d'écran
3. **Enregistrer les images** dans le dossier `screenshots/` avec les noms suivants :
   - `login.png` - Page de connexion
   - `dashboard.png` - Tableau de bord
   - `inventory.png` - Inventaire des ressources
   - `deploy.png` - Formulaire de provisionnement

### 1. Page de Connexion
![Page de Connexion](screenshots/login.png)
*Sélection du rôle utilisateur pour accéder au portail. Interface intuitive avec description des permissions pour chaque rôle.*

### 2. Tableau de Bord
![Tableau de Bord](screenshots/dashboard.png)
*Vue d'ensemble des métriques infrastructure : nombre de ressources, utilisation CPU/Mémoire, graphiques interactifs et indicateurs de santé.*

### 3. Inventaire des Ressources
![Inventaire](screenshots/inventory.png)
*Liste complète des ressources déployées avec recherche, filtrage et actions de gestion (démarrage/arrêt) selon le statut.*

### 4. Provisionnement de Ressources
![Provisionnement](screenshots/deploy.png)
*Formulaire de déploiement en 3 étapes : identité, configuration et taille. Validation des standards SRE et prévisualisation avant déploiement.*

---

## 🛠️ Architecture Technique

### Technologies Utilisées
- **Frontend** : Angular 21 (Signals, Standalone Components)
- **UI/UX** : Angular Material + Material Icons
- **Graphiques** : ngx-charts (basé sur D3.js)
- **Styling** : SCSS avec thème Material Design
- **Routing** : Angular Router avec composants standalone
- **Forms** : Reactive Forms avec validation personnalisée

### Structure des Composants
```
src/app/
├── components/
│   ├── login/           # Authentification par rôle
│   ├── dashboard/       # Métriques et visualisations
│   ├── item-list/       # Inventaire des ressources
│   └── item-create/     # Provisionnement
├── models/
│   └── resource.model.ts # Interface des ressources
├── services/
│   ├── auth.service.ts      # Gestion des utilisateurs
│   └── infrastructure.service.ts # Gestion des ressources
└── app.routes.ts        # Configuration du routage
```

### Modèle de Données
```typescript
interface Resource {
  id: number;
  name: string;
  type: 'Kubernetes Cluster' | 'PostgreSQL' | 'Virtual Machine';
  status: 'Online' | 'Offline' | 'Deploying' | 'Error' | 'Starting' | 'Stopping';
  cpuUsage: number; // en %
  memoryUsage: number; // en GB
  location: string; // ex: 'AWS-Paris', 'Azure-London'
}
```

### Patterns Architecturaux
- **Composants Standalone** : Indépendance et réutilisabilité
- **Services Injectables** : Logique métier centralisée
- **Signals Angular** : Réactivité moderne (remplace NgRx pour la simplicité)
- **Reactive Forms** : Validation et gestion d'état des formulaires

---

## 🎯 Standards SRE Implémentés

### Nommage des Ressources
- **Format** : `{environment}-{descriptive-name}`
- **Environnements** : `prod`, `dev`, `test`, `staging`
- **Validation** : Regex appliquée côté client et serveur

### Observabilité
- **Métriques temps réel** : CPU, mémoire, statut
- **Visualisations** : Graphiques interactifs avec ngx-charts
- **Alertes** : Indicateurs visuels pour les ressources en erreur

### Sécurité
- **RBAC** : Contrôle d'accès basé sur les rôles
- **Validation** : Sanitisation et validation des entrées
- **Audit** : Traçabilité des actions utilisateur

---

## 🚀 Comment Exécuter le Projet

### Prérequis
- **Node.js** 18+
- **npm** 11.6.2+
- **Angular CLI** 21.2.4

### Installation et Démarrage

1. **Cloner le dépôt** :
```bash
git clone https://github.com/yassinebenrayana-tech/sre-portal.git
cd sre-portal
```

2. **Installer les dépendances** :
```bash
npm install --legacy-peer-deps
```

3. **Démarrer le serveur de développement** :
```bash
npm start
```

4. **Accéder à l'application** :
Ouvrez votre navigateur à l'adresse : **http://localhost:4200/**

5. **Arrêter le serveur** :
Utilisez `Ctrl+C` dans le terminal

---

## 📖 Concepts Angular Illustrés

### 1. Directives Structurelles (@if et @for)
```html
<!-- Condition d'affichage dans dashboard.html -->
@if (errorResources() > 0) {
  <span class="error-badge">{{ errorResources() }} erreurs</span>
}

<!-- Boucle dans item-list.html -->
@for (resource of filteredResources(); track resource.id) {
  <tr class="resource-row">
    <td>{{ resource.name }}</td>
    <!-- ... autres colonnes -->
  </tr>
}
```

### 2. Interpolation {{ }}
```html
<!-- Affichage dynamique des métriques -->
<span class="metric-value">{{ totalResources() }}</span>
<span class="health-percentage">{{ healthPercentage() }}%</span>
```

### 3. Property Binding [ ]
```html
<!-- Liaison de classe conditionnelle -->
<div class="status-indicator"
     [class.online]="resource.status === 'Online'"
     [class.error]="resource.status === 'Error'">
  {{ resource.status }}
</div>

<!-- Liaison de valeur de formulaire -->
<input [value]="searchQuery()" (input)="onSearch($event)" />
```

### 4. Event Binding ( )
```html
<!-- Gestion des clics -->
<button (click)="startResource(resource.id)">Démarrer</button>
<button (click)="stopResource(resource.id)">Arrêter</button>

<!-- Gestion des changements de formulaire -->
<select (selectionChange)="onTypeChange($event.value)">
  <option value="kubernetes">Kubernetes Cluster</option>
</select>
```

### 5. Signals Angular (Réactivité Moderne)
```typescript
// Signaux pour l'état réactif
resources = signal<Resource[]>([]);
searchQuery = signal('');

// Computed pour les calculs dérivés
filteredResources = computed(() => {
  const query = this.searchQuery().toLowerCase();
  return this.resources().filter(r =>
    r.name.toLowerCase().includes(query)
  );
});
```

### 6. Reactive Forms
```typescript
// Formulaire de provisionnement
provisionForm = this.fb.group({
  name: ['', [Validators.required, this.namingValidator]],
  type: ['Kubernetes Cluster', Validators.required],
  location: ['AWS-Paris', Validators.required],
  size: ['small', Validators.required]
});
```

---

## 🎨 Design System

### Thème Material Design
- **Palette de couleurs** : Bleu primaire (#1976d2), accents verts/rouges pour les statuts
- **Typographie** : Roboto avec hiérarchie claire (h1-h6)
- **Composants** : Cards, boutons, tableaux, formulaires Material
- **Icônes** : Material Icons pour la cohérence visuelle

### Responsive Design
- **Mobile-first** : Adaptation automatique aux écrans mobiles
- **Breakpoints** : Support tablette et desktop
- **Navigation** : Optimisée pour le tactile

---

## 🔧 Scripts Disponibles

```json
{
  "start": "ng serve",           // Serveur de développement
  "build": "ng build",           // Build de production
  "watch": "ng build --watch",   // Build avec watch
  "test": "ng test",             // Tests unitaires
  "serve:ssr": "node dist/sre-portal/server/server.mjs"  // SSR
}
```

---

## 📊 Métriques et Monitoring

### Indicateurs Clés
- **Disponibilité** : Pourcentage de ressources opérationnelles
- **Performance** : Utilisation CPU/Mémoire moyenne
- **État des services** : Comptage par statut (Online/Error/Offline)
- **Temps de déploiement** : Estimation 1-2 minutes par ressource

### Visualisations
- **Graphiques en barres** : Utilisation CPU par ressource
- **Graphiques linéaires** : Utilisation mémoire
- **Camembert** : Répartition des statuts
- **Cartes KPI** : Métriques principales en évidence

---

## 🚀 Déploiement

### Build de Production
```bash
npm run build
```

### Serveur SSR (Server-Side Rendering)
```bash
npm run serve:ssr
```

### Docker
```dockerfile
# Stage 1: Build
FROM node:latest AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Stage 2: Serve avec Nginx
FROM nginx:alpine
COPY --from=build /app/dist/sre-portal/browser /usr/share/nginx/html
EXPOSE 80
```

**Démarrage du conteneur :**
```bash
docker build -t sre-portal .
docker run -p 80:80 sre-portal
```

---

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👨‍💻 Auteur

**Yassine Ben Rayana**
- GitHub: [@yassinebenrayana-tech](https://github.com/yassinebenrayana-tech)
- LinkedIn: [Yassine Ben Rayana](https://linkedin.com/in/yassinebenrayana)

---

*Construit avec ❤️ utilisant Angular 21 et les meilleures pratiques SRE*

### 1. Directives Structurelles (@If et @For)

Les directives structurelles sont utilisées dans **item-list.html** :

```html
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
```

**Où utilisée ?** Dans les composants ItemList et Dashboard pour afficher les listes et conditions.

---

### 2. Interpolation {{ }}

L'interpolation est utilisée pour afficher les données dynamiques :

```html
<!-- dashboard.html - Affichage des ressources totales -->
<span class="kpi-value">{{ totalResources() }}</span>

<!-- item-list.html - Affichage du nombre de ressources filtrées -->
<span class="result-count">{{ filteredResources().length }} resource{{ filteredResources().length !== 1 ? 's' : '' }}</span>

<!-- login.html - Affichage du logo -->
<span class="logo-name">{{ 'SRE Hub' }}</span>
```

**Utilisation** : Affiche le résultat d'expressions TypeScript directement dans le HTML.

---

### 3. Property Binding [ ]

La liaison de propriété est utilisée pour lier les données aux attributs HTML :

```html
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
```

**Utilisation** : Change dynamiquement les styles et attributs selon l'état de l'application.

---

### 4. Event Binding ( )

La liaison d'événement capture les interactions utilisateur :

```html
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
```

**Utilisation** : Déclenche des actions TypeScript lorsque l'utilisateur interagit avec l'interface.

---

### 5. Two-Way Binding [(ngModel)]

La liaison bidirectionnelle n'est **pas utilisée** dans ce projet. À la place, on utilise les **signaux Angular** (approach moderne) pour la réactivité :

```typescript
// Au lieu de [(ngModel)], on utilise des signaux :
searchQuery = signal('');  // Dans item-list.ts

filteredResources = computed(() => {
  const q = this.searchQuery().toLowerCase().trim();
  // Filtrage automatique quand searchQuery change
});
```

```html
<!-- On utilise l'event binding avec la propriété binding -->
<input
  [value]="searchQuery()"
  (input)="onSearch($any($event.target).value)"
/>
```

**Pourquoi pas [(ngModel)] ?** Parce qu'Angular 21 préfère les **Signals** pour une meilleure performance et réactivité.

---

### 6. Configuration du Routage

La configuration du routage se trouve dans **src/app/app.routes.ts** :

```typescript
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
```

**Fonctionnement** :
- La route vide redirige vers `/login`
- Chaque route est mappée à un composant
- Utilisation du routing déclaratif avec `standalone` components

---

### 7. Nombre de Pages/Composants Connectés par le Routage

**4 composants** sont connectés à travers le routage :

| Route | Composant | Description |
|-------|-----------|-------------|
| `/login` | `Login` | Page de connexion avec sélection de rôle |
| `/dashboard` | `Dashboard` | Tableau de bord de surveillance |
| `/inventory` | `ItemList` | Inventaire des ressources |
| `/deploy` | `ItemCreate` | Provisionnement de nouvelles ressources |

**Flux de navigation** :
```
Login → Dashboard → Inventory (liste des ressources)
     ↓
     Deploy (créer nouvelles ressources)
```

Exemple de navigation dans le code :
```typescript
// login.ts
this.router.navigate(['/dashboard']);

// Dans les templates HTML
<a routerLink="/deploy">Provision New</a>
```

---

### 8. Affichage d'un Service

Le service **AuthService** gère l'authentification :

```typescript
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
```

**Fichier** : `src/app/services/auth.service.ts`

---

### 9. Logique à l'Intérieur du Service

Le service **InfrastructureService** contient la logique métier :

```typescript
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
```

**Logique métier** :
- Gestion des ressources (CRUD)
- Simulation de métriques CPU/Mémoire en temps réel
- Transitions d'état (Starting → Online → Stopping → Offline)
- Validation des limites (CPU: 5-99%, Mémoire: 1-32GB)

**Fichier** : `src/app/services/infrastructure.service.ts`

---

### 10. Quel Composant Utilise le Service ?

Le service **InfrastructureService** est utilisé par **2 composants** :

#### **1. Composant Dashboard** (dashboard.ts)
```typescript
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
```
**Utilisation** : Affiche les KPIs, graphiques et statistiques en temps réel.

#### **2. Composant ItemList** (item-list.ts)
```typescript
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
```
**Utilisation** : Affiche la liste des ressources avec recherche et filtrage.

**Injection de dépendance** :
```typescript
private infrastructureService = inject(InfrastructureService);
```

---

## Structure du Projet

```
sre-portal/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── login/           # Composant de connexion
│   │   │   ├── dashboard/       # Tableau de bord
│   │   │   ├── item-list/       # Liste des ressources
│   │   │   └── item-create/     # Créer une ressource
│   │   ├── services/
│   │   │   ├── auth.service.ts      # Service d'authentification
│   │   │   └── infrastructure.service.ts  # Service d'infrastructure
│   │   ├── models/
│   │   │   └── resource.model.ts    # Modèle de données
│   │   ├── app.routes.ts        # Configuration du routage
│   │   └── app.ts              # Composant racine
│   ├── main.ts                 # Point d'entrée
│   └── styles.scss             # Styles globaux
├── package.json
├── angular.json
└── tsconfig.json
```

---

## Scripts Disponibles

```bash
npm start           # Démarrer le serveur de développement
npm run build       # Compiler le projet pour la production
npm run watch       # Compiler en mode watch
npm test            # Exécuter les tests
npm run serve:ssr   # Serveur avec SSR (Server-Side Rendering)
```

---

## Dépendances Principales

- **Angular 21.2.7** : Framework frontend
- **Angular Material 21.2.5** : Composants UI Material Design
- **Ngx-Charts 23.1.0** : Bibliothèque de graphiques
- **Express 5.1.0** : Serveur Node.js (pour SSR)
- **RxJS 7.8.0** : Programmation réactive

---

## Points Techniques Importants

- **Standalone Components** : Tous les composants sont `standalone: true`
- **Signals** : Utilisation des signaux Angular pour la réactivité
- **Computed** : Propriétés calculées réactives
- **Injection de dépendances** : Utilisation de `inject()`
- **Material Design** : Interface moderne avec Angular Material
- **Routage déclaratif** : Configuration simple et claire
- **SCSS** : Styles avancés avec variables

---

## Licence

Ce projet est privé et appartient à l'équipe SRE.

---

**Auteur** : yassinebenrayana-tech  
**Dernière mise à jour** : Mai 2026
