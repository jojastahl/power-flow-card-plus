import { html, svg } from "lit";
import { individualSecondarySpan } from "./spans/individualSecondarySpan";
import { NewDur, TemplatesObj } from "../type";
import { PowerFlowCardPlusConfig } from "../power-flow-card-plus-config";
import { computeIndividualFlowRate } from "../utils/computeFlowRate";
import { showLine } from "../utils/showLine";
import { IndividualObject } from "../states/raw/individual/getIndividualObject";
import { PowerFlowCardPlus } from "../power-flow-card-plus";
import { styleLine } from "../utils/styleLine";
import { checkShouldShowDots } from "../utils/checkShouldShowDots";
import { Circumferences, circleSections } from "./spans/circleSections";

interface TopIndividual {
  newDur: NewDur;
  templatesObj: TemplatesObj;
  individualObj?: IndividualObject;
  displayState: string;
  circumferences?: Circumferences;
}

export const individualLeftTopElement = (
  main: PowerFlowCardPlus,
  config: PowerFlowCardPlusConfig,
  { individualObj, templatesObj, displayState, newDur, circumferences }: TopIndividual
) => {
  if (!individualObj) return html`<div class="spacer"></div>`;
  const indexOfIndividual = config?.entities?.individual?.findIndex((e) => e.entity === individualObj.entity) || 0;
  const duration = newDur.individual[indexOfIndividual] || 0;
  return html`<div class="circle-container individual-top">
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
      ${individualSecondarySpan(main.hass, main, templatesObj, individualObj, 0, "left-top")}
      <ha-icon id="individual-left-top-icon" .icon=${individualObj.icon}></ha-icon>
      ${individualObj?.field?.display_zero_state !== false || (individualObj.state || 0) > (individualObj.displayZeroTolerance ?? 0)
        ? html` <span class="individual-top individual-left-top">
            ${individualObj?.showDirection
              ? html`<ha-icon class="small" .icon=${individualObj.invertAnimation ? "mdi:arrow-down" : "mdi:arrow-up"}></ha-icon>`
              : ""}${displayState}
          </span>`
        : ""}
      ${circumferences ? circleSections("individual-circle-sections", circumferences) : ""}
    </div>
    ${showLine(config, individualObj.state || 0)
      ? html`
          <svg width="80" height="30">
            <path d="M40 -10 v50" id="individual-top" class="${styleLine(individualObj.state || 0, config)}" />
            ${checkShouldShowDots(config) && individualObj.state
              ? svg`<circle
          r="1.75"
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
            <mpath xlink:href="#individual-top" />
          </animateMotion>
        </circle>`
              : ""}
          </svg>
        `
      : ""}
  </div>`;
};
