import renderContent from './renderContent'

function getFieldValue(field: any) {
  if (field?.nodeType === 'document') {
    return renderContent(field)
  }
  return field
}

export const renderEntryFields = (entry: any): any => {
  if (!entry) return {}

  const fields = {}
  for (const [key] of Object.entries(entry.fields)) {
    // check if entry.fields[key] is an array
    if (Array.isArray(entry.fields[key])) {
      fields[key] = entry.fields[key].map((item: any) => getArrayItem(item))
    }
    else {
      fields[key] = getFieldValue(entry.fields[key])
    }
  }

  return fields
}

function getArrayItem(arrayItem: any) {
  // if arrayItem is string, return it
  if (typeof arrayItem === 'string') {
    return arrayItem
  }

  if (arrayItem.sys.type === 'Entry') {
    const fields = renderEntryFields(arrayItem)
    return fields
  }
  return getFieldValue(arrayItem)
}
