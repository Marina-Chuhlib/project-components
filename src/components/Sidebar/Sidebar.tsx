'use client';

import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export type SidebarItem = {
  label: string;
  children?: SidebarItem[];
};

type SidebarProps = {
  items: SidebarItem[];
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ items, open, onClose }: SidebarProps) {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  const toggleOpen = (label: string) => {
    setOpenMap(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const renderItems = (items: SidebarItem[], level = 0) =>
    items.map(item => {
      const hasChildren = !!item.children?.length;
      const isOpen = openMap[item.label] || false;

      return (
        <React.Fragment key={item.label}>
          <ListItemButton
            onClick={() => hasChildren ? toggleOpen(item.label) : undefined}
            sx={{ pl: 2 + level * 2 }}
          >
            <ListItemText primary={item.label} />
            {hasChildren ? (isOpen ? <ExpandLess /> : <ExpandMore />) : null}
          </ListItemButton>

          {hasChildren && (
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderItems(item.children!, level + 1)}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
    });

  return (
    <Drawer anchor="right" open={open} onClose={onClose}  >
      <List sx={{ width: 620 }}>
        {renderItems(items)}
        <Divider />
      </List>
    </Drawer>
  );
}

