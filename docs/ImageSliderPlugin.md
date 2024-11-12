# ImageSliderPlugin Documentation

## Overview

The `ImageSliderPlugin` is a custom plugin that allows users to add and manage image sliders within a post. It integrates with a post to add an image slider field where users can input image URLs. The plugin supports adding and removing images from the slider, updating the post data dynamically.

## Plugin Properties

- **`name`**: The name of the plugin (`"Image Slider Plugin"`).
- **`componentName`**: The name of the component associated with this plugin (`"ImageSliderPlugin"`).
- **`initialize()`**: A function that runs when the plugin is initialized. It logs a message to the console (`"Image Slider Plugin initialized!"`).
- **`addFields(post, callback)`**: A function that returns the custom field component for adding and managing images. It accepts a `post` object and a `callback` function for updating the post data.
- **`modifyContent(content)`**: A function that modifies the content. In this case, it returns the content unchanged since no modification is required.

## ImageSliderField Component

The `ImageSliderField` component handles the user interface for adding and removing images. It provides the following features:

- **Add image URLs**: Users can input image URLs in a text field, and press "Enter" to add the URL to the image slider.
- **Preview images**: Displays a preview of the added images in a list with the option to remove any image.

### Props

- **`post`**: The current post object, which contains a list of images (`post.images`) and any other custom fields.
- **`onFieldChange`**: A callback function that is triggered when the field value changes (e.g., when images are added or removed).

### State

- **`images`**: A state array holding the list of image URLs added to the slider.

### Functions

- **`handleAddImage(url: string)`**:

  - Adds a new image URL to the `images` state and updates the `post.images` array.
  - Calls the `onFieldChange` callback to update the custom fields in the post.

- **`handleRemoveImage(index: number)`**:
  - Removes an image from the `images` state based on the provided index.
  - Updates the `post.images` array to reflect the change.

### Rendering

The component renders:

- A text input field for adding image URLs.
- A preview section showing added images with an option to remove each image.

## Example Usage

```tsx
import ImageSliderPlugin from './plugins/ImageSliderPlugin';

const post = { images: [] }; // The post object

// Callback function to handle changes in the custom field
const handleFieldChange = (key: string, value: any) => {
  console.log(`Field changed: ${key}`, value);
};

// Add the image slider field to the post
<ImageSliderPlugin.addFields(post, handleFieldChange) />
```

## Conclusion

The `ImageSliderPlugin` enables an interactive way to add and manage image sliders in posts. It provides an easy-to-use UI for adding image URLs, previewing them, and removing images, while keeping the post data in sync with the changes.
