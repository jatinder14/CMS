import ImageSliderPlugin from '@/app/plugins/ImageSliderPlugin';

// types/plugins.ts
export interface Plugin {
  name: string;
  componentName: string;
  initialize?: () => void;
  addFields?: (post: any, callback?: any) => JSX.Element;
  modifyContent?: (content: string) => string;
}

export const availablePlugins = [
  {
    id: 3,
    name: 'Image Slider',
    description: 'This is a image slider plugin',
    instance: ImageSliderPlugin,
    isEnabled: false,
  },
];
