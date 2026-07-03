declare module 'react-chrono' {
  import { ReactNode } from 'react';

  interface ChronoItem {
    title?: string;
    cardTitle?: string;
    cardSubtitle?: string;
    cardDetailedText?: string;
    timelineContent?: ReactNode;
    [key: string]: any;
  }

  interface ChronoTheme {
    primary?: string;
    secondary?: string;
    titleColor?: string;
    titleColorActive?: string;
    cardBgColor?: string;
    cardForegroundColor?: string;
    detailsColor?: string;
    [key: string]: string | undefined;
  }

  interface ChronoClassNames {
    card?: string;
    cardTitle?: string;
    cardSubtitle?: string;
    details?: string;
    title?: string;
    timeline?: string;
    [key: string]: string | undefined;
  }

  interface ChronoProps {
    items: ChronoItem[];
    mode?: 'VERTICAL' | 'HORIZONTAL' | 'VERTICAL_ALTERNATING';
    theme?: ChronoTheme;
    hideControls?: boolean;
    buttonTexts?: {
      title?: string;
      details?: string;
    };
    classNames?: ChronoClassNames;
    autoPlay?: boolean;
    autoPlayDelay?: number;
    slideShowRunning?: boolean;
    itemWidth?: number;
    height?: number;
    disableInteraction?: boolean;
    useReadMore?: boolean;
    cardHeight?: number;
    fontSizes?: {
      cardTitle?: number;
      cardSubtitle?: number;
      cardText?: number;
      title?: number;
    };
    onItemSelected?: (index: number) => void;
    onLastItemClicked?: () => void;
  }

  export class Chrono extends React.Component<ChronoProps> {}
  export const VerticalTimeline: any;
  export const VerticalTimelineElement: any;
}
