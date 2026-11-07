# 🎀 Totò Diana

Web app mobile-first per il gioco di famiglia: pronostici su data, ora, peso e lunghezza, classifica automatica dopo la nascita, installabile come PWA.

## Pubblicazione su GitHub Pages
1. Crea un repository pubblico su GitHub, per esempio `toto-diana`.
2. Carica **tutti** i file della cartella nella radice del repository.
3. In **Settings → Pages**, seleziona **Deploy from a branch**, `main`, `/ (root)` e salva.
4. Apri l'indirizzo Pages mostrato da GitHub. Prima di configurare Firebase vedrai la demo grafica.

## Attivare i pronostici condivisi (Firebase)
1. Su https://console.firebase.google.com crea un progetto, registra una **Web app**, copia la configurazione in `config.js`.
2. Abilita **Authentication → Sign-in method → Anonymous** per i giocatori e **Email/Password** per l'amministratore. Crea l'utente amministratore in **Authentication → Users**.
3. Crea il database **Cloud Firestore** in modalità produzione.
4. In `firestore.rules`, sostituisci `SOSTITUISCI_EMAIL_ADMIN` con l'email amministratore, poi incolla le regole in **Firestore → Rules** e pubblicale.
5. Fai commit di `config.js` e ricarica GitHub Pages.
6. In **Admin** inserisci la password Firebase dell'amministratore nel campo PIN, premi Sblocca e inserisci l'email quando richiesta. Il campo è chiamato PIN per semplicità, ma richiede la vera password dell'account Firebase.

## Importante: limiti attuali
- **Notifiche push**: `sw.js` contiene già il gestore degli eventi push, ma **non esiste ancora una sottoscrizione push né un server che invii le notifiche**. Il pulsante notifiche mostra solo una notifica locale di prova. Per avvisare i partecipanti a sito chiuso serve configurare Firebase Cloud Messaging (o Web Push VAPID), salvare le sottoscrizioni e creare una Cloud Function che invii il messaggio quando `settings/game.birth` viene pubblicato. GitHub Pages da solo non può inviare push automatiche.
- **Privacy**: nomi e classifica sono visibili pubblicamente; evita cognomi e dati sensibili. Per consenso e trattamento dati aggiungi un'informativa adeguata prima della diffusione.
- **Anti-doppione**: una previsione per account anonimo/browser, non per persona. Cambiando browser si può inviare un altro pronostico. Per un controllo rigoroso servono inviti personali o login.
- **Regole punteggio**: massimo 100 punti: 40 per vicinanza temporale (−2 per ogni ora di differenza), 30 per peso (−1 ogni 50 g), 30 per lunghezza (−5 per cm). A parità di punti, il risultato resta pari merito; il primo viene mostrato prima senza spareggio.
- **Sicurezza**: Firebase config è pubblica per definizione; non inserire password o chiavi server nel repository. La protezione dei dati è affidata alle regole Firestore.
