# Classifica condivisa con Firebase

Questi file sono già predisposti:

- `firebase-config.js`: configurazione del progetto web.
- `firebase-sync.js`: accesso anonimo dei partecipanti, sincronizzazione delle giocate e stato pubblico.
- `firestore.rules`: lettura condivisa, modifica della propria giocata e risultato riservato all’admin.

## Configurazione

1. Creare un progetto Firebase personale sul piano gratuito Spark, senza Google Analytics.
2. Aggiungere una Web App e copiare la configurazione in `firebase-config.js`; impostare `enabled: true`.
3. In Authentication, abilitare **Anonimo** e **Google**.
4. Creare Firestore in modalità produzione.
5. Pubblicare le regole contenute in `firestore.rules`.
6. In Authentication → Settings → Authorized domains, aggiungere il dominio GitHub Pages.

Prima di pubblicare le regole, sostituire `REPLACE_WITH_ADMIN_FIREBASE_UID` con l’UID Firebase dell’account Google privato scelto. Il repository pubblico non deve contenere l’indirizzo email personale.

La configurazione web Firebase non sostituisce le regole di sicurezza: non pubblicare mai service-account key o altre credenziali server nel repository.
