const MIL_SPEC_RARITY = 79.92327;
const RESTRICTED_RARITY = 15.98465;
const CLASSIFIED_RARITY = 3.19693;
const COVERT_RARITY = 0.63939;
const SPECIAL_RARITY = 0.25575;

const ST_MIL_SPEC_RARITY = 7.99233;
const ST_RESTRICTED_RARITY = 1.59847;
const ST_CLASSIFIED_RARITY = 0.31969;
const ST_COVERT_RARITY = 0.6394;
const ST_SPECIAL_RARITY = 0.02558;

const FACTORY_NEW = 0.07;
const MINIMAL_WEAR = 0.15;
const FIELD_TESTED = 0.38;
const WELL_WORN = 0.45;
// const BATTLE_SCARED = 1;

const isBetween = (input: number, min: number, max: number) => {
  return input >= min && input <= max;
};

const statTrakMultiplier = (max: number) => {
  /* Returns procentage of getting statTrak version of item */
  return max * 0.1;
};

const calculateWear = (input: number) => {
  if (isBetween(input, 0, FACTORY_NEW)) {
    return 'Factory new';
  } else if (isBetween(input, FACTORY_NEW, MINIMAL_WEAR)) {
    return 'Minimal wear';
  } else if (isBetween(input, MINIMAL_WEAR, FIELD_TESTED)) {
    return 'Field tested';
  } else if (isBetween(input, FIELD_TESTED, WELL_WORN)) {
    return 'Well worn';
  }

  return 'Battle scared';
};

const getRarity = (max: number) => {
  const rarityValue = Math.random() * (max - 0) + 0;
  const statTrakValue = Math.random() * (statTrakMultiplier(rarityValue) - 0) + 0;
  const floatValue = Math.random() * (1 - 0) + 0;
  // console.log(`rarityValue: ${rarityValue}`);
  // console.log(`statTrakValue: ${statTrakValue}`);
  // console.log(`floatValue: ${floatValue}`);
  if (isBetween(rarityValue, 0, SPECIAL_RARITY)) {
    return {
      grade: 'Special',
      statTrak: isBetween(statTrakValue, 0, ST_SPECIAL_RARITY),
      color: '#FFD700',
      wear: calculateWear(floatValue),
      float: floatValue,
    };
  } else if (isBetween(rarityValue, SPECIAL_RARITY, COVERT_RARITY)) {
    return {
      grade: 'Covert',
      statTrak: isBetween(statTrakValue, ST_SPECIAL_RARITY, ST_COVERT_RARITY),
      color: '#EB4B4B',
      wear: calculateWear(floatValue),
      float: floatValue,
    };
  } else if (isBetween(rarityValue, COVERT_RARITY, CLASSIFIED_RARITY)) {
    return {
      grade: 'Classified',
      statTrak: isBetween(statTrakValue, ST_COVERT_RARITY, ST_CLASSIFIED_RARITY),
      color: '#D32CE6',
      wear: calculateWear(floatValue),
      float: floatValue,
    };
  } else if (isBetween(rarityValue, CLASSIFIED_RARITY, RESTRICTED_RARITY)) {
    return {
      grade: 'Restricted',
      statTrak: isBetween(statTrakValue, ST_CLASSIFIED_RARITY, ST_RESTRICTED_RARITY),
      color: '#8847FF',
      wear: calculateWear(floatValue),
      float: floatValue,
    };
  } else if (
    isBetween(rarityValue, RESTRICTED_RARITY, MIL_SPEC_RARITY) &&
    isBetween(rarityValue, ST_RESTRICTED_RARITY, ST_MIL_SPEC_RARITY)
  ) {
    return {
      grade: 'Mil-spec',
      statTrak: true,
      color: '#4B69FF',
      wear: calculateWear(floatValue),
      float: floatValue,
    };
  }

  return {
    grade: 'Mil-spec',
    statTrak: false,
    color: '#4B69FF',
    wear: calculateWear(floatValue),
    float: floatValue,
  };
};

export default function getRarityStats() {
  return getRarity(MIL_SPEC_RARITY);
}
