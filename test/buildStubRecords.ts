export default function buildStubRecords(variations: Record<string, any[]>): Array<Record<any, any>>;
export default function buildStubRecords(...fields: Array<() => any[]>): Array<Record<any, any>>;
export default function buildStubRecords(...variations: Array<Record<string, any[]>>): Array<Record<any, any>>;
export default function buildStubRecords(...args: Array<any>): Array<Record<any, any>> {
  if (args.every(v => typeof v === 'object')) {
    return args.map(o => buildStubRecords(
      ...Object
        .entries(o)
        .map(([name, variations]) => {
          if (typeof name !== 'string') throw "Only string names accepted.";
          if (!Array.isArray(variations)) throw "Only arrays of variations accepted.";
          const factory = () => variations;
          Object.defineProperty(factory, 'name', {
            value: name,
            writable: false,
            enumerable: true
          });
          return factory;
        })
    ));
  }
  if (!args.every(v => typeof v === 'function')) throw "Variation factories expected.;"

  type Variation = [field: string, values: any[]];
  const variations = args.map(field => [field.name, field()] as Variation);

  function combine(records: Record<any,any>[], variations: Variation[]): Record<any, any>[] {
    if (variations[0] === undefined) return records;
    const [field, values] = variations[0];
    const tail = variations.slice(1);
    values
    .map(value => records.map(record => ({...record, [field]: value})))
    .reduce((a, b) => a.concat(b), [])

    return combine(records, tail);
  }

  return combine([], variations);
}