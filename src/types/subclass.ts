/** D&D 2024: subclass definition (own table), linked to class */

export interface Subclass {
  id: string;
  classId: string;
  name: string;
  description?: string;
  /** Level when this subclass is gained (usually 3) */
  levelGained?: number;
}
