import { html, svg } from "lit"

export interface Circumferences {
    circleCircumference: number,
    solarCircumference?: number,
    batteryCircumference?: number,
    nonFossilCircumference?: number,
    gridCircumference?: number,
}

export const circleSections = (
    clazz: string,
    {
        circleCircumference,
        solarCircumference,
        batteryCircumference,
        nonFossilCircumference,
        gridCircumference,
    }: Circumferences
) => {
    return html`
    <svg class="${clazz}" viewBox="0 0 80 80">
    ${
      solarCircumference !== undefined
        ? svg`<circle
              class="solar"
              cx="40"
              cy="40"
              r="38"
              stroke-dasharray="${solarCircumference} ${circleCircumference - solarCircumference}"
              shape-rendering="geometricPrecision"
              stroke-dashoffset="-${circleCircumference - solarCircumference}"
            />`
        : ""
    }
    ${
      batteryCircumference !== undefined
        ? svg`<circle
              class="battery"
              cx="40"
              cy="40"
              r="38"
              stroke-dasharray="${batteryCircumference} ${circleCircumference - batteryCircumference}"
              stroke-dashoffset="-${circleCircumference - batteryCircumference - (solarCircumference || 0)}"
              shape-rendering="geometricPrecision"
            />`
        : ""
    }
    ${
      nonFossilCircumference !== undefined
        ? svg`<circle
              class="low-carbon"
              cx="40"
              cy="40"
              r="38"
              stroke-dasharray="${nonFossilCircumference} ${circleCircumference - nonFossilCircumference}"
              stroke-dashoffset="-${
                circleCircumference - nonFossilCircumference - (batteryCircumference || 0) - (solarCircumference || 0)
              }"
              shape-rendering="geometricPrecision"
            />`
        : ""
    }
    <circle
      class="grid"
      cx="40"
      cy="40"
      r="38"
      stroke-dasharray="${gridCircumference ?? circleCircumference - solarCircumference! - (batteryCircumference || 0)} ${
        gridCircumference !== undefined ? circleCircumference - gridCircumference : solarCircumference! + (batteryCircumference || 0)
      }"
      stroke-dashoffset="0"
      shape-rendering="geometricPrecision"
    />
    </svg>
    `;
}