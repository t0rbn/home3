import {useRef} from "react";
import config from "../../../shared/config.json";
import PrimaryButton from "../../../globals/buttons/primary-button/PrimaryButton";
import ColorButton from "../color-button/ColorButton";
import ContentGridLayout from "../../../globals/layouts/content-grid-layout/ContentGridLayout";
import MaterialIcon from "../../../globals/material-icon/MaterialIcon";

interface ColorSelectorProps {
    onSelected: (color: string) => void
}

function RgbColorSelector(props: ColorSelectorProps) {
    const colors: Array<string|Array<number>> = config.tradfri.colors.rgb

    const hexColors = colors.map(c => {
        if (typeof c === 'string') {
            return c
        }

        return '#' + c.map(part => (Math.floor(255 * part)).toString(16).padStart(2, '0')).join('')
    })

    const colorSelector = useRef(null);
    const openCustomSelector = () => {
        (colorSelector.current as any).click();
    }

    return (
        <div>
            <ContentGridLayout cols={6} colsSmall={3}>
                {hexColors.map(c => <ColorButton onClick={() => props.onSelected(c)} key={c} color={c}/>)}
                <PrimaryButton onClick={openCustomSelector}><MaterialIcon icon="palette" /></PrimaryButton>
            </ContentGridLayout>
            <input type="color" ref={colorSelector} onChange={e => props.onSelected(e.target.value)} style={{display: 'none'}}/>
        </div>
    )
}

export default RgbColorSelector
