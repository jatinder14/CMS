'use client';

import { availablePlugins } from '@/types/plugins';

// PluginManager.ts
export const pluginManager = {
  getAvailablePlugins() {
    return availablePlugins;
  },

  // Check if localStorage is available and the plugin is enabled
  isEnabled(pluginName: string) {
    if (typeof window !== 'undefined') {
      // Ensure we're on the client side
      const enabledPlugins = JSON.parse(
        localStorage.getItem('enabledPlugins') || '{}'
      );
      return enabledPlugins[pluginName] === true;
    }
    return false;
  },

  // Enable a plugin
  enablePlugin(pluginName: string) {
    if (typeof window !== 'undefined') {
      // Ensure we're on the client side
      const enabledPlugins = JSON.parse(
        localStorage.getItem('enabledPlugins') || '{}'
      );
      enabledPlugins[pluginName] = true;
      localStorage.setItem('enabledPlugins', JSON.stringify(enabledPlugins));
    }
  },

  // Disable a plugin
  disablePlugin(pluginName: string) {
    if (typeof window !== 'undefined') {
      // Ensure we're on the client side
      const enabledPlugins = JSON.parse(
        localStorage.getItem('enabledPlugins') || '{}'
      );
      enabledPlugins[pluginName] = false;
      localStorage.setItem('enabledPlugins', JSON.stringify(enabledPlugins));
    }
  },

  // Get all enabled plugins
  getEnabledPlugins() {
    if (typeof window !== 'undefined') {
      // Ensure we're on the client side
      const enabledPlugins = JSON.parse(
        localStorage.getItem('enabledPlugins') || '{}'
      );
      return Object.keys(enabledPlugins).filter((key) => enabledPlugins[key]);
    }
    return []; // Return an empty array on the server-side
  },

  // Retrieve custom fields from enabled plugins
  async getCustomFields(post: any, callback: any) {
    const enabledPlugins = this.getEnabledPlugins(); // Retrieve enabled plugins
    const fields: any[] = [];

    for (const plugin of availablePlugins) {
      if (enabledPlugins.includes(plugin.name)) {
        try {
          const pluginModule = await import(
            `./${plugin.instance.componentName}`
          );
          if (pluginModule.default['addFields']) {
            fields.push(pluginModule.default['addFields'](post, callback)); // Call the function dynamically
          } else {
            console.warn(`Function addFields not found in ${plugin.instance}`);
          }
        } catch (error) {
          console.error(
            `Failed to load or call function addFields from ${plugin.name}`,
            error
          );
        }
      }
    }
    return fields;
  },
};
