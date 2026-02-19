// Embed version of PonderationPage — no ConsoleLayout, transparent background
// Re-exports the same logic but without the shell

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, GripVertical, Equal, ArrowUp, ArrowDown, RotateCcw, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// --- Types ---
interface Answer { id: string; label: string; tier: number; }
interface Question { id: string; label: string; tier: number; answers: Answer[]; }

const initialQuestions: Question[] = [
  { id: "q1", label: "Avez-vous un diplôme dans ce domaine ?", tier: 0, answers: [{ id: "q1a1", label: "Oui", tier: 0 }, { id: "q1a2", label: "Non", tier: 1 }] },
  { id: "q2", label: "Combien d'années d'expérience avez-vous ?", tier: 0, answers: [{ id: "q2a1", label: "Plus de 10 ans", tier: 0 }, { id: "q2a2", label: "Entre 5-10 ans", tier: 1 }, { id: "q2a3", label: "Entre 3-5 ans", tier: 2 }, { id: "q2a4", label: "Entre 1-3 ans", tier: 3 }, { id: "q2a5", label: "Moins de 1 an", tier: 4 }] },
  { id: "q3", label: "Quelle est votre disponibilité ?", tier: 0, answers: [{ id: "q3a1", label: "Immédiate", tier: 0 }, { id: "q3a2", label: "Sous 1 mois", tier: 1 }, { id: "q3a3", label: "Sous 3 mois", tier: 2 }] },
  { id: "q4", label: "Avez-vous une formation complémentaire ?", tier: 0, answers: [{ id: "q4a1", label: "Oui - je vais obtenir mon diplôme d'ici quelques mois", tier: 0 }, { id: "q4a2", label: "Oui - diplôme obtenu", tier: 0 }, { id: "q4a3", label: "Non", tier: 1 }] },
];

// --- SortableItem (copied from original) ---
interface SortableItemProps {
  id: string; label: string; tier: number; maxTier: number;
  onTierUp: () => void; onTierDown: () => void; onTierSame: () => void;
  isFirst: boolean; showTierControls?: boolean;
}

const SortableItem = ({ id, label, tier, maxTier, onTierUp, onTierDown, onTierSame, isFirst, showTierControls = true }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className={cn("flex items-center gap-3 px-4 py-3 bg-card rounded-lg border border-border/50 transition-all", isDragging && "opacity-50 shadow-lg z-10")}>
      <button className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors" {...attributes} {...listeners}>
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="flex-1 text-sm font-medium">{label}</div>
      {showTierControls && (
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground mr-2">Niveau {tier + 1}</span>
          <button onClick={onTierUp} disabled={tier === 0} className={cn("p-1 rounded transition-colors", tier === 0 ? "opacity-0 pointer-events-none" : "hover:bg-muted")} title="Monter d'un niveau"><ArrowUp className="h-3.5 w-3.5 text-muted-foreground" /></button>
          {!isFirst && <button onClick={onTierSame} className="p-1 rounded hover:bg-muted transition-colors" title="Même niveau que le précédent"><Equal className="h-3.5 w-3.5 text-muted-foreground" /></button>}
          {tier < maxTier && <button onClick={onTierDown} className="p-1 rounded hover:bg-muted transition-colors" title="Descendre d'un niveau"><ArrowDown className="h-3.5 w-3.5 text-muted-foreground" /></button>}
        </div>
      )}
    </div>
  );
};

// --- Weight Calculation ---
function computeWeights(questions: Question[]) {
  const results: { questionId: string; answerId: string; weight: number }[] = [];
  const qTiers = [...new Set(questions.map((q) => q.tier))].sort((a, b) => a - b);
  const baseScore = 100;
  for (const question of questions) {
    const qTierIndex = qTiers.indexOf(question.tier);
    const qMultiplier = 1 / (qTierIndex + 1);
    const questionMax = baseScore * qMultiplier;
    const aTiers = [...new Set(question.answers.map((a) => a.tier))].sort((a, b) => a - b);
    for (const answer of question.answers) {
      const aTierIndex = aTiers.indexOf(answer.tier);
      const aMultiplier = 1 / (aTierIndex + 1);
      results.push({ questionId: question.id, answerId: answer.id, weight: Math.round(questionMax * aMultiplier) });
    }
  }
  return results;
}

// --- EditableWeightRow ---
const EditableWeightRow = ({ label, tier, weight, isCustom, onChange, onReset }: { label: string; tier: number; weight: number; isCustom: boolean; onChange: (v: number) => void; onReset: () => void }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(weight));
  const handleSubmit = () => { const p = parseInt(draft, 10); if (!isNaN(p) && p >= 0) onChange(p); setEditing(false); };

  return (
    <div className="px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-sm">{label}</span>
        <span className="text-xs text-muted-foreground">(Niveau {tier + 1})</span>
      </div>
      <div className="flex items-center gap-2">
        {editing ? (
          <input type="number" min={0} className="w-16 h-8 text-sm font-bold tabular-nums text-center border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring" value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={handleSubmit} onKeyDown={(e) => e.key === "Enter" && handleSubmit()} autoFocus />
        ) : (
          <button onClick={() => { setDraft(String(weight)); setEditing(true); }} className={cn("text-sm font-bold tabular-nums px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors hover:bg-accent", isCustom ? "bg-[hsl(var(--golden-pollen)/0.15)] text-[hsl(38_100%_35%)]" : "bg-muted text-foreground")} title="Cliquez pour modifier">
            {weight} <Pencil className="h-3 w-3 text-muted-foreground" />
          </button>
        )}
        {isCustom && !editing && <button onClick={onReset} className="p-1 rounded hover:bg-muted transition-colors" title="Réinitialiser à la valeur calculée"><RotateCcw className="h-3.5 w-3.5 text-muted-foreground" /></button>}
      </div>
    </div>
  );
};

const steps = [
  { id: 1, label: "Hiérarchiser les questions" },
  { id: 2, label: "Hiérarchiser les réponses" },
  { id: 3, label: "Résultats pondération" },
];

const EmbedPonderationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [customWeights, setCustomWeights] = useState<Record<string, number>>({});

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleQuestionDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setQuestions((items) => { const oi = items.findIndex((i) => i.id === active.id); const ni = items.findIndex((i) => i.id === over.id); return arrayMove(items, oi, ni); });
    }
  };

  const setQuestionTier = (qId: string, newTier: number) => setQuestions((prev) => prev.map((q) => (q.id === qId ? { ...q, tier: Math.max(0, newTier) } : q)));
  const setQuestionTierSame = (qId: string) => setQuestions((prev) => { const idx = prev.findIndex((q) => q.id === qId); if (idx <= 0) return prev; return prev.map((q, i) => (i === idx ? { ...q, tier: prev[idx - 1].tier } : q)); });

  const handleAnswerDragEnd = (questionId: string) => (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setQuestions((prev) => prev.map((q) => { if (q.id !== questionId) return q; const oi = q.answers.findIndex((a) => a.id === active.id); const ni = q.answers.findIndex((a) => a.id === over.id); return { ...q, answers: arrayMove(q.answers, oi, ni) }; }));
    }
  };

  const setAnswerTier = (qId: string, aId: string, newTier: number) => setQuestions((prev) => prev.map((q) => q.id === qId ? { ...q, answers: q.answers.map((a) => a.id === aId ? { ...a, tier: Math.max(0, newTier) } : a) } : q));
  const setAnswerTierSame = (qId: string, aId: string) => setQuestions((prev) => prev.map((q) => { if (q.id !== qId) return q; const idx = q.answers.findIndex((a) => a.id === aId); if (idx <= 0) return q; return { ...q, answers: q.answers.map((a, i) => (i === idx ? { ...a, tier: q.answers[idx - 1].tier } : a)) }; }));

  const computedWeights = computeWeights(questions);
  const getComputedWeight = (qId: string, aId: string) => computedWeights.find((w) => w.questionId === qId && w.answerId === aId)?.weight ?? 0;
  const getWeight = (qId: string, aId: string) => customWeights[`${qId}_${aId}`] ?? getComputedWeight(qId, aId);
  const isCustom = (qId: string, aId: string) => `${qId}_${aId}` in customWeights;
  const setWeight = (qId: string, aId: string, value: number) => setCustomWeights((prev) => ({ ...prev, [`${qId}_${aId}`]: value }));
  const resetWeight = (qId: string, aId: string) => setCustomWeights((prev) => { const next = { ...prev }; delete next[`${qId}_${aId}`]; return next; });
  const resetAllWeights = () => setCustomWeights({});

  const maxQuestionTier = Math.max(...questions.map((q) => q.tier), 0);

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in bg-transparent">
      <div>
        <h1>Pondération du scoring</h1>
        <p className="text-muted-foreground mt-1">Configurez l'importance relative des questions et réponses pour calculer automatiquement les scores</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center gap-2">
            <button onClick={() => setCurrentStep(step.id)} className={cn("flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all", currentStep === step.id ? "bg-[hsl(var(--golden-pollen))] text-[hsl(var(--carbon-black))]" : currentStep > step.id ? "bg-[hsl(var(--success)/0.12)] text-[hsl(var(--success))]" : "bg-muted text-muted-foreground")}>
              {currentStep > step.id ? <Check className="h-4 w-4" /> : <span className="flex items-center justify-center h-5 w-5 rounded-full bg-foreground/10 text-xs font-bold">{step.id}</span>}
              {step.label}
            </button>
            {i < steps.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {currentStep === 1 && (
        <div className="bg-card rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border/50">
            <h2>Hiérarchisez les questions</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Glissez les questions pour les réordonner. Utilisez les flèches pour ajuster leur niveau d'importance.</p>
          </div>
          <div className="p-6 space-y-2">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleQuestionDragEnd}>
              <SortableContext items={questions.map((q) => q.id)} strategy={verticalListSortingStrategy}>
                {questions.map((q, idx) => (
                  <SortableItem key={q.id} id={q.id} label={q.label} tier={q.tier} maxTier={maxQuestionTier + 1} isFirst={idx === 0} onTierUp={() => setQuestionTier(q.id, q.tier - 1)} onTierDown={() => setQuestionTier(q.id, q.tier + 1)} onTierSame={() => setQuestionTierSame(q.id)} />
                ))}
              </SortableContext>
            </DndContext>
          </div>
          <div className="px-6 py-4 border-t border-border/50 flex justify-end">
            <Button className="btn-primary" onClick={() => setCurrentStep(2)}>Suivant <ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {currentStep === 2 && (
        <div className="space-y-4">
          {questions.map((q) => {
            const maxAnswerTier = Math.max(...q.answers.map((a) => a.tier), 0);
            return (
              <div key={q.id} className="bg-card rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-border/50">
                  <h2 className="text-base">{q.label}</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">Réordonnez et hiérarchisez les réponses</p>
                </div>
                <div className="p-6 space-y-2">
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleAnswerDragEnd(q.id)}>
                    <SortableContext items={q.answers.map((a) => a.id)} strategy={verticalListSortingStrategy}>
                      {q.answers.map((a, idx) => (
                        <SortableItem key={a.id} id={a.id} label={a.label} tier={a.tier} maxTier={maxAnswerTier + 1} isFirst={idx === 0} onTierUp={() => setAnswerTier(q.id, a.id, a.tier - 1)} onTierDown={() => setAnswerTier(q.id, a.id, a.tier + 1)} onTierSame={() => setAnswerTierSame(q.id, a.id)} />
                      ))}
                    </SortableContext>
                  </DndContext>
                </div>
              </div>
            );
          })}
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(1)}>Précédent</Button>
            <Button className="btn-primary" onClick={() => setCurrentStep(3)}>Suivant <ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Les poids sont calculés automatiquement. Cliquez sur un poids pour le modifier manuellement.</p>
            {Object.keys(customWeights).length > 0 && (
              <button onClick={resetAllWeights} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors">
                <RotateCcw className="h-3.5 w-3.5" /> Réinitialiser tout
              </button>
            )}
          </div>
          {questions.map((q) => (
            <div key={q.id} className="bg-card rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-border/50">
                <h2 className="text-base">{q.label}</h2>
              </div>
              <div className="divide-y divide-border/50">
                {q.answers.map((a) => (
                  <EditableWeightRow key={a.id} label={a.label} tier={a.tier} weight={getWeight(q.id, a.id)} isCustom={isCustom(q.id, a.id)} onChange={(v) => setWeight(q.id, a.id, v)} onReset={() => resetWeight(q.id, a.id)} />
                ))}
              </div>
            </div>
          ))}
          <div className="flex justify-start">
            <Button variant="outline" onClick={() => setCurrentStep(2)}>Précédent</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmbedPonderationPage;
