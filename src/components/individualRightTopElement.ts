import { html, svg } from "lit";
import { individualSecondarySpan } from "./spans/individualSecondarySpan";
import { NewDur, TemplatesObj } from "../type";
import { PowerFlowCardPlusConfig } from "../power-flow-card-plus-config";
import { computeIndividualFlowRate } from "../utils/computeFlowRate";
import { showLine } from "../utils/showLine";
import { IndividualObject } from "../states/raw/individual/getIndividualObject";
import { PowerFlowCardPlus } from "../power-flow-card-plus";
import { styleLine } from "../utils/styleLine";
import { checkHasBottomIndividual } from "../utils/computeIndividualPosition";
import { checkShouldShowDots } from "../utils/checkShouldShowDots";
import { Circumferences, circleSections } from "./spans/circleSections";

interface TopIndividual {
  newDur: NewDur;
  templatesObj: TemplatesObj;
  individualObj?: IndividualObject;
  displayState: string;
  battery: any;
  individualObjs: IndividualObject[];
  circumferences?: Circumferences;
}

export const individualRightTopElement = (
  main: PowerFlowCardPlus,
  config: PowerFlowCardPlusConfig,
  { individualObj, templatesObj, displayState, newDur, battery, individualObjs, circumferences }: TopIndividual
) => {
  if (!individualObj) return html`<div class="spacer"></div>`;

  const indexOfIndividual = config?.entities?.individual?.findIndex((e) => e.entity === individualObj.entity) || -1;
  if (indexOfIndividual === -1) return html`<div class="spacer"></div>`;

  const duration = newDur.individual[indexOfIndividual] || 1.66;

  const hasBottomRow = !!battery?.has || checkHasBottomIndividual(config, individualObjs);

  return html`<div class="circle-container individual-top individual-right individual-right-top">
    <span class="label">${individualObj.name}</span>
    <div
      class="circle"
      @click=${(e: { stopPropagation: () => void }) => {
        main.openDetails(e, individualObj?.entity);
      }}
      @keyDown=${(e: { key: string; stopPropagation: () => void }) => {
        if (e.key === "Enter") {
          main.openDetails(e, individualObj?.entity);
        }
      }}
    >
      ${individualSecondarySpan(main.hass, main, templatesObj, individualObj, 2, "right-top")}
      <ha-icon
        id="individual-right-top-icon"
        .icon=${individualObj.icon}
        
      ></ha-icon>
      ${individualObj?.field?.display_zero_state !== false || (individualObj.state || 0) > (individualObj.displayZeroTolerance ?? 0)
        ? html` <span class="individual-top individual-right-top">
            ${individualObj?.showDirection
              ? html`<ha-icon class="small" .icon=${individualObj.invertAnimation ? "mdi:arrow-down" : "mdi:arrow-up"}></ha-icon>`
              : ""}${displayState}
          </span>`
        : ""}
      ${circumferences ? circleSections("individual-circle-sections", circumferences) : ""}
    </div>
    ${showLine(config, individualObj.state || 0)
      ? html`
          <div class="right-individual-flow-container">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" class="right-individual-flow">
              <path
                id="individual-top-right-home"
                class="${styleLine(individualObj.state || 0, config)}"
                d="M${hasBottomRow ? 45 : 47},0 v15 c0,${hasBottomRow ? "30 -10,30 -30,30" : "35 -10,35 -30,35"} h-20"
                vector-effect="non-scaling-stroke"
              />
              ${checkShouldShowDots(config) && individualObj.state
                ? svg`<circle
                    r="1"
                    class="individual-top"
                    vector-effect="non-scaling-stroke"
                    >

                    <animateMotion
                    dur="${computeIndividualFlowRate(individualObj?.field?.calculate_flow_rate, duration)}s"
                    repeatCount="indefinite"
                    calcMode="linear"
                    keyPoints=${individualObj.invertAnimation ? "0;1" : "1;0"}
                    keyTimes="0;1"
                    >
                    <mpath xlink:href="#individual-top-right-home" />
                    </animateMotion>
                    </circle>`
                : ""}
            </svg>
          </div>
        `
      : ""}
  </div>`;
};
