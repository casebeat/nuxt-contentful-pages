import renderContent from './renderContent'

function getFieldValue(field: any, renderOptions: any) {
  if (field?.nodeType === 'document') {
    return renderContent(field, renderOptions)
  }
  return field
}

export const mapEntryFieldsToPage = <T>(entry: any, renderOptions: any): T => {
  if (!entry) return {} as T

  const fields: T = {} as T

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
    const fields = mapEntryFieldsToPage<any>(arrayItem, renderOptions)
    return fields
  }
  return getFieldValue(arrayItem, renderOptions)
}
