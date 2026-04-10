# Documento requisiti — Web app operativa per commesse infissi e post-vendita

**Autore:** Manus AI  
**Stato:** Documento dei Requisiti Aggiornato e Ottimizzato  
**Obiettivo del documento:** Definire in modo condivisibile e dettagliato il perimetro funzionale, operativo e di esperienza utente della web app, integrando i nuovi requisiti di gestione avanzata (Microsoft To Do, Google Calendar), l'evoluzione del modulo di rilievo multimediale e l'ottimizzazione della logica complessiva centrata sul cliente.

## 1. Visione del prodotto

L'applicazione proposta è una **web app professionale per la gestione operativa di commesse edili e serramentistiche**, progettata per accompagnare l'intero ciclo di vita della commessa dal rilievo iniziale fino al post-vendita. Il valore del prodotto non è commerciale o orientato alla generazione di nuovi clienti, ma strettamente **operativo, documentale e organizzativo**.

L'obiettivo centrale è creare un unico ambiente digitale in cui ufficio, tecnici di rilievo, squadre di posa e assistenza possano lavorare su informazioni coerenti, aggiornate e tracciabili. La web app deve quindi ridurre errori di passaggio tra rilievo, ordine, posa, chiusura lavori e assistenza, migliorando qualità esecutiva, controllo della documentazione e tempi di risposta.

L'applicazione deve inoltre fungere da hub centralizzato, in grado di comunicare fluidamente con strumenti esterni consolidati. In particolare, si richiede l'integrazione con **Microsoft To Do** per la gestione capillare dei task operativi e con **Google Calendar** per la pianificazione degli appuntamenti, ottimizzando il lavoro di squadra senza stravolgere le abitudini aziendali.

Dal punto di vista d'uso, il prodotto deve funzionare in modo naturale in due contesti diversi ma complementari. In cantiere deve essere rapido, resistente alla complessità operativa e facilmente utilizzabile da smartphone, consentendo l'acquisizione di media ricchi (foto, video, note vocali). In ufficio deve offrire una lettura estesa delle commesse, strumenti di pianificazione, controllo e un'anagrafica cliente a 360 gradi.

## 2. Obiettivi di business e operativi

Il prodotto dovrà consentire all'azienda di standardizzare il lavoro operativo, limitare le informazioni non strutturate disperse tra chat e file separati, e costruire uno storico affidabile.

| Ambito | Obiettivo |
|---|---|
| Rilievo | Rendere il rilievo completo, tecnico ma intuitivo, con supporto multimediale avanzato (foto e video) |
| Posa | Guidare l'esecuzione con checklist e raccolta evidenze obbligatorie |
| Chiusura lavori | Formalizzare la consegna con verbale, firma e dossier automatico |
| Post-vendita | Organizzare ticket, difetti, garanzie e storico interventi |
| Coordinamento operativo | Pianificare appuntamenti e task integrandosi bidirezionalmente con To Do e Calendar |
| Controllo manageriale | Evidenziare anomalie ricorrenti, tempi medi e commesse critiche |
| Gestione Cliente | Centralizzare tutte le commesse, gli interventi e i documenti sotto un'unica anagrafica cliente |

## 3. Nuova Logica Applicativa: Centralità del Cliente

L'analisi dell'attuale architettura ha evidenziato la necessità di evolvere il modello dati. Attualmente la "Commessa" funge da contenitore principale, ma per fornire una visione completa e integrata è necessario introdurre l'entità **Cliente** come fulcro informativo.

Questa nuova logica strutturale permette di:
- Avere una **Dashboard Cliente** unificata che mostri lo storico completo di tutte le commesse passate e presenti, gli interventi effettuati e i ticket aperti.
- Gestire referenti multipli in modo strutturato (es. cliente finale, architetto, direttore dei lavori, amministratore di condominio).
- Tracciare l'evoluzione del rapporto con il cliente nel tempo, migliorando significativamente l'assistenza post-vendita e la reperibilità delle informazioni.

Ogni commessa diventerà quindi un progetto specifico associato a un cliente, ereditandone i contatti principali ma mantenendo la propria autonomia per quanto riguarda indirizzi di cantiere, aperture e pianificazione.

## 4. Utenti e ruoli operativi

La web app deve essere concepita per più figure aziendali che interagiscono sul medesimo dato con responsabilità differenti.

| Ruolo | Contesto principale | Responsabilità principali | Bisogni di interfaccia |
|---|---|---|---|
| Responsabile operativo / titolare | Ufficio | Supervisione commesse, assegnazioni, anomalie, KPI | Vista sintetica, dashboard, filtri, cronologia |
| Back office / ufficio tecnico | Ufficio | Verifica rilievi, avanzamento, documenti, programmazione | Tabelle, dettagli commessa, validazione dati |
| Tecnico rilevatore | Cantiere | Compilazione rilievi, foto, video, note tecniche, ostacoli | Flusso guidato, campi rapidi, caricamento media |
| Squadra di posa / caposquadra | Cantiere | Esecuzione checklist, anomalie, verbale chiusura | Navigazione mobile-first, step sequenziali, firma |
| Tecnico assistenza post-vendita | Cantiere / itinerante | Ticket, difetti, foto prima/dopo, esiti intervento | Agenda giornaliera, apertura ticket, allegati rapidi |

## 5. Moduli funzionali del prodotto

### 5.1 Rilievo tecnico multimediale avanzato

Il modulo di rilievo deve evolvere per diventare lo strumento definitivo in cantiere, combinando precisione tecnica e facilità d'uso. Non si limiterà alla raccolta di misure testuali, ma diventerà un hub di raccolta dati ricchi.

| Requisito | Descrizione |
|---|---|
| Misure tecniche guidate | Inserimento strutturato di quote (vano, spallette, soglia, cassonetto, falsotelaio) con controlli di coerenza per tipologia di apertura |
| Acquisizione Multimediale | Possibilità di scattare foto e registrare video direttamente dall'app durante il rilievo, associandoli alla singola apertura |
| Annotazioni su immagini | Strumento integrato per disegnare quote, frecce e note testuali direttamente sulle foto scattate |
| Note vocali | Registrazione audio per descrizioni complesse, idealmente con trascrizione automatica in testo (speech-to-text) |
| Nodi critici e accessibilità | Registrazione guidata di interferenze (es. impianti), ostacoli e condizioni di cantiere (es. piano, necessità di ponteggio) |
| Esportazione tecnica | Generazione automatica di un documento di rilievo strutturato, pulito e impaginato per l'ufficio preventivi o per gli ordini ai fornitori |

### 5.2 Integrazione Task Management (Microsoft To Do)

Per evitare che le micro-attività operative ("chiamare cliente", "ordinare pezzo mancante", "verificare misure") si disperdano in chat o appunti cartacei, la web app sarà integrata bidirezionalmente con Microsoft To Do tramite le API Microsoft Graph.

| Requisito | Descrizione |
|---|---|
| Creazione automatica task | Alla creazione di un intervento, di un'anomalia o di un ticket, il sistema può generare automaticamente un task assegnato in To Do |
| Linked Resources | Ogni task in To Do conterrà un link diretto (deep link) che rimanda l'utente alla specifica commessa o apertura all'interno della web app |
| Sincronizzazione stato | Sincronizzazione bidirezionale: completando il task in To Do, lo stato si aggiorna nell'app (e viceversa) tramite webhook o delta query |
| Liste dedicate | L'app organizzerà i task in liste To Do specifiche per ruolo o fase (es. "Task Rilievo", "Task Ufficio Acquisti", "Interventi Urgenti") |
| Checklist interne | I sotto-task operativi (es. i punti di una checklist di posa) possono essere mappati come `checklistItem` all'interno del task principale in To Do |

### 5.3 Integrazione Pianificazione (Google Calendar)

Tutti gli appuntamenti (posa, rilievo misure, incontri in showroom, sopralluoghi) devono essere centralizzati e visibili sia nell'app che sui calendari aziendali tramite l'API di Google Calendar.

| Requisito | Descrizione |
|---|---|
| Sincronizzazione Eventi | Creazione e aggiornamento di eventi su Google Calendar in tempo reale alla pianificazione di un intervento nell'app |
| Dettagli completi | L'evento Calendar includerà nel corpo la descrizione dell'intervento, i contatti del cliente, e nel campo location l'indirizzo esatto del cantiere (navigabile con Maps) |
| Assegnazione Squadre | Gli eventi verranno aggiunti automaticamente ai calendari specifici dei membri della squadra assegnata all'intervento |
| Codifica a colori | Utilizzo dei colori di Google Calendar (event colorId) per distinguere visivamente rilievi, pose, assistenza e consegne |
| Gestione variazioni | Se un appuntamento viene spostato direttamente in Google Calendar, la data si aggiorna automaticamente nella web app |

### 5.4 Posa assistita

Il modulo di posa deve supportare le squadre in cantiere durante l'esecuzione, attraverso checklist dinamiche che cambiano in base al tipo di installazione.

| Requisito | Descrizione |
|---|---|
| Checklist dinamiche | Sequenze operative guidate diverse in base a tipologia di posa o condizione rilevata |
| Foto obbligatorie | Raccolta fotografica step-by-step come evidenza di esecuzione corretta |
| Anomalie codificate | Segnalazione problemi tramite tassonomie standardizzate e priorità, con apertura automatica di task |
| Stato avanzamento | Tracciamento chiaro dello stato per apertura e per intervento complessivo |

### 5.5 Verbale di chiusura lavori

Il modulo di chiusura lavori deve trasformare le evidenze raccolte durante la posa in una consegna formale.

| Requisito | Descrizione |
|---|---|
| Compilazione mobile | Il caposquadra deve poter completare il verbale direttamente in cantiere dallo smartphone |
| Firma digitale cliente | Raccolta della firma sul dispositivo come parte conclusiva del processo |
| Dossier automatico | Inclusione automatica di foto, note ed esiti significativi nel dossier finale |
| Generazione PDF | Produzione immediata del documento finale archiviabile, condivisibile con il cliente e salvato nello storage |

### 5.6 Gestione post-vendita e Garanzie

Il modulo after-sales deve centralizzare le richieste successive alla posa, permettendo all'azienda di governare ticket e interventi correttivi.

| Requisito | Descrizione |
|---|---|
| Apertura ticket | Creazione di richieste collegate a cliente, commessa e specifica apertura |
| Categorizzazione difetti | Classificazione standardizzata del problema per analisi ricorrenti |
| Foto prima/dopo | Evidenze fotografiche per dimostrare lo stato iniziale e l'esito finale dell'intervento |
| Gestione Garanzie | Tracciamento delle scadenze di garanzia per prodotto e per posa, con notifiche proattive all'avvicinarsi della scadenza |

## 6. Struttura informativa aggiornata

Il modello dati deve essere esteso per supportare la nuova logica centrata sul cliente e le integrazioni esterne.

| Entità logica | Descrizione funzionale |
|---|---|
| Cliente | Anagrafica centrale. Raggruppa referenti multipli, contatti, commesse e storico completo |
| Commessa | Contenitore del progetto specifico, collegato a un Cliente. Ha un proprio stato, priorità e indirizzo di cantiere |
| Apertura | Unità tecnica (finestra, porta) su cui si eseguono rilievo, posa e assistenza. Contiene le misure dettagliate e i media |
| Intervento | Attività pianificata nel tempo, assegnata a una squadra. Sincronizzata strettamente con **Google Calendar** |
| Task Operativo | Singola azione da svolgere (es. chiamare fornitore). Sincronizzata strettamente con **Microsoft To Do** |
| Documento / Media | File binari (Foto, Video, PDF, Audio). Deve supportare metadati aggiuntivi (es. annotazioni sulle immagini) |
| Anomalia / Ticket | Problemi segnalati in corso d'opera (Anomalia) o in post-vendita dal cliente (Ticket) |
| Squadra | Gruppo di operatori incaricati dell'esecuzione, con associazione ai rispettivi account Google/Microsoft |

## 7. Principi di esperienza utente e Linee guida visuali

L'esperienza deve essere progettata secondo una logica **mobile-first**, senza sacrificare l'efficienza in desktop. 

In cantiere (smartphone) l'utente deve poter completare azioni chiave con il minimo numero di tocchi, usando pulsanti ampi, accesso rapido alla fotocamera e un ordine dei passaggi fortemente guidato.

In ufficio (desktop) la stessa informazione deve potersi espandere in viste comparative, dashboard clienti complete, filtri avanzati e calendari estesi.

Lo stile visivo rimane fedele all'**International Typographic Style**: layout pulito, fondato su griglia rigorosa, sfondo bianco dominante, tipografia sans-serif moderna e tecnica. L'eleganza del prodotto deriverà dalla proporzione, dall'ordine tipografico e dalla precisione nei dettagli, trasmettendo professionalità e controllo.

## 8. Requisiti di Storage e Sicurezza

La gestione dei media ricchi (foto ad alta risoluzione, video dei rilievi, PDF firmati) richiede un'architettura di storage robusta.
I file dovranno essere salvati su servizi cloud (es. AWS S3) e collegati alle entità del database tramite URL sicuri. I video in particolare dovranno essere compressi o ottimizzati per la visualizzazione mobile.

## 9. Punti di attenzione per lo Sviluppo (Claude Code)

Per l'implementazione tecnica, si raccomanda di prestare attenzione ai seguenti aspetti:
1. **Refactoring DB**: Aggiornare lo schema Drizzle introducendo la tabella `clienti` e aggiornando le relazioni in `commesse`.
2. **Struttura Misure**: Le misure del rilievo non devono essere salvate come semplice testo JSON in un campo note, ma idealmente strutturate per permettere ricerche e validazioni, o quantomeno gestite con un tipo JSON nativo del database.
3. **Upload Media**: Implementare un componente robusto per l'upload multipart di immagini e video, gestendo gli stati di caricamento.
4. **OAuth2**: Predisporre l'autenticazione OAuth2 sia per Microsoft Graph (To Do) che per Google APIs (Calendar), gestendo il refresh dei token in background in modo sicuro.
5. **Webhook**: Valutare l'uso di webhook per la sincronizzazione real-time delle modifiche fatte da To Do o Calendar verso l'app.
