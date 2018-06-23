import { updateItemInArray, removeItemFromArray } from "../src/utils";

describe('updateItemInArray', () => {
  it('updates item with matching key', () => {
    const array = [
      { name: 'John', age: 42, gender: 'Male' },
      { name: 'Sara', age: 24, gender: 'Female' },
      { name: 'Denise', age: 43, gender: 'Female' },
      { name: 'Mike', age: 33, gender: 'Male' },
    ];

    expect(updateItemInArray(array, { name: 'John', age: 54 }, 'name'))
      .toEqual([
        { name: 'John', age: 54, gender: 'Male' },
        { name: 'Sara', age: 24, gender: 'Female' },
        { name: 'Denise', age: 43, gender: 'Female' },
        { name: 'Mike', age: 33, gender: 'Male' },
      ]);

    expect(updateItemInArray(array, { name: 'Sara', gender: 'Male' }, 'name'))
      .toEqual([
        { name: 'John', age: 42, gender: 'Male' },
        { name: 'Sara', age: 24, gender: 'Male' },
        { name: 'Denise', age: 43, gender: 'Female' },
        { name: 'Mike', age: 33, gender: 'Male' },
      ]);
  });
});

describe('removeItemFromArray', () => {
  it('removes the item from the array', () => {
    const array = [
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ];

    expect(removeItemFromArray(array, 'id', 2))
      .toEqual([
        { id: 1 },
        { id: 3 }
      ]);
  });
});