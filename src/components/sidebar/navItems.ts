import {
    People as PeopleIcon,
    MenuBook as MenuBookIcon,
    Map as MapIcon,
    Book as BookIcon,
    Lightbulb as LightbulbIcon,
    Poll as PollIcon,
    Diamond as DiamondIcon,
    Business as BusinessIcon,
    CalendarMonth as CalendarIcon,
    Image as ImageIcon,
    Article as ArticleIcon,
    Home as HomeIcon,
  } from '@mui/icons-material';
  import { SvgIconComponent } from '@mui/icons-material';
  
  export interface NavItemConfig {
    title: string;
    icon: SvgIconComponent;
    path: string;
    group?: string;
  }
  
  export const navItems: NavItemConfig[] = [
    { title: 'Homepage', icon: HomeIcon, path: '/', group: 'Main' },
    { title: 'Characters', icon: PeopleIcon, path: '/characters', group: 'Main' },
    { title: 'Monday Sessions', icon: ArticleIcon, path: '/sessions/monday', group: 'Sessions' },
    { title: 'Tuesday Sessions', icon: ArticleIcon, path: '/sessions/tuesday', group: 'Sessions' },
    { title: 'Lore', icon: MenuBookIcon, path: '/lore', group: 'World' },
    { title: 'Maps', icon: MapIcon, path: '/maps', group: 'World' },
    { title: 'Resources', icon: BookIcon, path: '/resources', group: 'Tools' },
    { title: 'One Shot Ideas', icon: LightbulbIcon, path: '/one-shots', group: 'Tools' },
    { title: 'Polls & Surveys', icon: PollIcon, path: '/polls', group: 'Tools' },
    { title: 'Treasure & Loot', icon: DiamondIcon, path: '/treasure', group: 'World' },
    { title: 'NPCs & Organizations', icon: BusinessIcon, path: '/npcs', group: 'World' },
    { title: 'Session Calendar', icon: CalendarIcon, path: '/calendar', group: 'Tools' },
    { title: 'Art & Media', icon: ImageIcon, path: '/art', group: 'Tools' },
  ];
  
  export default navItems;