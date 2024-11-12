# `pluginManager` Documentation

# Table of Contents

1. [Description](#description)
2. [Key Features](#key-features)
3. [State](#state)
4. [Methods](#methods)
   - [handleTogglePlugin(pluginName: string)](#handletogglepluginpluginname-string)
   - [confirmTogglePlugin()](#confirmtoggleplugin)
   - [closeModal()](#closemodal)
5. [Component Layout](#component-layout)
   - [Available Plugins Section](#available-plugins-section)
   - [Modal](#modal)
6. [Example Usage](#example-usage)
7. [Dependencies](#dependencies)
8. [Plugin Restrictions](./plugin_restrictions.md)
9. [Plugin Creation and Usage](./plugin_creation_and_usage.md)
10. [Image Slider Plugin](./ImageSliderPlugin.md)
11. [Conclusion](#conclusion)

## Description

The `pluginManager` is a utility object that provides methods to manage plugins in a client-side application. It allows for retrieving available plugins, enabling or disabling plugins, and handling custom fields from enabled plugins.

## Methods

### `getAvailablePlugins()`

- **Description**: Returns the list of available plugins.
- **Returns**: An array of available plugin names from the `availablePlugins` list.

### `isEnabled(pluginName: string)`

- **Description**: Checks whether a specific plugin is enabled or not.
- **Parameters**:
  - `pluginName` (string): The name of the plugin to check.
- **Returns**: `true` if the plugin is enabled, otherwise `false`.

### `enablePlugin(pluginName: string)`

- **Description**: Enables a plugin by adding it to the `enabledPlugins` list stored in `localStorage`.
- **Parameters**:
  - `pluginName` (string): The name of the plugin to enable.

### `disablePlugin(pluginName: string)`

- **Description**: Disables a plugin by removing it from the `enabledPlugins` list in `localStorage`.
- **Parameters**:
  - `pluginName` (string): The name of the plugin to disable.

### `getEnabledPlugins()`

- **Description**: Retrieves a list of all enabled plugins.
- **Returns**: An array of plugin names that are currently enabled.

### `getCustomFields(post: any, callback: Function)`

- **Description**: Retrieves custom fields from the enabled plugins. It dynamically imports the plugin modules and calls their `addFields` function if it exists.
- **Parameters**:
  - `post` (any): The post data to be passed to the `addFields` function of the plugins.
  - `callback` (Function): A callback function that may be used by the plugins.
- **Returns**: A promise that resolves to an array of custom fields from the enabled plugins.

## Example Usage

```typescript
import { pluginManager } from './PluginManager';

// Get all available plugins
const availablePlugins = pluginManager.getAvailablePlugins();
console.log(availablePlugins);

// Check if a specific plugin is enabled
const isPluginEnabled = pluginManager.isEnabled('Sample Plugin');
console.log(isPluginEnabled);

// Enable a plugin
pluginManager.enablePlugin('Sample Plugin');

// Disable a plugin
pluginManager.disablePlugin('New Plugin');

// Get all enabled plugins
const enabledPlugins = pluginManager.getEnabledPlugins();
console.log(enabledPlugins);

// Get custom fields from enabled plugins
pluginManager.getCustomFields(post, callback).then((customFields) => {
  console.log(customFields);
});
```

## Storage Mechanism

The `pluginManager` relies on the `localStorage` API to persist the state of enabled and disabled plugins:

- The list of enabled plugins is stored as a JSON object in `localStorage` under the key `enabledPlugins`.
- Each plugin's enabled state is represented as a boolean value (`true` for enabled, `false` for disabled).

## Notes

- **Dynamic Import:** The `getCustomFields` method uses dynamic imports to load plugin components at runtime. This allows plugins to be loaded only when necessary, improving performance.

- **Error Handling:** The `getCustomFields` method includes error handling in case the plugin module or the `addFields` function is not found.

# PluginManagerUI Component Documentation

## Description

The `PluginManagerUI` component allows users to manage plugins in the application. It provides a list of available plugins and allows users to enable or disable them via a switch. When toggling a plugin's state, a confirmation modal is displayed to ensure that the user wants to proceed with the action.

## Key Features

- Display a list of available plugins.
- Toggle the state (enable/disable) of each plugin.
- Confirm the action via a modal before making any changes.
- Update the UI dynamically based on the plugin states.

## State

The component uses the following states:

- **`availablePlugins`**: Stores the list of available plugins fetched from the `pluginManager`.
- **`enabledPlugins`**: Stores the list of currently enabled plugins.
- **`openModal`**: Controls the visibility of the confirmation modal.
- **`currentPlugin`**: Tracks the plugin that is being toggled for activation or deactivation.

## Methods

### `handleTogglePlugin(pluginName: string)`

- **Description**: Sets the `currentPlugin` to the plugin being toggled and opens the modal to confirm the action.
- **Parameters**:
  - `pluginName` (string): The name of the plugin to toggle.

### `confirmTogglePlugin()`

- **Description**: Confirms the action to either enable or disable the `currentPlugin`. It updates the `enabledPlugins` state and closes the modal.
- **Logic**:
  - If the plugin is enabled, it will be disabled.
  - If the plugin is disabled, it will be enabled.

### `closeModal()`

- **Description**: Closes the modal and resets the `currentPlugin` to `null`.

## Component Layout

### Available Plugins Section

- **Plugin List**: Displays each available plugin with a switch to toggle its state.
  - **Plugin Name**: The name of the plugin.
  - **Description**: A brief description of the plugin.
  - **Switch**: Allows the user to toggle the plugin's state.
    - **Active/Inactive**: Displays the state of the plugin.

### Modal

- **Title**: "Confirm Plugin Action"
- **Description**: Prompts the user to confirm whether they want to activate or deactivate the plugin.
- **Actions**:
  - **Cancel**: Closes the modal without making changes.
  - **Activate/Deactivate**: Executes the action to either activate or deactivate the selected plugin.

## Example Usage

```tsx
import PluginManagerUI from './PluginManagerUI';

function App() {
  return (
    <div className="App">
      <PluginManagerUI />
    </div>
  );
}
```

## Dependencies

- `@mui/joy` for the Switch component.
- `@mui/material` for the Modal, Box, Button components.

## Conclusion

The `PluginManagerUI` component offers a user-friendly interface for managing plugins. By integrating with the `pluginManager`, it enables users to easily toggle plugin states with confirmation and visual feedback.

---

# Plugin System Documentation

## Overview

This system defines the structure for plugins that can be integrated into an application. Plugins allow for extending the functionality of the application without altering its core code. The `Plugin` interface outlines the required and optional properties for creating plugins, while the `availablePlugins` array lists the plugins that are available for use.

## Plugin Interface

The `Plugin` interface is used to define the properties and methods of a plugin. It includes the following properties:

### Properties

- **`name`**: A string representing the name of the plugin.
- **`componentName`**: A string representing the component name that is associated with the plugin.
- **`initialize()`** (optional): A function that runs when the plugin is initialized. This function is typically used for setting up the plugin.
- **`addFields(post, callback)`** (optional): A function that returns JSX elements, used to add custom fields to a post. It accepts two parameters:
  - `post`: The current post object.
  - `callback` (optional): A function that is called when the post data changes.
- **`modifyContent(content)`** (optional): A function that modifies the content. This function is used if the plugin needs to alter the content before it's rendered or saved.

## Available Plugins

The `availablePlugins` array is a list of plugins that are available to be used in the application. Each plugin in this array is represented by an object with the following properties:

### Properties

- **`id`**: A unique identifier for the plugin.
- **`name`**: The name of the plugin.
- **`description`**: A brief description of what the plugin does.
- **`instance`**: The actual plugin instance (e.g., the plugin component).
- **`isEnabled`**: A boolean value indicating whether the plugin is enabled or not. The default state is `false`.

### Example of Available Plugins Array

```ts
export const availablePlugins = [
  {
    id: 3,
    name: 'Image Slider',
    description: 'This is an image slider plugin',
    instance: ImageSliderPlugin,
    isEnabled: false, // Default state (plugin is not enabled)
  },
];
```
