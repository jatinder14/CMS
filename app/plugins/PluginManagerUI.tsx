'use client';
import { useState } from 'react';
import { pluginManager } from '@/app/plugins/PluginManager';
import Switch from '@mui/joy/Switch';
import { Button, Modal, Box } from '@mui/material';

export default function PluginManagerUI() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [availablePlugins, setAvailablePlugins] = useState(
    pluginManager.getAvailablePlugins()
  );
  const [enabledPlugins, setEnabledPlugins] = useState(
    pluginManager.getEnabledPlugins()
  );
  const [openModal, setOpenModal] = useState(false);
  const [currentPlugin, setCurrentPlugin] = useState<any>(null);

  const handleTogglePlugin = (pluginName: string) => {
    setCurrentPlugin(pluginName);
    setOpenModal(true); // Show confirmation modal
  };

  const confirmTogglePlugin = () => {
    if (pluginManager.isEnabled(currentPlugin)) {
      pluginManager.disablePlugin(currentPlugin);
    } else {
      pluginManager.enablePlugin(currentPlugin);
    }
    setEnabledPlugins(pluginManager.getEnabledPlugins());
    setOpenModal(false); // Close the modal
  };

  const closeModal = () => {
    setOpenModal(false);
    setCurrentPlugin(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-8">Plugin Manager</h2>

      <div className="mb-6">
        <h3 className="font-semibold text-xl gap-3 mb-8">Available Plugins</h3>
        {availablePlugins.length > 0 ? (
          <ul className="space-y-4">
            {availablePlugins.map((plugin) => (
              <li
                key={plugin.id}
                className="flex justify-between items-center p-3  border rounded-lg shadow-md"
              >
                <div>
                  <span className="text-lg font-medium">{plugin.name}</span>
                  <p className="text-sm ">{plugin.description}</p>
                </div>
                <div>
                  <Switch
                    checked={enabledPlugins.includes(plugin.name)}
                    onChange={() => handleTogglePlugin(plugin.name)}
                    endDecorator={
                      enabledPlugins.includes(plugin.name)
                        ? 'Active'
                        : 'Inactive'
                    }
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No available plugins.</p>
        )}
      </div>

      {/* Modal for confirmation */}
      <Modal
        open={openModal}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'red',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <h2 id="modal-title" className="text-xl font-bold mb-4">
            Confirm Plugin Action
          </h2>
          <p id="modal-description" className="mb-4 ">
            Are you sure you want to{' '}
            {pluginManager.isEnabled(currentPlugin) ? 'deactivate' : 'activate'}{' '}
            the <span className="font-semibold">{currentPlugin}</span> plugin?
          </p>
          <div className="flex justify-end gap-4">
            <Button variant="outlined" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color={
                pluginManager.isEnabled(currentPlugin) ? 'error' : 'primary'
              }
              onClick={confirmTogglePlugin}
            >
              {pluginManager.isEnabled(currentPlugin)
                ? 'Deactivate'
                : 'Activate'}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
