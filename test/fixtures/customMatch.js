export function setExport() {
  expect.extend({
    async checkArray(arrayLenght, itemName) {
      return {
        message: () => ` "${itemName}" not found in array"`,
        pass: (await arrayLenght.length) != 0
      };
    }
  });
}
