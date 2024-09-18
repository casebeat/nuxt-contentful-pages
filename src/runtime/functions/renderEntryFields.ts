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

function getAssetFields(assetItem){
  const fields = {
    title: assetItem.fields.title,
    description: assetItem.fields.description,
    url: assetItem.fields.file.url,
    details: assetItem.fields.file.details,
    fileName: assetItem.fields.file.fileName,
    contentType: assetItem.fields.file.contentType
  }

  return fields
}

// {
//   "metadata": {
//     "tags": []
//   },
//   "sys": {
//     "space": {
//       "sys": {
//         "type": "Link",
//         "linkType": "Space",
//         "id": "kfo48pzxnsin"
//       }
//     },
//     "id": "1YzIanKdn9bo1kOIIr77CQ",
//     "type": "Asset",
//     "createdAt": "2024-09-09T13:42:04.557Z",
//     "updatedAt": "2024-09-09T13:42:04.557Z",
//     "environment": {
//       "sys": {
//         "id": "master",
//         "type": "Link",
//         "linkType": "Environment"
//       }
//     },
//     "revision": 1,
//     "locale": "en-US"
//   },
//   "fields": {
//     "title": "preem-logo",
//     "description": "",
//     "file": {
//       "url": "//images.ctfassets.net/kfo48pzxnsin/1YzIanKdn9bo1kOIIr77CQ/d14f7ffc9a081cd599b873e07817e6dd/preem-logo.png",
//       "details": {
//         "size": 64709,
//         "image": {
//           "width": 800,
//           "height": 799
//         }
//       },
//       "fileName": "preem-logo.png",
//       "contentType": "image/png"
//     }
//   }
// }