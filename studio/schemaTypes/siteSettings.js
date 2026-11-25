export default {
  name: 'siteSettings',
  title: 'Site Settings & Information',
  type: 'document',
  fields: [
    {
      name: 'announcementText',
      title: 'Top Announcement Banner Text',
      type: 'string',
      initialValue: 'Handcrafted with tradition · Wholesale & Retail Enquiries · Greater Noida',
    },
    {
      name: 'primaryWhatsAppNumber',
      title: 'Primary WhatsApp Number (for customer enquiries)',
      type: 'string',
      initialValue: '919555790429',
      description: 'Include country code without + or spaces (e.g. 919555790429)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'secondaryPhoneNumber',
      title: 'Secondary Phone / Landline (Optional display)',
      type: 'string',
      initialValue: '+91 95557 90429',
      description: 'Customer care phone number for voice calls',
    },
    {
      name: 'storeAddress',
      title: 'Store Physical Address',
      type: 'text',
      rows: 2,
      initialValue: 'Jagat Farm, Greater Noida, Gautam Buddha Nagar, Uttar Pradesh 201308',
    },
    {
      name: 'heroSlides',
      title: 'Homepage Hero Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Small Top Label', type: 'string' },
            { name: 'title', title: 'Main Headline', type: 'string' },
            { name: 'description', title: 'Sub-description', type: 'text', rows: 2 },
            {
              name: 'image',
              title: 'Slide Background Image (16:9 ratio)',
              type: 'image',
              options: { hotspot: true },
            },
            { name: 'link', title: 'Button Destination URL', type: 'string' },
            { name: 'linkText', title: 'Button Label', type: 'string' },
          ],
        },
      ],
    },
  ],
}
