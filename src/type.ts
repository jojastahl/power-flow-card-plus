import { TemplateResult } from "lit";

export type ComboEntity = {
  consumption: string;
  production: string;
};

export type SecondaryInfoType = {
  entity?: string;
  unit_of_measurement?: string;
  icon?: string;
  display_zero?: boolean;
  unit_white_space?: boolean;
  display_zero_tolerance?: number;
  color_value?: boolean | "production" | "consumption";
  template?: string;
  decimals?: number;
};

export interface BaseConfigEntity {
  entity: string | ComboEntity;
  name?: string;
  icon?: string;
  color?: ComboEntity | string;
  color_icon?: boolean | string;
  display_state?: "two_way" | "one_way" | "one_way_no_zero";
  display_zero_tolerance?: number;
  unit_of_measurement?: string;
  unit_white_space?: boolean;
  use_metadata?: boolean;
  secondary_info?: SecondaryInfoType;
  invert_state?: boolean;
}

export type GridPowerOutage = {
  entity: string;
  state_alert?: string;
  label_alert?: string;
  icon_alert?: string;
  entity_generator?: string;
};

export const IndividualSourceProperties = ["solar_usage_entity", "battery_usage_entity", "fossil_usage_entity", "grid_usage_entity"] as const;

export type IndividualDeviceType = BaseConfigEntity & {
  entity: string;
  color?: string;
  color_icon?: boolean;
  inverted_animation?: boolean;
  display_zero?: boolean;
  display_zero_state?: boolean;
  color_value?: boolean;
  color_label?: boolean;
  calculate_flow_rate?: boolean;
  use_metadata?: boolean;
  decimals?: number;
  show_direction?: boolean;
} & {
  [key in typeof IndividualSourceProperties[number]]: string;
};

export type EntityType = "battery" | "grid" | "solar" | "individual1" | "individual2" | "home" | "fossil_fuel_percentage";

export type TemplatesObj = {
  gridSecondary: string | undefined;
  solarSecondary: string | undefined;
  homeSecondary: string | undefined;
  individual: (string | undefined)[];
  nonFossilFuelSecondary: string | undefined;
};

export type HomeSources = {
  battery: {
    value: number;
    color: string;
  };
  solar: {
    value: number;
    color: string;
  };
  grid: {
    value: number;
    color: string;
  };
  gridNonFossil: {
    value: number;
    color: string;
  };
};

export type IndividualSources = {
  battery?: {
    value: number | null;
    color: string;
    isPercentage: boolean;
  };
  solar?: {
    value: number | null;
    color: string;
    isPercentage: boolean;
  };
  grid?: {
    value: number | null;
    color: string;
    isPercentage: boolean;
  };
  gridNonFossil?: {
    value: number | null;
    color: string;
    isPercentage: boolean;
  };
};

export type NewDur = {
  batteryGrid: number;
  batteryToHome: number;
  gridToHome: number;
  solarToBattery: number;
  solarToGrid: number;
  solarToHome: number;
  individual: number[];
  nonFossil: number;
};

export type GridObject = {
  entity: string | ComboEntity | undefined;
  has: boolean;
  hasReturnToGrid: boolean;
  state: {
    fromGrid: number | null;
    toGrid: number | null;
    toBattery: number | null;
    toHome: number | null;
  };
  powerOutage: {
    has: boolean;
    isOutage: boolean;
    icon: string;
    name: string | TemplateResult<1>;
    entityGenerator?: string;
  };
  icon: string;
  name: string;
  mainEntity: string | undefined;
  color: {
    fromGrid?: string;
    toGrid?: string;
    icon_type?: boolean | "production" | "consumption";
    circle_type?: boolean | "production" | "consumption";
  };
  secondary: {
    entity?: string;
    decimals?: number;
    template?: string;
    has: boolean;
    state: string | number | null;
    icon?: string;
    unit?: string;
    unit_white_space?: boolean;
    color?: {
      type?: boolean | "production" | "consumption";
    };
  };
};