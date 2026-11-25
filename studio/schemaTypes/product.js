export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Product Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL identifier)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'images',
      title: 'Product Photographs',
      type: 'array',
      description: 'Upload high-res photos. Automatically framed to 4:5 ratio with focal point preservation.',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text (for SEO)',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).error('At least one product image is required'),
    },
    {
      name: 'description',
      title: 'Product Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'isFeatured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'isNewArrival',
      title: 'New Arrival',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'inStock',
      title: 'Availability Status (In Stock)',
      type: 'boolean',
      initialValue: true,
      description: 'Turn off if temporarily unavailable',
    },
  ],
}
