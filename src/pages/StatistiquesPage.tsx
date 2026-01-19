import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Clock,
  Target,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const candidatureData = [
  { name: "Lun", candidatures: 12, entretiens: 4 },
  { name: "Mar", candidatures: 19, entretiens: 6 },
  { name: "Mer", candidatures: 15, entretiens: 8 },
  { name: "Jeu", candidatures: 22, entretiens: 5 },
  { name: "Ven", candidatures: 28, entretiens: 9 },
  { name: "Sam", candidatures: 8, entretiens: 2 },
  { name: "Dim", candidatures: 5, entretiens: 1 },
];

const conversionData = [
  { name: "Jan", taux: 28 },
  { name: "Fév", taux: 32 },
  { name: "Mar", taux: 35 },
  { name: "Avr", taux: 29 },
  { name: "Mai", taux: 38 },
  { name: "Jun", taux: 42 },
];

const StatistiquesPage = () => {
  return (
    <ConsoleLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1 className="text-foreground">Statistiques</h1>
          <p className="text-muted-foreground mt-1">
            Vue d'ensemble de vos performances de recrutement
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <p className="text-2xs font-medium uppercase tracking-wider text-muted-foreground">
                Candidatures ce mois
              </p>
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-4 w-4 text-primary" />
              </div>
            </div>
            <p className="text-2xl font-display font-bold mt-2">247</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3.5 w-3.5 text-success" />
              <span className="text-xs text-success font-medium">+12%</span>
              <span className="text-xs text-muted-foreground">vs mois dernier</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-between">
              <p className="text-2xs font-medium uppercase tracking-wider text-muted-foreground">
                Entretiens planifiés
              </p>
              <div className="w-8 h-8 rounded-lg bg-info/10 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-info" />
              </div>
            </div>
            <p className="text-2xl font-display font-bold mt-2">42</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3.5 w-3.5 text-success" />
              <span className="text-xs text-success font-medium">+8%</span>
              <span className="text-xs text-muted-foreground">vs mois dernier</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-between">
              <p className="text-2xs font-medium uppercase tracking-wider text-muted-foreground">
                Taux de conversion
              </p>
              <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                <Target className="h-4 w-4 text-success" />
              </div>
            </div>
            <p className="text-2xl font-display font-bold mt-2">36%</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="h-3.5 w-3.5 text-destructive" />
              <span className="text-xs text-destructive font-medium">-2%</span>
              <span className="text-xs text-muted-foreground">vs mois dernier</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-between">
              <p className="text-2xs font-medium uppercase tracking-wider text-muted-foreground">
                Temps moyen recrutement
              </p>
              <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="h-4 w-4 text-warning" />
              </div>
            </div>
            <p className="text-2xl font-display font-bold mt-2">12j</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3.5 w-3.5 text-success" />
              <span className="text-xs text-success font-medium">-3j</span>
              <span className="text-xs text-muted-foreground">vs mois dernier</span>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Candidatures Chart */}
          <div className="bg-card rounded-xl shadow-card border border-border p-6">
            <h3 className="font-display font-semibold mb-1">Candidatures cette semaine</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Nouveaux candidats et entretiens planifiés
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={candidatureData}>
                  <defs>
                    <linearGradient id="colorCandidatures" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(44, 100%, 67%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(44, 100%, 67%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorEntretiens" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(150, 60%, 41%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(150, 60%, 41%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="candidatures"
                    stroke="hsl(44, 100%, 67%)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorCandidatures)"
                    name="Candidatures"
                  />
                  <Area
                    type="monotone"
                    dataKey="entretiens"
                    stroke="hsl(150, 60%, 41%)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorEntretiens)"
                    name="Entretiens"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Conversion Chart */}
          <div className="bg-card rounded-xl shadow-card border border-border p-6">
            <h3 className="font-display font-semibold mb-1">Taux de conversion</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Évolution sur les 6 derniers mois
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    unit="%"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                    formatter={(value) => [`${value}%`, "Taux"]}
                  />
                  <Bar
                    dataKey="taux"
                    fill="hsl(44, 100%, 67%)"
                    radius={[4, 4, 0, 0]}
                    name="Taux de conversion"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-card rounded-xl shadow-card border border-border p-6">
          <h3 className="font-display font-semibold mb-1">Top points de vente</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Meilleurs résultats de recrutement ce mois
          </p>
          <div className="space-y-4">
            {[
              { name: "Paris Rivoli", candidatures: 45, recrutes: 12, taux: 27 },
              { name: "Lyon Part-Dieu", candidatures: 38, recrutes: 11, taux: 29 },
              { name: "Marseille Prado", candidatures: 32, recrutes: 9, taux: 28 },
              { name: "Bordeaux Lac", candidatures: 28, recrutes: 10, taux: 36 },
              { name: "Lille Grand Place", candidatures: 25, recrutes: 8, taux: 32 },
            ].map((store, index) => (
              <div
                key={store.name}
                className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{store.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {store.candidatures} candidatures · {store.recrutes} recrutés
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold text-lg">{store.taux}%</p>
                  <p className="text-xs text-muted-foreground">conversion</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
};

export default StatistiquesPage;
