export interface Character {
    id: string;
    name: string;
    level: number;
    status: 'active' | 'inactive' | 'deceased' | 'retired';
    class: string;
    specialization?: string;
    media?: {
      type: 'image' | 'video';
      url: string;
      alt?: string;
    };
    npcLinks?: {
      id: string;
      name: string;
      relationship: string;
    }[];
    diaryEntries?: DiaryEntry[];
  }
  
  export interface DiaryEntry {
    id: string;
    date: string;
    title: string;
    content: string;
    type?: 'level-up' | 'event' | 'relationship' | 'item' | 'general';
  }