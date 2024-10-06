import renderContent from './renderContent'

function getFieldValue(field: any) {
  if (field?.nodeType === 'document') {
    return renderContent(field)
  }

  if (field?.sys?.type === 'Asset') {
    return getAssetFields(field)
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

  fields['id'] = entry.sys.id
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

  if (arrayItem.sys.type === 'Asset') {
    const fields = getAssetFields(arrayItem)
    return fields
  }
  return getFieldValue(arrayItem)
}

function getAssetFields(assetItem) {
  const fields = {
    id: assetItem.sys.id,
    title: assetItem.fields.title,
    description: assetItem.fields.description,
    url: assetItem.fields.file.url,
    details: assetItem.fields.file.details,
    fileName: assetItem.fields.file.fileName,
    contentType: assetItem.fields.file.contentType,
  }

  return fields
}
