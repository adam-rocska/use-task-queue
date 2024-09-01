import buildStubRecords from '!test/buildStubRecords';

describe('buildStubRecords()', () => {
  it('should return an empty array', () => {
    expect(buildStubRecords()).toEqual([]);
  });

  describe('function buildStubRecords(...variations: Array<Record<string, any[]>>): Array<Record<any, any>>;', () => {
    it('should return an array of simpleRecords', () => {
      function field() {
        return [1, 2, 3];
      }
      expect(buildStubRecords(field)).toEqual([
        {field: 1},
        {field: 2},
        {field: 3},
      ]);
    });

    it('should return an array of combined records.', () => {
      function field1() {
        return [1, 2, 3];
      }
      function field2() {
        return [1, 2, 3];
      }
      const actual = buildStubRecords(field1, field2);
      expect(actual).toContainEqual({field1: 1, field2: 1});
      expect(actual).toContainEqual({field1: 1, field2: 2});
      expect(actual).toContainEqual({field1: 1, field2: 3});
      expect(actual).toContainEqual({field1: 2, field2: 1});
      expect(actual).toContainEqual({field1: 2, field2: 2});
      expect(actual).toContainEqual({field1: 2, field2: 3});
      expect(actual).toContainEqual({field1: 3, field2: 1});
      expect(actual).toContainEqual({field1: 3, field2: 2});
      expect(actual).toContainEqual({field1: 3, field2: 3});
    });
  });

  describe('export default function buildStubRecords(...variations: Array<Record<string, any[]>>): Array<Record<any, any>>;', () => {
    it('should return an array of simpleRecords', () => {
      expect(buildStubRecords({field: [1, 2, 3]})).toEqual([
        {field: 1},
        {field: 2},
        {field: 3},
      ]);
    });

    it('should return an array of combined records.', () => {
      const actual = buildStubRecords({
        field1: [1, 2, 3],
        field2: [1, 2, 3],
      });
      expect(actual).toContainEqual({field1: 1, field2: 1});
      expect(actual).toContainEqual({field1: 1, field2: 2});
      expect(actual).toContainEqual({field1: 1, field2: 3});
      expect(actual).toContainEqual({field1: 2, field2: 1});
      expect(actual).toContainEqual({field1: 2, field2: 2});
      expect(actual).toContainEqual({field1: 2, field2: 3});
      expect(actual).toContainEqual({field1: 3, field2: 1});
      expect(actual).toContainEqual({field1: 3, field2: 2});
      expect(actual).toContainEqual({field1: 3, field2: 3});
    });
  });
});
