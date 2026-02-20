export default (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home Page')
                .child(
                  S.document().schemaType('homePage').documentId('homePage')
                ),
              S.listItem()
                .title('About Page')
                .child(
                  S.document().schemaType('aboutPage').documentId('aboutPage')
                ),
              S.listItem()
                .title('Blog Page')
                .child(
                  S.document().schemaType('blogPage').documentId('blogPage')
                ),
              S.listItem()
                .title('Contact Page')
                .child(
                  S.document()
                    .schemaType('contactPage')
                    .documentId('contactPage')
                ),
              S.listItem()
                .title('Login Page')
                .child(
                  S.document().schemaType('loginPage').documentId('loginPage')
                )
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('post').title('Posts'),
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('author').title('Authors')
            ])
        ),
      S.divider(),
      S.listItem()
        .title('SEO')
        .child(
          S.list()
            .title('SEO')
            .items([
              S.listItem()
                .title('Default SEO')
                .child(S.document().schemaType('seo').documentId('seo')),
              S.listItem()
                .title('Site Settings')
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                )
            ])
        )
    ]);
