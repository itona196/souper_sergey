# 🧀 Souper du Jeudi à Sergey

Un petit site convivial en **Next.js** pour permettre aux habitants de **Sergey** de s’inscrire chaque semaine au souper du jeudi organisé par Esteban & Loan.

---

## 🚀 Fonctionnalités

- Formulaire d’inscription avec prénom uniquement  
- Envoi automatique d’un e-mail à chaque inscription (via [Resend](https://resend.com))  
- Fermeture automatique des inscriptions **le jeudi à 00h00**  
- Interface élégante avec fond animé (effet "nuit & lucioles") ✨  
- Compatible mobile et desktop

---

## 🛠️ Technologies

- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Resend API](https://resend.com/)
- [date-fns](https://date-fns.org/)

---

## ⚙️ Installation

Clone le projet :

```bash
git clone https://github.com/itona196/souper_sergey.git
cd souper_sergey
```

Installe les dépendances :

```bash
npm install
```

Crée un fichier `.env.local` à la racine avec ta clé Resend :

```bash
RESEND_API_KEY=ta_cle_resend
```

Lance le serveur local :

```bash
npm run dev
```

Le site est disponible sur :
👉 [http://localhost:3000](http://localhost:3000)

---

## 🌐 Déploiement

Tu peux héberger le projet sur :
- [Infomaniak App Hosting](https://www.infomaniak.com/fr/hosting/web)
- ou [Vercel](https://vercel.com/) (config automatique pour Next.js)

Pense à définir ta clé `RESEND_API_KEY` dans les **variables d’environnement** de ta plateforme d’hébergement.

---

## 🧑‍💻 Auteurs

Projet réalisé avec ❤️ par **Esteban & Loan**  
> “Jeudi soir – Lumières, rires & convivialité 🌙”
