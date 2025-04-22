'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  id?: string;
  children: React.ReactNode;
}
export function PortalRoot({ id = 'portal-root', children }: Props) {
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const portalRoot = document.getElementById(id);
    if (portalRoot) {
      setRoot(portalRoot);
    }
  }, []);

  if (!root) return null;
  return createPortal(children, root);
}
