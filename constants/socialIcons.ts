
import { Facebook, Instagram, Linkedin, TikTok, Twitter, Youtube } from '@/components/icons/social-media';

export const SOCIAL_ICONS = {
  instagram: {
    icon: Instagram,
    className:
      "bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]",
  },
  linkedin: {
    icon: Linkedin,
    className: "bg-[#0e76a8]",
  },
  facebook: {
    icon: Facebook,
    className: "bg-[#3b5998]",
  },
  youtube: {
    icon: Youtube,
    className: "bg-[#c4302b]",
  },
  twitter: {
    icon: Twitter,
    className: "bg-white text-black",
  },
  tiktok: {
    icon: TikTok,
    className: "bg-black",
  },
} as const;

export type SocialKey = keyof typeof SOCIAL_ICONS;
export function isSocialKey(key: string): key is SocialKey {
  return key in SOCIAL_ICONS;
}