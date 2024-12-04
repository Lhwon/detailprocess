declare module 'react-fullpage' {
  import { ComponentType } from 'react';

  interface FullpageProps {
    scrollingSpeed?: number;
    render?: () => JSX.Element;
    onLeave?: (origin: any, destination: any, direction: string) => void;
    afterLoad?: (origin: any, destination: any, direction: string) => void;
    // Add other props if needed based on the documentation
  }

  const ReactFullpage: ComponentType<FullpageProps>;
  export default ReactFullpage;
}
