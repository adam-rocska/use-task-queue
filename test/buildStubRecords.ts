export default function buildStubRecords(
  ...fields: Array<() => any[]>
): Array<Record<any, any>>;
export default function buildStubRecords(
  ...variations: Array<Record<string, any[]>>
): Array<Record<any, any>>;
export default function buildStubRecords(
  ...args: Array<any>
): Array<Record<any, any>> {
  if (args.every(v => typeof v === 'object')) {
    const records = [];
    for (const shape of args) {
      records.push(...combine([{}], Object.entries(shape)));
    }
    return records;
  }

  return combine(
    [{}],
    args.map(field => [field.name, field()])
  );
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
    combinations.push(...records.map(record => ({...record, [field]: value})));
  }

  return combine(combinations, tail);
}
