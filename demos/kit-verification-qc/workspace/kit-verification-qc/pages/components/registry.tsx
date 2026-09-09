/**
 * the manufacturer — workspace component registry (compiled into core via `@wsx/registry`).
 * Server-safe: this file only maps names to components; the interactive
 * widgets live in ./widgets.tsx ('use client'). See docs/workspace-pages.md.
 */
import type { ComponentType } from 'react';
import { AnalyzeQueue, VisionEngines } from './widgets';

export const components: Record<string, ComponentType<Record<string, unknown>>> = {
  VisionEngines: VisionEngines as ComponentType<Record<string, unknown>>,
  AnalyzeQueue: AnalyzeQueue as ComponentType<Record<string, unknown>>,
};
