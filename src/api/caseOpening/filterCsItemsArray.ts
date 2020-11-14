export default function getRandomItem(dbObject: Record<string, any>, rarity: string, rarityObj: Record<string, any>) {
  const arr = dbObject[rarity];

  const filteredArr = arr.filter((x: Record<string, any>) => x.rarity === rarityObj.grade);
  const dbItem: Record<string, any> = filteredArr[Math.floor(Math.random() * filteredArr.length)];
  return {
    ...dbItem,
    ...rarityObj,
  };
}
