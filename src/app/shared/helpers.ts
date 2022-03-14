

export function groupBy(objectArray: any[], property: any) {
  return objectArray.reduce((total: any, obj: any) => {
    let key = obj[property];
    if (!total[key]) {
      total[key] = [];
    }
    total[key].push(obj);
    return total;
  }, {});
}
