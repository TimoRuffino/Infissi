import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Building2,
  User,
  Landmark,
  Home,
  Calendar,
  AlertTriangle,
  TicketCheck,
  Shield,
  FileText,
} from "lucide-react";
import { useLocation, useParams } from "wouter";

const tipoIcons: Record<string, any> = {
  privato: User,
  azienda: Building2,
  condominio: Home,
  ente_pubblico: Landmark,
};

const ruoloLabels: Record<string, string> = {
  cliente_finale: "Cliente finale",
  architetto: "Architetto",
  direttore_lavori: "Dir. lavori",
  amministratore: "Amministratore",
  altro: "Altro",
};

export default function ClienteDetail() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const clienteId = parseInt(params.id ?? "0");

  const cliente = trpc.clienti.byId.useQuery(clienteId);
  const commesse = trpc.commesse.list.useQuery({});
  const interventi = trpc.interventi.list.useQuery({});
  const ticketList = trpc.ticket.list.useQuery({});
  const garanzieList = trpc.garanzie.list.useQuery({});

  const c = cliente.data;

  if (!c) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        {cliente.isLoading ? "Caricamento..." : "Cliente non trovato"}
      </div>
    );
  }

  const TipoIcon = tipoIcons[c.tipo] ?? User;

  // Filter commesse for this client
  const clienteCommesse = commesse.data?.filter((cm: any) =>
    c.commesseIds?.includes(cm.id)
  ) ?? [];

  const commessaIds = clienteCommesse.map((cm: any) => cm.id);

  // Filter interventi, ticket, garanzie for client's commesse
  const clienteInterventi = interventi.data?.filter((i: any) =>
    commessaIds.includes(i.commessaId)
  ) ?? [];

  const clienteTicket = ticketList.data?.filter((t: any) =>
    commessaIds.includes(t.commessaId)
  ) ?? [];

  const clienteGaranzie = garanzieList.data?.filter((g: any) =>
    commessaIds.includes(g.commessaId)
  ) ?? [];

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLocation("/clienti")}
          className="mb-2 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Clienti
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TipoIcon className="h-5 w-5 text-muted-foreground" />
              <h1 className="text-2xl font-bold tracking-tight">
                {c.ragioneSociale}
              </h1>
              <Badge variant="outline" className="text-xs">
                {c.tipo.replace(/_/g, " ")}
              </Badge>
            </div>

            <div className="flex gap-4 flex-wrap mt-2 text-sm text-muted-foreground">
              {c.indirizzo && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {c.indirizzo}, {c.cap} {c.citta}
                </span>
              )}
              {c.telefono && (
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  {c.telefono}
                </span>
              )}
              {c.email && (
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" />
                  {c.email}
                </span>
              )}
            </div>

            {c.codiceFiscale && (
              <p className="text-xs text-muted-foreground mt-1">
                CF: {c.codiceFiscale}
                {c.partitaIva && ` — P.IVA: ${c.partitaIva}`}
              </p>
            )}
          </div>
        </div>

        {c.note && (
          <p className="text-sm text-muted-foreground mt-2 border-l-2 pl-3">
            {c.note}
          </p>
        )}
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Commesse
            </p>
            <p className="text-2xl font-bold">{clienteCommesse.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Interventi
            </p>
            <p className="text-2xl font-bold">{clienteInterventi.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Ticket
            </p>
            <p className="text-2xl font-bold">{clienteTicket.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Garanzie
            </p>
            <p className="text-2xl font-bold">{clienteGaranzie.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Referenti */}
      {c.referenti?.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Referenti ({c.referenti.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {c.referenti.map((r: any, idx: number) => (
                <div key={idx} className="border rounded-lg p-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{r.nome}</span>
                    <Badge variant="secondary" className="text-[10px]">
                      {ruoloLabels[r.ruolo] ?? r.ruolo}
                    </Badge>
                  </div>
                  {r.telefono && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {r.telefono}
                    </p>
                  )}
                  {r.email && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {r.email}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs defaultValue="commesse">
        <TabsList>
          <TabsTrigger value="commesse">
            Commesse ({clienteCommesse.length})
          </TabsTrigger>
          <TabsTrigger value="interventi">
            Interventi ({clienteInterventi.length})
          </TabsTrigger>
          <TabsTrigger value="ticket">
            Ticket ({clienteTicket.length})
          </TabsTrigger>
          <TabsTrigger value="garanzie">
            Garanzie ({clienteGaranzie.length})
          </TabsTrigger>
        </TabsList>

        {/* Commesse */}
        <TabsContent value="commesse" className="space-y-3 mt-4">
          {clienteCommesse.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Nessuna commessa associata
            </p>
          ) : (
            clienteCommesse.map((cm: any) => (
              <Card
                key={cm.id}
                className="cursor-pointer hover:shadow-sm transition-shadow"
                onClick={() => setLocation(`/commesse/${cm.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs">{cm.codice}</span>
                        <Badge variant="secondary" className="text-xs uppercase">
                          {cm.stato.replace(/_/g, " ")}
                        </Badge>
                        {cm.priorita === "urgente" && (
                          <Badge variant="destructive" className="text-xs">
                            URGENTE
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm font-medium">{cm.cliente}</p>
                      {cm.indirizzo && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {cm.indirizzo}, {cm.citta}
                        </p>
                      )}
                    </div>
                    {cm.dataConsegnaPrevista && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {cm.dataConsegnaPrevista}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Interventi */}
        <TabsContent value="interventi" className="space-y-3 mt-4">
          {clienteInterventi.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Nessun intervento
            </p>
          ) : (
            clienteInterventi.map((i: any) => (
              <Card key={i.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs uppercase">
                          {i.tipo}
                        </Badge>
                        <Badge
                          variant={i.stato === "completato" ? "secondary" : "default"}
                          className="text-xs"
                        >
                          {i.stato.replace(/_/g, " ")}
                        </Badge>
                      </div>
                      {i.note && <p className="text-sm">{i.note}</p>}
                      {i.dataPianificata && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {i.dataPianificata}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Ticket */}
        <TabsContent value="ticket" className="space-y-3 mt-4">
          {clienteTicket.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Nessun ticket
            </p>
          ) : (
            clienteTicket.map((t: any) => (
              <Card key={t.id}>
                <CardContent className="p-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {t.categoria.replace(/_/g, " ")}
                      </Badge>
                      <Badge
                        variant={t.priorita === "alta" || t.priorita === "urgente" ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {t.priorita}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {t.stato.replace(/_/g, " ")}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{t.oggetto}</p>
                    {t.descrizione && (
                      <p className="text-xs text-muted-foreground">{t.descrizione}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Garanzie */}
        <TabsContent value="garanzie" className="space-y-3 mt-4">
          {clienteGaranzie.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Nessuna garanzia
            </p>
          ) : (
            clienteGaranzie.map((g: any) => (
              <Card key={g.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{g.descrizione}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-[10px]">
                          {g.tipo}
                        </Badge>
                        <span>
                          {g.dataInizio} — {g.dataScadenza}
                        </span>
                        {g.fornitore && <span>{g.fornitore}</span>}
                      </div>
                    </div>
                    <Badge
                      variant={g.stato === "attiva" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {g.stato}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
