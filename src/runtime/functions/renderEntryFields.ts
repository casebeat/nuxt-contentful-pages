import renderContent from './renderContent'

function getFieldValue(field: any, renderOptions: any) {
  if (field?.nodeType === 'document') {
    return renderContent(field, renderOptions)
  }
  return field
}

export const renderEntryFields = (entry: any, renderOptions: any): any => {
  if (!entry) return {}

  const fields = {}
  for (const [key] of Object.entries(entry.fields)) {
    // check if entry.fields[key] is an array
    if (Array.isArray(entry.fields[key])) {
      fields[key] = entry.fields[key].map((item: any) => getArrayItem(item, renderOptions))
    }
    else {
      fields[key] = getFieldValue(entry.fields[key], renderOptions)
    }
  }

  return fields
}

function getArrayItem(arrayItem: any, renderOptions: any) {
  if (arrayItem.sys.type === 'Entry') {
    const fields = renderEntryFields(arrayItem, renderOptions)
    return fields
  }
  return getFieldValue(arrayItem, renderOptions)
}
