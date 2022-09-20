export default {
  widgets: [
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '63299069014a90776cd74f61',
                  title: 'Sanity Studio',
                  name: 'sanity-kitchen-sink-studio-kk7fjdvj',
                  apiId: 'c25b04b1-fb39-42a5-8768-693bd1c1685f'
                },
                {
                  buildHookId: '63299069f476dc7c48c5d79b',
                  title: 'Blog Website',
                  name: 'sanity-kitchen-sink-web-w9ptt6gy',
                  apiId: '995a64ab-fb6c-4b4b-81df-b2f931a21d28'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/esleire/sanity-kitchen-sink',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://sanity-kitchen-sink-web-w9ptt6gy.netlify.app', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
