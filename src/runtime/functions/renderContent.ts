import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'

export default function renderContent(content: any) {
  const options = {
    renderNode: {
      // render hyperlink
      [INLINES.ENTRY_HYPERLINK]: (node) => {
        const { slug } = node.data.target.fields
        return `<a href="/${slug}">${node.content[0].value}</a>`
      },
      // render image
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { url } = node.data.target.fields.file
        const alt = node.data.target.fields.description
        return `<img src="${url}" alt="${alt}">`
      },
    },
  }

  // Convert the rich text field to HTML
  const html = documentToHtmlString(content, options)

  return html
}
