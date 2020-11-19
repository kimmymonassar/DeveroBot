export default function getRandomItem(
  dbObject: Record<string, any>,
  objItemsPath: string,
  rarityObj: Record<string, any>,
) {
  const arr = dbObject[objItemsPath];
  const grade = rarityObj.grade === 'Special' ? 'Covert' : rarityObj.grade;

  const filteredArr = arr.filter((x: Record<string, any>) => x.rarity === grade);
  const dbItem: Record<string, any> = filteredArr[Math.floor(Math.random() * filteredArr.length)];
  return {
    ...dbItem,
    ...rarityObj,
  };
}
