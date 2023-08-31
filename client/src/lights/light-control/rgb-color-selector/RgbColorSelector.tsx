import {useRef} from "react";
import config from "../../../shared/config.json";
import PrimaryButton from "../../../globals/primary-button/PrimaryButton";
import ColorButton from "../color-button/ColorButton";
import ContentGridLayout from "../../../globals/layouts/content-grid-layout/ContentGridLayout";

interface ColorSelectorProps {
    onSelected: (color: string) => void
}

function RgbColorSelector(props: ColorSelectorProps) {
    const colors = config.tradfri.colors.rgb

    const colorSelector = useRef(null);
    const openCustomSelector = () => {
        (colorSelector.current as any).click();
    }

    return (
        <div>
            <ContentGridLayout variant='small'>
                {colors.map(c => <ColorButton onClick={() => props.onSelected(c)} key={c} color={c}/>)}
                <PrimaryButton onClick={openCustomSelector}>custom</PrimaryButton>
            </ContentGridLayout>
            <input type="color" ref={colorSelector} onChange={e => props.onSelected(e.target.value)} style={{display: 'none'}}/>
        </div>
    )
}

export default RgbColorSelector
