export function updateItemInArray(
  array: Array<any>,
  newProperties: any,
  key: string
): Array<any> {
  return array.map((item: any) => {
    if (newProperties[key] !== item[key]) {
      return item;
    }

    return {
      ...item,
      ...newProperties
    };
  });
}

export function removeItemFromArray(
  array: Array<any>,
  key: string,
  value: any
): Array<any> {
  return array.filter(item => item[key] !== value);
}
