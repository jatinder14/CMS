'use client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import dynamic from 'next/dynamic';
import PluginManagerUI from './PluginManagerUI';

export default function Plugins() {
  return (
    <div className="w-full p-4 mx-auto flex max-w-screen-xl flex-col">
      <div>
        <PluginManagerUI />
      </div>
    </div>
  );
}
