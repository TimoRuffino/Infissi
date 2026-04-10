import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, MapPin, Calendar } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

const statoColors: Record<string, string> = {
  aperta: "bg-blue-100 text-blue-800",
  in_rilievo: "bg-amber-100 text-amber-800",
  in_lavorazione: "bg-purple-100 text-purple-800",
  in_posa: "bg-orange-100 text-orange-800",
  chiusa: "bg-green-100 text-green-800",
  archiviata: "bg-gray-100 text-gray-600",
};

const prioritaStyle: Record<string, string> = {
  urgente: "destructive",
  alta: "outline",
  media: "secondary",
  bassa: "secondary",
};

export default function CommesseList() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");
  const [filtroStato, setFiltroStato] = useState<string>("tutti");
  const [dialogOpen, setDialogOpen] = useState(false);

  const commesse = trpc.commesse.list.useQuery({
    search: search || undefined,
    stato: filtroStato !== "tutti" ? filtroStato : undefined,
  });

  const utils = trpc.useUtils();
  const createMutation = trpc.commesse.create.useMutation({
    onSuccess: () => {
      utils.commesse.invalidate();
      setDialogOpen(false);
    },
  });

  const [form, setForm] = useState({
    codice: "",
    cliente: "",
    indirizzo: "",
    citta: "",
    telefono: "",
    email: "",
    priorita: "media" as const,
    note: "",
    dataConsegnaPrevista: "",
  });

  function handleCreate() {
    if (!form.codice || !form.cliente) return;
    createMutation.mutate({
      ...form,
      dataConsegnaPrevista: form.dataConsegnaPrevista || undefined,
    });
    setForm({
      codice: "",
      cliente: "",
      indirizzo: "",
      citta: "",
      telefono: "",
      email: "",
      priorita: "media",
      note: "",
      dataConsegnaPrevista: "",
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Commesse</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Archivio commesse e stato avanzamento
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Nuova commessa
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Nuova commessa</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Codice *</Label>
                  <Input
                    placeholder="COM-2026-005"
                    value={form.codice}
                    onChange={(e) =>
                      setForm({ ...form, codice: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Priorita</Label>
                  <Select
                    value={form.priorita}
                    onValueChange={(v: any) =>
                      setForm({ ...form, priorita: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bassa">Bassa</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="urgente">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Cliente *</Label>
                <Input
                  placeholder="Nome cliente"
                  value={form.cliente}
                  onChange={(e) =>
                    setForm({ ...form, cliente: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Indirizzo</Label>
                  <Input
                    value={form.indirizzo}
                    onChange={(e) =>
                      setForm({ ...form, indirizzo: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Citta</Label>
                  <Input
                    value={form.citta}
                    onChange={(e) =>
                      setForm({ ...form, citta: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Telefono</Label>
                  <Input
                    value={form.telefono}
                    onChange={(e) =>
                      setForm({ ...form, telefono: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Consegna prevista</Label>
                <Input
                  type="date"
                  value={form.dataConsegnaPrevista}
                  onChange={(e) =>
                    setForm({ ...form, dataConsegnaPrevista: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Note</Label>
                <Textarea
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  rows={2}
                />
              </div>
              <Button onClick={handleCreate} disabled={createMutation.isPending}>
                {createMutation.isPending ? "Creazione..." : "Crea commessa"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cerca per codice, cliente, citta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filtroStato} onValueChange={setFiltroStato}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Stato" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tutti">Tutti gli stati</SelectItem>
            <SelectItem value="aperta">Aperta</SelectItem>
            <SelectItem value="in_rilievo">In rilievo</SelectItem>
            <SelectItem value="in_lavorazione">In lavorazione</SelectItem>
            <SelectItem value="in_posa">In posa</SelectItem>
            <SelectItem value="chiusa">Chiusa</SelectItem>
            <SelectItem value="archiviata">Archiviata</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Commesse grid */}
      <div className="grid gap-3">
        {commesse.data?.map((c: any) => (
          <Card
            key={c.id}
            className="cursor-pointer transition-all hover:shadow-md hover:border-foreground/20"
            onClick={() => setLocation(`/commesse/${c.id}`)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs text-muted-foreground">
                      {c.codice}
                    </span>
                    <span
                      className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-sm ${statoColors[c.stato] ?? "bg-gray-100"}`}
                    >
                      {c.stato.replace(/_/g, " ")}
                    </span>
                    {(c.priorita === "urgente" || c.priorita === "alta") && (
                      <Badge
                        variant={prioritaStyle[c.priorita] as any}
                        className={`text-[10px] px-1.5 py-0 ${c.priorita === "alta" ? "border-[oklch(0.577_0.245_27.325)] text-[oklch(0.577_0.245_27.325)]" : ""}`}
                      >
                        {c.priorita.toUpperCase()}
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm">{c.cliente}</h3>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {c.indirizzo && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {c.indirizzo}, {c.citta}
                      </span>
                    )}
                    {c.dataConsegnaPrevista && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Consegna: {c.dataConsegnaPrevista}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {commesse.data?.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">Nessuna commessa trovata</p>
          </div>
        )}
      </div>
    </div>
  );
}
