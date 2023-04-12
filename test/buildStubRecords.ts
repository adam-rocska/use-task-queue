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
      records.push(...combine([{}], Object.entries(shape)));
    }
    return records;
  }

  return combine([{}], args.map(toVariations));
}

function toVariations(factory: () => any[]): [field: string, values: any[]] {
  return [factory.name, factory()];
}

function combine(
  records: Record<any, any>[],
  variations: [field: string, values: any[]][]
): Record<any, any>[] {
  if (variations.length === 0) return records;
  const [field, values] = variations[0]!;
  const tail = variations.slice(1);
  const combinations = [];
  for (const value of values) {
    for (const record of records) {
      combinations.push({...record, [field]: value});
    }
  }

  return combine(combinations, tail);
}

function isObject(v: any): v is object {
  return typeof v === 'object';
}
