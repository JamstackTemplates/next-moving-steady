'use client';

import { useEffect, useState } from 'react';
import type { ChecklistGroup, ChecklistTask } from '../content/checklist';
import { MarkerTickIcon, PrinterIcon } from './artwork/icons';

const STORAGE_KEY = 'deckhand-checklist-v1';

interface MovingChecklistProps {
  groups: readonly ChecklistGroup[];
  tasks: readonly ChecklistTask[];
}

function readStoredTicks(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function writeStoredTicks(ids: string[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage blocked or quota exceeded — keep working in memory.
  }
}

export function MovingChecklist({ groups, tasks }: MovingChecklistProps) {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const validIds = new Set(tasks.map(t => t.id));
    setCheckedIds(readStoredTicks().filter(id => validIds.has(id)));
    setHydrated(true);
  }, [tasks]);

  const checkedSet = new Set(checkedIds);
  const doneCount = checkedSet.size;
  const totalCount = tasks.length;
  const percent = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  function toggleTask(id: string) {
    setCheckedIds(prev => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      writeStoredTicks(next);
      return next;
    });
  }

  function resetAll() {
    setCheckedIds([]);
    writeStoredTicks([]);
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[14rem_1fr]">
      {/* Sticky box-flap group tabs on desktop left edge */}
      <aside className="no-print hidden lg:sticky lg:top-28 lg:block" aria-label="Checklist stages">
        <p className="mb-2 font-marker text-xs text-muted">JUMP TO STAGE</p>
        <ul className="space-y-2">
          {groups.map(group => {
            const groupTasks = tasks.filter(t => t.groupId === group.id);
            const groupDone = groupTasks.filter(t => checkedSet.has(t.id)).length;
            return (
              <li key={group.id}>
                <a
                  href={`#stage-${group.id}`}
                  className="flex items-center justify-between border-2 border-ink bg-kraft-soft px-3 py-2 text-sm font-bold text-ink no-underline shadow-[3px_3px_0_var(--road)] transition-transform hover:-translate-x-0.5 hover:bg-surface"
                >
                  <span>{group.label}</span>
                  <span className="tabular text-xs text-muted">
                    {groupDone}/{groupTasks.length}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Centred clipboard sheet */}
      <div className="relative mx-auto w-full max-w-3xl">
        {/* Clipboard metal clip at top */}
        <div className="no-print relative z-10 mx-auto -mb-3 flex w-44 flex-col items-center" aria-hidden="true">
          <div className="h-5 w-16 rounded-t-md border-2 border-b-0 border-ink bg-road" />
          <div className="flex h-7 w-44 items-center justify-between border-2 border-ink bg-kraft px-4 shadow-[0_3px_0_var(--road)]">
            <span className="h-2.5 w-2.5 rounded-full border border-ink bg-surface" />
            <span className="font-display text-[0.65rem] tracking-[0.2em] text-ink">CLIPBOARD</span>
            <span className="h-2.5 w-2.5 rounded-full border border-ink bg-surface" />
          </div>
        </div>

        {/* Clipboard kraft board backing */}
        <div className="carton-panel p-3 sm:p-5">
          {/* Paper sheet inside clipboard */}
          <div className="border-2 border-ink bg-surface p-5 sm:p-8">
            {/* Tape-measure progress bar + Print & Reset controls */}
            <div className="no-print mb-8 border-b-2 border-ink pb-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-marker text-sm text-accent-ink">MOVE PROGRESS</p>
                  <p className="font-display text-2xl tabular text-ink sm:text-3xl" aria-live="polite">
                    {hydrated ? `${doneCount} of ${totalCount} done` : `${totalCount} tasks to tick off`}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="button min-h-10 px-4 py-1.5 text-sm"
                  >
                    <PrinterIcon size={16} />
                    <span>Print checklist</span>
                  </button>
                  <button
                    type="button"
                    onClick={resetAll}
                    disabled={doneCount === 0}
                    className="button button-quiet min-h-10 px-4 py-1.5 text-sm disabled:opacity-50"
                  >
                    Reset ticks
                  </button>
                </div>
              </div>

              {/* Tape-measure bar */}
              <div
                className="mt-4 h-6 w-full overflow-hidden border-2 border-ink bg-kraft-soft"
                role="progressbar"
                aria-valuenow={doneCount}
                aria-valuemin={0}
                aria-valuemax={totalCount}
                aria-label="Checklist progress"
              >
                <div
                  className="h-full bg-accent transition-[width] duration-200"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs text-muted">
                Ticks are saved in this browser only. Printing outputs a clean sheet with empty tick boxes.
              </p>
            </div>

            {/* Grouped tasks */}
            <div className="space-y-8">
              {groups.map((group, idx) => {
                const groupTasks = tasks.filter(t => t.groupId === group.id);
                return (
                  <section key={group.id} id={`stage-${group.id}`} aria-labelledby={`heading-${group.id}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink pb-2">
                      <h2 id={`heading-${group.id}`} className="font-display text-2xl tracking-wide text-ink">
                        <span className="mr-2 text-accent-ink tabular">0{idx + 1}.</span>
                        {group.label}
                      </h2>
                      <span className="font-marker text-xs text-muted">{group.when}</span>
                    </div>

                    <ul className="mt-3 divide-y divide-line">
                      {groupTasks.map(task => {
                        const checked = checkedSet.has(task.id);
                        return (
                          <li key={task.id} className="py-3">
                            <label className="group flex cursor-pointer items-start gap-3.5">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleTask(task.id)}
                                className="sr-only"
                              />
                              <span
                                aria-hidden="true"
                                className={`print-checkbox mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border-2 border-ink transition-colors group-has-[:focus-visible]:outline-3 group-has-[:focus-visible]:outline-offset-2 group-has-[:focus-visible]:outline-accent ${
                                  checked ? 'bg-accent text-on-accent' : 'bg-bg text-transparent'
                                }`}
                              >
                                <MarkerTickIcon size={16} />
                              </span>
                              <span className="flex-1">
                                <span
                                  className={`block text-base font-semibold leading-snug ${
                                    checked ? 'print-task-done text-muted line-through decoration-accent decoration-2' : 'text-ink'
                                  }`}
                                >
                                  {task.task}
                                </span>
                                {task.detail ? (
                                  <span className="mt-0.5 block text-sm text-muted">{task.detail}</span>
                                ) : null}
                              </span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
