import type { Platform } from '../types';

export const PLATFORMS: Platform[] = [
  {
    id: 'twitter',
    name: 'X / Twitter',
    shortName: 'X',
    color: '#e2e8f0',
    bgColor: 'rgba(226,232,240,0.12)',
    emoji: '𝕏',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    shortName: 'IG',
    color: '#f9a8d4',
    bgColor: 'rgba(249,168,212,0.12)',
    emoji: '📸',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    shortName: 'TT',
    color: '#67e8f9',
    bgColor: 'rgba(103,232,249,0.12)',
    emoji: '♪',
  },
  {
    id: 'reddit',
    name: 'Reddit',
    shortName: 'Reddit',
    color: '#fb923c',
    bgColor: 'rgba(251,146,60,0.12)',
    emoji: '🤖',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    shortName: 'YT',
    color: '#f87171',
    bgColor: 'rgba(248,113,113,0.12)',
    emoji: '▶',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    shortName: 'FB',
    color: '#93c5fd',
    bgColor: 'rgba(147,197,253,0.12)',
    emoji: '👥',
  },
  {
    id: 'threads',
    name: 'Threads',
    shortName: 'Threads',
    color: '#d1d5db',
    bgColor: 'rgba(209,213,219,0.12)',
    emoji: '🧵',
  },
  {
    id: 'bluesky',
    name: 'Bluesky',
    shortName: 'BSky',
    color: '#60a5fa',
    bgColor: 'rgba(96,165,250,0.12)',
    emoji: '🦋',
  },
];

export const PLATFORM_MAP = Object.fromEntries(
  PLATFORMS.map(p => [p.id, p])
) as Record<string, Platform>;
