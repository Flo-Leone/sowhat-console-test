import { useState } from "react";
import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

// Mock data: each question in the chat funnel with candidate counts
const funnelData = [
  { question: "Situation actuelle", candidats: 11200, shortLabel: "Q1" },
  { question: "Motivations", candidats: 10800, shortLabel: "Q2" },
  { question: "Compétences", candidats: 9950, shortLabel: "Q3" },
  { question: "Type de contrat", candidats: 9900, shortLabel: "Q4" },
  { question: "Rémunération souhaitée", candidats: 9850, shortLabel: "Q5" },
  { question: "Localisation", candidats: 9700, shortLabel: "Q6" },
  { question: "Temps de trajet", candidats: 4800, shortLabel: "Q7" },
  { question: "Disponibilités", candidats: 9300, shortLabel: "Q8" },
  { question: "Coordonnées", candidats: 8900, shortLabel: "Q9" },
];

// Color palette from the design system
const barColors = [
  "hsl(205, 52%, 55%)",   // blue-bell
  "hsl(180, 70%, 45%)",   // cyan
  "hsl(330, 80%, 55%)",   // magenta
  "hsl(38, 100%, 55%)",   // vivid-orange
  "hsl(44, 100%, 67%)",   // golden-pollen
  "hsl(80, 50%, 50%)",    // olive
  "hsl(241, 54%, 62%)",   // soft-lavender
  "hsl(205, 70%, 55%)",   // blue
  "hsl(330, 60%, 55%)",   // pink
  "hsl(18, 100%, 69%)",   // coral-glow
  "hsl(0, 0%, 55%)",      // grey
];

const AnalytiquePage = () => {
  const [selectedOffre, setSelectedOffre] = useState("all");
  const [selectedPeriode, setSelectedPeriode] = useState("30j");

  // Compute drop-off stats
  const dataWithDropoff = funnelData.map((item, index) => {
    const prev = index > 0 ? funnelData[index - 1].candidats : item.candidats;
    const dropoff = index > 0 ? prev - item.candidats : 0;
    const dropoffRate = index > 0 ? ((dropoff / prev) * 100).toFixed(1) : "0.0";
    return { ...item, dropoff, dropoffRate: parseFloat(dropoffRate as string) };
  });

  const totalStart = funnelData[0].candidats;
  const totalEnd = funnelData[funnelData.length - 1].candidats;
  const totalDropoffRate = (((totalStart - totalEnd) / totalStart) * 100).toFixed(1);

  const conversionRate = (((totalEnd) / totalStart) * 100).toFixed(1);

  // Find best question (lowest drop-off rate, excluding first)
  const bestQuestion = dataWithDropoff.filter(d => d.dropoffRate > 0).reduce((min, item) =>
    item.dropoffRate < min.dropoffRate ? item : min
  , dataWithDropoff[1]);

  return (
    <ConsoleLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1>Analytique</h1>
          <p className="text-muted-foreground mt-1">
            Tunnel de conversion — Taux d'abandon par question du chat
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Offre :</span>
            <Select value={selectedOffre} onValueChange={setSelectedOffre}>
              <SelectTrigger className="w-52">
                <SelectValue placeholder="Toutes les offres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les offres</SelectItem>
                <SelectItem value="equipier">Équipier polyvalent</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Période :</span>
            <Select value={selectedPeriode} onValueChange={setSelectedPeriode}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7j">7 derniers jours</SelectItem>
                <SelectItem value="30j">30 derniers jours</SelectItem>
                <SelectItem value="90j">90 derniers jours</SelectItem>
                <SelectItem value="all">Depuis le début</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-5">
            <p className="text-sm text-muted-foreground">Conversations démarrées</p>
            <p className="text-2xl font-semibold mt-1">{totalStart.toLocaleString("fr-FR")}</p>
          </div>
          <div className="bg-card rounded-xl p-5">
            <p className="text-sm text-muted-foreground">Taux de conversion</p>
            <p className="text-2xl font-semibold mt-1 text-[hsl(var(--success))]">{conversionRate}%</p>
          </div>
          <div className="bg-card rounded-xl p-5">
            <p className="text-sm text-muted-foreground">Question la plus performante</p>
            <p className="text-2xl font-semibold mt-1">{bestQuestion.question}</p>
            <p className="text-sm text-[hsl(var(--success))]">Seulement {bestQuestion.dropoffRate}% de perte</p>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-card rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border/50">
            <h2>Candidats restants par question</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Nombre de candidats ayant atteint chaque étape du chat
            </p>
          </div>
          <div className="p-6">
            <div className="h-[420px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dataWithDropoff}
                  margin={{ top: 20, right: 20, bottom: 60, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 15% 88%)" vertical={false} />
                  <XAxis
                    dataKey="question"
                    tick={{ fontSize: 11, fill: "hsl(0 0% 45%)" }}
                    angle={-35}
                    textAnchor="end"
                    height={80}
                    interval={0}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "hsl(0 0% 45%)" }}
                    tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v.toString()}
                  />
                  <Tooltip
                    formatter={(value: number) => [value.toLocaleString("fr-FR"), "Candidats"]}
                    labelFormatter={(label: string) => label}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid hsl(40 15% 88%)",
                      fontSize: "13px",
                    }}
                  />
                  <Bar dataKey="candidats" radius={[4, 4, 0, 0]} maxBarSize={60}>
                    {dataWithDropoff.map((_, index) => (
                      <Cell key={index} fill={barColors[index % barColors.length]} />
                    ))}
                    <LabelList
                      dataKey="candidats"
                      position="top"
                      formatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v}
                      style={{ fontSize: 11, fill: "hsl(0 0% 45%)" }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Drop-off Detail Table */}
        <div className="bg-card rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border/50">
            <h2>Détail du drop-off par question</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Taux d'abandon entre chaque étape du tunnel
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Étape</th>
                  <th>Question</th>
                  <th className="text-right">Candidats</th>
                  <th className="text-right">Perdus</th>
                  <th className="text-right">Taux d'abandon</th>
                </tr>
              </thead>
              <tbody>
                {dataWithDropoff.map((item, index) => (
                  <tr key={index}>
                    <td className="font-medium text-muted-foreground">{item.shortLabel}</td>
                    <td className="font-medium">{item.question}</td>
                    <td className="text-right">{item.candidats.toLocaleString("fr-FR")}</td>
                    <td className="text-right">
                      {index === 0 ? "—" : (
                        <span className="text-[hsl(var(--destructive))]">
                          -{item.dropoff.toLocaleString("fr-FR")}
                        </span>
                      )}
                    </td>
                    <td className="text-right">
                      {index === 0 ? "—" : (
                        <span className={item.dropoffRate > 5 ? "text-[hsl(var(--destructive))] font-semibold" : "text-muted-foreground"}>
                          {item.dropoffRate}%
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
};

export default AnalytiquePage;
