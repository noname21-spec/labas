# Labas

L'app per l'Erasmus a Vilnius: checklist con scadenze e promemoria, valigia per l'inverno, budget e spese reali, corsi con conversione dei voti, orario, ripasso di inglese e lituano, diario con foto, documenti e contatti.

PWA statica servita da GitHub Pages: `https://noname21-spec.github.io/labas/`.

- `index.html`, `app.js`: l'app
- `sw.js`: funzionamento offline e promemoria delle scadenze
- `lib/`: Supabase JS 2.100.0 (MIT), Shrikhand e DM Sans (OFL), serviti dallo stesso sito

## Account e sincronizzazione

Usa lo stesso progetto Supabase di Viaticum, con dati separati:

- tabella `labas_data` (una riga per utente, protetta da RLS)
- bucket privato `labas` per foto e documenti, in una cartella per utente

In Supabase → Authentication → URL Configuration, tra i **Redirect URLs** deve esserci `https://noname21-spec.github.io/labas/`.
