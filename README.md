# toto DIANA

Web app statica e installabile per pronostici familiari sulla nascita di Diana.

## Funzioni

- Profili locali protetti da PIN (hash SHA-256 nel browser).
- Guida iniziale in tre passaggi, pensata anche per chi usa poco lo smartphone.
- Possibilità di registrare più giocate dallo stesso telefono per figli, nonni e ospiti senza account o installazione.
- Pronostici su data, ora, durata del parto, peso, lunghezza, meteo, reazioni familiari e categorie improbabili.
- Punteggio coerente con la giocata: prossimità per numeri e orari, risposta esatta per le categorie, bonus da 120 punti per il colpo di scena.
- Area amministratore locale, chiusura giocate, risultato reale, punteggi e podio.
- Backup JSON per trasferire manualmente i dati tra dispositivi.
- PWA offline e avvisi del browser sul dispositivo che registra la nascita.

## Limiti importanti

Questa build statica usa ancora il `localStorage` del singolo browser: la sincronizzazione condivisa richiede il collegamento Firebase descritto nel progetto di rilascio. Gli avvisi locali non sono push remoti e non raggiungono altri dispositivi.

## GitHub Pages

Pubblicare il contenuto della cartella sulla branch `main`, quindi in **Settings → Pages** scegliere **Deploy from a branch**, branch `main`, cartella `/ (root)`.

Per attivare la classifica comune tra telefoni, seguire [FIREBASE_SETUP.md](./FIREBASE_SETUP.md).
