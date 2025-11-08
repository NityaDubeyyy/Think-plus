import React, { useState } from 'react';
import { Switch } from './ui/switch';

export function TestSwitch() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Switch Component Test</h2>
      <div className="flex items-center space-x-2">
        <Switch
          checked={checked}
          onCheckedChange={setChecked}
          aria-label="Toggle switch"
        />
        <span>{checked ? 'On' : 'Off'}</span>
      </div>
    </div>
  );
}
