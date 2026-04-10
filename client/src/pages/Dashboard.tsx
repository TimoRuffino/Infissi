import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  AlertTriangle,
  TicketCheck,
  CalendarClock,
  TrendingUp,
  Shield,
  Users,
  Hammer,
} from "lucide-react";
import { useLocation } from "wouter";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accent,
  onClick,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: any;
  accent?: boolean;
  onClick?: () => void;
}) {
  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${accent ? "border-l-4 border-l-[oklch(0.577_0.245_27.325)]" : ""}`}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}

const PIE_COLORS = ["#171717", "#dc2626", "#2563eb", "#059669", "#d97706", "#7c3aed"];

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const commesseStats = trpc.commesse.stats.useQuery();
  const anomalieStats = trpc.anomalie.stats.useQuery();
  const ticketStats = trpc.ticket.stats.useQuery();
  const garanzieStats = trpc.garanzie.stats.useQuery();
  const interventiOggi = trpc.interventi.list.useQuery({
    from: new Date().toISOString().split("T")[0],
    to: new Date().toISOString().split("T")[0],
  });
  const interventiSettimana = trpc.interventi.list.useQuery({});
  const commesseRecenti = trpc.commesse.list.useQuery({});
  const squadre = trpc.squadre.list.useQuery();

  const cs = commesseStats.data;
  const as_ = anomalieStats.data;
  const ts = ticketStats.data;
  const gs = garanzieStats.data;

  // Compute chart data from interventi
  const interventiByTipo = (() => {
    const map: Record<string, number> = {};
    interventiSettimana.data?.forEach((i: any) => {
      map[i.tipo] = (map[i.tipo] ?? 0) + 1;
    });
    return Object.entries(map).map(([tipo, count]) => ({
      name: tipo.charAt(0).toUpperCase() + tipo.slice(1),
      valore: count,
    }));
  })();

  // Compute squadre workload
  const squadreWorkload = (() => {
    const map: Record<number, { nome: string; attivi: number; completati: number }> = {};
    squadre.data?.forEach((s: any) => {
      map[s.id] = { nome: s.nome, attivi: 0, completati: 0 };
    });
    interventiSettimana.data?.forEach((i: any) => {
      if (i.squadraId && map[i.squadraId]) {
        if (i.stato === "completato") map[i.squadraId].completati++;
        else map[i.squadraId].attivi++;
      }
    });
    return Object.values(map);
  })();

  // Commesse by stato for pie chart
  const commesseByStato = (() => {
    const map: Record<string, number> = {};
    commesseRecenti.data?.forEach((c: any) => {
      const label = c.stato.replace(/_/g, " ");
      map[label] = (map[label] ?? 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  })();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Panoramica operativa
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Commesse attive"
          value={cs?.inCorso ?? "—"}
          subtitle={`${cs?.total ?? 0} totali`}
          icon={Building2}
          onClick={() => setLocation("/commesse")}
        />
        <StatCard
          title="Anomalie aperte"
          value={(as_?.aperte ?? 0) + (as_?.inGestione ?? 0)}
          subtitle={as_?.critiche ? `${as_.critiche} critiche` : undefined}
          icon={AlertTriangle}
          accent={(as_?.critiche ?? 0) > 0}
        />
        <StatCard
          title="Ticket aperti"
          value={(ts?.aperti ?? 0) + (ts?.assegnati ?? 0)}
          subtitle={`${ts?.inLavorazione ?? 0} in lavorazione`}
          icon={TicketCheck}
          onClick={() => setLocation("/ticket")}
        />
        <StatCard
          title="Interventi oggi"
          value={interventiOggi.data?.length ?? "—"}
          icon={CalendarClock}
          onClick={() => setLocation("/planning")}
        />
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Squadre attive"
          value={squadre.data?.length ?? "—"}
          icon={Users}
          onClick={() => setLocation("/squadre")}
        />
        <StatCard
          title="Garanzie attive"
          value={gs?.attive ?? "—"}
          subtitle={gs?.inScadenza ? `${gs.inScadenza} in scadenza` : undefined}
          icon={Shield}
          accent={(gs?.inScadenza ?? 0) > 0}
          onClick={() => setLocation("/garanzie")}
        />
        <StatCard
          title="Interventi totali"
          value={interventiSettimana.data?.length ?? "—"}
          subtitle={`${interventiSettimana.data?.filter((i: any) => i.stato === "completato").length ?? 0} completati`}
          icon={Hammer}
          onClick={() => setLocation("/planning")}
        />
        <StatCard
          title="Urgenze"
          value={cs?.urgenti ?? 0}
          subtitle="commesse urgenti"
          icon={AlertTriangle}
          accent={(cs?.urgenti ?? 0) > 0}
          onClick={() => setLocation("/commesse")}
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Interventi by tipo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Hammer className="h-4 w-4" />
              Interventi per tipo
            </CardTitle>
          </CardHeader>
          <CardContent>
            {interventiByTipo.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={interventiByTipo}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="valore" fill="#171717" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground py-8 text-center">
                Nessun dato disponibile
              </p>
            )}
          </CardContent>
        </Card>

        {/* Commesse by stato */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Commesse per stato
            </CardTitle>
          </CardHeader>
          <CardContent>
            {commesseByStato.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={commesseByStato}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, value }) => `${name} (${value})`}
                    labelLine={false}
                  >
                    {commesseByStato.map((_, idx) => (
                      <Cell
                        key={idx}
                        fill={PIE_COLORS[idx % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground py-8 text-center">
                Nessun dato disponibile
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Squadre workload */}
      {squadreWorkload.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Users className="h-4 w-4" />
              Carico di lavoro per squadra
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={squadreWorkload} layout="vertical">
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="nome" tick={{ fontSize: 12 }} width={120} />
                <Tooltip />
                <Legend />
                <Bar dataKey="attivi" name="Attivi" fill="#171717" stackId="a" radius={[0, 0, 0, 0]} />
                <Bar dataKey="completati" name="Completati" fill="#d1d5db" stackId="a" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Two-column section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Interventi del giorno */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <CalendarClock className="h-4 w-4" />
              Interventi di oggi
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!interventiOggi.data?.length ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                Nessun intervento pianificato per oggi
              </p>
            ) : (
              <div className="space-y-3">
                {interventiOggi.data.map((i: any) => (
                  <div
                    key={i.id}
                    className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0 cursor-pointer hover:bg-muted/50 -mx-2 px-2 py-1 rounded"
                    onClick={() =>
                      i.tipo === "posa" || i.tipo === "assistenza"
                        ? setLocation(`/posa/${i.id}`)
                        : setLocation("/planning")
                    }
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{i.note}</p>
                      <p className="text-xs text-muted-foreground">
                        {i.indirizzo}
                      </p>
                    </div>
                    <Badge
                      variant={
                        i.stato === "in_corso" ? "default" : "secondary"
                      }
                      className="text-xs shrink-0"
                    >
                      {i.stato.replace(/_/g, " ")}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Commesse recenti */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Commesse recenti
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {commesseRecenti.data?.slice(0, 5).map((c: any) => (
                <div
                  key={c.id}
                  className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0 cursor-pointer hover:bg-muted/50 -mx-2 px-2 py-1 rounded"
                  onClick={() => setLocation(`/commesse/${c.id}`)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground">
                        {c.codice}
                      </span>
                      {c.priorita === "urgente" && (
                        <Badge
                          variant="destructive"
                          className="text-[10px] px-1.5 py-0"
                        >
                          URGENTE
                        </Badge>
                      )}
                      {c.priorita === "alta" && (
                        <Badge
                          variant="outline"
                          className="text-[10px] px-1.5 py-0 border-[oklch(0.577_0.245_27.325)] text-[oklch(0.577_0.245_27.325)]"
                        >
                          ALTA
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm font-medium">{c.cliente}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs shrink-0">
                    {c.stato.replace(/_/g, " ")}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick anomalies view */}
      {(as_?.critiche ?? 0) > 0 && (
        <Card className="border-[oklch(0.577_0.245_27.325)]/30 bg-[oklch(0.577_0.245_27.325)]/5">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-[oklch(0.577_0.245_27.325)]">
              <AlertTriangle className="h-4 w-4" />
              Anomalie critiche da gestire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Ci sono{" "}
              <strong>{as_?.critiche} anomalie con priorita critica</strong> non
              ancora risolte. Verifica lo stato nella sezione commesse.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
