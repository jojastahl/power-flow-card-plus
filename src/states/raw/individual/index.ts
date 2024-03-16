import { HomeAssistant } from "custom-card-helpers";
import { getEntityStateWatts } from "../../utils/getEntityStateWatts";
import { IndividualDeviceType, IndividualSourceProperties, IndividualSources } from "../../../type";
import { isNumberValue } from "../../../utils/utils";
import { getEntityStateObj } from "../../utils/getEntityStateObj";
import { getEntityState } from "../../utils/getEntityState";

export const getIndividualState = (hass: HomeAssistant, field: IndividualDeviceType) => {
  const entity: string = field?.entity;

  if (entity === undefined) return null;

  const individualStateWatts = getEntityStateWatts(hass, entity);

  return Math.abs(individualStateWatts);
};

export const getIndividualSources = (hass: HomeAssistant, field: IndividualDeviceType): IndividualSources | null => {
  const map: {
    [key in typeof IndividualSourceProperties[number]]: {
      property: keyof IndividualSources;
      invert?: boolean;
    }
  } = {
    battery_usage_entity: { property: "battery" },
    fossil_usage_entity: { property: "gridNonFossil", invert: false },
    grid_usage_entity: { property: "grid" },
    solar_usage_entity: { property: "solar" },
  } as const;

  if (!IndividualSourceProperties.some(p => field[p]))
    return null;

  return IndividualSourceProperties.reduce((ret, p) => {
    const entity = field[p];

    if (entity) {
      const unit = hass.states[entity]?.attributes.unit_of_measurement ?? "";
      const isPercentage = unit === '%';
      const state = isPercentage ? getEntityState(hass, entity) : getEntityStateWatts(hass, entity);
      ret[map[p].property] = {
        value: state ?? 0,
        isPercentage: isPercentage,
      };
    }
    return ret;
  }, {});
};

export const getIndividualSecondaryState = (hass: HomeAssistant, field: IndividualDeviceType) => {
  if (typeof field?.entity !== "string") return null;

  const entityObj = getEntityStateObj(hass, field?.secondary_info?.entity);
  const secondaryState = entityObj?.state;

  if (isNumberValue(secondaryState)) return Math.abs(Number(secondaryState));

  return secondaryState;
};
