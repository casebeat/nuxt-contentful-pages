import renderContent from './renderContent';

type EntryModel = {
}

function getFieldValue(field: any) {
  if (field?.nodeType === 'document') {
    return renderContent(field);
  }
  return field;
}

export const mapEntryFieldsToPage = <T>(entry: any) : T =>{
  if (!entry) return {} as T;

  const fields: T = {} as T;

  for (const [key] of Object.entries(entry.fields)) {
    // check if entry.fields[key] is an array
    if (Array.isArray(entry.fields[key])) {
      fields[key] = entry.fields[key].map((item: any) => getArrayItem(item));
    } else {
      fields[key] = getFieldValue(entry.fields[key]);
    }
  }

  return fields;
}

function getArrayItem(arrayItem: any) {
  if (arrayItem.sys.type === 'Entry') {
    const fields = mapEntryFieldsToPage<EntryModel>(arrayItem);
    return fields;
  }
  return getFieldValue(arrayItem);
}
