import config from "../../../shared/config.json";
import ColorButton from "../color-button/ColorButton";
import ContentGridLayout from "../../../globals/layouts/content-grid-layout/ContentGridLayout";

interface WhiteTemperatureSelectorProps {
    onSelected: (value: number) => void
    current: number
}

export default function WhiteTemperatureSelector(props: WhiteTemperatureSelectorProps) {
    const predefinedValues = config.tradfri.colors.whiteTemperatures.map((c, i) => ({color: c, value: (i / (config.tradfri.colors.whiteTemperatures.length - 1))}))

    return (
        <div>
            <ContentGridLayout variant="small-items">
                {predefinedValues.map(colorValue => (
                    <ColorButton key={colorValue.color} onClick={() => props.onSelected(colorValue.value)}
                                 color={colorValue.color}></ColorButton>))}
            </ContentGridLayout>
        </div>
    )
}