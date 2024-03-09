import { html, svg } from "lit";
import { PowerFlowCardPlus } from "../power-flow-card-plus";
import { generalSecondarySpan } from "./spans/generalSecondarySpan";
import { NewDur, TemplatesObj } from "../type";
import { ConfigEntities, PowerFlowCardPlusConfig } from "../power-flow-card-plus-config";
import { showLine } from "../utils/showLine";
import { IndividualObject } from "../states/raw/individual/getIndividualObject";
import { circleSections } from "./spans/circleSections";

interface Home {
  home: any;
  entities: ConfigEntities;
  templatesObj: TemplatesObj;
  grid: any;
  newDur: NewDur;
  homeUsageToDisplay: string;
  homeSolarCircumference: number;
  circleCircumference: number;
  homeBatteryCircumference: number;
  homeNonFossilCircumference: number;
  homeGridCircumference: number;
  individual: IndividualObject[];
}

export const homeElement = (
  main: PowerFlowCardPlus,
  config: PowerFlowCardPlusConfig,
  {
    home,
    entities,
    templatesObj,
    homeUsageToDisplay,
    homeSolarCircumference,
    circleCircumference,
    homeBatteryCircumference,
    homeNonFossilCircumference,
    homeGridCircumference,
    individual,
  }: Home
) => {
  return html`<div class="circle-container home">
  <div
    class="circle"
    id="home-circle"
    @click=${(e: { stopPropagation: () => void }) => {
      main.openDetails(e, entities.home?.entity);
    }}
    @keyDown=${(e: { key: string; stopPropagation: () => void }) => {
      if (e.key === "Enter") {
        main.openDetails(e, entities.home?.entity);
      }
    }}
  >
    ${generalSecondarySpan(main.hass, main, templatesObj, home, "home")}
    <ha-icon .icon=${home.icon}></ha-icon>
    ${homeUsageToDisplay}
    ${circleSections('home-circle-sections', {
      circleCircumference,
      solarCircumference: homeSolarCircumference,
      batteryCircumference: homeBatteryCircumference,
      nonFossilCircumference: homeNonFossilCircumference,
      gridCircumference: homeGridCircumference,
    })}
  </div>
  ${
    individual?.length > 1 && showLine(config, individual?.[1]?.state || 0)
      ? html`<span class="label"></span>`
      : html`<span class="label">${home.name}</span>`
  }
</div>
</div>`;
};
