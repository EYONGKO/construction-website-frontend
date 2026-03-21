export const BUSINESS_WHATSAPP_NUMBER = '237699529161';

const formatLine = (label, value) => `${label}: ${value}`;

export const openWhatsAppMessage = (message) => {
  const url = `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const popup = window.open(url, '_blank', 'noopener,noreferrer');

  if (!popup) {
    window.location.href = url;
  }
};

export const buildContactWhatsAppMessage = ({ name, email, message }) => [
  'Hello CEBAT Construction,',
  '',
  'I would like to contact your team.',
  '',
  formatLine('Name', name),
  formatLine('Email', email),
  '',
  'Message:',
  message
].join('\n');

const projectTypeLabels = {
  solar: 'Solar Installation',
  electrical: 'Electrical and Cabling',
  painting: 'Painting',
  plumbing: 'Plumbing',
  construction: 'Building Construction',
  pop: 'POP Installation',
  other: 'Other'
};

export const buildQuoteWhatsAppMessage = ({
  name,
  email,
  phone,
  projectType,
  description
}) => [
  'Hello CEBAT Construction,',
  '',
  'I would like to request a quote.',
  '',
  formatLine('Full Name', name),
  formatLine('Email', email),
  formatLine('Phone', phone),
  formatLine('Project Type', projectTypeLabels[projectType] || projectType),
  '',
  'Project Description:',
  description
].join('\n');
