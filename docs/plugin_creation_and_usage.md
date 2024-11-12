# Plugin Creation and Usage Guide for Developers

This guide provides detailed instructions on how to create and use plugins in the application, including setting up a plugin interface, managing plugin state, and interacting with the `pluginManager` and `PluginManagerUI` components.

## Overview

Plugins allow developers to extend the functionality of the application without modifying the core code. The plugin system consists of three main parts:

1. **Plugin Interface**: Defines the structure and functionality of a plugin.
2. **pluginManager**: A utility that manages the state of plugins (enabled/disabled) and handles dynamic interactions.
3. **PluginManagerUI**: A component that provides a user interface for managing plugins.

---

## Creating a Plugin

To create a plugin, you must define it using the `Plugin` interface. Below is a breakdown of the required and optional properties:

### Plugin Interface

The `Plugin` interface outlines the structure for a plugin. It includes the following properties:

- **`name`**: (string) The name of the plugin.
- **`componentName`**: (string) The component name associated with the plugin.
- **`initialize()`** (optional): A function to run when the plugin is initialized, typically used for setup.
- **`addFields(post, callback)`** (optional): A function to add custom fields to a post. It accepts the following parameters:
  - `post`: The post object to be passed to the `addFields` function of the plugin.
  - `callback`: An optional callback function used when the post data changes.
- **`modifyContent(content)`** (optional): A function to modify the content before rendering or saving.

### Example Plugin

Here's an example of a simple plugin that adds custom fields to a post:

```typescript
import React from 'react';

const CustomFieldsPlugin = {
  name: 'Custom Fields Plugin',
  componentName: 'CustomFieldsPlugin',
  initialize() {
    console.log('Custom Fields Plugin Initialized');
  },
  addFields(post, callback) {
    return (
      <div>
        <label>
          Custom Field:
          <input type="text" onChange={(e) => callback(e.target.value)} />
        </label>
      </div>
    );
  },
  modifyContent(content) {
    return `${content} (Modified by Custom Fields Plugin)`;
  },
};

export default CustomFieldsPlugin;
```

---

## Adding a Plugin to availablePlugins

Once a plugin is created, it can be added to the availablePlugins array. The availablePlugins array lists all the plugins that are available for use in the application. Here's an example of how to add the CustomFieldsPlugin to the availablePlugins array:

```typescript
import CustomFieldsPlugin from './plugins/CustomFieldsPlugin';

export const availablePlugins = [
  {
    id: 1,
    name: 'Custom Fields Plugin',
    description: 'Adds custom fields to a post.',
    instance: CustomFieldsPlugin,
    isEnabled: false, // Default state (plugin is not enabled)
  },
];
```

---

## Managing Plugins with pluginManager

The `pluginManager` is responsible for enabling and disabling plugins, as well as managing their state. It provides the following methods:

### 1. getAvailablePlugins()

- **Description:** Returns the list of available plugins.
- **Returns:** An array of available plugin names from the availablePlugins list.

### 2. isEnabled(pluginName: string)

- **Description:** Checks whether a plugin is enabled or not.
- **Parameters:**
  - `pluginName`: The name of the plugin to check.
- **Returns:** `true` if the plugin is enabled, otherwise `false`.

### 3. enablePlugin(pluginName: string)

- **Description:** Enables a plugin by adding it to the enabledPlugins list stored in localStorage.
- **Parameters:**
  - `pluginName`: The name of the plugin to enable.

### 4. disablePlugin(pluginName: string)

- **Description:** Disables a plugin by removing it from the enabledPlugins list in localStorage.
- **Parameters:**
  - `pluginName`: The name of the plugin to disable.

### 5. getEnabledPlugins()

- **Description:** Retrieves a list of all enabled plugins.
- **Returns:** An array of plugin names that are currently enabled.

### 6. getCustomFields(post: any, callback: Function)

- **Description:** Retrieves custom fields from enabled plugins. Dynamically imports the plugin modules and calls their `addFields` function if it exists.
- **Parameters:**
  - `post`: The post data to be passed to the addFields function of the plugins.
  - `callback`: A callback function that may be used by the plugins.
- **Returns:** A promise that resolves to an array of custom fields from enabled plugins.

---

## Managing Plugins with PluginManagerUI

The `PluginManagerUI` component provides a user interface for managing plugins. It allows users to enable or disable plugins via a toggle switch and confirms the action with a modal.

### Key Features of `PluginManagerUI`

- Displays a list of available plugins.
- Toggles the state (enable/disable) of each plugin.
- Shows a confirmation modal before applying changes.

### Example Usage of PluginManagerUI

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

### Methods

- `handleTogglePlugin(pluginName: string):` Opens the modal to confirm the action.
- `confirmTogglePlugin():` Confirms the action to enable or disable the plugin.
- `closeModal():` Closes the modal without making changes.

---

## Example of Full Plugin Flow

### 1. Creating the Plugin

```typescript
import React from 'react';

const MyPlugin = {
  name: 'My Custom Plugin',
  componentName: 'MyCustomPlugin',
  initialize() {
    console.log('My Custom Plugin Initialized');
  },
  addFields(post, callback) {
    return (
      <div>
        <label>
          Custom Input:
          <input type="text" onChange={(e) => callback(e.target.value)} />
        </label>
      </div>
    );
  },
  modifyContent(content) {
    return `${content} (Modified by My Custom Plugin)`;
  },
};

export default MyPlugin;
```

### 2. Adding the Plugin to availablePlugins

```typescript
import MyPlugin from './plugins/MyPlugin';

export const availablePlugins = [
  {
    id: 2,
    name: 'My Custom Plugin',
    description: 'A custom plugin that adds input fields.',
    instance: MyPlugin,
    isEnabled: false,
  },
];
```

### 3. Enabling a Plugin

In the `PluginManagerUI` component, plugins can be enabled or disabled via a toggle switch. The state of enabled plugins is tracked using `localStorage`, allowing persistence across sessions. Here is how the plugin enabling and disabling process works:

#### 1. Toggling Plugin State

Each plugin has a corresponding toggle switch. When the user toggles a plugin, a confirmation modal appears, asking for confirmation before enabling or disabling the plugin. The modal dynamically checks whether the plugin is enabled and prompts the user to either activate or deactivate it.

#### 2. Confirmation Modal

The modal ensures that the user confirms their action before enabling or disabling a plugin. If the plugin is already enabled, the modal will ask if the user wants to deactivate it, and vice versa.

#### 3. Updating Plugin State in `localStorage`

Once the user confirms the action, the `pluginManager` either enables or disables the plugin by updating the state stored in `localStorage`. This allows the application to track the enabled plugins across page reloads.

### 4. Retrieving Custom Fields

```typescript
pluginManager.getCustomFields(post, callback).then((customFields) => {
  console.log(customFields); // Custom fields from My Custom Plugin
});
```

## Conclusion

The plugin system enables developers to easily extend the functionality of an application without altering its core code. By following the steps above, developers can create custom plugins, integrate them with the `pluginManager`, and offer a seamless user experience with the `PluginManagerUI` component.
