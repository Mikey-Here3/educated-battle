/**
 * Central Platform Configuration
 * Educated Gamer — Free Fire Esports Tournament Arena
 */

export const PLATFORM_CONFIG = {
  brandName: 'Educated Gamer',
  brandShort: 'EG',
  tagline: 'Pakistan Free Fire Tournament Arena',
  currency: 'PKR',
  country: 'Pakistan',
  countryFlag: '🇵🇰',

  // Official Channels
  youtubeChannelUrl: 'https://www.youtube.com/channel/UCNCXkynVdk3Xt2MHjMwHXaw',
  whatsappChannelUrl: 'https://whatsapp.com/channel/0029VbD6gJE3WHTOMOkx252G',

  // Official WhatsApp Support
  whatsappSupportPhone: '03190799711',
  whatsappSupportIntl: '923190799711',
  defaultSupportMessage: 'Hello Educated Gamer Admin, I need help with a tournament.',

  // Payment Accounts
  jazzCash: {
    accountNumber: '03190799711',
    accountTitle: 'Ashan Akhtar',
  },
  easyPaisa: {
    accountNumber: '03190799711',
    accountTitle: 'Ashan Akhtar',
  },
};

/**
 * Generate direct WhatsApp chat URL with custom or default message
 */
export function getWhatsAppSupportUrl(message?: string): string {
  const text = encodeURIComponent(message || PLATFORM_CONFIG.defaultSupportMessage);
  return `https://wa.me/${PLATFORM_CONFIG.whatsappSupportIntl}?text=${text}`;
}

/**
 * Generate direct WhatsApp chat URL for specific tournament query
 */
export function getWhatsAppTournamentQueryUrl(tournamentTitle: string, tournamentId: string): string {
  const text = encodeURIComponent(
    `Hello Educated Gamer Admin, I have a question about tournament: "${tournamentTitle}" (ID: ${tournamentId}).`
  );
  return `https://wa.me/${PLATFORM_CONFIG.whatsappSupportIntl}?text=${text}`;
}
