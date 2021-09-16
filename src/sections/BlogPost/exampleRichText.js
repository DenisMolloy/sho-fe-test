const exampleRichText = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'This is a normal paragraph.',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        italic: true,
        text: 'This is an italic paragraph.',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        strikethrough: true,
        text: 'This is a strikethrough paragraph.',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        underline: true,
        text: 'This is an underlined paragraph.',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
      {
        url: 'https://getshogun.com/',
        type: 'link',
        children: [
          {
            text: 'This is a link.',
          },
        ],
        external: true,
      },
      {
        text: '',
      },
    ],
  },
  {
    alt: '',
    url: 'https://f.shgcdn.com/11e82e07-26f9-46b5-9dde-f1f46d7a9203/',
    type: 'image',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'separator',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'bulletedList',
    children: [
      {
        type: 'listItem',
        children: [
          {
            text: 'This',
          },
        ],
      },
      {
        type: 'listItem',
        children: [
          {
            text: 'is a normal',
          },
        ],
      },
      {
        type: 'listItem',
        children: [
          {
            text: 'list',
          },
        ],
      },
    ],
  },
  {
    type: 'numberedList',
    children: [
      {
        type: 'listItem',
        children: [
          {
            text: 'This',
          },
        ],
      },
      {
        type: 'listItem',
        children: [
          {
            text: 'is a numbered',
          },
        ],
      },
      {
        type: 'listItem',
        children: [
          {
            text: 'list',
          },
        ],
      },
    ],
  },
  {
    type: 'h1',
    children: [
      {
        text: 'This is a heading level 1',
      },
    ],
  },
  {
    type: 'h2',
    children: [
      {
        text: 'This is a heading level 2',
      },
    ],
  },
  {
    type: 'h3',
    children: [
      {
        text: 'This is a heading level 3',
      },
    ],
  },
]
export default exampleRichText
