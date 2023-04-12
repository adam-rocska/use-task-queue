export default function buildStubRecords(
  ...fields: Array<() => any[]>
): Array<Record<any, any>>;
export default function buildStubRecords(
  ...variations: Array<Record<string, any[]>>
): Array<Record<any, any>>;
export default function buildStubRecords(
  ...args: Array<any>
): Array<Record<any, any>> {
  if (args.every(isObject)) {
    const records = [];
    for (const shape of args) {
      records.push(...combine(Object.entries(shape)));
    }
    return records;
  }

  return combine(args.map(toVariations));
}

function toVariations(factory: () => any[]): [field: string, values: any[]] {
  return [factory.name, factory()];
}

function combine(
  variations: [field: string, values: any[]][]
): Record<any, any>[] {
  const combinations: Record<any, any>[] = [{}];
  for (const [field, values] of variations) {
    const combinationCount = combinations.length;
    for (let i = 0; i < combinationCount; i++) {
      const record = combinations[i];
      for (const value of values) {
        combinations.push({...record, [field]: value});
      }
    }
    combinations.splice(0, combinationCount);
  }
  return combinations;
}

function isObject(v: any): v is object {
  return typeof v === 'object';
}
