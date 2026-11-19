export interface ChecklistGroup {
  /** Stable URL-safe group identifier. */
  id: string;
  /** Tab and section heading label. */
  label: string;
  /** Short timing cue shown beside the heading. */
  when: string;
}

export interface ChecklistTask {
  /** Stable unique task identifier across all groups (used for localStorage persistence). */
  id: string;
  /** References ChecklistGroup.id. */
  groupId: string;
  /** Actionable task text. */
  task: string;
  /** Optional practical tip underneath the task. */
  detail?: string;
}

export const checklistGroups: readonly ChecklistGroup[] = [
  { id: 'eight-weeks', label: '8 weeks out', when: 'Plan and lock in your date' },
  { id: 'four-weeks', label: '4 weeks out', when: 'Boxes, utilities and early packing' },
  { id: 'two-weeks', label: '2 weeks out', when: 'Admin, access and pantry' },
  { id: 'one-week', label: '1 week out', when: 'Pack down and confirm' },
  { id: 'day-before', label: 'The day before', when: 'Fridge, paths and overnight bag' },
  { id: 'moving-day', label: 'Moving day', when: 'Walkthrough, meters and keys' },
];

export const checklistTasks: readonly ChecklistTask[] = [
  // 8 weeks out
  {
    id: 'book-removalist',
    groupId: 'eight-weeks',
    task: 'Request a moving quote and pick a date.',
    detail: 'Fridays and month-ends fill up first.',
  },
  { id: 'declutter', groupId: 'eight-weeks', task: "Sell, donate or bin what you won't take." },
  { id: 'measure-new-place', groupId: 'eight-weeks', task: 'Measure doorways, stairs and lift sizes at the new place.' },
  { id: 'school-work', groupId: 'eight-weeks', task: 'Tell school, childcare and work the date.' },
  { id: 'storage-plan', groupId: 'eight-weeks', task: 'Decide what goes to storage, if anything.' },

  // 4 weeks out
  {
    id: 'order-boxes',
    groupId: 'four-weeks',
    task: 'Get cartons, tape and paper.',
    detail: 'About ten cartons per room is a good start.',
  },
  { id: 'pack-rarely-used', groupId: 'four-weeks', task: 'Pack books, out-of-season clothes and spare linen.' },
  { id: 'redirect-mail', groupId: 'four-weeks', task: 'Set up mail redirection.' },
  { id: 'utilities', groupId: 'four-weeks', task: 'Arrange electricity, gas and internet connection at the new address.' },
  { id: 'pet-plan', groupId: 'four-weeks', task: 'Arrange a sitter or boarding for moving day.' },

  // 2 weeks out
  { id: 'change-address', groupId: 'two-weeks', task: 'Update your address with bank, insurer, doctor and licence.' },
  { id: 'use-up-food', groupId: 'two-weeks', task: 'Run down the freezer and pantry.' },
  { id: 'confirm-access', groupId: 'two-weeks', task: 'Check parking, loading zones and lift access at both ends.' },
  { id: 'valuables', groupId: 'two-weeks', task: 'Set aside documents, jewellery and keys to carry yourself.' },

  // 1 week out
  { id: 'pack-most-rooms', groupId: 'one-week', task: 'Pack everything except daily essentials.' },
  { id: 'label-cartons', groupId: 'one-week', task: 'Label two sides of each carton with room and contents.' },
  { id: 'disconnect-appliances', groupId: 'one-week', task: 'Plan to disconnect the washing machine and drain hoses.' },
  { id: 'confirm-move', groupId: 'one-week', task: 'Check the start time and both addresses with the office.' },

  // The day before
  { id: 'defrost-fridge', groupId: 'day-before', task: 'Defrost and dry the fridge and freezer.' },
  { id: 'first-night-box', groupId: 'day-before', task: 'Pack the first-night box (see below).' },
  { id: 'charge-devices', groupId: 'day-before', task: 'Charge phones and pack chargers in your bag.' },
  { id: 'clear-paths', groupId: 'day-before', task: 'Clear hallways and the driveway for the truck.' },

  // Moving day
  { id: 'walkthrough', groupId: 'moving-day', task: 'Walk the crew through what goes and what stays.' },
  { id: 'final-check', groupId: 'moving-day', task: 'Check cupboards, the shed and the meter box before the truck leaves.' },
  { id: 'meter-readings', groupId: 'moving-day', task: 'Photograph the meter readings at both places.' },
  { id: 'keys', groupId: 'moving-day', task: 'Hand over or collect keys.' },
  { id: 'direct-crew', groupId: 'moving-day', task: 'Point the crew to the right room at the new place.' },
];

export const firstNightBox: readonly string[] = [
  'Kettle and mugs',
  'Toilet paper',
  'Phone chargers',
  'Sheets and a towel each',
  'Basic tools and a box cutter',
  'Medication',
  'Snacks and water',
  "The kids' or pets' favourite things",
];

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateChecklist(
  groups: readonly ChecklistGroup[] = checklistGroups,
  tasks: readonly ChecklistTask[] = checklistTasks,
): void {
  if (groups.length === 0) throw new Error('checklist: at least one group is required');
  const groupIds = new Set<string>();
  for (const g of groups) {
    const label = `checklist.groups[${g.id || '(missing id)'}]`;
    if (!g.id || !ID_PATTERN.test(g.id)) throw new Error(`${label}: invalid group id`);
    if (groupIds.has(g.id)) throw new Error(`${label}: duplicate group id`);
    groupIds.add(g.id);
    if (!g.label.trim()) throw new Error(`${label}: label is required`);
  }

  if (tasks.length === 0) throw new Error('checklist: at least one task is required');
  const taskIds = new Set<string>();
  for (const t of tasks) {
    const label = `checklist.tasks[${t.id || '(missing id)'}]`;
    if (!t.id || !ID_PATTERN.test(t.id)) throw new Error(`${label}: invalid task id`);
    if (taskIds.has(t.id)) throw new Error(`${label}: duplicate task id`);
    taskIds.add(t.id);
    if (!groupIds.has(t.groupId)) {
      throw new Error(`${label}: groupId "${t.groupId}" does not match any checklist group`);
    }
    if (!t.task.trim()) throw new Error(`${label}: task text is required`);
  }
}
