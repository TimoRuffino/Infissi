# Documento requisiti — Web app operativa per commesse infissi, produzione e post-vendita

**Autore:** Manus AI  
**Stato:** Documento dei Requisiti Aggiornato e Ottimizzato (Inclusione Ramo Produzione)  
**Obiettivo del documento:** Definire in modo condivisibile e dettagliato il perimetro funzionale, operativo e di esperienza utente della web app, integrando i nuovi requisiti di gestione avanzata (Microsoft To Do, Google Calendar), l'evoluzione del modulo di rilievo multimediale, l'ottimizzazione della logica complessiva centrata sul cliente, e l'introduzione del **nuovo modulo per la gestione della produzione e assemblaggio interno degli infissi**.

## 1. Visione del prodotto

L'applicazione proposta è una **web app professionale per la gestione operativa di commesse edili e serramentistiche**, progettata per accompagnare l'intero ciclo di vita della commessa: dal primo contatto al rilievo iniziale, passando per la **produzione e assemblaggio interno**, fino alla posa e al post-vendita. Il valore del prodotto non è commerciale o orientato alla generazione di nuovi clienti, ma strettamente **operativo, documentale e organizzativo**.

L'obiettivo centrale è creare un unico ambiente digitale in cui ufficio, tecnici di rilievo, **addetti al laboratorio di produzione**, squadre di posa e assistenza possano lavorare su informazioni coerenti, aggiornate e tracciabili. La web app deve quindi ridurre errori di passaggio tra le varie fasi, garantendo che ciò che viene rilevato sia esattamente ciò che viene prodotto, ordinato e installato.

L'applicazione funge da hub centralizzato, comunicando fluidamente con strumenti esterni consolidati. Si integra con **Microsoft To Do** per la gestione capillare dei task operativi e con **Google Calendar** per la pianificazione degli appuntamenti (rilievi, pose, consegne).

Dal punto di vista d'uso, il prodotto deve funzionare in modo naturale in tre contesti complementari: in cantiere (mobile-first per rilievi e posa), in laboratorio (interfaccia chiara per l'assemblaggio e controllo qualità) e in ufficio (lettura estesa, pianificazione, gestione ordini fornitori e anagrafica cliente a 360 gradi).

## 2. Obiettivi di business e operativi

Il prodotto dovrà consentire all'azienda di standardizzare il lavoro operativo, gestire la nuova linea di produzione interna come una business unit autonoma e costruire uno storico affidabile.

| Ambito | Obiettivo |
|---|---|
| Rilievo | Rendere il rilievo completo, tecnico ma intuitivo, con supporto multimediale avanzato (foto e video) |
| **Produzione & Laboratorio** | **Gestire il flusso di assemblaggio interno, tracciare componenti (PVC, alluminio, ferramenta) e generare la documentazione obbligatoria (DoP e marcatura CE)** |
| Gestione Fornitori | Tracciare ordini di materiali, ricevimento merci e controllo qualità in ingresso |
| Posa | Guidare l'esecuzione con checklist e raccolta evidenze obbligatorie |
| Chiusura lavori | Formalizzare la consegna con verbale, firma e dossier automatico |
| Post-vendita | Organizzare ticket, difetti, garanzie e storico interventi (gestione resi/assistenze) |
| Coordinamento | Pianificare appuntamenti e task integrandosi bidirezionalmente con To Do e Calendar |
| Controllo manageriale | Evidenziare anomalie ricorrenti, tempi medi, costi reali per commessa e marginalità |
| Gestione Cliente | Centralizzare tutte le commesse, gli interventi e i documenti sotto un'unica anagrafica cliente |

## 3. Nuova Logica Applicativa: Centralità del Cliente e Flusso di Commessa

L'architettura del sistema si basa sull'entità **Cliente** come fulcro informativo, attorno a cui ruotano i progetti (Commesse). 

Questa logica strutturale permette di:
- Avere una **Dashboard Cliente** unificata che mostri lo storico completo di tutte le commesse, gli interventi e i ticket.
- Gestire referenti multipli in modo strutturato.
- Tracciare l'evoluzione del rapporto con il cliente nel tempo.

Ogni commessa segue un **flusso di lavoro standardizzato e rigoroso**, essenziale per il funzionamento del nuovo ramo produttivo:
1. **Primo contatto e preventivo** (Area commerciale)
2. **Rilievo definitivo** (Tecnico rilievi)
3. **Validazione tecnica e Distinta Base** (Responsabile commessa/produzione)
4. **Ordini ai fornitori** (Ufficio tecnico-acquisti)
5. **Ricevimento e controllo materiali** (Magazzino/laboratorio)
6. **Assemblaggio, preparazione e controllo qualità** (Laboratorio)
7. **Posa e chiusura** (Squadra posa)
8. **Assistenza finale** (Responsabile post-vendita)

## 4. Utenti e ruoli operativi

La web app deve essere concepita per più figure aziendali, con l'introduzione di nuovi ruoli legati alla produzione.

| Ruolo | Contesto principale | Responsabilità principali | Bisogni di interfaccia |
|---|---|---|---|
| Direzione / Titolare | Ufficio | Strategia, listini, fornitori, marginalità, KPI | Dashboard direzionale, costi, tempi medi |
| Responsabile commessa-produzione | Ufficio / Laboratorio | Coordina rilievo, ordine, laboratorio e posa (Punto di controllo unico) | Vista globale flusso commessa, validazione tecnica |
| Tecnico rilevatore | Cantiere | Compilazione rilievi, foto, video, dettagli di cantiere | Flusso guidato mobile, campi rapidi, upload media |
| Ufficio ordini / Acquisti | Ufficio | Emette ordini ai fornitori, controlla conferme e tempistiche | Gestione distinte base, tracciamento forniture |
| **Addetto Laboratorio** | **Laboratorio** | **Ricevimento merci, assemblaggio, controllo qualità, imballo** | **Checklist di produzione, etichettatura, segnalazione non conformità** |
| Squadra di posa | Cantiere | Esecuzione checklist, anomalie, verbale chiusura | Navigazione mobile-first, step sequenziali, firma |
| Tecnico post-vendita | Cantiere / Laboratorio | Ticket, difetti, foto prima/dopo, riparazioni in laboratorio | Agenda, apertura ticket, gestione resi |

## 5. Moduli funzionali del prodotto

### 5.1 Rilievo tecnico multimediale avanzato

Il modulo di rilievo è l'input primario per la produzione. Deve essere estremamente preciso.

| Requisito | Descrizione |
|---|---|
| Misure tecniche guidate | Inserimento strutturato di quote con controlli di coerenza per tipologia di apertura |
| Acquisizione Multimediale | Possibilità di scattare foto e registrare video associandoli alla singola apertura |
| Annotazioni su immagini | Strumento integrato per disegnare quote, frecce e note testuali sulle foto |
| Note vocali | Registrazione audio con trascrizione automatica in testo (speech-to-text) |
| Esportazione tecnica | Generazione automatica di un documento di rilievo strutturato per l'ufficio acquisti e la produzione |

### 5.2 Modulo Produzione e Laboratorio (NUOVO)

Questo modulo gestisce la trasformazione dei materiali in prodotto finito, garantendo il controllo industriale richiesto per operare come fabbricante.

| Requisito | Descrizione |
|---|---|
| Distinta Base (BOM) | Generazione della distinta base a partire dal rilievo validato, con elenco profili, ferramenta, vetri e accessori necessari |
| Gestione Forniture | Tracciamento degli ordini ai fornitori e registrazione del ricevimento materiali (controllo quantità, codici e danni in ingresso) |
| Fasi di Assemblaggio | Checklist digitali per le lavorazioni al banco, garantendo ripetibilità e controllo qualità interno |
| Tracciabilità Componenti | Associazione dei lotti di profili e vetri alla specifica commessa per la tracciabilità normativa |
| Fascicolo Tecnico e DoP | Generazione automatica della documentazione obbligatoria: Declaration of Performance (DoP), etichettatura per marcatura CE (UNI EN 14351-1) e documenti di consegna |
| Gestione Resi Interni | Area dedicata per gestire le non conformità rilevate in laboratorio senza bloccare il resto della produzione |

### 5.3 Integrazione Task Management (Microsoft To Do)

| Requisito | Descrizione |
|---|---|
| Creazione automatica task | Generazione automatica di task per attività operative (es. "Verificare ordine fornitore", "Controllare materiali in ingresso") |
| Linked Resources | Link diretto dal task To Do alla specifica commessa, ordine o apertura nell'app |
| Sincronizzazione stato | Completando il task in To Do, lo stato si aggiorna nell'app (e viceversa) |
| Liste dedicate | Liste To Do specifiche: "Task Rilievo", "Task Acquisti", "Task Laboratorio" |

### 5.4 Integrazione Pianificazione (Google Calendar)

| Requisito | Descrizione |
|---|---|
| Sincronizzazione Eventi | Creazione eventi su Google Calendar per rilievi, pose e consegne materiali |
| Dettagli completi | L'evento includerà descrizione, contatti e indirizzo esatto del cantiere |
| Assegnazione Squadre | Aggiunta automatica ai calendari dei membri della squadra o degli addetti al laboratorio |
| Codifica a colori | Colori distinti per rilievi, pose, lavoro in laboratorio e assistenza |

### 5.5 Posa assistita e Verbale di chiusura

| Requisito | Descrizione |
|---|---|
| Checklist dinamiche | Sequenze operative guidate per l'installazione |
| Foto obbligatorie | Raccolta fotografica step-by-step come evidenza di esecuzione |
| Verbale e Firma | Compilazione del verbale in cantiere con firma digitale del cliente |
| Dossier automatico | Generazione PDF finale archiviabile con foto, note e documenti normativi (DoP) |

### 5.6 Gestione post-vendita e Garanzie

| Requisito | Descrizione |
|---|---|
| Apertura ticket | Creazione di richieste collegate a cliente, commessa e specifica apertura |
| Categorizzazione difetti | Classificazione standardizzata del problema per analisi ricorrenti |
| Gestione Garanzie | Tracciamento scadenze garanzia per prodotto (fabbricante) e per posa |

## 6. Struttura informativa aggiornata

Il modello dati deve supportare la logica centrata sul cliente, la produzione interna e le integrazioni.

| Entità logica | Descrizione funzionale |
|---|---|
| Cliente | Anagrafica centrale (referenti, contatti, storico completo) |
| Commessa | Contenitore del progetto specifico. Ha un proprio stato di avanzamento (Preventivo, Rilievo, Produzione, Posa, Chiusa) |
| Apertura | Unità tecnica (finestra, porta). Contiene misure, media e configurazione prodotto |
| **Distinta Base / Ordine** | **Elenco dei materiali necessari (profili, vetri, ferramenta) collegati ai rispettivi fornitori** |
| **Lavorazione Laboratorio** | **Fase produttiva interna con checklist di controllo qualità ed etichettatura** |
| Intervento | Attività pianificata (sincronizzata con Google Calendar) |
| Task Operativo | Azione da svolgere (sincronizzata con Microsoft To Do) |
| Documento / Media | File binari (Foto, Video, PDF, DoP). Supporto per annotazioni su immagini |
| Anomalia / Ticket | Problemi segnalati in corso d'opera, in laboratorio o in post-vendita |

## 7. Principi di esperienza utente e Linee guida visuali

L'esperienza mantiene un approccio **mobile-first** per il cantiere (rilievo e posa) e un layout ottimizzato per tablet/desktop per il **laboratorio** (dove gli addetti necessitano di schede prodotto chiare, distinte base leggibili e pulsanti per confermare le fasi di assemblaggio). In ufficio, il layout esteso permetterà la gestione di dashboard e pianificazione.

Lo stile visivo rimane fedele all'**International Typographic Style**: layout pulito, griglia rigorosa, tipografia sans-serif tecnica. Deve trasmettere precisione, controllo industriale e affidabilità.

## 8. Requisiti di Storage e Sicurezza

La gestione dei media (foto, video) e dei documenti normativi generati (DoP, manuali d'uso, marcature CE) richiede uno storage cloud robusto (es. AWS S3 o Cloudflare R2). I documenti normativi devono essere immutabili e sempre accessibili per garantire la conformità legale del fabbricante.

## 9. Punti di attenzione per lo Sviluppo (Claude Code)

1. **Refactoring DB per Produzione**: Oltre all'entità `Cliente`, è necessario implementare tabelle per `Fornitori`, `Distinte_Base` (materiali), e `Fasi_Produzione` per tracciare lo stato di assemblaggio in laboratorio.
2. **Generazione Documentale (DoP)**: Implementare un sistema di templating (es. PDF generation) per produrre automaticamente la Declaration of Performance e le etichette CE basate sui dati dell'apertura e dei materiali utilizzati.
3. **Flussi di Stato Rigidi**: Implementare una macchina a stati finiti (State Machine) per la commessa, impedendo di passare alla produzione se il rilievo non è validato, o alla posa se la produzione non ha superato il controllo qualità.
4. **Upload Media**: Componente robusto per upload multipart di immagini/video.
5. **Integrazioni API**: Predisporre OAuth2 per Microsoft Graph (To Do) e Google APIs (Calendar), con webhook per sincronizzazione real-time.
